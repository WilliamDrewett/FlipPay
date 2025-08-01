import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Query, Path, Request
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine
import random
from fastapi.responses import JSONResponse
import httpx
from pydantic import BaseModel
from typing import Optional
import asyncio
import subprocess
from fastapi.middleware.cors import CORSMiddleware
from services.price_service import PriceService
from services.polkadot_service import PolkadotService

load_dotenv()
API_KEY = os.getenv("API_KEY")
ONEINCH_KEY = os.getenv("ONEINCH_KEY")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Initialize services
price_service = PriceService()
polkadot_service = PolkadotService()

# -------------------------------
# CORS configuration
# -------------------------------
origins = [
    "http://localhost:5173",  # local frontend
    "https://flippay-production.up.railway.app"  # production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Global configuration
FEE_RATE = 0.003  # 0.3%
INSTANT_POOL_RATE = 0.001  # 0.1%
GAME_POOL_RATE = 0.001     # 0.1%
PLATFORM_RATE = 0.001      # 0.1%
FREE_SWAP_CHANCE = 0.005   # 0.5% chance for free swap
POINTS_PER_DOLLAR = 1.0    # $1 = 1 point

# ---------------------------------------------------------------------------
#  Helper utilities
# ---------------------------------------------------------------------------

def get_transactions_for_wallet(db: Session, wallet_address: str):
    """Return a list of Transaction ORM objects for a given wallet.

    Raises HTTPException(404) if the user is not found.
    """
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.transactions

# Game configurations
GAME_CONFIGS = {
    "spin_wheel": {
        "cost_points": 10,
        "win_probability": 0.2,
        "available_prizes": ["Rare NFT", "100 Tokens", "50 Tokens", "25 Tokens"]
    },
    "mystery_box": {
        "cost_points": 15,
        "win_probability": 0.15,
        "available_prizes": ["Legendary NFT", "200 Tokens", "100 Tokens", "50 Tokens"]
    },
    "nft_crate": {
        "cost_points": 25,
        "win_probability": 0.1,
        "available_prizes": ["Epic NFT Collection", "500 Tokens", "250 Tokens", "100 Tokens"]
    },
    "loot_box": {
        # Cost to open one box
        "cost_points": 250,
        # Probability distribution for rarities (must sum to 1.0)
        "rarity_probabilities": {
            "Common": 0.60,
            "Uncommon": 0.25,
            "Rare": 0.10,
            "Legendary": 0.05
        },
        # Prizes available per rarity
        "prizes_by_rarity": {
            "Common": ["Sticker Pack", "10 Points"],
            "Uncommon": ["25 Tokens", "Wearable NFT"],
            "Rare": ["100 Tokens", "Rare NFT"],
            "Legendary": ["500 Tokens", "Legendary NFT"]
        }
    }
}

# Available token symbols for swaps
AVAILABLE_TOKENS = [
    "ETH", "AAVE", "sUSDe", "tBTC", "TRAC", "LBTC", 
    "LDO", "LINK", "SKY", "wstETH", "USDC", "USDT"
]

def get_or_create_prize_pool(db: Session):
    """Get or create the prize pool singleton"""
    pool = db.query(models.PrizePool).first()
    if not pool:
        pool = models.PrizePool()
        db.add(pool)
        db.commit()
        db.refresh(pool)
    return pool

def calculate_points(amount: float) -> int:
    """Calculate points based on trade value: $10 = 1 point"""
    return int(amount * POINTS_PER_DOLLAR)

def run_free_swap_lottery() -> bool:
    """Run RNG to determine if swap should be free (0.1-1% chance)"""
    return random.random() < FREE_SWAP_CHANCE

def split_fees(amount: float) -> dict:
    """Split transaction fees according to the design"""
    total_fee = amount * FEE_RATE
    return {
        "instant_pool": amount * INSTANT_POOL_RATE,
        "game_pool": amount * GAME_POOL_RATE,
        "platform": amount * PLATFORM_RATE,
        "total_fee": total_fee
    }

def get_or_create_test_user(db: Session):
    """Get or create the test user"""
    db_user = db.query(models.User).filter(models.User.wallet_address == "test").first()
    if not db_user:
        db_user = models.User(wallet_address="test", points=1000)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    return db_user

def reset_database_with_mock_data():
    """Reset database with fresh mock data - called on startup"""
    db = SessionLocal()
    try:
        # Drop all tables and recreate them to ensure schema is correct
        models.Base.metadata.drop_all(bind=engine)
        models.Base.metadata.create_all(bind=engine)
        
        # Create mock user
        mock_user = models.User(wallet_address="test", points=1250)
        db.add(mock_user)
        db.commit()
        db.refresh(mock_user)

        # Add mock transactions with new fields
        transactions = [
            models.Transaction(
                user_id=mock_user.id, 
                amount=500, 
                from_token="ETH", 
                to_token="USDC",
                points_earned=50,
                was_free=False,
                fee_paid=1.5
            ),
            models.Transaction(
                user_id=mock_user.id, 
                amount=750, 
                from_token="USDC", 
                to_token="LINK",
                points_earned=75,
                was_free=True,
                fee_paid=0.0
            ),
            models.Transaction(
                user_id=mock_user.id, 
                amount=300, 
                from_token="AAVE", 
                to_token="USDT",
                points_earned=30,
                was_free=False,
                fee_paid=0.9
            ),
        ]
        db.add_all(transactions)

        # Add mock prizes with points_spent
        prizes = [
            models.GamePlay(user_id=mock_user.id, game_type="spin_wheel", outcome="win", prize="Rare NFT", points_spent=10, box_id=1),
            models.GamePlay(user_id=mock_user.id, game_type="mystery_box", outcome="win", prize="100 Tokens", points_spent=15, box_id=2),
            models.GamePlay(user_id=mock_user.id, game_type="spin_wheel", outcome="lose", points_spent=10, box_id=3),
            models.GamePlay(user_id=mock_user.id, game_type="nft_crate", outcome="win", prize="Epic NFT Collection", points_spent=25, box_id=4),
        ]
        db.add_all(prizes)
        
        # Create initial prize pools
        prize_pool = models.PrizePool(instant_pool=1000.0, game_pool=500.0, platform_pool=250.0)
        db.add(prize_pool)
        db.commit()

        # ---------------------------------------------
        # Duplicate mock data for demo wallet address
        demo_wallet = "0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY"
        demo_user = models.User(wallet_address=demo_wallet, points=1250)
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)

        # Clone transactions for demo user
        for tx in db.query(models.Transaction).filter(models.Transaction.user_id == mock_user.id).all():
            cloned_tx = models.Transaction(
                user_id=demo_user.id,
                amount=tx.amount,
                from_token=tx.from_token,
                to_token=tx.to_token,
                points_earned=tx.points_earned,
                was_free=tx.was_free,
                fee_paid=tx.fee_paid,
            )
            db.add(cloned_tx)

        # Clone prizes for demo user
        for gp in db.query(models.GamePlay).filter(models.GamePlay.user_id == mock_user.id).all():
            cloned_gp = models.GamePlay(
                user_id=demo_user.id,
                game_type=gp.game_type,
                outcome=gp.outcome,
                prize=gp.prize,
                points_spent=gp.points_spent,
                box_id=gp.box_id,
            )
            db.add(cloned_gp)

        db.commit()
        
        print("✅ Database initialized with fresh mock data for users 'test' and demo wallet")
        return {"status": "success", "message": "Database has been reset with mock data for user 'test'."}
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    """Initialize database with mock data on startup"""
    print("🚀 Starting FlipPay API with fresh mock data...")
    reset_database_with_mock_data()
    print("🎮 FlipPay API ready! Test user 'test' available with 1250 points")

