// Types pour les transactions
export interface Transaction {
    amount: number;
    from_token: string;
    to_token: string;
    id: number;
    user_id: number;
    points_earned: number;
    was_free: boolean;
    fee_paid: number;
}

// Fonction pour récupérer les transactions d'un utilisateur
export async function getTransactions(walletAddress: string): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
        {
          "amount": 500,
          "from_token": "ETH",
          "to_token": "USDC",
          "id": 1,
          "user_id": 1,
          "points_earned": 50,
          "was_free": false,
          "fee_paid": 1.5
        },
        {
          "amount": 750,
          "from_token": "USDC",
          "to_token": "LINK",
          "id": 2,
          "user_id": 1,
          "points_earned": 75,
          "was_free": true,
          "fee_paid": 0
        },
        {
          "amount": 300,
          "from_token": "AAVE",
          "to_token": "USDT",
          "id": 3,
          "user_id": 1,
          "points_earned": 30,
          "was_free": false,
          "fee_paid": 0.9
        }
      ];

    // const url = `https://flippay-production.up.railway.app/users/transactions?wallet_address=${encodeURIComponent(walletAddress)}`;

    // try {
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     });

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const transactions: Transaction[] = await response.json();
    //     return transactions;
    // } catch (error) {
    //     console.error('Erreur lors de la récupération des transactions:', error);
    //     throw error;
    // }
}
