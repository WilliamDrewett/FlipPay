from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, unique=True, index=True)
    points = Column(Integer, default=0)

    transactions = relationship("Transaction", back_populates="user")
    game_plays = relationship("GamePlay", back_populates="user")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    from_token = Column(String, nullable=False)  # Made required
    to_token = Column(String, nullable=False)    # Made required
    points_earned = Column(Integer, default=0)
    was_free = Column(Boolean, default=False)
    fee_paid = Column(Float, default=0.0)
    
    user = relationship("User", back_populates="transactions")

class GamePlay(Base):
    __tablename__ = "game_plays"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    game_type = Column(String)
    outcome = Column(String)
    prize = Column(String, nullable=True)
    points_spent = Column(Integer, default=0)

    user = relationship("User", back_populates="game_plays")

class PrizePool(Base):
    __tablename__ = "prize_pools"

    id = Column(Integer, primary_key=True, index=True)
    instant_pool = Column(Float, default=0.0)
    game_pool = Column(Float, default=0.0)
    platform_pool = Column(Float, default=0.0) 