@app.get("/health")
def health_check():
    """Simple liveness probe for **this** service."""
    return JSONResponse(content={"status": "ok"})

# ---------------------------------------------------------------------------
#  HydraDX integration (dynamic wrapper for all endpoints)
# ---------------------------------------------------------------------------
HYDRADX_BASE = "https://hydradx-api-app-2u5klwxkrq-ey.a.run.app"


@app.get("/hydradx/{path:path}")
async def hydradx_proxy(path: str, request: Request):
    """
    Dynamic wrapper for all HydraDX API endpoints.
    Forwards any path under /hydradx/ to the HydraDX API.
    
    Examples:
    - /hydradx/health/app -> https://hydradx-api-app-2u5klwxkrq-ey.a.run.app/health/app
    - /hydradx/coingecko/v1/pairs -> https://hydradx-api-app-2u5klwxkrq-ey.a.run.app/coingecko/v1/pairs
    - /hydradx/hydradx-ui/v1/stats/tvl/1 -> https://hydradx-api-app-2u5klwxkrq-ey.a.run.app/hydradx-ui/v1/stats/tvl/1
    """
    # Build the target URL
    target_url = f"{HYDRADX_BASE}/{path}"
    
    # Forward query parameters
    query_params = dict(request.query_params)
    
    async with httpx.AsyncClient() as client:
        resp = await client.get(target_url, params=query_params, timeout=10)
        resp.raise_for_status()
        return resp.json()

