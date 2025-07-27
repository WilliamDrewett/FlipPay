from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

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
    
    user = relationship("User", back_populates="transactions")

class GamePlay(Base):
    __tablename__ = "game_plays"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    game_type = Column(String)
    outcome = Column(String)

    user = relationship("User", back_populates="game_plays") 