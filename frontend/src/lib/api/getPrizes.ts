import { API_URL, FAKE } from "./API";

// Types pour la réponse de l'API
export interface Prize {
    game_type: string;
    outcome: string;
    prize: string;
    points_spent: number;
    id: number;
    user_id: number;
}

// Fonction pour récupérer les prix d'un utilisateur
export async function getPrizes(walletAddress: string): Promise<Prize[]> {
    // ----------------------------------- FAKE DATA -----------------------------------
    if (FAKE) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return [
            {
                "game_type": "spin_wheel",
                "outcome": "win",
                "prize": "Rare NFT",
                "points_spent": 10,
                "id": 1,
                "user_id": 1
            },
            {
                "game_type": "mystery_box",
                "outcome": "win",
                "prize": "100 Tokens",
                "points_spent": 15,
                "id": 2,
                "user_id": 1
            },
            {
                "game_type": "nft_crate",
                "outcome": "win",
                "prize": "Epic NFT Collection",
                "points_spent": 25,
                "id": 4,
                "user_id": 1
            },
            {
                "game_type": "loot_box",
                "outcome": "uncommon",
                "prize": "Wearable NFT",
                "points_spent": 250,
                "id": 5,
                "user_id": 1
            }
        ];
    }
    // ----------------------------------- FAKE DATA -----------------------------------

    const url = `${API_URL}/users/prizes?wallet_address=${encodeURIComponent(walletAddress)}`;

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

        const prizes: Prize[] = await response.json();
        return prizes;
    } catch (error) {
        console.error('Erreur lors de la récupération des prix:', error);
        throw error;
    }
}
