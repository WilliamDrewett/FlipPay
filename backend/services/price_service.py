import os
import httpx
from typing import Dict, Optional
import logging

logger = logging.getLogger(__name__)

class PriceService:
    def __init__(self):
        self.api_key = os.getenv("ONEINCH_API_KEY")
        self.base_url = "https://api.1inch.dev"
        
        # Token addresses for price queries
        self.token_addresses = {
            "ETH": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",  # ETH placeholder
            "DOT": "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",  # Polkadot (DOT) on Ethereum
        }
        
        # USD stable coins for price reference 
        self.usd_tokens = {
            "USDC": "0xA0b86a33E6441066CE6b8B0d5A5a57d4E47e0b12",  # USDC on mainnet
            "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",  # USDT on mainnet
        }
        
        if not self.api_key:
            logger.warning("1inch API key not provided. Price endpoints may be limited.")

    async def get_token_price_usd(self, token_symbol: str, chain_id: int = 1) -> Optional[Dict]:
        """
        Get token price in USD using 1inch Spot Price API
        
        Args:
            token_symbol: Token symbol (ETH, DOT)
            chain_id: Blockchain chain ID (default: 1 for Ethereum mainnet)
            
        Returns:
            Dict with price information or None if error
        """
        try:
            if token_symbol not in self.token_addresses:
                raise ValueError(f"Token {token_symbol} not supported. Supported tokens: {list(self.token_addresses.keys())}")
            
            token_address = self.token_addresses[token_symbol]
            usdc_address = self.usd_tokens["USDC"]
            
            # Use 1inch Spot Price API v1.1
            url = f"{self.base_url}/spot-price/v1.1/{chain_id}"
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            # Request body for spot price
            payload = {
                "src": token_address,
                "dst": usdc_address,
                "amount": "1000000000000000000" if token_symbol == "ETH" else "10000000000000000000",  # 1 token in wei
                "includeTokensInfo": True,
                "includeProtocols": False
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, headers=headers)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Calculate price from the response
                    dst_amount = int(data.get("dstAmount", "0"))
                    if token_symbol == "ETH":
                        # ETH has 18 decimals, USDC has 6 decimals
                        price_usd = dst_amount / 1e6  # Convert from USDC smallest unit
                    else:  # DOT
                        # DOT has 10 decimals on Polkadot, but on Ethereum it typically has 10 decimals
                        # We're using 10 DOT (10 * 1e18) as amount
                        price_usd = (dst_amount / 1e6) / 10  # Convert from USDC and divide by 10 DOT
                    
                    return {
                        "token": token_symbol,
                        "price_usd": round(price_usd, 6),
                        "chain_id": chain_id,
                        "source": "1inch",
                        "timestamp": data.get("timestamp") or int(__import__("time").time())
                    }
                else:
                    logger.error(f"1inch API error for {token_symbol}: {response.status_code} - {response.text}")
                    return None
                    
        except Exception as e:
            logger.error(f"Error getting {token_symbol} price: {str(e)}")
            return None

    async def get_eth_price_usd(self, chain_id: int = 1) -> Optional[Dict]:
        """Get ETH price in USD"""
        return await self.get_token_price_usd("ETH", chain_id)

    async def get_polkadot_price_usd(self, chain_id: int = 1) -> Optional[Dict]:
        """Get Polkadot (DOT) price in USD"""
        return await self.get_token_price_usd("DOT", chain_id)

    async def get_multiple_prices(self, tokens: list, chain_id: int = 1) -> Dict:
        """Get prices for multiple tokens"""
        results = {}
        for token in tokens:
            price_data = await self.get_token_price_usd(token, chain_id)
            results[token] = price_data
        return results 