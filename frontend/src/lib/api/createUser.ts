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
    const url = 'https://flippay-production.up.railway.app/users/';

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
