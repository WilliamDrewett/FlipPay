import os
import httpx
import logging
from typing import Dict, Optional, List, Any
import asyncio
import json

# Handle optional substrate-interface dependency
try:
    from substrate_interface import SubstrateInterface, Keypair
    SUBSTRATE_AVAILABLE = True
except ImportError:
    SubstrateInterface = None
    Keypair = None
    SUBSTRATE_AVAILABLE = False

logger = logging.getLogger(__name__)

class PolkadotService:
    def __init__(self):
        # Polkadot RPC endpoints (free tier providers)
        self.rpc_endpoints = [
            "wss://rpc.polkadot.io",  # Official Polkadot
            "wss://polkadot.api.onfinality.io/public-ws",  # OnFinality free tier
            "wss://polkadot-rpc.dwellir.com",  # Dwellir free tier
        ]
        
        # CoinGecko API configuration  
        self.coingecko_base = "https://api.coingecko.com/api/v3"
        self.coingecko_pro_key = os.getenv("COINGECKO_PRO_API_KEY")  # Optional pro key
        
        # Cache for substrate interface
        self._substrate_interface = None
        
        # Common Polkadot ecosystem tokens for CoinGecko
        self.polkadot_tokens = {
            "DOT": "polkadot",
            "KSM": "kusama",
            "ASTR": "astar",
            "GLMR": "moonbeam",
            "ACA": "acala",
            "PARA": "paratoken",
            "MOVR": "moonriver",
            "SDN": "shiden",
            "PHA": "pha",
            "INTR": "interlay",
            "HDX": "hydradx",
            "BNC": "bifrost-native-coin",
            "RING": "darwinia-network-native-token",
            "CFG": "centrifuge",
            "TEER": "integritee"
        }
        
    async def get_substrate_interface(self) -> Optional[SubstrateInterface]:
        """Get or create a substrate interface connection"""
        if not SUBSTRATE_AVAILABLE:
            logger.warning("substrate-interface not available, falling back to CoinGecko-only mode")
            return None
            
        if self._substrate_interface is None:
            for endpoint in self.rpc_endpoints:
                try:
                    logger.info(f"Connecting to Polkadot RPC: {endpoint}")
                    self._substrate_interface = SubstrateInterface(url=endpoint)
                    # Test the connection
                    await asyncio.get_event_loop().run_in_executor(
                        None, 
                        lambda: self._substrate_interface.query("System", "Number")
                    )
                    logger.info(f"Successfully connected to {endpoint}")
                    break
                except Exception as e:
                    logger.warning(f"Failed to connect to {endpoint}: {str(e)}")
                    self._substrate_interface = None
                    continue
                    
        return self._substrate_interface
        
    async def get_polkadot_tokens(self) -> Dict[str, Any]:
        """
        Get list of Polkadot native and parachain tokens using Substrate RPC
        Returns both on-chain asset registry data and known ecosystem tokens
        """
        try:
            substrate = await self.get_substrate_interface()
            if not substrate:
                logger.error("No Polkadot RPC connection available")
                return self._get_fallback_token_list()
                
            tokens = {}
            
            # Get native DOT token info
            await asyncio.get_event_loop().run_in_executor(
                None,
                self._add_native_dot_token,
                tokens, substrate
            )
            
            # Try to get parachain assets if Asset Hub is accessible
            try:
                await asyncio.get_event_loop().run_in_executor(
                    None,
                    self._query_asset_hub_tokens,
                    tokens, substrate
                )
            except Exception as e:
                logger.warning(f"Could not query Asset Hub tokens: {str(e)}")
                
            # Add known ecosystem tokens
            for symbol, coingecko_id in self.polkadot_tokens.items():
                if symbol not in tokens:
                    tokens[symbol] = {
                        "symbol": symbol,
                        "name": symbol.upper(),
                        "decimals": 10 if symbol == "DOT" else 12,  # Common defaults
                        "type": "ecosystem",
                        "coingecko_id": coingecko_id
                    }
                    
            logger.info(f"Retrieved {len(tokens)} Polkadot ecosystem tokens")
            return {"tokens": tokens, "total_count": len(tokens)}
            
        except Exception as e:
            logger.error(f"Error retrieving Polkadot tokens: {str(e)}")
            return self._get_fallback_token_list()
            
    def _add_native_dot_token(self, tokens: Dict, substrate=None):
        """Add native DOT token information"""
        try:
            if substrate and SUBSTRATE_AVAILABLE:
                # Get chain properties
                properties = substrate.get_chain_properties()
                
                tokens["DOT"] = {
                    "symbol": "DOT",
                    "name": "Polkadot",
                    "decimals": properties.get("tokenDecimals", [10])[0] if properties else 10,
                    "type": "native",
                    "coingecko_id": "polkadot",
                    "chain": "polkadot"
                }
            else:
                # Fallback to defaults when substrate not available
                tokens["DOT"] = {
                    "symbol": "DOT",
                    "name": "Polkadot", 
                    "decimals": 10,
                    "type": "native",
                    "coingecko_id": "polkadot",
                    "chain": "polkadot"
                }
        except Exception as e:
            logger.warning(f"Could not get native DOT info: {str(e)}")
            # Fallback to defaults
            tokens["DOT"] = {
                "symbol": "DOT",
                "name": "Polkadot", 
                "decimals": 10,
                "type": "native",
                "coingecko_id": "polkadot",
                "chain": "polkadot"
            }
            
    def _query_asset_hub_tokens(self, tokens: Dict, substrate=None):
        """Query Asset Hub for registered assets (if available)"""
        try:
            if substrate and SUBSTRATE_AVAILABLE:
                # This is a simplified version - in practice you'd need to connect to Asset Hub specifically
                # For now, we'll just log that we attempted this
                logger.info("Asset Hub token query attempted (placeholder implementation)")
                
                # Asset Hub would have assets registered in the Assets pallet
                # query_result = substrate.query("Assets", "Metadata")
                # But we need to connect to the Asset Hub parachain specifically
            else:
                logger.info("Asset Hub query skipped - substrate interface not available")
            
        except Exception as e:
            logger.warning(f"Asset Hub query failed: {str(e)}")
            
    def _get_fallback_token_list(self) -> Dict[str, Any]:
        """Return a fallback list of well-known Polkadot ecosystem tokens"""
        tokens = {}
        for symbol, coingecko_id in self.polkadot_tokens.items():
            tokens[symbol] = {
                "symbol": symbol,
                "name": symbol.upper(),
                "decimals": 10 if symbol == "DOT" else 12,
                "type": "ecosystem",
                "coingecko_id": coingecko_id,
                "source": "fallback"
            }
            
        return {"tokens": tokens, "total_count": len(tokens)}
        
    async def get_token_prices_coingecko(self, token_ids: List[str] = None) -> Dict[str, Any]:
        """
        Get token prices from CoinGecko API
        
        Args:
            token_ids: List of CoinGecko token IDs, if None gets all known Polkadot tokens
        """
        try:
            if token_ids is None:
                token_ids = list(self.polkadot_tokens.values())
                
            # CoinGecko simple price endpoint
            ids_param = ",".join(token_ids)
            url = f"{self.coingecko_base}/simple/price"
            
            params = {
                "ids": ids_param,
                "vs_currencies": "usd",
                "include_market_cap": "true",
                "include_24hr_change": "true",
                "include_24hr_vol": "true"
            }
            
            headers = {}
            if self.coingecko_pro_key:
                headers["x-cg-pro-api-key"] = self.coingecko_pro_key
                
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params, headers=headers, timeout=10)
                response.raise_for_status()
                
                prices_data = response.json()
                
                # Format the response
                formatted_prices = {}
                for token_id, price_info in prices_data.items():
                    # Find the symbol for this token_id
                    symbol = None
                    for sym, cg_id in self.polkadot_tokens.items():
                        if cg_id == token_id:
                            symbol = sym
                            break
                            
                    if symbol:
                        formatted_prices[symbol] = {
                            "token_id": token_id,
                            "symbol": symbol,
                            "price_usd": price_info.get("usd"),
                            "market_cap_usd": price_info.get("usd_market_cap"),
                            "change_24h_percent": price_info.get("usd_24h_change"),
                            "volume_24h_usd": price_info.get("usd_24h_vol"),
                            "source": "coingecko",
                            "timestamp": int(asyncio.get_event_loop().time())
                        }
                        
                logger.info(f"Retrieved prices for {len(formatted_prices)} tokens from CoinGecko")
                return {"prices": formatted_prices, "total_count": len(formatted_prices)}
                
        except Exception as e:
            logger.error(f"Error getting CoinGecko prices: {str(e)}")
            return {"prices": {}, "total_count": 0, "error": str(e)}
            
    async def get_token_price(self, symbol: str) -> Optional[Dict[str, Any]]:
        """Get price for a specific token"""
        try:
            if symbol.upper() not in self.polkadot_tokens:
                return None
                
            coingecko_id = self.polkadot_tokens[symbol.upper()]
            prices_response = await self.get_token_prices_coingecko([coingecko_id])
            
            if prices_response["total_count"] > 0:
                return prices_response["prices"].get(symbol.upper())
            return None
            
        except Exception as e:
            logger.error(f"Error getting price for {symbol}: {str(e)}")
            return None
            
    async def search_tokens(self, query: str) -> Dict[str, Any]:
        """Search for tokens by symbol or name"""
        try:
            tokens_response = await self.get_polkadot_tokens()
            all_tokens = tokens_response.get("tokens", {})
            
            query_lower = query.lower()
            matching_tokens = {}
            
            for symbol, token_info in all_tokens.items():
                if (query_lower in symbol.lower() or 
                    query_lower in token_info.get("name", "").lower()):
                    matching_tokens[symbol] = token_info
                    
            return {"tokens": matching_tokens, "total_count": len(matching_tokens)}
            
        except Exception as e:
            logger.error(f"Error searching tokens: {str(e)}")
            return {"tokens": {}, "total_count": 0, "error": str(e)}
            
    async def get_token_info(self, symbol: str) -> Optional[Dict[str, Any]]:
        """Get detailed information for a specific token"""
        try:
            tokens_response = await self.get_polkadot_tokens()
            token_info = tokens_response.get("tokens", {}).get(symbol.upper())
            
            if token_info:
                # Enrich with current price data
                price_info = await self.get_token_price(symbol)
                if price_info:
                    token_info.update(price_info)
                    
            return token_info
            
        except Exception as e:
            logger.error(f"Error getting token info for {symbol}: {str(e)}")
            return None
            
    async def close(self):
        """Clean up connections"""
        if self._substrate_interface and SUBSTRATE_AVAILABLE:
            try:
                await asyncio.get_event_loop().run_in_executor(
                    None, self._substrate_interface.close
                )
            except Exception as e:
                logger.warning(f"Error closing substrate interface: {str(e)}")
            finally:
                self._substrate_interface = None