# ---------------------------------------------------------------------------
#  1inch API integration (dynamic wrapper for all endpoints)
# ---------------------------------------------------------------------------
ONEINCH_BASE = "https://api.1inch.dev"


@app.get("/oneinch/{path:path}")
async def oneinch_proxy_get(path: str, request: Request):
    """
    Dynamic wrapper for all 1inch API GET endpoints.
    Forwards any path under /oneinch/ to the 1inch API.
    
    Examples:
    - /oneinch/swap/v5.2/1/quote -> https://api.1inch.dev/swap/v5.2/1/quote
    - /oneinch/balance/v1.2/1/0x... -> https://api.1inch.dev/balance/v1.2/1/0x...
    - /oneinch/token/v1.2/1/search -> https://api.1inch.dev/token/v1.2/1/search
    """
    if not ONEINCH_KEY:
        raise HTTPException(status_code=500, detail="ONEINCH_KEY not set in environment.")
    
    # Build the target URL
    target_url = f"{ONEINCH_BASE}/{path}"
    
    # Forward query parameters
    query_params = dict(request.query_params)
    
    # Set up headers with Bearer authentication
    headers = {
        "Authorization": f"Bearer {ONEINCH_KEY}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(target_url, params=query_params, headers=headers, timeout=10)
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"1inch API error: {str(e)}")


@app.post("/oneinch/{path:path}")
async def oneinch_proxy_post(path: str, request: Request):
    """
    Dynamic wrapper for all 1inch API POST endpoints.
    Forwards any path under /oneinch/ to the 1inch API.
    
    Examples:
    - /oneinch/swap/v5.2/1/swap -> https://api.1inch.dev/swap/v5.2/1/swap
    - /oneinch/orderbook/v4.0/1/order -> https://api.1inch.dev/orderbook/v4.0/1/order
    - /oneinch/fusion/v1.0/1/order -> https://api.1inch.dev/fusion/v1.0/1/order
    """
    if not ONEINCH_KEY:
        raise HTTPException(status_code=500, detail="ONEINCH_KEY not set in environment.")
    
    # Build the target URL
    target_url = f"{ONEINCH_BASE}/{path}"
    
    # Forward query parameters
    query_params = dict(request.query_params)
    
    # Get request body
    body = await request.body()
    
    # Set up headers with Bearer authentication
    headers = {
        "Authorization": f"Bearer {ONEINCH_KEY}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                target_url, 
                params=query_params, 
                headers=headers, 
                content=body, 
                timeout=10
            )
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"1inch API error: {str(e)}")


# ---------------------------------------------------------------------------
#  Polkadot API integration (token listing and pricing)
# ---------------------------------------------------------------------------

@app.get("/polkadot/tokens")
async def get_polkadot_tokens():
    """
    Get list of all available Polkadot ecosystem tokens.
    
    Returns tokens from both on-chain asset registry and known ecosystem tokens.
    """
    try:
        tokens_response = await polkadot_service.get_polkadot_tokens()
        return tokens_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Polkadot tokens error: {str(e)}")


@app.get("/polkadot/tokens/search")
async def search_polkadot_tokens(query: str = Query(..., description="Search query for token symbol or name")):
    """
    Search for Polkadot tokens by symbol or name.
    
    Example: /polkadot/tokens/search?query=DOT
    """
    try:
        search_response = await polkadot_service.search_tokens(query)
        return search_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Polkadot token search error: {str(e)}")


@app.get("/polkadot/tokens/{symbol}")
async def get_polkadot_token_info(symbol: str = Path(..., description="Token symbol (e.g., DOT, KSM)")):
    """
    Get detailed information for a specific Polkadot token including current price.
    
    Example: /polkadot/tokens/DOT
    """
    try:
        token_info = await polkadot_service.get_token_info(symbol)
        if token_info is None:
            raise HTTPException(status_code=404, detail=f"Token {symbol} not found")
        return token_info
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Polkadot token info error: {str(e)}")


