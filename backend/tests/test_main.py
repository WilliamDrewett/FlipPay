"""Simple tests for backend endpoints."""

import pytest
from fastapi.testclient import TestClient
import main

client = TestClient(main.app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_hydradx_health_app():
    response = client.get("/hydradx/health/app")
    assert response.status_code == 200
    assert "alive" in response.json()


def test_hydradx_health_sql():
    response = client.get("/hydradx/health/sql")
    assert response.status_code == 200
    assert "block_height" in response.json()


def test_hydradx_ui_v1_stats_price():
    """Test the hydradx-ui/v1/stats/price/2 endpoint."""
    response = client.get("/hydradx/hydradx-ui/v1/stats/price/2")
    assert response.status_code == 200
    
    # Check response structure based on the schema
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1
    
    price_data = data[0]
    assert "price_usd" in price_data
    assert isinstance(price_data["price_usd"], (int, float))
    assert price_data["price_usd"] > 0  # Price should be positive


def test_hydradx_proxy_general():
    """Test that the dynamic proxy works for various endpoints."""
    # Test a different endpoint to ensure the proxy works generally
    response = client.get("/hydradx/hydradx-ui/v1/stats/tvl/1")
    assert response.status_code == 200
    # The response should be valid JSON
    data = response.json()
    assert isinstance(data, (dict, list)) 