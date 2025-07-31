import { SWAP_API_URL, FAKE } from "./API";

// Types pour les requêtes et réponses de swap
export interface SwapRequest {
    fromEthToDot: boolean;
    payAmount: string;
    ethAddress: string;
    dotAddress: string;
}

export interface SwapResponse {
    success: boolean;
    swapId: string;
    message: string;
    estimatedTime: string;
}

export interface SwapStatusResponse {
    swapId: string;
    status: 'pending' | 'fusion_swap' | 'bridging' | 'completed' | 'failed';
    currentStep: string;
    progress: number;
    txHashes: {
        fusionTx?: string;
        bridgeTx?: string;
    };
    createdAt: string;
    updatedAt: string;
}

// Fonction pour initier un swap
export async function initiateSwap(swapData: SwapRequest): Promise<SwapResponse> {
    // ----------------------------------- FAKE DATA -----------------------------------
    if (FAKE) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            success: true,
            swapId: `fake-swap-${Date.now()}`,
            message: "Swap initiated successfully (fake mode)",
            estimatedTime: "5-10 minutes"
        };
    }
    // ----------------------------------- REAL API -----------------------------------

    try {
        const response = await fetch(`${SWAP_API_URL}/api/swap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(swapData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({})) as { message?: string };
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data: SwapResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error initiating swap:', error);
        throw error;
    }
}

// Fonction pour obtenir le statut d'un swap
export async function getSwapStatus(swapId: string): Promise<SwapStatusResponse> {
    // ----------------------------------- FAKE DATA -----------------------------------
    if (FAKE) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const statuses = ['pending', 'fusion_swap', 'bridging', 'completed'] as const;
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const progress = randomStatus === 'pending' ? 0 : 
                        randomStatus === 'fusion_swap' ? 25 : 
                        randomStatus === 'bridging' ? 75 : 100;
        
        return {
            swapId,
            status: randomStatus,
            currentStep: `Step: ${randomStatus}`,
            progress,
            txHashes: {
                fusionTx: randomStatus !== 'pending' ? '0x' + Math.random().toString(16).substr(2, 64) : undefined,
                bridgeTx: randomStatus === 'completed' ? '0x' + Math.random().toString(16).substr(2, 64) : undefined,
            },
            createdAt: new Date(Date.now() - 300000).toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
    // ----------------------------------- REAL API -----------------------------------

    try {
        const response = await fetch(`${SWAP_API_URL}/api/swap/${swapId}/status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({})) as { message?: string };
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data: SwapStatusResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting swap status:', error);
        throw error;
    }
}

// Fonction pour créer une connexion WebSocket pour les mises à jour en temps réel
export function createSwapWebSocket(swapId: string, onUpdate: (update: SwapStatusResponse) => void): WebSocket | null {
    if (FAKE) {
        // Simulation WebSocket en mode fake
        const interval = setInterval(() => {
            getSwapStatus(swapId).then(onUpdate);
        }, 2000);
        
        return {
            close: () => clearInterval(interval)
        } as any;
    }

    try {
        const wsUrl = SWAP_API_URL.replace('http', 'ws');
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            // S'abonner aux mises à jour du swap
            ws.send(JSON.stringify({
                type: 'subscribe',
                swapId: swapId
            }));
        };

        ws.onmessage = (event) => {
            try {
                const update = JSON.parse(event.data);
                onUpdate(update);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return ws;
    } catch (error) {
        console.error('Error creating WebSocket:', error);
        return null;
    }
} 