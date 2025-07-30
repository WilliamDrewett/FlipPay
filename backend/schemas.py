from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class UserBalance(BaseModel):
    points: int

class RewardClaim(BaseModel):
    status: str
    message: str

class TransactionBase(BaseModel):
    amount: float = 100.0  # Default $100 swap
    from_token: str = "ETH"  # Default origin token
    to_token: str = "USDC"   # Default destination token (valid from list)

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    user_id: int
    points_earned: int
    was_free: bool
    fee_paid: float

    model_config = ConfigDict(from_attributes=True)

class SwapResponse(BaseModel):
    transaction: Transaction
    points_earned: int
    was_free: bool
    fee_breakdown: dict

class GamePlayBase(BaseModel):
    game_type: str = "loot_box"  # Default game
    outcome: str
    prize: Optional[str] = None
    points_spent: int

class GamePlayCreate(GamePlayBase):
    pass

class GamePlay(GamePlayBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

class UserBase(BaseModel):
    wallet_address: str = "0x0000000000000000000000000000000000000000.5DAAnrj7VHTz5AnBZdMjxqJ1ojTHev3VbyT9RCPVvfy5FeaY"  # Default demo wallet

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    points: int
    transactions: List[Transaction] = []
    game_plays: List[GamePlay] = []

    model_config = ConfigDict(from_attributes=True)

class PrizePool(BaseModel):
    instant_pool: float
    game_pool: float
    platform_pool: float

class GameConfig(BaseModel):
    game_type: str
    cost_points: int
    win_probability: float
    available_prizes: List[str]

# Available token symbols for swaps
AVAILABLE_TOKENS = [
    "ETH", "AAVE", "sUSDe", "tBTC", "TRAC", "LBTC", 
    "LDO", "LINK", "SKY", "wstETH", "USDC", "USDT"
] 