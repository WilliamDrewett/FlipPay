from fastapi import FastAPI, Query, Path, Request
from fastapi.responses import JSONResponse
import httpx

app = FastAPI()

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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 