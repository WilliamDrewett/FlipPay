import { SWAP_API_URL } from './API';

// Types pour les réponses de l'API de prix
export interface TokenPriceResponse {
  token: string;
  price_usd: number;
  chain_id: number;
  source: string;
  timestamp: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface MultiplePricesResponse {
  [token: string]: TokenPriceResponse | null;
}

/**
 * Récupère le prix spot d'ETH en USD
 * @param chainId - ID de la blockchain (défaut: 1 pour Ethereum mainnet)
 * @returns Prix d'ETH en USD ou null en cas d'erreur
 */
export async function getEthSpotPrice(chainId: number = 1): Promise<TokenPriceResponse | null> {
  try {
    const response = await fetch(`${SWAP_API_URL}/api/price/eth?chainId=${chainId}`);
    
    if (!response.ok) {
      console.error('Erreur lors de la récupération du prix ETH:', response.status, response.statusText);
      return null;
    }
    
    const result: ApiResponse<TokenPriceResponse> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      console.error('Erreur dans la réponse API ETH:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Erreur réseau lors de la récupération du prix ETH:', error);
    return null;
  }
}

/**
 * Récupère le prix spot de Polkadot (DOT) en USD
 * @param chainId - ID de la blockchain (défaut: 1 pour Ethereum mainnet)
 * @returns Prix de DOT en USD ou null en cas d'erreur
 */
export async function getPolkadotSpotPrice(chainId: number = 1): Promise<TokenPriceResponse | null> {
  try {
    const response = await fetch(`${SWAP_API_URL}/api/price/polkadot?chainId=${chainId}`);
    
    if (!response.ok) {
      console.error('Erreur lors de la récupération du prix DOT:', response.status, response.statusText);
      return null;
    }
    
    const result: ApiResponse<TokenPriceResponse> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      console.error('Erreur dans la réponse API DOT:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Erreur réseau lors de la récupération du prix DOT:', error);
    return null;
  }
}

/**
 * Récupère les prix de plusieurs tokens en une seule requête
 * @param tokens - Liste des symboles de tokens (ETH, DOT)
 * @param chainId - ID de la blockchain (défaut: 1 pour Ethereum mainnet)
 * @returns Objet contenant les prix des tokens ou null en cas d'erreur
 */
export async function getMultipleSpotPrices(
  tokens: string[],
  chainId: number = 1
): Promise<MultiplePricesResponse | null> {
  try {
    const tokensParam = tokens.join(',');
    const response = await fetch(`${SWAP_API_URL}/api/price/multiple?tokens=${tokensParam}&chainId=${chainId}`);
    
    if (!response.ok) {
      console.error('Erreur lors de la récupération des prix multiples:', response.status, response.statusText);
      return null;
    }
    
    const result: ApiResponse<MultiplePricesResponse> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      console.error('Erreur dans la réponse API prix multiples:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Erreur réseau lors de la récupération des prix multiples:', error);
    return null;
  }
}

/**
 * Récupère les prix ETH et DOT simultanément
 * @param chainId - ID de la blockchain (défaut: 1 pour Ethereum mainnet)
 * @returns Objet contenant les prix ETH et DOT
 */
export async function getEthAndDotPrices(chainId: number = 1): Promise<{
  eth: TokenPriceResponse | null;
  dot: TokenPriceResponse | null;
}> {
  try {
    const prices = await getMultipleSpotPrices(['ETH', 'DOT'], chainId);
    
    return {
      eth: prices?.ETH || null,
      dot: prices?.DOT || null
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des prix ETH et DOT:', error);
    return {
      eth: null,
      dot: null
    };
  }
}

/**
 * Vérifie la santé du service de prix
 * @returns true si le service est disponible, false sinon
 */
export async function checkPriceServiceHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${SWAP_API_URL}/api/price/health`);
    
    if (!response.ok) {
      return false;
    }
    
    const result: ApiResponse<{
      service: string;
      status: string;
      provider: string;
      timestamp: number;
    }> = await response.json();
    
    return result.success && result.data?.status === 'available';
  } catch (error) {
    console.error('Erreur lors de la vérification de la santé du service:', error);
    return false;
  }
}

// Note: Le service swap utilise le port 8000 par défaut selon sa configuration,
// mais SWAP_API_URL est configuré sur le port 8080. Assurez-vous que la configuration
// correspond à votre environnement de déploiement.
