// place files you want to import through the `$lib` alias in this folder.

// API exports
export { API_URL, SWAP_API_URL, FAKE } from './api/API';
export { createUser } from './api/createUser';
export { getBalance } from './api/getBalance';
export { getLeaderboard } from './api/getLeaderboard';
export { getPrizes } from './api/getPrizes';
export { getTransactions } from './api/getTransactions';

// Swap API exports
export { 
    initiateSwap, 
    getSwapStatus, 
    createSwapWebSocket,
    type SwapRequest,
    type SwapResponse,
    type SwapStatusResponse
} from './api/swap';

// Price API exports
export {
    getEthSpotPrice,
    getPolkadotSpotPrice,
    getMultipleSpotPrices,
    getEthAndDotPrices,
    checkPriceServiceHealth,
    type TokenPriceResponse,
    type ApiResponse,
    type MultiplePricesResponse
} from './api/getSpotPrices';
