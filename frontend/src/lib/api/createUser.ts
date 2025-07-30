import { API_URL, FAKE } from "./API";

// Types pour la réponse de l'API
export interface User {
    wallet_address: string;
    id: number;
    points: number;
    transactions: any[];
    game_plays: any[];
}

export interface CreateUserRequest {
    wallet_address: string;
}

// Fonction pour créer un utilisateur
export async function createUser(walletAddress: string): Promise<User> {
    // ----------------------------------- FAKE DATA -----------------------------------
    if (FAKE) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            wallet_address: walletAddress,
            id: 1,
            points: 0,
            transactions: [],
            game_plays: []
        };
    }
    // ----------------------------------- FAKE DATA -----------------------------------

    const url = `${API_URL}/users/`;

    const requestBody: CreateUserRequest = {
        wallet_address: walletAddress
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData: User = await response.json();
        return userData;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw error;
    }
}
