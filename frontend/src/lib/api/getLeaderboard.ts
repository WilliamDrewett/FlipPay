import { API_URL, FAKE } from "./API";

// Types pour la réponse de l'API
export interface LeaderboardEntry {
    wallet_address: string;
    points: number;
}

// Fonction pour récupérer le leaderboard
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    // ----------------------------------- FAKE DATA -----------------------------------
    if (FAKE) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return [
            {
                "wallet_address": "test",
                "points": 1000
            },
            {
                "wallet_address": "tedddddst", 
                "points": 0
            },
            {
                "wallet_address": "eth.dodt",
                "points": 0
            }
        ];
    }
    // ----------------------------------- FAKE DATA -----------------------------------

    const url = `${API_URL}/leaderboard/`;

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

        const leaderboardData: LeaderboardEntry[] = await response.json();
        return leaderboardData;
    } catch (error) {
        console.error('Erreur lors de la récupération du leaderboard:', error);
        throw error;
    }
}
