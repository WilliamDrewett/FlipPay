from fastapi import FastAPI, Depends, HTTPException, Query, Path, Request
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine
import random
from fastapi.responses import JSONResponse
import httpx

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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
POINTS_PER_DOLLAR = 0.1    # $10 = 1 point

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
            models.GamePlay(user_id=mock_user.id, game_type="spin_wheel", outcome="win", prize="Rare NFT", points_spent=10),
            models.GamePlay(user_id=mock_user.id, game_type="mystery_box", outcome="win", prize="100 Tokens", points_spent=15),
            models.GamePlay(user_id=mock_user.id, game_type="spin_wheel", outcome="lose", points_spent=10),
            models.GamePlay(user_id=mock_user.id, game_type="nft_crate", outcome="win", prize="Epic NFT Collection", points_spent=25),
        ]
        db.add_all(prizes)
        
        # Create initial prize pools
        prize_pool = models.PrizePool(instant_pool=1000.0, game_pool=500.0, platform_pool=250.0)
        db.add(prize_pool)
        db.commit()
        
        print("✅ Database initialized with fresh mock data for user 'test'")
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
def read_user(wallet_address: str = Query(default="test", description="Wallet address (defaults to 'test')"), db: Session = Depends(get_db)):
    """Get user info (defaults to test user)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/balance", response_model=schemas.UserBalance)
def get_user_balance(wallet_address: str = Query(default="test", description="Wallet address (defaults to 'test')"), db: Session = Depends(get_db)):
    """Get user balance (defaults to test user)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"points": db_user.points}

@app.get("/users/transactions", response_model=list[schemas.Transaction])
def get_user_transactions(wallet_address: str = Query(default="test", description="Wallet address (defaults to 'test')"), db: Session = Depends(get_db)):
    """Get user transactions (defaults to test user)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.transactions

@app.get("/users/prizes", response_model=list[schemas.GamePlay])
def get_user_prizes(wallet_address: str = Query(default="test", description="Wallet address (defaults to 'test')"), db: Session = Depends(get_db)):
    """Get user prizes (defaults to test user)"""
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Filter for only winning game plays
    prizes = [gp for gp in db_user.game_plays if gp.outcome == "win"]
    return prizes

@app.post("/swaps/", response_model=schemas.SwapResponse)
def create_swap(
    swap_data: schemas.TransactionCreate = schemas.TransactionCreate(), 
    wallet_address: str = Query(default="test", description="Wallet address (defaults to 'test')"), 
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
            points_spent=0
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
    wallet_address: str = Query(default="test", description="Wallet address (defaults to 'test')"), 
    game_type: str = Query(default="spin_wheel", description="Game type (defaults to 'spin_wheel')"), 
    db: Session = Depends(get_db)
):
    """
    Enhanced game playing with proper game configurations and prize pool integration
    Defaults to test user playing spin_wheel
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
    
    # Run game with configured win probability
    win = random.random() < game_config["win_probability"]
    outcome = "win" if win else "lose"
    
    # Select prize if won
    prize_won = None
    if win:
        prize_won = random.choice(game_config["available_prizes"])
        # If the prize is tokens or points, add to user balance
        if "Token" in prize_won:
            # Extract the number of tokens from the prize string
            import re
            match = re.search(r"(\d+)", prize_won)
            if match:
                tokens = int(match.group(1))
                db_user.points += tokens
        elif "point" in prize_won.lower():
            # If prize mentions points, extract and add
            import re
            match = re.search(r"(\d+)", prize_won)
            if match:
                points = int(match.group(1))
                db_user.points += points

    game_play = models.GamePlay(
        user_id=db_user.id, 
        game_type=game_type, 
        outcome=outcome,
        prize=prize_won,
        points_spent=cost_to_play
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
    wallet_address: str = Query(default="test", description="Wallet address (defaults to 'test')"), 
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 