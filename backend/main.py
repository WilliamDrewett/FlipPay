from fastapi import FastAPI, Query, Path
from fastapi.responses import JSONResponse
import httpx

app = FastAPI()

@app.get("/health")
def health_check():
    """Simple liveness probe for **this** service."""
    return JSONResponse(content={"status": "ok"})

# ---------------------------------------------------------------------------
#  HydraDX integration (working public endpoints)
# ---------------------------------------------------------------------------
HYDRADX_BASE = "https://hydradx-api-app-2u5klwxkrq-ey.a.run.app"


@app.get("/hydradx/health/app")
async def hydradx_health_app():
    """Relay the HydraDX API `/health/app` endpoint (basic readiness)."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{HYDRADX_BASE}/health/app", timeout=10)
        resp.raise_for_status()
        return resp.json()


@app.get("/hydradx/health/sql")
async def hydradx_health_sql():
    """Relay the HydraDX API `/health/sql` endpoint (database height)."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{HYDRADX_BASE}/health/sql", timeout=10)
        resp.raise_for_status()
        return resp.json() 