#!/usr/bin/env bash
set -euo pipefail

# Run Snowbridge smoke test (dry-run only)
export SMOKE_TEST=1

if [[ -f /app/bridges/package.json ]]; then
  echo "[smoke] Running Snowbridge validation test …"
  pushd /app/bridges > /dev/null
  # Provide default dummy keys if not supplied at runtime
  export ETHEREUM_KEY=${ETHEREUM_KEY:-0x0000000000000000000000000000000000000000}
  export SUBSTRATE_KEY=${SUBSTRATE_KEY:-//Alice}

  # Environment overrides
  BRIDGE_TOKEN=${BRIDGE_TOKEN:-0x0000000000000000000000000000000000000000}
  BRIDGE_AMOUNT=${BRIDGE_AMOUNT:-100000}

  # Run validation with chosen token + amount (dry run only)
  if npx ts-node scripts/bridgeEthToPolkadot.ts westend_sepolia "$BRIDGE_TOKEN" 1000 "$BRIDGE_AMOUNT"; then
    echo "[smoke] Bridge validation succeeded."
  else
    echo "[smoke] Bridge validation FAILED – continuing startup." >&2
    # Non-fatal: continue starting backend
  fi
  popd > /dev/null
else
  echo "[smoke] Bridges package.json not found – skipping test."
fi

# Launch Python backend
exec pdm run uvicorn main:app --host 0.0.0.0 --port 8000 