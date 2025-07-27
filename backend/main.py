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

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.wallet_address == user.wallet_address).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Wallet address already registered")
    db_user = models.User(wallet_address=user.wallet_address)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{wallet_address}", response_model=schemas.User)
def read_user(wallet_address: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/{wallet_address}/balance", response_model=schemas.UserBalance)
def get_user_balance(wallet_address: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"points": db_user.points}

@app.get("/users/{wallet_address}/transactions", response_model=list[schemas.Transaction])
def get_user_transactions(wallet_address: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.transactions

@app.get("/users/{wallet_address}/prizes", response_model=list[schemas.GamePlay])
def get_user_prizes(wallet_address: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Filter for only winning game plays
    prizes = [gp for gp in db_user.game_plays if gp.outcome == "win"]
    return prizes
    

@app.post("/swaps/", response_model=schemas.Transaction)
def create_swap(swap_data: schemas.TransactionCreate, wallet_address: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        # For the hackathon, we can auto-create the user
        db_user = models.User(wallet_address=wallet_address)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    # Mock lottery: 10% chance to get the swap for free
    is_free = random.random() < 0.1
    if not is_free:
        # Earn points based on trade volume (e.g., 1 point per dollar)
        db_user.points += int(swap_data.amount)

    transaction = models.Transaction(
        user_id=db_user.id,
        amount=swap_data.amount,
        from_token=swap_data.from_token,
        to_token=swap_data.to_token
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction

@app.get("/leaderboard/")
def get_leaderboard(db: Session = Depends(get_db)):
    leaderboard = db.query(models.User).order_by(models.User.points.desc()).limit(10).all()
    return [{"wallet_address": user.wallet_address, "points": user.points} for user in leaderboard]

@app.post("/games/play/", response_model=schemas.GamePlay)
def play_game(wallet_address: str, game_type: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Mock game logic (e.g., spin wheel)
    cost_to_play = 10
    if db_user.points < cost_to_play:
        raise HTTPException(status_code=400, detail="Not enough points")

    db_user.points -= cost_to_play
    
    # Mock prize
    win = random.random() < 0.2  # 20% chance to win
    outcome = "win" if win else "lose"
    prize_won = "NFT" if win else None # or tokens, etc.

    game_play = models.GamePlay(
        user_id=db_user.id, 
        game_type=game_type, 
        outcome=outcome,
        prize=prize_won
    )
    db.add(game_play)
    db.commit()
    db.refresh(game_play)
    
    return game_play

@app.post("/rewards/claim", response_model=schemas.RewardClaim)
def claim_reward(wallet_address: str, prize_id: int, db: Session = Depends(get_db)):
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
    # Clear existing data
    db.query(models.GamePlay).delete()
    db.query(models.Transaction).delete()
    db.query(models.User).delete()
    db.commit()

    # Create mock user
    mock_user = models.User(wallet_address="test", points=1250)
    db.add(mock_user)
    db.commit()
    db.refresh(mock_user)

    # Add mock transactions
    transactions = [
        models.Transaction(user_id=mock_user.id, amount=500, from_token="ETH", to_token="DOT"),
        models.Transaction(user_id=mock_user.id, amount=750, from_token="BTC", to_token="USDT"),
    ]
    db.add_all(transactions)

    # Add mock prizes
    prizes = [
        models.GamePlay(user_id=mock_user.id, game_type="spin_wheel", outcome="win", prize="Rare NFT"),
        models.GamePlay(user_id=mock_user.id, game_type="mystery_box", outcome="win", prize="100 Tokens"),
        models.GamePlay(user_id=mock_user.id, game_type="spin_wheel", outcome="lose"),
    ]
    db.add_all(prizes)
    db.commit()
    
    return {"status": "success", "message": "Database has been reset with mock data for user 'test'."}


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