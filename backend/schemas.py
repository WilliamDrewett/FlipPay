from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class UserBalance(BaseModel):
    points: int

class RewardClaim(BaseModel):
    status: str
    message: str

class TransactionBase(BaseModel):
    amount: float
    from_token: Optional[str] = None
    to_token: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

class GamePlayBase(BaseModel):
    game_type: str
    outcome: str
    prize: Optional[str] = None

class GamePlayCreate(GamePlayBase):
    pass

class GamePlay(GamePlayBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

class UserBase(BaseModel):
    wallet_address: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    points: int
    transactions: List[Transaction] = []
    game_plays: List[GamePlay] = []

    model_config = ConfigDict(from_attributes=True) 