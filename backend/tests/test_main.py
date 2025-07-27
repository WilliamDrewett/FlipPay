"""Simple tests for backend endpoints."""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.main import app, get_db
from backend.database import Base
import os
from unittest.mock import patch


SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function")
def db_session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture(scope="function")
def test_client(db_session):
    def override_get_db_for_test():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db_for_test
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


def test_create_user(test_client):
    response = test_client.post("/users/", json={"wallet_address": "test_wallet_1"})
    assert response.status_code == 200
    data = response.json()
    assert data["wallet_address"] == "test_wallet_1"
    assert "id" in data

def test_read_user(test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_2"})
    response = test_client.get("/users/test_wallet_2")
    assert response.status_code == 200
    data = response.json()
    assert data["wallet_address"] == "test_wallet_2"

@patch('backend.main.random.random', return_value=0.5)
def test_create_swap(mock_random, test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_3"})
    response = test_client.post("/swaps/?wallet_address=test_wallet_3&amount=100")
    assert response.status_code == 200
    data = response.json()
    assert data["amount"] == 100

def test_leaderboard(test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_4"})
    test_client.post("/swaps/?wallet_address=test_wallet_4&amount=100")
    response = test_client.get("/leaderboard/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["wallet_address"] == "test_wallet_4"

@patch('backend.main.random.random', return_value=0.5)
def test_play_game(mock_random, test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_5"})
    test_client.post("/swaps/?wallet_address=test_wallet_5&amount=100")
    response = test_client.post("/games/play/?wallet_address=test_wallet_5&game_type=spin_wheel")
    assert response.status_code == 200
    data = response.json()
    assert data["game_type"] == "spin_wheel"

def test_get_user_balance(test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_balance"})
    test_client.post("/swaps/?wallet_address=test_wallet_balance&amount=150")
    response = test_client.get("/users/test_wallet_balance/balance")
    assert response.status_code == 200
    data = response.json()
    assert data["points"] == 150

def test_get_user_transactions(test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_trans"})
    test_client.post("/swaps/?wallet_address=test_wallet_trans&amount=50")
    test_client.post("/swaps/?wallet_address=test_wallet_trans&amount=75")
    response = test_client.get("/users/test_wallet_trans/transactions")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["amount"] == 50
    assert data[1]["amount"] == 75

@patch('backend.main.random.random')
def test_get_user_prizes(mock_random, test_client):
    # Ensure the swap isn't free and the first game is a win.
    mock_random.side_effect = [0.5, 0.1]
    
    test_client.post("/users/", json={"wallet_address": "test_wallet_prizes"})
    test_client.post("/swaps/?wallet_address=test_wallet_prizes&amount=1000") # Give enough points
    
    play_response = test_client.post("/games/play/?wallet_address=test_wallet_prizes&game_type=spin_wheel")
    assert play_response.status_code == 200
    assert play_response.json()["outcome"] == "win"

    response = test_client.get("/users/test_wallet_prizes/prizes")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["outcome"] == "win"

def test_claim_reward(test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_claim"})
    # In a real app, you'd need to win a prize first and get a real prize_id.
    # For this mock, we just test the endpoint directly.
    response = test_client.post("/rewards/claim?wallet_address=test_wallet_claim&prize_id=1")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "claimed by test_wallet_claim" in data["message"]

def test_admin_routes(test_client):
    test_client.post("/users/", json={"wallet_address": "test_wallet_6"})
    response = test_client.get("/admin/users/")
    assert response.status_code == 200
    assert len(response.json()) > 0
    
    response = test_client.delete("/admin/users/")
    assert response.status_code == 200
    
    response = test_client.get("/admin/users/")
    assert response.status_code == 200
    assert len(response.json()) == 0 