@app.get("/polkadot/prices")
async def get_polkadot_prices(tokens: str = Query(None, description="Comma-separated list of token symbols (optional)")):
    """
    Get current prices for Polkadot ecosystem tokens from CoinGecko.
    
    Examples:
    - /polkadot/prices (all known tokens)
    - /polkadot/prices?tokens=DOT,KSM,ACA (specific tokens)
    """
    try:
        if tokens:
            # Convert symbols to CoinGecko IDs
            token_symbols = [t.strip().upper() for t in tokens.split(",")]
            token_ids = []
            for symbol in token_symbols:
                if symbol in polkadot_service.polkadot_tokens:
                    token_ids.append(polkadot_service.polkadot_tokens[symbol])
            
            if not token_ids:
                raise HTTPException(status_code=400, detail="No valid tokens found in query")
                
            prices_response = await polkadot_service.get_token_prices_coingecko(token_ids)
        else:
            prices_response = await polkadot_service.get_token_prices_coingecko()
            
        return prices_response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Polkadot prices error: {str(e)}")


@app.get("/polkadot/prices/{symbol}")
async def get_polkadot_token_price(symbol: str = Path(..., description="Token symbol (e.g., DOT, KSM)")):
    """
    Get current price for a specific Polkadot token.
    
    Example: /polkadot/prices/DOT
    """
    try:
        price_info = await polkadot_service.get_token_price(symbol)
        if price_info is None:
            raise HTTPException(status_code=404, detail=f"Price for {symbol} not found")
        return price_info
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Polkadot price error: {str(e)}")


# ---------------------------------------------------------------------------
#  FlipPay Endpoints
# ---------------------------------------------------------------------------

@app.get("/tokens")
def get_available_tokens():
    """Get list of available tokens for swaps"""
    return {
        "tokens": AVAILABLE_TOKENS,
        "default_from": "ETH",
        "default_to": "USDC"
    }

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate = schemas.UserCreate(), db: Session = Depends(get_db)):
    """Create a user (defaults to test user if no wallet provided)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == user.wallet_address).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Wallet address already registered")
    db_user = models.User(wallet_address=user.wallet_address)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=schemas.User)
def read_user(wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')"), db: Session = Depends(get_db)):
    """Get user info (defaults to test user)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/balance", response_model=schemas.UserBalance)
