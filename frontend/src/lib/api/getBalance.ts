import { API_URL, FAKE } from "./API";

// Types pour la réponse de l'API
export interface BalanceResponse {
    points: number;
}

// Fonction pour récupérer le solde d'un utilisateur
export async function getBalance(walletAddress: string): Promise<BalanceResponse> {
    // ----------------------------------- FAKE DATA -----------------------------------
    if (FAKE) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            points: 123
        };
    }
    // ----------------------------------- FAKE DATA -----------------------------------

    const url = `${API_URL}/users/balance?wallet_address=${encodeURIComponent(walletAddress)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const balanceData: BalanceResponse = await response.json();
        return balanceData;
    } catch (error) {
        console.error('Erreur lors de la récupération du solde:', error);
        throw error;
    }
}
