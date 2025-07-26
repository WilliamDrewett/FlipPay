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