def get_user_balance(wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')"), db: Session = Depends(get_db)):
    """Get user balance (defaults to test user)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"points": db_user.points}

@app.get("/users/transactions", response_model=list[schemas.Transaction])
def get_user_transactions(
    wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')"),
    db: Session = Depends(get_db),
):
    """Get user transactions (defaults to test user)"""
    return get_transactions_for_wallet(db, wallet_address)

@app.get("/users/prizes", response_model=list[schemas.GamePlay])
def get_user_prizes(wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')"), db: Session = Depends(get_db)):
    """Get user prizes (defaults to test user)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return all game plays that awarded a prize (prize not null).
    # This includes spin-wheel wins as well as loot-box outcomes like "common" or "rare".
    prizes = [gp for gp in db_user.game_plays if gp.prize is not None]
    return prizes

@app.post("/swaps/", response_model=schemas.SwapResponse)
def create_swap(
    swap_data: schemas.TransactionCreate = schemas.TransactionCreate(), 
    wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')"), 
    db: Session = Depends(get_db)
):
    """
    Enhanced swap endpoint with proper fee splitting, RNG for free swaps, and points calculation
    Defaults to test user with ETH->USDC $100 swap
    """
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        # Auto-create test user if not found
        db_user = get_or_create_test_user(db)

    # Validate tokens
    if swap_data.from_token not in AVAILABLE_TOKENS:
        raise HTTPException(status_code=400, detail=f"Invalid from_token. Available: {AVAILABLE_TOKENS}")
    if swap_data.to_token not in AVAILABLE_TOKENS:
        raise HTTPException(status_code=400, detail=f"Invalid to_token. Available: {AVAILABLE_TOKENS}")

    # Calculate fee breakdown
    fee_breakdown = split_fees(swap_data.amount)
    
    # Run free swap lottery (0.1-1% chance)
    was_free = run_free_swap_lottery()
    
    # Calculate points earned ($10 = 1 point)
    points_earned = calculate_points(swap_data.amount)
    
    # Always add points for swap value
    db_user.points += points_earned

    # Update prize pools
    prize_pool = get_or_create_prize_pool(db)
    if was_free:
        # If free, deduct from instant prize pool
        prize_pool.instant_pool -= swap_data.amount
        fee_paid = 0.0
        # Add a special reward for lottery win
        bonus_points = 10
        db_user.points += bonus_points
        # Record a special prize for the user
        game_play = models.GamePlay(
            user_id=db_user.id,
            game_type="free_swap_lottery",
            outcome="win",
            prize="Free Swap Winner (+10 points)",
            points_spent=0,
            box_id=0  # Special box_id for lottery wins
        )
        db.add(game_play)
    else:
        # If not free, add to prize pools
        prize_pool.instant_pool += fee_breakdown["instant_pool"]
        prize_pool.game_pool += fee_breakdown["game_pool"]
        prize_pool.platform_pool += fee_breakdown["platform"]
        fee_paid = fee_breakdown["total_fee"]

    # Create transaction record
    transaction = models.Transaction(
        user_id=db_user.id,
        amount=swap_data.amount,
        from_token=swap_data.from_token,
        to_token=swap_data.to_token,
        points_earned=points_earned,
        was_free=was_free,
        fee_paid=fee_paid
    )
    
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    
    return schemas.SwapResponse(
        transaction=transaction,
        points_earned=points_earned,
        was_free=was_free,
        fee_breakdown=fee_breakdown
    )

@app.get("/leaderboard/")
def get_leaderboard(db: Session = Depends(get_db)):
    leaderboard = db.query(models.User).order_by(models.User.points.desc()).limit(10).all()
    return [{"wallet_address": user.wallet_address, "points": user.points} for user in leaderboard]

@app.get("/games/config")
def get_game_configs():
    """Get available game configurations"""
    return GAME_CONFIGS

@app.post("/games/play/", response_model=schemas.GamePlay)
def play_game(
    wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')"), 
    game_type: str = Query(default="loot_box", description="Game type (defaults to 'loot_box')"), 
    box_id: int = Query(default=1, description="Box/Reward ID to open (defaults to 1)"), 
    db: Session = Depends(get_db)
):
    """
    Enhanced game playing with proper game configurations and prize pool integration
    Defaults to test user playing loot_box with box_id 1
    """
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        # Auto-create test user if not found
        db_user = get_or_create_test_user(db)

    if game_type not in GAME_CONFIGS:
        raise HTTPException(status_code=400, detail=f"Unknown game type. Available: {list(GAME_CONFIGS.keys())}")

    game_config = GAME_CONFIGS[game_type]
    cost_to_play = game_config["cost_points"]
    
    if db_user.points < cost_to_play:
        raise HTTPException(status_code=400, detail=f"Not enough points. Need {cost_to_play}, have {db_user.points}")

    db_user.points -= cost_to_play

    # -------------------------------------------------------------
    #  Special handling for the new loot_box game type
    # -------------------------------------------------------------
    if game_type == "loot_box":
        # Roll rarity based on configured probabilities
        roll = random.random()
        cumulative = 0.0
        rarity_selected = None
        for rarity, prob in game_config["rarity_probabilities"].items():
            cumulative += prob
            if roll <= cumulative:
                rarity_selected = rarity
                break
        # Fallback (shouldn't happen if probs sum to 1)
        if rarity_selected is None:
            rarity_selected = "Common"

        prize_won = random.choice(game_config["prizes_by_rarity"][rarity_selected])
        outcome = rarity_selected.lower()  # e.g. "legendary"
    else:
        # ---------------------------------------------------------
        #  Existing game logic (spin_wheel, mystery_box, nft_crate)
        # ---------------------------------------------------------
        win = random.random() < game_config.get("win_probability", 1.0)
        outcome = "win" if win else "lose"
        prize_won = None
        if win:
            prize_won = random.choice(game_config["available_prizes"])

    # -------------------------------------------------------------
    #  Apply prize effects (token / point rewards)
    # -------------------------------------------------------------
    if prize_won:
        if "Token" in prize_won or "Tokens" in prize_won:
            import re
            match = re.search(r"(\d+)", prize_won)
            if match:
                tokens = int(match.group(1))
                db_user.points += tokens
        elif "point" in prize_won.lower() or "points" in prize_won.lower():
            import re
            match = re.search(r"(\d+)", prize_won)
            if match:
                pts = int(match.group(1))
                db_user.points += pts

    game_play = models.GamePlay(
        user_id=db_user.id, 
        game_type=game_type, 
        outcome=outcome,
        prize=prize_won,
        points_spent=cost_to_play,
        box_id=box_id
    )
    db.add(game_play)
    db.commit()
    db.refresh(game_play)
    
    return game_play

@app.get("/admin/prize-pools", response_model=schemas.PrizePool)
def get_prize_pools(db: Session = Depends(get_db)):
    """Get current prize pool balances"""
    return get_or_create_prize_pool(db)

@app.post("/admin/prize-pools/fund")
def fund_prize_pools(instant_amount: float = 0, game_amount: float = 0, platform_amount: float = 0, db: Session = Depends(get_db)):
    """Admin endpoint to fund prize pools"""
    pool = get_or_create_prize_pool(db)
    pool.instant_pool += instant_amount
    pool.game_pool += game_amount
    pool.platform_pool += platform_amount
    db.commit()
    return {"status": "success", "message": "Prize pools funded"}

@app.post("/rewards/claim", response_model=schemas.RewardClaim)
def claim_reward(
    wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')"), 
    prize_id: int = Query(default=1, description="Prize ID (defaults to 1)"), 
    db: Session = Depends(get_db)
):
    """
    Mock endpoint to claim a reward.
    In a real scenario, this would trigger a process to transfer the prize (e.g., NFT, tokens).
    """
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # In a real app, you'd verify the prize belongs to the user and hasn't been claimed
    # For this mock, we'll just return a success message.
    return {"status": "success", "message": f"Prize {prize_id} claimed by {wallet_address}"}

@app.get("/admin/reset-db")
def reset_database(db: Session = Depends(get_db)):
    """Manual reset endpoint - now just calls the startup function"""
    return reset_database_with_mock_data()

@app.get("/admin/users/")
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.delete("/admin/users/")
def delete_users(db: Session = Depends(get_db)):
    db.query(models.User).delete()
    db.commit()
    return {"status": "all users deleted"}

@app.post("/ai_agent")
async def ai_agent(
    lottery_result: str = Query(default="lost", description="Result of the lottery ('win' or 'lost')"),
    wallet_address: str = Query(default="0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY", description="Wallet address (defaults to 'test')")
):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API_KEY not set in environment.")

    # ------------------------------------------------------------------
    # Step 1: Retrieve transaction history directly from the database
    # ------------------------------------------------------------------
    db = SessionLocal()
    try:
        transactions = get_transactions_for_wallet(db, wallet_address)
        # Convert ORM objects to plain dicts via the schema for cleanliness
        transaction_history = [schemas.Transaction.from_orm(tx).dict() for tx in transactions]
    finally:
        db.close()

    # Dify expects the transaction history as a **string**, not an array/object.
    import json
    transaction_history_str = json.dumps(transaction_history)

    # ------------------------------------------------------------------
    # Step 2: Call Dify AI with the assembled payload
    # ------------------------------------------------------------------
    url = "https://api.dify.ai/v1/chat-messages"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "inputs": {
            "transaction_history": transaction_history_str,
            "lottery_result": lottery_result,
        },
        "query": "answer",  # Hard-coded prompt as requested
        "response_mode": "blocking",
        "conversation_id": "",
        "user": "api-user",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        data = response.json()
        return {"answer": data.get("answer")}

# ---------------------------------------------------------------------------
#  Snowbridge Bridge Endpoint
# ---------------------------------------------------------------------------

class BridgeRequest(BaseModel):
    environment: str = "westend_sepolia"
    token_contract: str = "0x0000000000000000000000000000000000000000"  # Zero address → ETH
    destination_parachain: int = 1000  # Asset Hub Westend
    amount: int = 100000  # in token smallest unit (wei-like)
    dry_run: bool = True  # If true, sets SMOKE_TEST=1 so no funds move

class BridgeResponse(BaseModel):
    stdout: str
    stderr: str
    returncode: int

@app.post("/bridge", response_model=BridgeResponse)
async def execute_bridge(req: BridgeRequest):
    """Trigger the Snowbridge transfer script.
    If dry_run is true (default) it only validates; nothing is broadcast.
    """
    # Build command
    script_path = "bridges/scripts/bridgeEthToPolkadot.ts"
    cmd = [
        "npx",
        "ts-node",
        script_path,
        req.environment,
        req.token_contract,
        str(req.destination_parachain),
        str(req.amount),
    ]

    # Prepare env vars
    env = os.environ.copy()
    if req.dry_run:
        env["SMOKE_TEST"] = "1"

    # Execute asynchronously to avoid blocking the event loop too long
    process = await asyncio.create_subprocess_exec(
        *cmd,
        cwd="/app",  # inside container root
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        env=env,
    )
    stdout_bytes, stderr_bytes = await process.communicate()

    return BridgeResponse(
        stdout=stdout_bytes.decode(),
        stderr=stderr_bytes.decode(),
        returncode=process.returncode,
    )

# StarkGate supported tokens and bridges
STARKGATE_TOKENS = {
    "mainnet": {
        "ETH": {
            "address": "0x0000000000000000000000000000000000000000",
            "bridge": "0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419",
            "decimals": 18,
            "symbol": "ETH"
        },
        "USDC": {
            "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "bridge": "0xf6080d9fbeebcd44d89affbfd42f098cbff92816",
            "decimals": 6,
            "symbol": "USDC"
        },
        "USDT": {
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "bridge": "0xbb3400f107804dfb482565ff1ec8d8ae66747605",
            "decimals": 6,
            "symbol": "USDT"
        },
        "STRK": {
            "address": "0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766",
            "bridge": "0xce5485cfb26914c5dce00b9baf0580364dafc7a4",
            "decimals": 18,
            "symbol": "STRK"
        }
    },
    "sepolia": {
        "ETH": {
            "address": "0x0000000000000000000000000000000000000000",
            "bridge": "0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419",
            "decimals": 18,
            "symbol": "ETH"
        },
        "USDC": {
            "address": "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
            "bridge": "0xf6080d9fbeebcd44d89affbfd42f098cbff92816",
            "decimals": 6,
            "symbol": "USDC"
        }
    }
}

class StarkGateBridgeRequest(BaseModel):
    network: str = "sepolia"  # "sepolia" or "mainnet"
    token_symbol: str = "USDC"  # "ETH", "USDC", "USDT", "STRK"
    amount: float = 1.0  # Amount in human-readable format (e.g., 1.5 USDC)
    starknet_recipient: str = "0x1234567890123456789012345678901234567890123456789012345678901234"
    dry_run: bool = True  # Set to False for real transactions

class StarkGateBridgeResponse(BaseModel):
    success: bool
    transaction_hash: Optional[str] = None
    error: Optional[str] = None
    amount_bridged: Optional[str] = None
    token_info: Optional[dict] = None
    network_info: Optional[dict] = None
    gas_used: Optional[str] = None

@app.get("/bridge/starkgate/tokens")
def get_starkgate_supported_tokens():
    """Get list of tokens supported by StarkGate bridge"""
    return {
        "supported_tokens": STARKGATE_TOKENS,
        "networks": ["sepolia", "mainnet"],
        "note": "Use token symbols (ETH, USDC, etc.) in bridge requests"
    }

@app.post("/bridge/starkgate", response_model=StarkGateBridgeResponse)
async def execute_starkgate_bridge(req: StarkGateBridgeRequest):
    """
    Bridge tokens from Ethereum to Starknet using StarkGate.
    
    Frontend-friendly endpoint that:
    - Accepts human-readable amounts (e.g., 1.5 USDC)
    - Uses token symbols instead of addresses
    - Provides clear success/error responses
    - Supports both testnet and mainnet
    """
    try:
        # Validate network
        if req.network not in STARKGATE_TOKENS:
            return StarkGateBridgeResponse(
                success=False,
                error=f"Unsupported network: {req.network}. Supported: {list(STARKGATE_TOKENS.keys())}"
            )
        
        # Validate token
        if req.token_symbol not in STARKGATE_TOKENS[req.network]:
            supported = list(STARKGATE_TOKENS[req.network].keys())
            return StarkGateBridgeResponse(
                success=False,
                error=f"Token {req.token_symbol} not supported on {req.network}. Supported: {supported}"
            )
        
        token_info = STARKGATE_TOKENS[req.network][req.token_symbol]
        
        # Convert human-readable amount to smallest units
        decimals = token_info["decimals"]
        amount_wei = int(req.amount * (10 ** decimals))
        
        # Validate minimum amount (prevent dust transactions)
        min_amount = 10 ** (decimals - 3)  # 0.001 for most tokens
        if amount_wei < min_amount:
            return StarkGateBridgeResponse(
                success=False,
                error=f"Amount too small. Minimum: {min_amount / (10 ** decimals)} {req.token_symbol}"
            )
        
        # Prepare environment variables
        env = os.environ.copy()
        if req.dry_run:
            env["SMOKE_TEST"] = "1"
        
        # Ensure required keys are set
        if not env.get("ETHEREUM_KEY"):
            return StarkGateBridgeResponse(
                success=False,
                error="ETHEREUM_KEY environment variable not set"
            )
        
        if not env.get("INFURA_KEY"):
            return StarkGateBridgeResponse(
                success=False,
                error="INFURA_KEY environment variable not set"
            )
        
        # Execute bridge script
        script_path = "bridges/scripts/bridgeEthToStarknet.ts"
        cmd = [
            "npx", "ts-node", script_path,
            req.network,
            token_info["address"],
            req.starknet_recipient,
            str(amount_wei),
        ]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            cwd="/app",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            env=env,
        )
        
        stdout_bytes, stderr_bytes = await process.communicate()
        stdout = stdout_bytes.decode()
        stderr = stderr_bytes.decode()
        
        # Parse results
        if process.returncode == 0:
            # Extract transaction hash from output
            tx_hash = None
            gas_used = None
            
            for line in stdout.split('\n'):
                if 'Transaction hash:' in line:
                    tx_hash = line.split('Transaction hash:')[1].strip()
                elif 'Gas used:' in line:
                    gas_used = line.split('Gas used:')[1].strip()
            
            return StarkGateBridgeResponse(
                success=True,
                transaction_hash=tx_hash,
                amount_bridged=f"{req.amount} {req.token_symbol}",
                token_info=token_info,
                network_info={
                    "network": req.network,
                    "bridge_contract": token_info["bridge"],
                    "token_contract": token_info["address"]
                },
                gas_used=gas_used
            )
        else:
            # Parse error from stderr or stdout
            error_msg = stderr.strip() if stderr.strip() else stdout.strip()
            if "TOKEN_NOT_SERVICED" in error_msg:
                error_msg = f"Token {req.token_symbol} not supported by StarkGate bridge"
            elif "insufficient funds" in error_msg.lower():
                error_msg = "Insufficient ETH balance for gas fees"
            elif "invalid private key" in error_msg.lower():
                error_msg = "Invalid ETHEREUM_KEY configuration"
            
            return StarkGateBridgeResponse(
                success=False,
                error=error_msg,
                token_info=token_info,
                network_info={
                    "network": req.network,
                    "bridge_contract": token_info["bridge"],
                    "token_contract": token_info["address"]
                }
            )
            
    except Exception as e:
        return StarkGateBridgeResponse(
            success=False,
            error=f"Internal error: {str(e)}"
        )

# Legacy endpoint (kept for backward compatibility)
class StarknetBridgeRequest(BaseModel):
    environment: str = "sepolia"
    token_contract: str
    starknet_recipient: str
    amount: int
    dry_run: bool = True

class StarknetBridgeResponse(BaseModel):
    stdout: str
    stderr: str
    returncode: int

@app.post("/bridge/starknet", response_model=StarknetBridgeResponse)
async def execute_starknet_bridge(req: StarknetBridgeRequest):
    """Legacy StarkGate bridge endpoint - use /bridge/starkgate instead"""
    script_path = "bridges/scripts/bridgeEthToStarknet.ts"
    cmd = [
        "npx", "ts-node", script_path,
        req.environment,
        req.token_contract,
        req.starknet_recipient,
        str(req.amount),
    ]
    env = os.environ.copy()
    if req.dry_run:
        env["SMOKE_TEST"] = "1"
    process = await asyncio.create_subprocess_exec(
        *cmd,
        cwd="/app",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        env=env,
    )
    stdout_bytes, stderr_bytes = await process.communicate()
    return StarknetBridgeResponse(
        stdout=stdout_bytes.decode(),
        stderr=stderr_bytes.decode(),
        returncode=process.returncode,
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 