import axios from "axios";

// very ugly to use axios just for this but we don't have the time, because the deadline is in 2 hours

export async function getEthTokens() {
  const url = "https://api.1inch.dev/token/v1.3/1";

  const config = {
    headers: {
      Authorization: "Bearer EGdhaG7rsXWcTNxasiGKTWQNy8EB2RYX",
    },
    params: {
      provider: "1inch",
      country: "US",
    },
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.get(url, config);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// return {
//     symbol: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).symbol as string,
//     name: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).name as string,
//     address: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).address as string,
//     decimals: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).decimals as number,
//     logoURI: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).logoURI as string
// }

export function getEthTokensHARDCODED() :{symbol: string, name: string, address: string, decimals: number, logoURI: string}[] {
    const hardcodedTokens = {
        "0xdac17f958d2ee523a2206206994597c13d831ec7": {
            "chainId": 1,
            "symbol": "USDT",
            "name": "Tether USD",
            "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "decimals": 6,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xdac17f958d2ee523a2206206994597c13d831ec7_0xc047483b8988ef2766792d8bfc95e22756b57c1fd130c69035645f15c6c31a09.webp",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:USDT",
                "PEG:USD",
                "RISK:unverified",
                "stablecoin",
                "tether",
                "tokens",
                "usdt"
            ]
        },
        "0xc3d688b66703497daa19211eedff47f25384cdc3": {
            "chainId": 1,
            "symbol": "cUSDCv3",
            "name": "Compound USDC",
            "address": "0xc3d688b66703497daa19211eedff47f25384cdc3",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xc3d688b66703497daa19211eedff47f25384cdc3.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:cUSDCv3",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd01409314acb3b245cea9500ece3f6fd4d70ea30": {
            "chainId": 1,
            "symbol": "LTO",
            "name": "LTO Network Token",
            "address": "0xd01409314acb3b245cea9500ece3f6fd4d70ea30",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xd01409314acb3b245cea9500ece3f6fd4d70ea30.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:LTO",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb8c77482e45f1f44de1745f52c74426c631bdd52": {
            "chainId": 1,
            "symbol": "BNB",
            "name": "BNB",
            "address": "0xb8c77482e45f1f44de1745f52c74426c631bdd52",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BNB",
                "RISK:availability"
            ]
        },
        "0x320623b8e4ff03373931769a31fc52a4e78b5d70": {
            "chainId": 1,
            "symbol": "RSR",
            "name": "Reserve Rights",
            "address": "0x320623b8e4ff03373931769a31fc52a4e78b5d70",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x320623b8e4ff03373931769a31fc52a4e78b5d70.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x71ab77b7dbb4fa7e017bc15090b2163221420282": {
            "chainId": 1,
            "symbol": "HIGH",
            "name": "Highstreet token",
            "address": "0x71ab77b7dbb4fa7e017bc15090b2163221420282",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x71ab77b7dbb4fa7e017bc15090b2163221420282.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:HIGH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x256d1fce1b1221e8398f65f9b36033ce50b2d497": {
            "chainId": 1,
            "symbol": "wALV",
            "name": "Alvey Chain",
            "address": "0x256d1fce1b1221e8398f65f9b36033ce50b2d497",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x256d1fce1b1221e8398f65f9b36033ce50b2d497.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4": {
            "chainId": 1,
            "symbol": "NEAR",
            "name": "NEAR",
            "address": "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4",
            "decimals": 24,
            "logoURI": "https://tokens.1inch.io/0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:NEAR",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb23d80f5fefcddaa212212f028021b41ded428cf": {
            "chainId": 1,
            "symbol": "PRIME",
            "name": "Prime",
            "address": "0xb23d80f5fefcddaa212212f028021b41ded428cf",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/29053/large/PRIMELOGOOO.png?1676976222",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x461b71cff4d4334bba09489ace4b5dc1a1813445": {
            "chainId": 1,
            "symbol": "HRD",
            "name": "Hoard",
            "address": "0x461b71cff4d4334bba09489ace4b5dc1a1813445",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x461b71cff4d4334bba09489ace4b5dc1a1813445.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9e5bd9d9fad182ff0a93ba8085b664bcab00fa68": {
            "chainId": 1,
            "symbol": "DINGER",
            "name": "Dinger Token",
            "address": "0x9e5bd9d9fad182ff0a93ba8085b664bcab00fa68",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x9e5bd9d9fad182ff0a93ba8085b664bcab00fa68.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x30dcba0405004cf124045793e1933c798af9e66a": {
            "chainId": 1,
            "symbol": "YDF",
            "name": "Yieldification",
            "address": "0x30dcba0405004cf124045793e1933c798af9e66a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x30dcba0405004cf124045793e1933c798af9e66a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa8c8cfb141a3bb59fea1e2ea6b79b5ecbcd7b6ca": {
            "chainId": 1,
            "symbol": "NOIA",
            "name": "NOIA Token",
            "address": "0xa8c8cfb141a3bb59fea1e2ea6b79b5ecbcd7b6ca",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa8c8cfb141a3bb59fea1e2ea6b79b5ecbcd7b6ca.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x66761fa41377003622aee3c7675fc7b5c1c2fac5": {
            "chainId": 1,
            "symbol": "CPOOL",
            "name": "Clearpool",
            "address": "0x66761fa41377003622aee3c7675fc7b5c1c2fac5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x66761fa41377003622aee3c7675fc7b5c1c2fac5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x32e6c34cd57087abbd59b5a4aecc4cb495924356": {
            "chainId": 1,
            "symbol": "BTBS",
            "name": "BitBase",
            "address": "0x32e6c34cd57087abbd59b5a4aecc4cb495924356",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x32e6c34cd57087abbd59b5a4aecc4cb495924356.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BTBS",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x226bb599a12c826476e3a771454697ea52e9e220": {
            "chainId": 1,
            "symbol": "PRO",
            "name": "Propy",
            "address": "0x226bb599a12c826476e3a771454697ea52e9e220",
            "decimals": 8,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x226bb599a12C826476e3A771454697EA52E9E220/logo.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9aab071b4129b083b01cb5a0cb513ce7eca26fa5": {
            "chainId": 1,
            "symbol": "HUNT",
            "name": "HuntToken",
            "address": "0x9aab071b4129b083b01cb5a0cb513ce7eca26fa5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9aab071b4129b083b01cb5a0cb513ce7eca26fa5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x32353a6c91143bfd6c7d363b546e62a9a2489a20": {
            "chainId": 1,
            "symbol": "AGLD",
            "name": "Adventure Gold",
            "address": "0x32353a6c91143bfd6c7d363b546e62a9a2489a20",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x32353a6c91143bfd6c7d363b546e62a9a2489a20_0x7873f9944595f01196ec3eab5934d726454c45e499a88a28d1537702c954584a.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xed04915c23f00a313a544955524eb7dbd823143d": {
            "chainId": 1,
            "symbol": "ACH",
            "name": "Alchemy",
            "address": "0xed04915c23f00a313a544955524eb7dbd823143d",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xed04915c23f00a313a544955524eb7dbd823143d_0xa30d7018eeaa6f762a5b96caa39a5279738a27b09293d3b501b4a41550886cc4.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x25f8087ead173b73d6e8b84329989a8eea16cf73": {
            "chainId": 1,
            "symbol": "YGG",
            "name": "Yield Guild Games Token",
            "address": "0x25f8087ead173b73d6e8b84329989a8eea16cf73",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x25f8087ead173b73d6e8b84329989a8eea16cf73.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xdab396ccf3d84cf2d07c4454e10c8a6f5b008d2b": {
            "chainId": 1,
            "symbol": "GFI",
            "name": "Goldfinch",
            "address": "0xdab396ccf3d84cf2d07c4454e10c8a6f5b008d2b",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/13967.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9355372396e3f6daf13359b7b607a3374cc638e0": {
            "chainId": 1,
            "symbol": "WHALE",
            "name": "WHALE",
            "address": "0x9355372396e3f6daf13359b7b607a3374cc638e0",
            "decimals": 4,
            "logoURI": "https://tokens.1inch.io/0x9355372396e3f6daf13359b7b607a3374cc638e0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "social",
                "tokens"
            ]
        },
        "0x08c32b0726c5684024ea6e141c50ade9690bbdcc": {
            "chainId": 1,
            "symbol": "STOS",
            "name": "Stratos Token",
            "address": "0x08c32b0726c5684024ea6e141c50ade9690bbdcc",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x08c32b0726c5684024ea6e141c50ade9690bbdcc.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x64d91f12ece7362f91a6f8e7940cd55f05060b92": {
            "chainId": 1,
            "symbol": "ASH",
            "name": "Burn",
            "address": "0x64d91f12ece7362f91a6f8e7940cd55f05060b92",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x64d91f12ece7362f91a6f8e7940cd55f05060b92_0xc72b12556c0e2aafea79fe947a57dc14581a35c727a732e6a1ceb2e6cd74cae4.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x675bbc7514013e2073db7a919f6e4cbef576de37": {
            "chainId": 1,
            "symbol": "CLS",
            "name": "Coldstack",
            "address": "0x675bbc7514013e2073db7a919f6e4cbef576de37",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x675bbc7514013e2073db7a919f6e4cbef576de37.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x667102bd3413bfeaa3dffb48fa8288819e480a88": {
            "chainId": 1,
            "symbol": "TKX",
            "name": "Tokenize Emblem",
            "address": "0x667102bd3413bfeaa3dffb48fa8288819e480a88",
            "decimals": 8,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/4715.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x269616d549d7e8eaa82dfb17028d0b212d11232a": {
            "chainId": 1,
            "symbol": "PUNK",
            "name": "CryptoPunks",
            "address": "0x269616d549d7e8eaa82dfb17028d0b212d11232a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x269616d549d7e8eaa82dfb17028d0b212d11232a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PUNK",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x2a3bff78b79a009976eea096a51a948a3dc00e34": {
            "chainId": 1,
            "symbol": "WILD",
            "name": "Wilder",
            "address": "0x2a3bff78b79a009976eea096a51a948a3dc00e34",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2a3bff78b79a009976eea096a51a948a3dc00e34.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x43a96962254855f16b925556f9e97be436a43448": {
            "chainId": 1,
            "symbol": "HORD",
            "name": "HORD Token",
            "address": "0x43a96962254855f16b925556f9e97be436a43448",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x43a96962254855f16b925556f9e97be436a43448.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0b63128c40737b13647552e0c926bcfeccc35f93": {
            "chainId": 1,
            "symbol": "wLITI",
            "name": "wLitiCapital",
            "address": "0x0b63128c40737b13647552e0c926bcfeccc35f93",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0b63128c40737b13647552e0c926bcfeccc35f93.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x74232704659ef37c08995e386a2e26cc27a8d7b1": {
            "chainId": 1,
            "symbol": "STRK_1",
            "name": "Strike Token",
            "address": "0x74232704659ef37c08995e386a2e26cc27a8d7b1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x74232704659ef37c08995e386a2e26cc27a8d7b1.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ],
            "displayedSymbol": "STRK"
        },
        "0x35e78b3982e87ecfd5b3f3265b601c046cdbe232": {
            "chainId": 1,
            "symbol": "XAI",
            "name": "SideShift Token",
            "address": "0x35e78b3982e87ecfd5b3f3265b601c046cdbe232",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x35e78b3982e87ecfd5b3f3265b601c046cdbe232.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x80c62fe4487e1351b47ba49809ebd60ed085bf52": {
            "chainId": 1,
            "symbol": "CLV",
            "name": "Clover",
            "address": "0x80c62fe4487e1351b47ba49809ebd60ed085bf52",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/8384.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:CLV",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa41f142b6eb2b164f8164cae0716892ce02f311f": {
            "chainId": 1,
            "symbol": "AVG",
            "name": "Avocado DAO Token",
            "address": "0xa41f142b6eb2b164f8164cae0716892ce02f311f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa41f142b6eb2b164f8164cae0716892ce02f311f.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x75231f58b43240c9718dd58b4967c5114342a86c": {
            "chainId": 1,
            "symbol": "OKB",
            "name": "OKB",
            "address": "0x75231f58b43240c9718dd58b4967c5114342a86c",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x75231f58b43240c9718dd58b4967c5114342a86c_0xe46c8eada20b797ff04afd67f32d41fa309503da74427d81db8280d768e0a510.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified"
            ]
        },
        "0xf0d33beda4d734c72684b5f9abbebf715d0a7935": {
            "chainId": 1,
            "symbol": "NTX",
            "name": "NuNet Utility Token",
            "address": "0xf0d33beda4d734c72684b5f9abbebf715d0a7935",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xf0d33beda4d734c72684b5f9abbebf715d0a7935.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0e5c8c387c5eba2ecbc137ad012aed5fe729e251": {
            "chainId": 1,
            "symbol": "RPG",
            "name": "Rangers Protocol Gas",
            "address": "0x0e5c8c387c5eba2ecbc137ad012aed5fe729e251",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0e5c8c387c5eba2ecbc137ad012aed5fe729e251.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3ea8ea4237344c9931214796d9417af1a1180770": {
            "chainId": 1,
            "symbol": "FLX",
            "name": "Flux Token",
            "address": "0x3ea8ea4237344c9931214796d9417af1a1180770",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3ea8ea4237344c9931214796d9417af1a1180770.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FLX",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0d02755a5700414b26ff040e1de35d337df56218": {
            "chainId": 1,
            "symbol": "BEND",
            "name": "Bend Token",
            "address": "0x0d02755a5700414b26ff040e1de35d337df56218",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0d02755a5700414b26ff040e1de35d337df56218.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9f52c8ecbee10e00d9faaac5ee9ba0ff6550f511": {
            "chainId": 1,
            "symbol": "SIPHER",
            "name": "Sipher Token",
            "address": "0x9f52c8ecbee10e00d9faaac5ee9ba0ff6550f511",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9f52c8ecbee10e00d9faaac5ee9ba0ff6550f511.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x329c6e459ffa7475718838145e5e85802db2a303": {
            "chainId": 1,
            "symbol": "eMAID",
            "name": "MaidSafeCoin",
            "address": "0x329c6e459ffa7475718838145e5e85802db2a303",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x329c6e459ffa7475718838145e5e85802db2a303.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x83e9f223e1edb3486f876ee888d76bfba26c475a": {
            "chainId": 1,
            "symbol": "GUILD",
            "name": "BlockchainSpace",
            "address": "0x83e9f223e1edb3486f876ee888d76bfba26c475a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x83e9f223e1edb3486f876ee888d76bfba26c475a.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x68749665ff8d2d112fa859aa293f07a622782f38": {
            "chainId": 1,
            "symbol": "XAUt",
            "name": "Tether Gold",
            "address": "0x68749665ff8d2d112fa859aa293f07a622782f38",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x68749665ff8d2d112fa859aa293f07a622782f38.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3819f64f282bf135d62168c1e513280daf905e06": {
            "chainId": 1,
            "symbol": "HDRN",
            "name": "Hedron",
            "address": "0x3819f64f282bf135d62168c1e513280daf905e06",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x3819f64f282bf135d62168c1e513280daf905e06.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9d65ff81a3c488d585bbfb0bfe3c7707c7917f54": {
            "chainId": 1,
            "symbol": "SSV",
            "name": "SSV Token",
            "address": "0x9d65ff81a3c488d585bbfb0bfe3c7707c7917f54",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9d65ff81a3c488d585bbfb0bfe3c7707c7917f54.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x549020a9cb845220d66d3e9c6d9f9ef61c981102": {
            "chainId": 1,
            "symbol": "SIDUS",
            "name": "SIDUS",
            "address": "0x549020a9cb845220d66d3e9c6d9f9ef61c981102",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x549020a9cb845220d66d3e9c6d9f9ef61c981102.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x418d75f65a02b3d53b2418fb8e1fe493759c7605": {
            "chainId": 1,
            "symbol": "WBNB",
            "name": "Wrapped BNB",
            "address": "0x418d75f65a02b3d53b2418fb8e1fe493759c7605",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:WBNB",
                "RISK:availability"
            ]
        },
        "0x3ec8798b81485a254928b70cda1cf0a2bb0b74d7": {
            "chainId": 1,
            "symbol": "GRO",
            "name": "Gro DAO Token",
            "address": "0x3ec8798b81485a254928b70cda1cf0a2bb0b74d7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3ec8798b81485a254928b70cda1cf0a2bb0b74d7.png",
            "providers": [
                "1inch",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3": {
            "chainId": 1,
            "symbol": "ONDO",
            "name": "Ondo",
            "address": "0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x30d20208d987713f46dfd34ef128bb16c404d10f": {
            "chainId": 1,
            "symbol": "SD",
            "name": "Stader",
            "address": "0x30d20208d987713f46dfd34ef128bb16c404d10f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x30d20208d987713f46dfd34ef128bb16c404d10f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf17e65822b568b3903685a7c9f496cf7656cc6c2": {
            "chainId": 1,
            "symbol": "BICO",
            "name": "Biconomy Token",
            "address": "0xf17e65822b568b3903685a7c9f496cf7656cc6c2",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/9543.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xe5a733681bbe6cd8c764bb8078ef8e13a576dd78": {
            "chainId": 1,
            "symbol": "DPAY",
            "name": "Devour",
            "address": "0xe5a733681bbe6cd8c764bb8078ef8e13a576dd78",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe5a733681bbe6cd8c764bb8078ef8e13a576dd78.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x505b5eda5e25a67e1c24a2bf1a527ed9eb88bf04": {
            "chainId": 1,
            "symbol": "CWEB",
            "name": "Coinweb",
            "address": "0x505b5eda5e25a67e1c24a2bf1a527ed9eb88bf04",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x505b5eda5e25a67e1c24a2bf1a527ed9eb88bf04.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9ce84f6a69986a83d92c324df10bc8e64771030f": {
            "chainId": 1,
            "symbol": "CHEX",
            "name": "Chintai Exchange Token",
            "address": "0x9ce84f6a69986a83d92c324df10bc8e64771030f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x9ce84f6a69986a83d92c324df10bc8e64771030f_0x4d50885643e6f57b9fdb24af6648052e269eb89aa209f0802a7fcb1847c61a92.webp",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2ebd53d035150f328bd754d6dc66b99b0edb89aa": {
            "chainId": 1,
            "symbol": "MET",
            "name": "Metronome2",
            "address": "0x2ebd53d035150f328bd754d6dc66b99b0edb89aa",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2ebd53d035150f328bd754d6dc66b99b0edb89aa.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x120a3879da835a5af037bb2d1456bebd6b54d4ba": {
            "chainId": 1,
            "symbol": "RVST",
            "name": "Revest",
            "address": "0x120a3879da835a5af037bb2d1456bebd6b54d4ba",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x120a3879da835a5af037bb2d1456bebd6b54d4ba.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x80d55c03180349fff4a229102f62328220a96444": {
            "chainId": 1,
            "symbol": "OPUL",
            "name": "OpulousToken",
            "address": "0x80d55c03180349fff4a229102f62328220a96444",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x80d55c03180349fff4a229102f62328220a96444.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb705268213d593b8fd88d3fdeff93aff5cbdcfae": {
            "chainId": 1,
            "symbol": "IDEX",
            "name": "IDEX Token",
            "address": "0xb705268213d593b8fd88d3fdeff93aff5cbdcfae",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/3928.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0bb217e40f8a5cb79adf04e1aab60e5abd0dfc1e": {
            "chainId": 1,
            "symbol": "SWFTC",
            "name": "SwftCoin",
            "address": "0x0bb217e40f8a5cb79adf04e1aab60e5abd0dfc1e",
            "decimals": 8,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bb217E40F8a5Cb79Adf04E1aAb60E5abd0dfC1e/logo.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "MyCrypto Token List",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x467719ad09025fcc6cf6f8311755809d45a5e5f3": {
            "chainId": 1,
            "symbol": "AXL",
            "name": "Axelar",
            "address": "0x467719ad09025fcc6cf6f8311755809d45a5e5f3",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x467719ad09025fcc6cf6f8311755809d45a5e5f3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:AXL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd9fcd98c322942075a5c3860693e9f4f03aae07b": {
            "chainId": 1,
            "symbol": "EUL",
            "name": "Euler",
            "address": "0xd9fcd98c322942075a5c3860693e9f4f03aae07b",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/14280.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x41545f8b9472d758bb669ed8eaeeecd7a9c4ec29": {
            "chainId": 1,
            "symbol": "FORT",
            "name": "Forta",
            "address": "0x41545f8b9472d758bb669ed8eaeeecd7a9c4ec29",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/20622.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa2cd3d43c775978a96bdbf12d733d5a1ed94fb18": {
            "chainId": 1,
            "symbol": "XCN",
            "name": "Chain",
            "address": "0xa2cd3d43c775978a96bdbf12d733d5a1ed94fb18",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xa2cd3d43c775978a96bdbf12d733d5a1ed94fb18_0xd9674bace88c6058b4c134d1220dd50135a9a8ceae66bb2b7a1cdf6c04dfd17b.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6b0b3a982b4634ac68dd83a4dbf02311ce324181": {
            "chainId": 1,
            "symbol": "ALI",
            "name": "Artificial Liquid Intelligence Token",
            "address": "0x6b0b3a982b4634ac68dd83a4dbf02311ce324181",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/16876.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x42bbfa2e77757c645eeaad1655e0911a7553efbc": {
            "chainId": 1,
            "symbol": "BOBA",
            "name": "Boba Token",
            "address": "0x42bbfa2e77757c645eeaad1655e0911a7553efbc",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x42bbfa2e77757c645eeaad1655e0911a7553efbc_0x1f913890c75266980f6ce9e4945422f8382b38d904a72bf29828c7fd9a961273.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb98d4c97425d9908e66e53a6fdf673acca0be986": {
            "chainId": 1,
            "symbol": "ABT",
            "name": "ArcBlock",
            "address": "0xb98d4c97425d9908e66e53a6fdf673acca0be986",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/2545.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3e5a19c91266ad8ce2477b91585d1856b84062df": {
            "chainId": 1,
            "symbol": "A8",
            "name": "Ancient8",
            "address": "0x3e5a19c91266ad8ce2477b91585d1856b84062df",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x3e5a19c91266ad8ce2477b91585d1856b84062df_0xb9b6db3009682a120ed27b8d34fa49e94ce115939f225d52b7ab0247850b6896.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x06450dee7fd2fb8e39061434babcfc05599a6fb8": {
            "chainId": 1,
            "symbol": "XEN",
            "name": "XEN Crypto",
            "address": "0x06450dee7fd2fb8e39061434babcfc05599a6fb8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x06450dee7fd2fb8e39061434babcfc05599a6fb8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6c3ea9036406852006290770bedfcaba0e23a0e8": {
            "chainId": 1,
            "symbol": "PYUSD",
            "name": "PayPal USD",
            "address": "0x6c3ea9036406852006290770bedfcaba0e23a0e8",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x6c3ea9036406852006290770bedfcaba0e23a0e8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3496b523e5c00a4b4150d6721320cddb234c3079": {
            "chainId": 1,
            "symbol": "NUM",
            "name": "NUM Token",
            "address": "0x3496b523e5c00a4b4150d6721320cddb234c3079",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3496b523e5c00a4b4150d6721320cddb234c3079.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:NUM",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x44108f0223a3c3028f5fe7aec7f9bb2e66bef82f": {
            "chainId": 1,
            "symbol": "ACX",
            "name": "Across Protocol Token",
            "address": "0x44108f0223a3c3028f5fe7aec7f9bb2e66bef82f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x44108f0223a3c3028f5fe7aec7f9bb2e66bef82f_0xa57f046b92942d42dc3d9a330bdf8d7144ef3abeb431ca6b85d5f302b00b3b1f.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xca14007eff0db1f8135f4c25b34de49ab0d42766": {
            "chainId": 1,
            "symbol": "STRK",
            "name": "StarkNet Token",
            "address": "0xca14007eff0db1f8135f4c25b34de49ab0d42766",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/22691.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfd0205066521550d7d7ab19da8f72bb004b4c341": {
            "chainId": 1,
            "symbol": "LIT",
            "name": "Liquidity Incentive Token",
            "address": "0xfd0205066521550d7d7ab19da8f72bb004b4c341",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfd0205066521550d7d7ab19da8f72bb004b4c341.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:LIT",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x02e7f808990638e9e67e1f00313037ede2362361": {
            "chainId": 1,
            "symbol": "KIBSHI",
            "name": "KiboShib",
            "address": "0x02e7f808990638e9e67e1f00313037ede2362361",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/23802.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3472a5a71965499acd81997a54bba8d852c6e53d": {
            "chainId": 1,
            "symbol": "BADGER",
            "name": "Badger",
            "address": "0x3472a5a71965499acd81997a54bba8d852c6e53d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3472a5a71965499acd81997a54bba8d852c6e53d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BADGER",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc944e90c64b2c07662a292be6244bdf05cda44a7": {
            "chainId": 1,
            "symbol": "GRT",
            "name": "Graph Token",
            "address": "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc944e90c64b2c07662a292be6244bdf05cda44a7.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:GRT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5a98fcbea516cf06857215779fd812ca3bef1b32": {
            "chainId": 1,
            "symbol": "LDO",
            "name": "Lido DAO Token",
            "address": "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5a98fcbea516cf06857215779fd812ca3bef1b32.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:LDO",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xae7ab96520de3a18e5e111b5eaab095312d7fe84": {
            "chainId": 1,
            "symbol": "stETH",
            "name": "Liquid staked Ether 2.0",
            "address": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "PEG:ETH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa17581a9e3356d9a858b789d68b4d866e593ae94": {
            "chainId": 1,
            "symbol": "cWETHv3",
            "name": "Compound WETH",
            "address": "0xa17581a9e3356d9a858b789d68b4d866e593ae94",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa17581a9e3356d9a858b789d68b4d866e593ae94.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:cWETHv3",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x4d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e8": {
            "chainId": 1,
            "symbol": "aEthWETH",
            "name": "Aave Ethereum WETH",
            "address": "0x4d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e8.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x018008bfb33d285247a21d44e50697654f754e63": {
            "chainId": 1,
            "symbol": "aEthDAI",
            "name": "Aave Ethereum DAI",
            "address": "0x018008bfb33d285247a21d44e50697654f754e63",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x018008bfb33d285247a21d44e50697654f754e63.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0b925ed163218f6662a35e0f0371ac234f9e9371": {
            "chainId": 1,
            "symbol": "aEthwstETH",
            "name": "Aave Ethereum wstETH",
            "address": "0x0b925ed163218f6662a35e0f0371ac234f9e9371",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0b925ed163218f6662a35e0f0371ac234f9e9371.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x98c23e9d8f34fefb1b7bd6a91b7ff122f4e16f5c": {
            "chainId": 1,
            "symbol": "aEthUSDC",
            "name": "Aave Ethereum USDC",
            "address": "0x98c23e9d8f34fefb1b7bd6a91b7ff122f4e16f5c",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x98c23e9d8f34fefb1b7bd6a91b7ff122f4e16f5c.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5e8c8a7243651db1384c0ddfdbe39761e8e7e51a": {
            "chainId": 1,
            "symbol": "aEthLINK",
            "name": "Aave Ethereum LINK",
            "address": "0x5e8c8a7243651db1384c0ddfdbe39761e8e7e51a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5e8c8a7243651db1384c0ddfdbe39761e8e7e51a.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5ee5bf7ae06d1be5997a1a72006fe6c607ec6de8": {
            "chainId": 1,
            "symbol": "aEthWBTC",
            "name": "Aave Ethereum WBTC",
            "address": "0x5ee5bf7ae06d1be5997a1a72006fe6c607ec6de8",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x5ee5bf7ae06d1be5997a1a72006fe6c607ec6de8.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1e31b601488e97bc247c57af7b6aa336edbc5477": {
            "chainId": 1,
            "symbol": "UP",
            "name": "Unicorn Power",
            "address": "0x1e31b601488e97bc247c57af7b6aa336edbc5477",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1e31b601488e97bc247c57af7b6aa336edbc5477.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xa700b4eb416be35b2911fd5dee80678ff64ff6c9": {
            "chainId": 1,
            "symbol": "aEthAAVE",
            "name": "Aave Ethereum AAVE",
            "address": "0xa700b4eb416be35b2911fd5dee80678ff64ff6c9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa700b4eb416be35b2911fd5dee80678ff64ff6c9.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0ae055097c6d159879521c384f1d2123d1f195e6": {
            "chainId": 1,
            "symbol": "STAKE",
            "name": "STAKE",
            "address": "0x0ae055097c6d159879521c384f1d2123d1f195e6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0ae055097c6d159879521c384f1d2123d1f195e6.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:STAKE",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0": {
            "chainId": 1,
            "symbol": "TRB",
            "name": "Tellor Tributes",
            "address": "0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e": {
            "chainId": 1,
            "symbol": "YFI",
            "name": "yearn.finance",
            "address": "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "gov",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0d438f3b5175bebc262bf23753c1e53d03432bde": {
            "chainId": 1,
            "symbol": "wNXM",
            "name": "Wrapped NXM",
            "address": "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0d438f3b5175bebc262bf23753c1e53d03432bde.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "nexus",
                "nxm",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0d8775f648430679a709e98d2b0cb6250d2887ef": {
            "chainId": 1,
            "symbol": "BAT",
            "name": "Basic Attention Token",
            "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0d8775f648430679a709e98d2b0cb6250d2887ef.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BAT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0e8d6b471e332f140e7d9dbb99e5e3822f728da6": {
            "chainId": 1,
            "symbol": "ABYSS",
            "name": "ABYSS",
            "address": "0x0e8d6b471e332f140e7d9dbb99e5e3822f728da6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0e8d6b471e332f140e7d9dbb99e5e3822f728da6.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x04fa0d235c4abf4bcf4787af4cf447de572ef828": {
            "chainId": 1,
            "symbol": "UMA",
            "name": "UMA Voting Token v1",
            "address": "0x04fa0d235c4abf4bcf4787af4cf447de572ef828",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x04fa0d235c4abf4bcf4787af4cf447de572ef828.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "gov",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x08d967bb0134f2d07f7cfb6e246680c53927dd30": {
            "chainId": 1,
            "symbol": "MATH",
            "name": "MATH Token",
            "address": "0x08d967bb0134f2d07f7cfb6e246680c53927dd30",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x08d967bb0134f2d07f7cfb6e246680c53927dd30.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MATH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x77e06c9eccf2e797fd462a92b6d7642ef85b0a44": {
            "chainId": 1,
            "symbol": "wTAO",
            "name": "Wrapped TAO",
            "address": "0x77e06c9eccf2e797fd462a92b6d7642ef85b0a44",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x77e06c9eccf2e797fd462a92b6d7642ef85b0a44_0x93095811f222defb9e99543db3b66de0554288a00ae5ae107fb9cf83bdddbb46.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5a3e6a77ba2f983ec0d371ea3b475f8bc0811ad5": {
            "chainId": 1,
            "symbol": "0x0",
            "name": "0x0.ai: AI Smart Contract Auditor",
            "address": "0x5a3e6a77ba2f983ec0d371ea3b475f8bc0811ad5",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x5a3e6a77ba2f983ec0d371ea3b475f8bc0811ad5_0x9cefd7d2b4319b7da936d92ba7666688748cc3f59c32288047423de6eef1e429.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Roll Social Money"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x249ca82617ec3dfb2589c4c17ab7ec9765350a18": {
            "chainId": 1,
            "symbol": "VERSE",
            "name": "Verse",
            "address": "0x249ca82617ec3dfb2589c4c17ab7ec9765350a18",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x249ca82617ec3dfb2589c4c17ab7ec9765350a18.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x977b6fc5de62598b08c85ac8cf2b745874e8b78c": {
            "chainId": 1,
            "symbol": "aEthcbETH",
            "name": "Aave Ethereum cbETH",
            "address": "0x977b6fc5de62598b08c85ac8cf2b745874e8b78c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x977b6fc5de62598b08c85ac8cf2b745874e8b78c.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xcc9ee9483f662091a1de4795249e24ac0ac2630f": {
            "chainId": 1,
            "symbol": "aEthrETH",
            "name": "Aave Ethereum rETH",
            "address": "0xcc9ee9483f662091a1de4795249e24ac0ac2630f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcc9ee9483f662091a1de4795249e24ac0ac2630f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x23878914efe38d27c4d67ab83ed1b93a74d4086a": {
            "chainId": 1,
            "symbol": "aEthUSDT",
            "name": "Aave Ethereum USDT",
            "address": "0x23878914efe38d27c4d67ab83ed1b93a74d4086a",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x23878914efe38d27c4d67ab83ed1b93a74d4086a.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1151cb3d861920e07a38e03eead12c32178567f6": {
            "chainId": 1,
            "symbol": "Bonk",
            "name": "Bonk",
            "address": "0x1151cb3d861920e07a38e03eead12c32178567f6",
            "decimals": 5,
            "logoURI": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "GROUP:BONK",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5732046a883704404f284ce41ffadd5b007fd668": {
            "chainId": 1,
            "symbol": "BLZ",
            "name": "Bluzelle Token",
            "address": "0x5732046a883704404f284ce41ffadd5b007fd668",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5732046a883704404f284ce41ffadd5b007fd668.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x57700244b20f84799a31c6c96dadff373ca9d6c5": {
            "chainId": 1,
            "symbol": "TRUST",
            "name": "TRUST DAO",
            "address": "0x57700244b20f84799a31c6c96dadff373ca9d6c5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x57700244b20f84799a31c6c96dadff373ca9d6c5.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x58b6a8a3302369daec383334672404ee733ab239": {
            "chainId": 1,
            "symbol": "LPT",
            "name": "Livepeer Token",
            "address": "0x58b6a8a3302369daec383334672404ee733ab239",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x58b6a8a3302369daec383334672404ee733ab239.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x595832f8fc6bf59c85c527fec3740a1b7a361269": {
            "chainId": 1,
            "symbol": "POWR",
            "name": "PowerLedger",
            "address": "0x595832f8fc6bf59c85c527fec3740a1b7a361269",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x595832f8fc6bf59c85c527fec3740a1b7a361269.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5adc961d6ac3f7062d2ea45fefb8d8167d44b190": {
            "chainId": 1,
            "symbol": "DTH",
            "name": "Dether",
            "address": "0x5adc961d6ac3f7062d2ea45fefb8d8167d44b190",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5adc961d6ac3f7062d2ea45fefb8d8167d44b190.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x1beef31946fbbb40b877a72e4ae04a8d1a5cee06": {
            "chainId": 1,
            "symbol": "PAR_2",
            "name": "Parachute",
            "address": "0x1beef31946fbbb40b877a72e4ae04a8d1a5cee06",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1beef31946fbbb40b877a72e4ae04a8d1a5cee06.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ],
            "displayedSymbol": "PAR"
        },
        "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c": {
            "chainId": 1,
            "symbol": "BNT",
            "name": "Bancor Network Token",
            "address": "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "dex",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x221657776846890989a759ba2973e427dff5c9bb": {
            "chainId": 1,
            "symbol": "REPv2",
            "name": "Reputation",
            "address": "0x221657776846890989a759ba2973e427dff5c9bb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x221657776846890989a759ba2973e427dff5c9bb.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "gov",
                "prediction",
                "RISK:availability",
                "staking",
                "tokens"
            ]
        },
        "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
            "chainId": 1,
            "symbol": "WBTC",
            "name": "Wrapped BTC",
            "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599_0xb818b82ac32dc885c17f83c5adf2455258d93aa23712006b48a9efada43d4672.webp",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "bitcoin",
                "crosschain",
                "defi",
                "GROUP:WBTC",
                "PEG:BTC",
                "RISK:unverified",
                "synthetic",
                "tokens",
                "wrapped"
            ]
        },
        "0x27054b13b1b798b345b591a4d22e6562d47ea75a": {
            "chainId": 1,
            "symbol": "AST",
            "name": "AirSwap Token",
            "address": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
            "decimals": 4,
            "logoURI": "https://tokens.1inch.io/0x27054b13b1b798b345b591a4d22e6562d47ea75a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2ba592f78db6436527729929aaf6c908497cb200": {
            "chainId": 1,
            "symbol": "CREAM",
            "name": "Cream",
            "address": "0x2ba592f78db6436527729929aaf6c908497cb200",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2ba592f78db6436527729929aaf6c908497cb200.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "Kleros Tokens",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "farming",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3fe6a295459fae07df8a0cecc36f37160fe86aa9": {
            "chainId": 1,
            "symbol": "aEthLUSD",
            "name": "Aave Ethereum LUSD",
            "address": "0x3fe6a295459fae07df8a0cecc36f37160fe86aa9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3fe6a295459fae07df8a0cecc36f37160fe86aa9.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x36c833eed0d376f75d1ff9dfdee260191336065e": {
            "chainId": 1,
            "symbol": "gtcETH",
            "name": "Gitcoin Staked ETH Index (gtcETH)",
            "address": "0x36c833eed0d376f75d1ff9dfdee260191336065e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x36c833eed0d376f75d1ff9dfdee260191336065e.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x0f5d2fb29fb7d3cfee444a200298f468908cc942": {
            "chainId": 1,
            "symbol": "MANA",
            "name": "Decentraland MANA",
            "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0f5d2fb29fb7d3cfee444a200298f468908cc942.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MANA",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4a220e6096b25eadb88358cb44068a3248254675": {
            "chainId": 1,
            "symbol": "QNT",
            "name": "Quant",
            "address": "0x4a220e6096b25eadb88358cb44068a3248254675",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4a220e6096b25eadb88358cb44068a3248254675.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0f7f961648ae6db43c75663ac7e5414eb79b5704": {
            "chainId": 1,
            "symbol": "XIO",
            "name": "XIO Network",
            "address": "0x0f7f961648ae6db43c75663ac7e5414eb79b5704",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0f7f961648ae6db43c75663ac7e5414eb79b5704.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671": {
            "chainId": 1,
            "symbol": "NMR",
            "name": "Numeraire",
            "address": "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1776e1f26f98b1a5df9cd347953a26dd3cb46671.png",
            "providers": [
                "1inch",
                "Agora dataFi Tokens",
                "CMC200 ERC20",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "datadex",
                "dataproc",
                "RISK:unverified",
                "staking",
                "tokens"
            ]
        },
        "0x178c820f862b14f316509ec36b13123da19a6054": {
            "chainId": 1,
            "symbol": "EWTB",
            "name": "Energy Web Token Bridged",
            "address": "0x178c820f862b14f316509ec36b13123da19a6054",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x178c820f862b14f316509ec36b13123da19a6054.png",
            "providers": [
                "1inch",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x340d2bde5eb28c1eed91b2f790723e3b160613b7": {
            "chainId": 1,
            "symbol": "VEE",
            "name": "BLOCKv Token",
            "address": "0x340d2bde5eb28c1eed91b2f790723e3b160613b7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x340d2bde5eb28c1eed91b2f790723e3b160613b7.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x408e41876cccdc0f92210600ef50372656052a38": {
            "chainId": 1,
            "symbol": "REN",
            "name": "Republic Token",
            "address": "0x408e41876cccdc0f92210600ef50372656052a38",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x408e41876cccdc0f92210600ef50372656052a38.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "gov",
                "RISK:unverified",
                "staking",
                "tokens"
            ]
        },
        "0x419d0d8bdd9af5e606ae2232ed285aff190e711b": {
            "chainId": 1,
            "symbol": "FUN",
            "name": "FunFair",
            "address": "0x419d0d8bdd9af5e606ae2232ed285aff190e711b",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x419d0d8bdd9af5e606ae2232ed285aff190e711b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x41e5560054824ea6b0732e656e3ad64e20e94e45": {
            "chainId": 1,
            "symbol": "CVC",
            "name": "Civic",
            "address": "0x41e5560054824ea6b0732e656e3ad64e20e94e45",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x41e5560054824ea6b0732e656e3ad64e20e94e45.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4fabb145d64652a948d72533023f6e7a623c7c53": {
            "chainId": 1,
            "symbol": "BUSD",
            "name": "BUSD",
            "address": "0x4fabb145d64652a948d72533023f6e7a623c7c53",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BUSD",
                "PEG:USD",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x514910771af9ca656af840dff83e8264ecf986ca": {
            "chainId": 1,
            "symbol": "LINK",
            "name": "ChainLink Token",
            "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png",
            "providers": [
                "1inch",
                "Agora dataFi Tokens",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:LINK",
                "oracle",
                "RISK:unverified",
                "staking",
                "tokens"
            ]
        },
        "0x543ff227f64aa17ea132bf9886cab5db55dcaddf": {
            "chainId": 1,
            "symbol": "GEN",
            "name": "DAOstack",
            "address": "0x543ff227f64aa17ea132bf9886cab5db55dcaddf",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x543ff227f64aa17ea132bf9886cab5db55dcaddf.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:GEN",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5caf454ba92e6f2c929df14667ee360ed9fd5b26": {
            "chainId": 1,
            "symbol": "DEV",
            "name": "Dev",
            "address": "0x5caf454ba92e6f2c929df14667ee360ed9fd5b26",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5caf454ba92e6f2c929df14667ee360ed9fd5b26.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643": {
            "chainId": 1,
            "symbol": "cDAI",
            "name": "Compound Dai",
            "address": "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x5d3a536e4d6dbd6114cc1ead35777bab948e3643.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "compound",
                "crosschain",
                "RISK:availability",
                "savings",
                "stablecoin",
                "yield"
            ]
        },
        "0x607c794cda77efb21f8848b7910ecf27451ae842": {
            "chainId": 1,
            "symbol": "PIE",
            "name": "DeFiPIE Token",
            "address": "0x607c794cda77efb21f8848b7910ecf27451ae842",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x607c794cda77efb21f8848b7910ecf27451ae842.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x607f4c5bb672230e8672085532f7e901544a7375": {
            "chainId": 1,
            "symbol": "RLC",
            "name": "iEx.ec Network Token",
            "address": "0x607f4c5bb672230e8672085532f7e901544a7375",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x607f4c5bb672230e8672085532f7e901544a7375.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6810e776880c02933d47db1b9fc05908e5386b96": {
            "chainId": 1,
            "symbol": "GNO",
            "name": "Gnosis Token",
            "address": "0x6810e776880c02933d47db1b9fc05908e5386b96",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6810e776880c02933d47db1b9fc05908e5386b96.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:GNO",
                "prediction",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6b785a0322126826d8226d77e173d75dafb84d11": {
            "chainId": 1,
            "symbol": "VLT",
            "name": "Bankroll Vault",
            "address": "0x6b785a0322126826d8226d77e173d75dafb84d11",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6b785a0322126826d8226d77e173d75dafb84d11.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6b9f031d718dded0d681c20cb754f97b3bb81b78": {
            "chainId": 1,
            "symbol": "GEEQ",
            "name": "Geeq",
            "address": "0x6b9f031d718dded0d681c20cb754f97b3bb81b78",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6b9f031d718dded0d681c20cb754f97b3bb81b78.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6c6ee5e31d828de241282b9606c8e98ea48526e2": {
            "chainId": 1,
            "symbol": "HOT",
            "name": "HoloToken",
            "address": "0x6c6ee5e31d828de241282b9606c8e98ea48526e2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6c6ee5e31d828de241282b9606c8e98ea48526e2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x744d70fdbe2ba4cf95131626614a1763df805b9e": {
            "chainId": 1,
            "symbol": "SNT",
            "name": "Status Network Token",
            "address": "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x744d70fdbe2ba4cf95131626614a1763df805b9e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SNT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098": {
            "chainId": 1,
            "symbol": "SAN",
            "name": "SANtiment network token",
            "address": "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x7de91b204c1c737bcee6f000aaa6569cf7061cb7": {
            "chainId": 1,
            "symbol": "XRT",
            "name": "Robonomics",
            "address": "0x7de91b204c1c737bcee6f000aaa6569cf7061cb7",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x7de91b204c1c737bcee6f000aaa6569cf7061cb7.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x80fb784b7ed66730e8b1dbd9820afd29931aab03": {
            "chainId": 1,
            "symbol": "LEND",
            "name": "EthLend Token",
            "address": "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x80fb784b7ed66730e8b1dbd9820afd29931aab03.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "gov",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8207c1ffc5b6804f6024322ccf34f29c3541ae26": {
            "chainId": 1,
            "symbol": "OGN",
            "name": "OriginToken",
            "address": "0x8207c1ffc5b6804f6024322ccf34f29c3541ae26",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8207c1ffc5b6804f6024322ccf34f29c3541ae26.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e": {
            "chainId": 1,
            "symbol": "UBT",
            "name": "UniBright",
            "address": "0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Synthetix",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "dex",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419": {
            "chainId": 1,
            "symbol": "DIA",
            "name": "DIAToken",
            "address": "0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419.png",
            "providers": [
                "1inch",
                "Agora dataFi Tokens",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "dataproc",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed": {
            "chainId": 1,
            "symbol": "PNT",
            "name": "pNetwork Token",
            "address": "0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7": {
            "chainId": 1,
            "symbol": "KAON",
            "name": "Kaon",
            "address": "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9": {
            "chainId": 1,
            "symbol": "SXP",
            "name": "Swipe",
            "address": "0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SXP",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8e870d67f660d95d5be530380d0ec0bd388289e1": {
            "chainId": 1,
            "symbol": "USDP",
            "name": "Pax Dollar",
            "address": "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8e870d67f660d95d5be530380d0ec0bd388289e1_1.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8eb24319393716668d768dcec29356ae9cffe285": {
            "chainId": 1,
            "symbol": "AGI",
            "name": "SingularityNET Token",
            "address": "0x8eb24319393716668d768dcec29356ae9cffe285",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x8eb24319393716668d768dcec29356ae9cffe285.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "dataproc",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x8f8221afbb33998d8584a2b05749ba73c37a938a": {
            "chainId": 1,
            "symbol": "REQ",
            "name": "Request Token",
            "address": "0x8f8221afbb33998d8584a2b05749ba73c37a938a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8f8221afbb33998d8584a2b05749ba73c37a938a.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:REQ",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a": {
            "chainId": 1,
            "symbol": "ORN",
            "name": "Orion Protocol",
            "address": "0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d": {
            "chainId": 1,
            "symbol": "PNK",
            "name": "Pinakion",
            "address": "0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PNK",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x95172ccbe8344fecd73d0a30f54123652981bd6f": {
            "chainId": 1,
            "symbol": "LOCK_1",
            "name": "Meridian Network",
            "address": "0x95172ccbe8344fecd73d0a30f54123652981bd6f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x95172ccbe8344fecd73d0a30f54123652981bd6f.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ],
            "displayedSymbol": "LOCK"
        },
        "0x960b236a07cf122663c4303350609a66a7b288c0": {
            "chainId": 1,
            "symbol": "ANT",
            "name": "Aragon Network Token",
            "address": "0x960b236a07cf122663c4303350609a66a7b288c0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x960b236a07cf122663c4303350609a66a7b288c0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "gov",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x967da4048cd07ab37855c090aaf366e4ce1b9f48": {
            "chainId": 1,
            "symbol": "OCEAN",
            "name": "Ocean Token",
            "address": "0x967da4048cd07ab37855c090aaf366e4ce1b9f48",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x967da4048cd07ab37855c090aaf366e4ce1b9f48.png",
            "providers": [
                "1inch",
                "Agora dataFi Tokens",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "dataproc",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x990f341946a3fdb507ae7e52d17851b87168017c": {
            "chainId": 1,
            "symbol": "STRONG",
            "name": "Strong",
            "address": "0x990f341946a3fdb507ae7e52d17851b87168017c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x990f341946a3fdb507ae7e52d17851b87168017c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec": {
            "chainId": 1,
            "symbol": "POLY",
            "name": "Polymath",
            "address": "0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9cb2f26a23b8d89973f08c957c4d7cdf75cd341c": {
            "chainId": 1,
            "symbol": "DZAR",
            "name": "Digital Rand",
            "address": "0x9cb2f26a23b8d89973f08c957c4d7cdf75cd341c",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x9cb2f26a23b8d89973f08c957c4d7cdf75cd341c.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2": {
            "chainId": 1,
            "symbol": "MKR",
            "name": "Maker",
            "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "gov",
                "GROUP:MKR",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
            "chainId": 1,
            "symbol": "USDC",
            "name": "USD Coin",
            "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:USDC",
                "PEG:USD",
                "RISK:unverified",
                "stablecoin",
                "tokens"
            ]
        },
        "0xa1d0e215a23d7030842fc67ce582a6afa3ccab83": {
            "chainId": 1,
            "symbol": "YFII",
            "name": "YFII.finance",
            "address": "0xa1d0e215a23d7030842fc67ce582a6afa3ccab83",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa1d0e215a23d7030842fc67ce582a6afa3ccab83.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2": {
            "chainId": 1,
            "symbol": "MTA",
            "name": "Meta",
            "address": "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "Kleros Tokens",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "farming",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa462d0e6bb788c7807b1b1c96992ce1f7069e195": {
            "chainId": 1,
            "symbol": "EQMT",
            "name": "EQUUSMiningToken",
            "address": "0xa462d0e6bb788c7807b1b1c96992ce1f7069e195",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa462d0e6bb788c7807b1b1c96992ce1f7069e195.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d": {
            "chainId": 1,
            "symbol": "CEL",
            "name": "Celsius",
            "address": "0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d",
            "decimals": 4,
            "logoURI": "https://tokens.1inch.io/0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xaaaf91d9b90df800df4f55c205fd6989c977e73a": {
            "chainId": 1,
            "symbol": "TKN",
            "name": "Monolith TKN",
            "address": "0xaaaf91d9b90df800df4f55c205fd6989c977e73a",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xaaaf91d9b90df800df4f55c205fd6989c977e73a.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xeca82185adce47f39c684352b0439f030f860318": {
            "chainId": 1,
            "symbol": "PERL",
            "name": "Perlin",
            "address": "0xeca82185adce47f39c684352b0439f030f860318",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xeca82185adce47f39c684352b0439f030f860318.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PERL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb6c4267c4877bb0d6b1685cfd85b0fbe82f105ec": {
            "chainId": 1,
            "symbol": "REL",
            "name": "Relevant",
            "address": "0xb6c4267c4877bb0d6b1685cfd85b0fbe82f105ec",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb6c4267c4877bb0d6b1685cfd85b0fbe82f105ec.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xba100000625a3754423978a60c9317c58a424e3d": {
            "chainId": 1,
            "symbol": "BAL",
            "name": "Balancer",
            "address": "0xba100000625a3754423978a60c9317c58a424e3d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xba100000625a3754423978a60c9317c58a424e3d.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "dex",
                "farming",
                "gov",
                "GROUP:BAL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55": {
            "chainId": 1,
            "symbol": "BAND",
            "name": "BandToken",
            "address": "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xba11d00c5f74255f56a5e366f4f77f5a186d7f55.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BAND",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd": {
            "chainId": 1,
            "symbol": "LRC",
            "name": "LoopringCoin V2",
            "address": "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbbbbca6a901c926f240b89eacb641d8aec7aeafd.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "dex",
                "layer2",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbd2949f67dcdc549c6ebe98696449fa79d988a9f": {
            "chainId": 1,
            "symbol": "eMTRG",
            "name": "Meter Governance mapped by Meter.io",
            "address": "0xbd2949f67dcdc549c6ebe98696449fa79d988a9f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbd2949f67dcdc549c6ebe98696449fa79d988a9f.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "Roll Social Money",
                "SpookySwap Default List",
                "Venus Default List",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xbf2179859fc6d5bee9bf9158632dc51678a4100e": {
            "chainId": 1,
            "symbol": "ELF",
            "name": "ELF Token",
            "address": "0xbf2179859fc6d5bee9bf9158632dc51678a4100e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbf2179859fc6d5bee9bf9158632dc51678a4100e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc00e94cb662c3520282e6f5717214004a7f26888": {
            "chainId": 1,
            "symbol": "COMP",
            "name": "Compound",
            "address": "0xc00e94cb662c3520282e6f5717214004a7f26888",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc00e94cb662c3520282e6f5717214004a7f26888.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "compound",
                "crosschain",
                "defi",
                "farming",
                "gov",
                "GROUP:COMP",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f": {
            "chainId": 1,
            "symbol": "SNX",
            "name": "Synthetix Network Token",
            "address": "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "gov",
                "GROUP:SNX",
                "RISK:unverified",
                "staking",
                "tokens"
            ]
        },
        "0x27702a26126e0b3702af63ee09ac4d1a084ef628": {
            "chainId": 1,
            "symbol": "ALEPH",
            "name": "aleph.im v2",
            "address": "0x27702a26126e0b3702af63ee09ac4d1a084ef628",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x27702a26126e0b3702af63ee09ac4d1a084ef628.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Roll Social Money",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
            "chainId": 1,
            "symbol": "WETH",
            "name": "Wrapped Ether",
            "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "ether",
                "GROUP:WETH",
                "PEG:ETH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc28e931814725bbeb9e670676fabbcb694fe7df2": {
            "chainId": 1,
            "symbol": "eQUAD",
            "name": "QuadrantProtocol",
            "address": "0xc28e931814725bbeb9e670676fabbcb694fe7df2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc28e931814725bbeb9e670676fabbcb694fe7df2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xc3dd23a0a854b4f9ae80670f528094e9eb607ccb": {
            "chainId": 1,
            "symbol": "TRND",
            "name": "Trendering",
            "address": "0xc3dd23a0a854b4f9ae80670f528094e9eb607ccb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc3dd23a0a854b4f9ae80670f528094e9eb607ccb.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xcc4304a31d09258b0029ea7fe63d032f52e44efe": {
            "chainId": 1,
            "symbol": "SWAP",
            "name": "TrustSwap Token",
            "address": "0xcc4304a31d09258b0029ea7fe63d032f52e44efe",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcc4304a31d09258b0029ea7fe63d032f52e44efe.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SWAP",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcd62b1c403fa761baadfc74c525ce2b51780b184": {
            "chainId": 1,
            "symbol": "ANJ",
            "name": "Aragon Network Juror",
            "address": "0xcd62b1c403fa761baadfc74c525ce2b51780b184",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcd62b1c403fa761baadfc74c525ce2b51780b184.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd26114cd6ee289accf82350c8d8487fedb8a0c07": {
            "chainId": 1,
            "symbol": "OMG",
            "name": "OMGToken",
            "address": "0xd26114cd6ee289accf82350c8d8487fedb8a0c07",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd26114cd6ee289accf82350c8d8487fedb8a0c07.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "layer2",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd46ba6d942050d489dbd938a2c909a5d5039a161": {
            "chainId": 1,
            "symbol": "AMPL",
            "name": "Ampleforth",
            "address": "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xd46ba6d942050d489dbd938a2c909a5d5039a161.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "GROUP:AMPL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd4c435f5b09f855c3317c8524cb1f586e42795fa": {
            "chainId": 1,
            "symbol": "CND",
            "name": "Cindicator Token",
            "address": "0xd4c435f5b09f855c3317c8524cb1f586e42795fa",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd4c435f5b09f855c3317c8524cb1f586e42795fa.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd8912c10681d8b21fd3742244f44658dba12264e": {
            "chainId": 1,
            "symbol": "PLU",
            "name": "Pluton",
            "address": "0xd8912c10681d8b21fd3742244f44658dba12264e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd8912c10681d8b21fd3742244f44658dba12264e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xdb25f211ab05b1c97d595516f45794528a807ad8": {
            "chainId": 1,
            "symbol": "EURS",
            "name": "STASIS EURS Token",
            "address": "0xdb25f211ab05b1c97d595516f45794528a807ad8",
            "decimals": 2,
            "logoURI": "https://tokens.1inch.io/0xdb25f211ab05b1c97d595516f45794528a807ad8.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:EURS",
                "PEG:EUR",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdd974d5c2e2928dea5f71b9825b8b646686bd200": {
            "chainId": 1,
            "symbol": "KNC_1",
            "name": "Kyber Network Crystal",
            "address": "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xdd974d5c2e2928dea5f71b9825b8b646686bd200.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "dex",
                "farming",
                "RISK:availability",
                "tokens"
            ],
            "displayedSymbol": "KNC"
        },
        "0xdfe691f37b6264a90ff507eb359c45d55037951c": {
            "chainId": 1,
            "symbol": "KARMA",
            "name": "Karma",
            "address": "0xdfe691f37b6264a90ff507eb359c45d55037951c",
            "decimals": 4,
            "logoURI": "https://tokens.1inch.io/0xdfe691f37b6264a90ff507eb359c45d55037951c.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xe17f017475a709de58e976081eb916081ff4c9d5": {
            "chainId": 1,
            "symbol": "RMPL",
            "name": "RMPL",
            "address": "0xe17f017475a709de58e976081eb916081ff4c9d5",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xe17f017475a709de58e976081eb916081ff4c9d5.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xe3818504c1b32bf1557b16c238b2e01fd3149c17": {
            "chainId": 1,
            "symbol": "PLR",
            "name": "PILLAR",
            "address": "0xe3818504c1b32bf1557b16c238b2e01fd3149c17",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe3818504c1b32bf1557b16c238b2e01fd3149c17.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe41d2489571d322189246dafa5ebde1f4699f498": {
            "chainId": 1,
            "symbol": "ZRX",
            "name": "0x Protocol Token",
            "address": "0xe41d2489571d322189246dafa5ebde1f4699f498",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe41d2489571d322189246dafa5ebde1f4699f498.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "dex",
                "gov",
                "RISK:unverified",
                "staking",
                "tokens"
            ]
        },
        "0xe48972fcd82a274411c01834e2f031d4377fa2c0": {
            "chainId": 1,
            "symbol": "2KEY",
            "name": "TwoKeyEconomy",
            "address": "0xe48972fcd82a274411c01834e2f031d4377fa2c0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe48972fcd82a274411c01834e2f031d4377fa2c0.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d": {
            "chainId": 1,
            "symbol": "renBTC",
            "name": "renBTC",
            "address": "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "bitcoin",
                "crosschain",
                "GROUP:renBTC",
                "PEG:BTC",
                "RISK:availability",
                "synthetic",
                "tokens",
                "wrapped"
            ]
        },
        "0xec67005c4e498ec7f55e092bd1d35cbc47c91892": {
            "chainId": 1,
            "symbol": "MLN",
            "name": "Melon Token",
            "address": "0xec67005c4e498ec7f55e092bd1d35cbc47c91892",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xec67005c4e498ec7f55e092bd1d35cbc47c91892.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf29e46887ffae92f1ff87dfe39713875da541373": {
            "chainId": 1,
            "symbol": "UNC",
            "name": "UniCrypt",
            "address": "0xf29e46887ffae92f1ff87dfe39713875da541373",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf29e46887ffae92f1ff87dfe39713875da541373.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xf2f9a7e93f845b3ce154efbeb64fb9346fcce509": {
            "chainId": 1,
            "symbol": "POWER",
            "name": "UniPower",
            "address": "0xf2f9a7e93f845b3ce154efbeb64fb9346fcce509",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf2f9a7e93f845b3ce154efbeb64fb9346fcce509.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:POWER",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c": {
            "chainId": 1,
            "symbol": "ENJ",
            "name": "Enjin Coin",
            "address": "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9": {
            "chainId": 1,
            "symbol": "cUSDT",
            "name": "Compound USDT",
            "address": "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "compound",
                "PEG:USD",
                "RISK:availability",
                "savings",
                "stablecoin",
                "yield"
            ]
        },
        "0xf8e386eda857484f5a12e4b5daa9984e06e73705": {
            "chainId": 1,
            "symbol": "IND",
            "name": "Indorse Token",
            "address": "0xf8e386eda857484f5a12e4b5daa9984e06e73705",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf8e386eda857484f5a12e4b5daa9984e06e73705.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xf911a7ec46a2c6fa49193212fe4a2a9b95851c27": {
            "chainId": 1,
            "symbol": "XAMP",
            "name": "Antiample",
            "address": "0xf911a7ec46a2c6fa49193212fe4a2a9b95851c27",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xf911a7ec46a2c6fa49193212fe4a2a9b95851c27.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
            "chainId": 1,
            "symbol": "ETH",
            "name": "Ether",
            "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC Stablecoin",
                "Defiprime",
                "Dharma Token List",
                "Furucombo",
                "PancakeSwap Default List",
                "PancakeSwap Extended",
                "PancakeSwap Top 100",
                "Quickswap Token List",
                "Roll Social Money",
                "SpookySwap Default List",
                "Trust Wallet Assets",
                "Uniswap Labs Default",
                "Venus Default List",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ETH",
                "native",
                "PEG:ETH",
                "RISK:availability"
            ]
        },
        "0x06af07097c9eeb7fd685c692751d5c66db49c215": {
            "chainId": 1,
            "symbol": "CHAI",
            "name": "Chai",
            "address": "0x06af07097c9eeb7fd685c692751d5c66db49c215",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x06af07097c9eeb7fd685c692751d5c66db49c215.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf5dce57282a584d2746faf1593d3121fcac444dc": {
            "chainId": 1,
            "symbol": "cDAI_1",
            "name": "Compound Dai",
            "address": "0xf5dce57282a584d2746faf1593d3121fcac444dc",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xf5dce57282a584d2746faf1593d3121fcac444dc.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ],
            "displayedSymbol": "cDAI"
        },
        "0x39aa39c021dfbae8fac545936693ac917d5e7563": {
            "chainId": 1,
            "symbol": "cUSDC",
            "name": "Compound USD Coin",
            "address": "0x39aa39c021dfbae8fac545936693ac917d5e7563",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x39aa39c021dfbae8fac545936693ac917d5e7563.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "compound",
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "savings",
                "stablecoin",
                "yield"
            ]
        },
        "0x6f259637dcd74c767781e37bc6133cd6a68aa161": {
            "chainId": 1,
            "symbol": "HT",
            "name": "HuobiToken",
            "address": "0x6f259637dcd74c767781e37bc6133cd6a68aa161",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6f259637dcd74c767781e37bc6133cd6a68aa161.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0": {
            "chainId": 1,
            "symbol": "MATIC",
            "name": "Matic Token",
            "address": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:MATIC",
                "layer2",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6b175474e89094c44da98b954eedeac495271d0f": {
            "chainId": 1,
            "symbol": "DAI",
            "name": "Dai Stablecoin",
            "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:DAI",
                "PEG:USD",
                "RISK:unverified",
                "stablecoin",
                "synthetic",
                "tokens"
            ]
        },
        "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359": {
            "chainId": 1,
            "symbol": "DAI_1",
            "name": "Dai Stablecoin v1.0",
            "address": "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ],
            "displayedSymbol": "DAI"
        },
        "0x57ab1ec28d129707052df4df418d58a2d46d5f51": {
            "chainId": 1,
            "symbol": "sUSD",
            "name": "Synth sUSD",
            "address": "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x57ab1ec28d129707052df4df418d58a2d46d5f51.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:sUSD",
                "PEG:USD",
                "RISK:unverified",
                "stablecoin",
                "synth",
                "synthetic",
                "tokens"
            ]
        },
        "0x0000000000085d4780b73119b644ae5ecd22b376": {
            "chainId": 1,
            "symbol": "TUSD",
            "name": "TrueUSD",
            "address": "0x0000000000085d4780b73119b644ae5ecd22b376",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0000000000085d4780b73119b644ae5ecd22b376.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:TUSD",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x16de59092dae5ccf4a1e6439d611fd0653f0bd01": {
            "chainId": 1,
            "symbol": "yDAI",
            "name": "iearn DAI",
            "address": "0x16de59092dae5ccf4a1e6439d611fd0653f0bd01",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x16de59092dae5ccf4a1e6439d611fd0653f0bd01.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc2cb1040220768554cf699b0d863a3cd4324ce32": {
            "chainId": 1,
            "symbol": "yDAI_1",
            "name": "iearn DAI",
            "address": "0xc2cb1040220768554cf699b0d863a3cd4324ce32",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc2cb1040220768554cf699b0d863a3cd4324ce32.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ],
            "displayedSymbol": "yDAI"
        },
        "0x04aa51bbcb46541455ccf1b8bef2ebc5d3787ec9": {
            "chainId": 1,
            "symbol": "yWTBC",
            "name": "iearn wBTC",
            "address": "0x04aa51bbcb46541455ccf1b8bef2ebc5d3787ec9",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x04aa51bbcb46541455ccf1b8bef2ebc5d3787ec9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:BTC",
                "tokens"
            ]
        },
        "0x83f798e925bcd4017eb265844fddabb448f1707d": {
            "chainId": 1,
            "symbol": "yUSDT",
            "name": "iearn USDT",
            "address": "0x83f798e925bcd4017eb265844fddabb448f1707d",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x83f798e925bcd4017eb265844fddabb448f1707d.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe6354ed5bc4b393a5aad09f21c46e101e692d447": {
            "chainId": 1,
            "symbol": "yUSDT_1",
            "name": "iearn USDT",
            "address": "0xe6354ed5bc4b393a5aad09f21c46e101e692d447",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xe6354ed5bc4b393a5aad09f21c46e101e692d447.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ],
            "displayedSymbol": "yUSDT"
        },
        "0xd6ad7a6750a7593e092a9b218d66c0a814a3436e": {
            "chainId": 1,
            "symbol": "yUSDC",
            "name": "iearn USDC",
            "address": "0xd6ad7a6750a7593e092a9b218d66c0a814a3436e",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xd6ad7a6750a7593e092a9b218d66c0a814a3436e.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x26ea744e5b887e5205727f55dfbe8685e3b21951": {
            "chainId": 1,
            "symbol": "yUSDC_1",
            "name": "iearn USDC",
            "address": "0x26ea744e5b887e5205727f55dfbe8685e3b21951",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x26ea744e5b887e5205727f55dfbe8685e3b21951.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ],
            "displayedSymbol": "yUSDC"
        },
        "0xacfa209fb73bf3dd5bbfb1101b9bc999c49062a5": {
            "chainId": 1,
            "symbol": "BCDT",
            "name": "Blockchain Certified Data Token",
            "address": "0xacfa209fb73bf3dd5bbfb1101b9bc999c49062a5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xacfa209fb73bf3dd5bbfb1101b9bc999c49062a5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x4de2573e27e648607b50e1cfff921a33e4a34405": {
            "chainId": 1,
            "symbol": "LST",
            "name": "Lendroid Support Token",
            "address": "0x4de2573e27e648607b50e1cfff921a33e4a34405",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4de2573e27e648607b50e1cfff921a33e4a34405.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd": {
            "chainId": 1,
            "symbol": "GUSD",
            "name": "Gemini dollar",
            "address": "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd",
            "decimals": 2,
            "logoURI": "https://tokens.1inch.io/0x056fd409e1d7a124bd7017459dfea2f387b6d5cd.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC Stablecoin",
                "CoinGecko",
                "Gemini Token List",
                "MyCrypto Token List",
                "Synthetix",
                "Trust Wallet Assets",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd7efb00d12c2c13131fd319336fdf952525da2af": {
            "chainId": 1,
            "symbol": "XPR",
            "name": "Proton",
            "address": "0xd7efb00d12c2c13131fd319336fdf952525da2af",
            "decimals": 4,
            "logoURI": "https://tokens.1inch.io/0xd7efb00d12c2c13131fd319336fdf952525da2af.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x85eee30c52b0b379b046fb0f85f4f3dc3009afec": {
            "chainId": 1,
            "symbol": "KEEP",
            "name": "KEEP Token",
            "address": "0x85eee30c52b0b379b046fb0f85f4f3dc3009afec",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x85eee30c52b0b379b046fb0f85f4f3dc3009afec.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2": {
            "chainId": 1,
            "symbol": "renZEC",
            "name": "renZEC",
            "address": "0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2.png",
            "providers": [
                "1inch",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens",
                "wrapped",
                "zcash"
            ]
        },
        "0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9": {
            "chainId": 1,
            "symbol": "DONUT",
            "name": "Donut",
            "address": "0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DONUT",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x45804880de22913dafe09f4980848ece6ecbaf78": {
            "chainId": 1,
            "symbol": "PAXG",
            "name": "Paxos Gold",
            "address": "0x45804880de22913dafe09f4980848ece6ecbaf78",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x45804880de22913dafe09f4980848ece6ecbaf78.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default",
                "Uniswap Labs List",
                "Zapper Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac": {
            "chainId": 1,
            "symbol": "STORJ",
            "name": "StorjToken",
            "address": "0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4156d3342d5c385a87d264f90653733592000581": {
            "chainId": 1,
            "symbol": "SALT",
            "name": "Salt",
            "address": "0x4156d3342d5c385a87d264f90653733592000581",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x4156d3342d5c385a87d264f90653733592000581.png",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "CMC DeFi",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfca59cd816ab1ead66534d82bc21e7515ce441cf": {
            "chainId": 1,
            "symbol": "RARI",
            "name": "Rarible",
            "address": "0xfca59cd816ab1ead66534d82bc21e7515ce441cf",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfca59cd816ab1ead66534d82bc21e7515ce441cf.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5228a22e72ccc52d415ecfd199f99d0665e7733b": {
            "chainId": 1,
            "symbol": "pBTC",
            "name": "pTokens BTC",
            "address": "0x5228a22e72ccc52d415ecfd199f99d0665e7733b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5228a22e72ccc52d415ecfd199f99d0665e7733b.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:BTC",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x476c5e26a75bd202a9683ffd34359c0cc15be0ff": {
            "chainId": 1,
            "symbol": "SRM",
            "name": "Serum",
            "address": "0x476c5e26a75bd202a9683ffd34359c0cc15be0ff",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "dex",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc813ea5e3b48bebeedb796ab42a30c5599b01740": {
            "chainId": 1,
            "symbol": "NIOX",
            "name": "Autonio",
            "address": "0xc813ea5e3b48bebeedb796ab42a30c5599b01740",
            "decimals": 4,
            "logoURI": "https://tokens.1inch.io/0xc813ea5e3b48bebeedb796ab42a30c5599b01740.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xdc5864ede28bd4405aa04d93e05a0531797d9d59": {
            "chainId": 1,
            "symbol": "FNT",
            "name": "Falcon",
            "address": "0xdc5864ede28bd4405aa04d93e05a0531797d9d59",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xdc5864ede28bd4405aa04d93e05a0531797d9d59.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x0aacfbec6a24756c20d41914f2caba817c0d8521": {
            "chainId": 1,
            "symbol": "YAM",
            "name": "YAM",
            "address": "0x0aacfbec6a24756c20d41914f2caba817c0d8521",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0aacfbec6a24756c20d41914f2caba817c0d8521.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xade00c28244d5ce17d72e40330b1c318cd12b7c3": {
            "chainId": 1,
            "symbol": "ADX",
            "name": "AdEx Network",
            "address": "0xade00c28244d5ce17d72e40330b1c318cd12b7c3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xade00c28244d5ce17d72e40330b1c318cd12b7c3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ADX",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd533a949740bb3306d119cc777fa900ba034cd52": {
            "chainId": 1,
            "symbol": "CRV",
            "name": "Curve DAO Token",
            "address": "0xd533a949740bb3306d119cc777fa900ba034cd52",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd533a949740bb3306d119cc777fa900ba034cd52.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "dex",
                "farming",
                "gov",
                "GROUP:CRV",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9469d013805bffb7d3debe5e7839237e535ec483": {
            "chainId": 1,
            "symbol": "RING",
            "name": "Darwinia Network Native Token",
            "address": "0x9469d013805bffb7d3debe5e7839237e535ec483",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9469d013805bffb7d3debe5e7839237e535ec483.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:RING",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0ff6ffcfda92c53f615a4a75d982f399c989366b": {
            "chainId": 1,
            "symbol": "LAYER",
            "name": "Unilayer",
            "address": "0x0ff6ffcfda92c53f615a4a75d982f399c989366b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0ff6ffcfda92c53f615a4a75d982f399c989366b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f": {
            "chainId": 1,
            "symbol": "TRAC",
            "name": "Trace Token",
            "address": "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x674c6ad92fd080e4004b2312b45f796a192d27a0": {
            "chainId": 1,
            "symbol": "USDN_1",
            "name": "Neutrino USD",
            "address": "0x674c6ad92fd080e4004b2312b45f796a192d27a0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x674c6ad92fd080e4004b2312b45f796a192d27a0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "tokens"
            ],
            "displayedSymbol": "USDN"
        },
        "0x362bc847a3a9637d3af6624eec853618a43ed7d2": {
            "chainId": 1,
            "symbol": "PRQ",
            "name": "Parsiq Token",
            "address": "0x362bc847a3a9637d3af6624eec853618a43ed7d2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x362bc847a3a9637d3af6624eec853618a43ed7d2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd": {
            "chainId": 1,
            "symbol": "HAKKA",
            "name": "Hakka Finance",
            "address": "0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1": {
            "chainId": 1,
            "symbol": "CVP",
            "name": "Concentrated Voting Power",
            "address": "0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4fe5851c9af07df9e5ad8217afae1ea72737ebda": {
            "chainId": 1,
            "symbol": "OPT",
            "name": "Open Predict Token",
            "address": "0x4fe5851c9af07df9e5ad8217afae1ea72737ebda",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4fe5851c9af07df9e5ad8217afae1ea72737ebda.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2": {
            "chainId": 1,
            "symbol": "SUSHI",
            "name": "SushiToken",
            "address": "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "GROUP:SUSHI",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe": {
            "chainId": 1,
            "symbol": "DSLA",
            "name": "DSLA",
            "address": "0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xba21ef4c9f433ede00badefcc2754b8e74bd538a": {
            "chainId": 1,
            "symbol": "SWFL",
            "name": "Swapfolio",
            "address": "0xba21ef4c9f433ede00badefcc2754b8e74bd538a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xba21ef4c9f433ede00badefcc2754b8e74bd538a.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xfffffffff15abf397da76f1dcc1a1604f45126db": {
            "chainId": 1,
            "symbol": "FSW",
            "name": "FalconSwap Token",
            "address": "0xfffffffff15abf397da76f1dcc1a1604f45126db",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfffffffff15abf397da76f1dcc1a1604f45126db.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x8a6f3bf52a26a21531514e23016eeae8ba7e7018": {
            "chainId": 1,
            "symbol": "MXX",
            "name": "Multiplier",
            "address": "0x8a6f3bf52a26a21531514e23016eeae8ba7e7018",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x8a6f3bf52a26a21531514e23016eeae8ba7e7018.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x50026ad58b338cf3eccc2b422deb8faa725f377f": {
            "chainId": 1,
            "symbol": "STEP",
            "name": "1Step.finance",
            "address": "0x50026ad58b338cf3eccc2b422deb8faa725f377f",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x50026ad58b338cf3eccc2b422deb8faa725f377f.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b": {
            "chainId": 1,
            "symbol": "DPI",
            "name": "DefiPulse Index",
            "address": "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "indexes",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3f382dbd960e3a9bbceae22651e88158d2791550": {
            "chainId": 1,
            "symbol": "GHST",
            "name": "Aavegotchi GHST Token",
            "address": "0x3f382dbd960e3a9bbceae22651e88158d2791550",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3f382dbd960e3a9bbceae22651e88158d2791550.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:GHST",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": {
            "chainId": 1,
            "symbol": "UNI",
            "name": "Uniswap",
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "GROUP:UNI",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x429881672b9ae42b8eba0e26cd9c73711b891ca5": {
            "chainId": 1,
            "symbol": "PICKLE",
            "name": "PickleToken",
            "address": "0x429881672b9ae42b8eba0e26cd9c73711b891ca5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x429881672b9ae42b8eba0e26cd9c73711b891ca5.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Synthetix",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "GROUP:PICKLE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf8c3527cc04340b208c854e985240c02f7b7793f": {
            "chainId": 1,
            "symbol": "FRONT",
            "name": "Frontier Token",
            "address": "0xf8c3527cc04340b208c854e985240c02f7b7793f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf8c3527cc04340b208c854e985240c02f7b7793f.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FRONT",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa0246c9032bc3a600820415ae600c6388619a14d": {
            "chainId": 1,
            "symbol": "FARM",
            "name": "FARM Reward Token",
            "address": "0xa0246c9032bc3a600820415ae600c6388619a14d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa0246c9032bc3a600820415ae600c6388619a14d.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c": {
            "chainId": 1,
            "symbol": "GOF",
            "name": "Golff.finance",
            "address": "0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86": {
            "chainId": 1,
            "symbol": "OUSD",
            "name": "Origin Dollar",
            "address": "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2a8e1e676ec238d8a992307b495b45b3feaa5e86.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9": {
            "chainId": 1,
            "symbol": "AAVE",
            "name": "Aave Token",
            "address": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9_0x5dcbf3ab535b2534d32c8b3919c9550e6765cfd8d508ff638c99ab4ccc03a5f1.webp",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "GROUP:AAVE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd": {
            "chainId": 1,
            "symbol": "DODO",
            "name": "DODO bird",
            "address": "0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "GROUP:DODO",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6006fc2a849fedaba8330ce36f5133de01f96189": {
            "chainId": 1,
            "symbol": "SHAKE",
            "name": "SHAKE token by SpaceSwap v2",
            "address": "0x6006fc2a849fedaba8330ce36f5133de01f96189",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6006fc2a849fedaba8330ce36f5133de01f96189.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x80c8c3dcfb854f9542567c8dac3f44d709ebc1de": {
            "chainId": 1,
            "symbol": "MILK2",
            "name": "MilkyWay Token by SpaceSwap v2",
            "address": "0x80c8c3dcfb854f9542567c8dac3f44d709ebc1de",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x80c8c3dcfb854f9542567c8dac3f44d709ebc1de.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MILK2",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x62359ed7505efc61ff1d56fef82158ccaffa23d7": {
            "chainId": 1,
            "symbol": "CORE",
            "name": "cVault.finance",
            "address": "0x62359ed7505efc61ff1d56fef82158ccaffa23d7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x62359ed7505efc61ff1d56fef82158ccaffa23d7.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xbc396689893d065f41bc2c6ecbee5e0085233447": {
            "chainId": 1,
            "symbol": "PERP",
            "name": "Perpetual",
            "address": "0xbc396689893d065f41bc2c6ecbee5e0085233447",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbc396689893d065f41bc2c6ecbee5e0085233447.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PERP",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xe2f2a5c287993345a840db3b0845fbc70f5935a5": {
            "chainId": 1,
            "symbol": "mUSD",
            "name": "mStable USD",
            "address": "0xe2f2a5c287993345a840db3b0845fbc70f5935a5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe2f2a5c287993345a840db3b0845fbc70f5935a5.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "pools",
                "RISK:availability"
            ]
        },
        "0x584bc13c7d411c00c01a62e8019472de68768430": {
            "chainId": 1,
            "symbol": "HEGIC",
            "name": "Hegic",
            "address": "0x584bc13c7d411c00c01a62e8019472de68768430",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x584bc13c7d411c00c01a62e8019472de68768430.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xff20817765cb7f73d4bde2e66e067e58d11095c2": {
            "chainId": 1,
            "symbol": "AMP",
            "name": "Amp",
            "address": "0xff20817765cb7f73d4bde2e66e067e58d11095c2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xff20817765cb7f73d4bde2e66e067e58d11095c2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0391d2021f89dc339f60fff84546ea23e337750f": {
            "chainId": 1,
            "symbol": "BOND",
            "name": "BarnBridge Governance Token",
            "address": "0x0391d2021f89dc339f60fff84546ea23e337750f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0391d2021f89dc339f60fff84546ea23e337750f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Kleros Tokens",
                "Trust Wallet Assets",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "farming",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d": {
            "chainId": 1,
            "symbol": "FUSE",
            "name": "Fuse Token",
            "address": "0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Kleros Tokens",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FUSE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44": {
            "chainId": 1,
            "symbol": "KP3R",
            "name": "Keep3rV1",
            "address": "0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2e2364966267b5d7d2ce6cd9a9b5bd19d9c7c6a9": {
            "chainId": 1,
            "symbol": "VOICE",
            "name": "Voice Token",
            "address": "0x2e2364966267b5d7d2ce6cd9a9b5bd19d9c7c6a9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2e2364966267b5d7d2ce6cd9a9b5bd19d9c7c6a9.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xeef9f339514298c6a857efcfc1a762af84438dee": {
            "chainId": 1,
            "symbol": "HEZ",
            "name": "Hermez Network Token",
            "address": "0xeef9f339514298c6a857efcfc1a762af84438dee",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xeef9f339514298c6a857efcfc1a762af84438dee.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xea319e87cf06203dae107dd8e5672175e3ee976c": {
            "chainId": 1,
            "symbol": "SURF",
            "name": "SURF.Finance",
            "address": "0xea319e87cf06203dae107dd8e5672175e3ee976c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xea319e87cf06203dae107dd8e5672175e3ee976c.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x3383c5a8969dc413bfddc9656eb80a1408e4ba20": {
            "chainId": 1,
            "symbol": "wANATHA",
            "name": "Wrapped ANATHA",
            "address": "0x3383c5a8969dc413bfddc9656eb80a1408e4ba20",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3383c5a8969dc413bfddc9656eb80a1408e4ba20.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x18aaa7115705e8be94bffebde57af9bfc265b998": {
            "chainId": 1,
            "symbol": "AUDIO",
            "name": "Audius",
            "address": "0x18aaa7115705e8be94bffebde57af9bfc265b998",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x18aaa7115705e8be94bffebde57af9bfc265b998.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0954906da0bf32d5479e25f46056d22f08464cab": {
            "chainId": 1,
            "symbol": "INDEX",
            "name": "Index",
            "address": "0x0954906da0bf32d5479e25f46056d22f08464cab",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0954906da0bf32d5479e25f46056d22f08464cab.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "farming",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x95a4492f028aa1fd432ea71146b433e7b4446611": {
            "chainId": 1,
            "symbol": "APY",
            "name": "APY Governance Token",
            "address": "0x95a4492f028aa1fd432ea71146b433e7b4446611",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x95a4492f028aa1fd432ea71146b433e7b4446611.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xbea98c05eeae2f3bc8c3565db7551eb738c8ccab": {
            "chainId": 1,
            "symbol": "GYSR",
            "name": "Geyser",
            "address": "0xbea98c05eeae2f3bc8c3565db7551eb738c8ccab",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbea98c05eeae2f3bc8c3565db7551eb738c8ccab_1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa89ac6e529acf391cfbbd377f3ac9d93eae9664e": {
            "chainId": 1,
            "symbol": "KP4R",
            "name": "Keep4r",
            "address": "0xa89ac6e529acf391cfbbd377f3ac9d93eae9664e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa89ac6e529acf391cfbbd377f3ac9d93eae9664e.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b": {
            "chainId": 1,
            "symbol": "AXS",
            "name": "Axie Infinity Shard",
            "address": "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbb0e17ef65f82ab018d8edd776e8dd940327b28b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:AXS",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf4cd3d3fda8d7fd6c5a500203e38640a70bf9577": {
            "chainId": 1,
            "symbol": "Yf-DAI",
            "name": "YfDAI.finance",
            "address": "0xf4cd3d3fda8d7fd6c5a500203e38640a70bf9577",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf4cd3d3fda8d7fd6c5a500203e38640a70bf9577.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x83e6f1e41cdd28eaceb20cb649155049fac3d5aa": {
            "chainId": 1,
            "symbol": "POLS",
            "name": "PolkastarterToken",
            "address": "0x83e6f1e41cdd28eaceb20cb649155049fac3d5aa",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x83e6f1e41cdd28eaceb20cb649155049fac3d5aa.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:POLS",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xaf9f549774ecedbd0966c52f250acc548d3f36e5": {
            "chainId": 1,
            "symbol": "RFuel",
            "name": "Rio Fuel Token",
            "address": "0xaf9f549774ecedbd0966c52f250acc548d3f36e5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaf9f549774ecedbd0966c52f250acc548d3f36e5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0202be363b8a4820f3f4de7faf5224ff05943ab1": {
            "chainId": 1,
            "symbol": "UFT",
            "name": "UniLend Finance Token",
            "address": "0x0202be363b8a4820f3f4de7faf5224ff05943ab1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0202be363b8a4820f3f4de7faf5224ff05943ab1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Roll Social Money",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xae697f994fc5ebc000f8e22ebffee04612f98a0d": {
            "chainId": 1,
            "symbol": "LGCY",
            "name": "LGCY Network",
            "address": "0xae697f994fc5ebc000f8e22ebffee04612f98a0d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xae697f994fc5ebc000f8e22ebffee04612f98a0d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x9d47894f8becb68b9cf3428d256311affe8b068b": {
            "chainId": 1,
            "symbol": "$ROPE",
            "name": "$ROPE",
            "address": "0x9d47894f8becb68b9cf3428d256311affe8b068b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9d47894f8becb68b9cf3428d256311affe8b068b.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x72f020f8f3e8fd9382705723cd26380f8d0c66bb": {
            "chainId": 1,
            "symbol": "PLOT",
            "name": "PLOT",
            "address": "0x72f020f8f3e8fd9382705723cd26380f8d0c66bb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x72f020f8f3e8fd9382705723cd26380f8d0c66bb.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PLOT",
                "tokens"
            ]
        },
        "0x6a7ef4998eb9d0f706238756949f311a59e05745": {
            "chainId": 1,
            "symbol": "KEN",
            "name": "Kenysians Network",
            "address": "0x6a7ef4998eb9d0f706238756949f311a59e05745",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6a7ef4998eb9d0f706238756949f311a59e05745.png",
            "providers": [
                "1inch",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x20945ca1df56d237fd40036d47e866c7dccd2114": {
            "chainId": 1,
            "symbol": "Nsure",
            "name": "Nsure Network Token",
            "address": "0x20945ca1df56d237fd40036d47e866c7dccd2114",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x20945ca1df56d237fd40036d47e866c7dccd2114.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb753428af26e81097e7fd17f40c88aaa3e04902c": {
            "chainId": 1,
            "symbol": "SFI",
            "name": "Spice",
            "address": "0xb753428af26e81097e7fd17f40c88aaa3e04902c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb753428af26e81097e7fd17f40c88aaa3e04902c.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8888801af4d980682e47f1a9036e589479e835c5": {
            "chainId": 1,
            "symbol": "MPH",
            "name": "88mph.app",
            "address": "0x8888801af4d980682e47f1a9036e589479e835c5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8888801af4d980682e47f1a9036e589479e835c5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6468e79a80c0eab0f9a2b574c8d5bc374af59414": {
            "chainId": 1,
            "symbol": "eXRD",
            "name": "E-RADIX",
            "address": "0x6468e79a80c0eab0f9a2b574c8d5bc374af59414",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6468e79a80c0eab0f9a2b574c8d5bc374af59414.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3e780920601d61cedb860fe9c4a90c9ea6a35e78": {
            "chainId": 1,
            "symbol": "BOOST",
            "name": "Boosted Finance",
            "address": "0x3e780920601d61cedb860fe9c4a90c9ea6a35e78",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3e780920601d61cedb860fe9c4a90c9ea6a35e78.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0": {
            "chainId": 1,
            "symbol": "DF",
            "name": "dForce",
            "address": "0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4fe83213d56308330ec302a8bd641f1d0113a4cc": {
            "chainId": 1,
            "symbol": "NU",
            "name": "NuCypher",
            "address": "0x4fe83213d56308330ec302a8bd641f1d0113a4cc",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4fe83213d56308330ec302a8bd641f1d0113a4cc.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6e0dade58d2d89ebbe7afc384e3e4f15b70b14d8": {
            "chainId": 1,
            "symbol": "QRX",
            "name": "QuiverX",
            "address": "0x6e0dade58d2d89ebbe7afc384e3e4f15b70b14d8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6e0dade58d2d89ebbe7afc384e3e4f15b70b14d8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe88f8313e61a97cec1871ee37fbbe2a8bf3ed1e4": {
            "chainId": 1,
            "symbol": "VAL",
            "name": "Sora Validator Token",
            "address": "0xe88f8313e61a97cec1871ee37fbbe2a8bf3ed1e4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe88f8313e61a97cec1871ee37fbbe2a8bf3ed1e4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0b38210ea11411557c13457d4da7dc6ea731b88a": {
            "chainId": 1,
            "symbol": "API3",
            "name": "API3",
            "address": "0x0b38210ea11411557c13457d4da7dc6ea731b88a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0b38210ea11411557c13457d4da7dc6ea731b88a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a": {
            "chainId": 1,
            "symbol": "BAC",
            "name": "BAC",
            "address": "0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Kleros Tokens",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x26607ac599266b21d13c7acf7942c7701a8b699c": {
            "chainId": 1,
            "symbol": "PIPT",
            "name": "Power Index Pool Token",
            "address": "0x26607ac599266b21d13c7acf7942c7701a8b699c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x26607ac599266b21d13c7acf7942c7701a8b699c.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x07150e919b4de5fd6a63de1f9384828396f25fdc": {
            "chainId": 1,
            "symbol": "BASE",
            "name": "Base Protocol",
            "address": "0x07150e919b4de5fd6a63de1f9384828396f25fdc",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x07150e919b4de5fd6a63de1f9384828396f25fdc.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BASE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x91dfbee3965baaee32784c2d546b7a0c62f268c9": {
            "chainId": 1,
            "symbol": "BONDLY",
            "name": "Bondly",
            "address": "0x91dfbee3965baaee32784c2d546b7a0c62f268c9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x91dfbee3965baaee32784c2d546b7a0c62f268c9.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BONDLY",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206": {
            "chainId": 1,
            "symbol": "NEXO",
            "name": "Nexo",
            "address": "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206_0x639d2eea7d3a19ec015435f5e59125d19aff28713b8a6ff504e44c756ab985d2.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xffc97d72e13e01096502cb8eb52dee56f74dad7b": {
            "chainId": 1,
            "symbol": "aAAVE",
            "name": "Aave interest bearing AAVE",
            "address": "0xffc97d72e13e01096502cb8eb52dee56f74dad7b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xffc97d72e13e01096502cb8eb52dee56f74dad7b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x05ec93c0365baaeabf7aeffb0972ea7ecdd39cf1": {
            "chainId": 1,
            "symbol": "aBAT",
            "name": "Aave interest bearing BAT",
            "address": "0x05ec93c0365baaeabf7aeffb0972ea7ecdd39cf1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x05ec93c0365baaeabf7aeffb0972ea7ecdd39cf1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa361718326c15715591c299427c62086f69923d9": {
            "chainId": 1,
            "symbol": "aBUSD",
            "name": "Aave interest bearing BUSD",
            "address": "0xa361718326c15715591c299427c62086f69923d9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa361718326c15715591c299427c62086f69923d9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x028171bca77440897b824ca71d1c56cac55b68a3": {
            "chainId": 1,
            "symbol": "aDAI",
            "name": "Aave interest bearing DAI",
            "address": "0x028171bca77440897b824ca71d1c56cac55b68a3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x028171bca77440897b824ca71d1c56cac55b68a3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xac6df26a590f08dcc95d5a4705ae8abbc88509ef": {
            "chainId": 1,
            "symbol": "aENJ",
            "name": "Aave interest bearing ENJ",
            "address": "0xac6df26a590f08dcc95d5a4705ae8abbc88509ef",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xac6df26a590f08dcc95d5a4705ae8abbc88509ef.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x39c6b3e42d6a679d7d776778fe880bc9487c2eda": {
            "chainId": 1,
            "symbol": "aKNC",
            "name": "Aave interest bearing KNC",
            "address": "0x39c6b3e42d6a679d7d776778fe880bc9487c2eda",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x39c6b3e42d6a679d7d776778fe880bc9487c2eda.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0": {
            "chainId": 1,
            "symbol": "aLINK",
            "name": "Aave interest bearing LINK",
            "address": "0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa685a61171bb30d4072b338c80cb7b2c865c873e": {
            "chainId": 1,
            "symbol": "aMANA",
            "name": "Aave interest bearing MANA",
            "address": "0xa685a61171bb30d4072b338c80cb7b2c865c873e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa685a61171bb30d4072b338c80cb7b2c865c873e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc713e5e149d5d0715dcd1c156a020976e7e56b88": {
            "chainId": 1,
            "symbol": "aMKR",
            "name": "Aave interest bearing MKR",
            "address": "0xc713e5e149d5d0715dcd1c156a020976e7e56b88",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc713e5e149d5d0715dcd1c156a020976e7e56b88.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xcc12abe4ff81c9378d670de1b57f8e0dd228d77a": {
            "chainId": 1,
            "symbol": "aREN",
            "name": "Aave interest bearing REN",
            "address": "0xcc12abe4ff81c9378d670de1b57f8e0dd228d77a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcc12abe4ff81c9378d670de1b57f8e0dd228d77a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x35f6b052c598d933d69a4eec4d04c73a191fe6c2": {
            "chainId": 1,
            "symbol": "aSNX",
            "name": "Aave interest bearing SNX",
            "address": "0x35f6b052c598d933d69a4eec4d04c73a191fe6c2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x35f6b052c598d933d69a4eec4d04c73a191fe6c2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6c5024cd4f8a59110119c56f8933403a539555eb": {
            "chainId": 1,
            "symbol": "aSUSD",
            "name": "Aave interest bearing SUSD",
            "address": "0x6c5024cd4f8a59110119c56f8933403a539555eb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6c5024cd4f8a59110119c56f8933403a539555eb.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x101cc05f4a51c0319f570d5e146a8c625198e636": {
            "chainId": 1,
            "symbol": "aTUSD",
            "name": "Aave interest bearing TUSD",
            "address": "0x101cc05f4a51c0319f570d5e146a8c625198e636",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x101cc05f4a51c0319f570d5e146a8c625198e636.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1": {
            "chainId": 1,
            "symbol": "aUNI",
            "name": "Aave interest bearing UNI",
            "address": "0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xbcca60bb61934080951369a648fb03df4f96263c": {
            "chainId": 1,
            "symbol": "aUSDC",
            "name": "Aave interest bearing USDC",
            "address": "0xbcca60bb61934080951369a648fb03df4f96263c",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xbcca60bb61934080951369a648fb03df4f96263c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "PEG:USD",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x3ed3b47dd13ec9a98b44e6204a523e766b225811": {
            "chainId": 1,
            "symbol": "aUSDT",
            "name": "Aave interest bearing USDT",
            "address": "0x3ed3b47dd13ec9a98b44e6204a523e766b225811",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x3ed3b47dd13ec9a98b44e6204a523e766b225811.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656": {
            "chainId": 1,
            "symbol": "aWBTC",
            "name": "Aave interest bearing WBTC",
            "address": "0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "PEG:BTC",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x030ba81f1c18d280636f32af80b9aad02cf0854e": {
            "chainId": 1,
            "symbol": "aWETH",
            "name": "Aave interest bearing WETH",
            "address": "0x030ba81f1c18d280636f32af80b9aad02cf0854e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x030ba81f1c18d280636f32af80b9aad02cf0854e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "PEG:ETH",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x5165d24277cd063f5ac44efd447b27025e888f37": {
            "chainId": 1,
            "symbol": "aYFI",
            "name": "Aave interest bearing YFI",
            "address": "0x5165d24277cd063f5ac44efd447b27025e888f37",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5165d24277cd063f5ac44efd447b27025e888f37.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdf7ff54aacacbff42dfe29dd6144a69b629f8c9e": {
            "chainId": 1,
            "symbol": "aZRX",
            "name": "Aave interest bearing ZRX",
            "address": "0xdf7ff54aacacbff42dfe29dd6144a69b629f8c9e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xdf7ff54aacacbff42dfe29dd6144a69b629f8c9e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "aavev2",
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x57b946008913b82e4df85f501cbaed910e58d26c": {
            "chainId": 1,
            "symbol": "POND",
            "name": "Marlin POND",
            "address": "0x57b946008913b82e4df85f501cbaed910e58d26c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x57b946008913b82e4df85f501cbaed910e58d26c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3593d125a4f7849a1b059e64f4517a86dd60c95d": {
            "chainId": 1,
            "symbol": "OM",
            "name": "MANTRA DAO",
            "address": "0x3593d125a4f7849a1b059e64f4517a86dd60c95d",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x3593d125a4f7849a1b059e64f4517a86dd60c95d_0xfacfea46b8ee09ba1cdf4bbafe242d20c761b41fb64d1e6d19fda02572709084.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:OM",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0": {
            "chainId": 1,
            "symbol": "FXS",
            "name": "Frax Share",
            "address": "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:FXS",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x111111111117dc0aa78b770fa6a738034120c302": {
            "chainId": 1,
            "symbol": "1INCH",
            "name": "1INCH Token",
            "address": "0x111111111117dc0aa78b770fa6a738034120c302",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x111111111117dc0aa78b770fa6a738034120c302.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Uniswap Labs Default",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:1INCH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x368b3a58b5f49392e5c9e4c998cb0bb966752e51": {
            "chainId": 1,
            "symbol": "MIC",
            "name": "MIC",
            "address": "0x368b3a58b5f49392e5c9e4c998cb0bb966752e51",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x368b3a58b5f49392e5c9e4c998cb0bb966752e51.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x34950ff2b487d9e5282c5ab342d08a2f712eb79f": {
            "chainId": 1,
            "symbol": "WOZX",
            "name": "EFFORCE IEO",
            "address": "0x34950ff2b487d9e5282c5ab342d08a2f712eb79f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x34950ff2b487d9e5282c5ab342d08a2f712eb79f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc770eefad204b5180df6a14ee197d99d808ee52d": {
            "chainId": 1,
            "symbol": "FOX",
            "name": "FOX",
            "address": "0xc770eefad204b5180df6a14ee197d99d808ee52d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc770eefad204b5180df6a14ee197d99d808ee52d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FOX",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x66a0f676479cee1d7373f3dc2e2952778bff5bd6": {
            "chainId": 1,
            "symbol": "WISE",
            "name": "Wise Token",
            "address": "0x66a0f676479cee1d7373f3dc2e2952778bff5bd6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x66a0f676479cee1d7373f3dc2e2952778bff5bd6.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:WISE",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xffffffff2ba8f66d4e51811c5190992176930278": {
            "chainId": 1,
            "symbol": "COMBO",
            "name": "Furucombo",
            "address": "0xffffffff2ba8f66d4e51811c5190992176930278",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xffffffff2ba8f66d4e51811c5190992176930278.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:COMBO",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xaea46a60368a7bd060eec7df8cba43b7ef41ad85": {
            "chainId": 1,
            "symbol": "FET",
            "name": "Fetch",
            "address": "0xaea46a60368a7bd060eec7df8cba43b7ef41ad85",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaea46a60368a7bd060eec7df8cba43b7ef41ad85.png",
            "providers": [
                "1inch",
                "Agora dataFi Tokens",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "dataproc",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6c5ba91642f10282b576d91922ae6448c9d52f4e": {
            "chainId": 1,
            "symbol": "PHA",
            "name": "Phala",
            "address": "0x6c5ba91642f10282b576d91922ae6448c9d52f4e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6c5ba91642f10282b576d91922ae6448c9d52f4e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa8b12cc90abf65191532a12bb5394a714a46d358": {
            "chainId": 1,
            "symbol": "pBTC35A",
            "name": "POW BTC-35W/T",
            "address": "0xa8b12cc90abf65191532a12bb5394a714a46d358",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa8b12cc90abf65191532a12bb5394a714a46d358.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:BTC",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x853d955acef822db058eb8505911ed77f175b99e": {
            "chainId": 1,
            "symbol": "FRAX",
            "name": "Frax",
            "address": "0x853d955acef822db058eb8505911ed77f175b99e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x853d955acef822db058eb8505911ed77f175b99e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:FRAX",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xe28b3b32b6c345a34ff64674606124dd5aceca30": {
            "chainId": 1,
            "symbol": "INJ",
            "name": "Injective Token",
            "address": "0xe28b3b32b6c345a34ff64674606124dd5aceca30",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe28b3b32b6c345a34ff64674606124dd5aceca30.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:INJ",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x63b4f3e3fa4e438698ce330e365e831f7ccd1ef4": {
            "chainId": 1,
            "symbol": "CFi",
            "name": "CyberFi Token",
            "address": "0x63b4f3e3fa4e438698ce330e365e831f7ccd1ef4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x63b4f3e3fa4e438698ce330e365e831f7ccd1ef4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd291e7a03283640fdc51b121ac401383a46cc623": {
            "chainId": 1,
            "symbol": "RGT",
            "name": "Rari Governance Token",
            "address": "0xd291e7a03283640fdc51b121ac401383a46cc623",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd291e7a03283640fdc51b121ac401383a46cc623.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x87d73e916d7057945c9bcd8cdd94e42a6f47f776": {
            "chainId": 1,
            "symbol": "NFTX",
            "name": "NFTX",
            "address": "0x87d73e916d7057945c9bcd8cdd94e42a6f47f776",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x87d73e916d7057945c9bcd8cdd94e42a6f47f776.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f": {
            "chainId": 1,
            "symbol": "SDT",
            "name": "Stake DAO Token",
            "address": "0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:SDT",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9248c485b0b80f76da451f167a8db30f33c70907": {
            "chainId": 1,
            "symbol": "DEBASE",
            "name": "Debase",
            "address": "0x9248c485b0b80f76da451f167a8db30f33c70907",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9248c485b0b80f76da451f167a8db30f33c70907.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8290333cef9e6d528dd5618fb97a76f268f3edd4": {
            "chainId": 1,
            "symbol": "ANKR",
            "name": "Ankr Network",
            "address": "0x8290333cef9e6d528dd5618fb97a76f268f3edd4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8290333cef9e6d528dd5618fb97a76f268f3edd4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ANKR",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc719d010b63e5bbf2c0551872cd5316ed26acd83": {
            "chainId": 1,
            "symbol": "DIP",
            "name": "Decentralized Insurance Protocol",
            "address": "0xc719d010b63e5bbf2c0551872cd5316ed26acd83",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc719d010b63e5bbf2c0551872cd5316ed26acd83.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x3155ba85d5f96b2d030a4966af206230e46849cb": {
            "chainId": 1,
            "symbol": "RUNE",
            "name": "THORChain ETH.RUNE",
            "address": "0x3155ba85d5f96b2d030a4966af206230e46849cb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3155ba85d5f96b2d030a4966af206230e46849cb.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x374cb8c27130e2c9e04f44303f3c8351b9de61c1": {
            "chainId": 1,
            "symbol": "BAO",
            "name": "BaoToken",
            "address": "0x374cb8c27130e2c9e04f44303f3c8351b9de61c1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x374cb8c27130e2c9e04f44303f3c8351b9de61c1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xfe3e6a25e6b192a42a44ecddcd13796471735acf": {
            "chainId": 1,
            "symbol": "REEF",
            "name": "Reef.finance",
            "address": "0xfe3e6a25e6b192a42a44ecddcd13796471735acf",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfe3e6a25e6b192a42a44ecddcd13796471735acf.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:REEF",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x4c19596f5aaff459fa38b0f7ed92f11ae6543784": {
            "chainId": 1,
            "symbol": "TRU",
            "name": "TrueFi",
            "address": "0x4c19596f5aaff459fa38b0f7ed92f11ae6543784",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x4c19596f5aaff459fa38b0f7ed92f11ae6543784.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x67c597624b17b16fb77959217360b7cd18284253": {
            "chainId": 1,
            "symbol": "MARK",
            "name": "Benchmark",
            "address": "0x67c597624b17b16fb77959217360b7cd18284253",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x67c597624b17b16fb77959217360b7cd18284253.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf0939011a9bb95c3b791f0cb546377ed2693a574": {
            "chainId": 1,
            "symbol": "ZERO",
            "name": "Zero.Exchange Token",
            "address": "0xf0939011a9bb95c3b791f0cb546377ed2693a574",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf0939011a9bb95c3b791f0cb546377ed2693a574.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4c11249814f11b9346808179cf06e71ac328c1b5": {
            "chainId": 1,
            "symbol": "ORAI",
            "name": "Oraichain Token",
            "address": "0x4c11249814f11b9346808179cf06e71ac328c1b5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4c11249814f11b9346808179cf06e71ac328c1b5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x86ed939b500e121c0c5f493f399084db596dad20": {
            "chainId": 1,
            "symbol": "SPC",
            "name": "SpaceChainV2",
            "address": "0x86ed939b500e121c0c5f493f399084db596dad20",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x86ed939b500e121c0c5f493f399084db596dad20.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f": {
            "chainId": 1,
            "symbol": "RAMP",
            "name": "RAMP DEFI",
            "address": "0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:RAMP",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb987d48ed8f2c468d52d6405624eadba5e76d723": {
            "chainId": 1,
            "symbol": "STBZ",
            "name": "Stabilize Token",
            "address": "0xb987d48ed8f2c468d52d6405624eadba5e76d723",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb987d48ed8f2c468d52d6405624eadba5e76d723.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x159751323a9e0415dd3d6d42a1212fe9f4a0848c": {
            "chainId": 1,
            "symbol": "INFI",
            "name": "INFI",
            "address": "0x159751323a9e0415dd3d6d42a1212fe9f4a0848c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x159751323a9e0415dd3d6d42a1212fe9f4a0848c.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b": {
            "chainId": 1,
            "symbol": "CRO",
            "name": "CRO",
            "address": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa8b919680258d369114910511cc87595aec0be6d": {
            "chainId": 1,
            "symbol": "LYXe",
            "name": "LUKSO Token",
            "address": "0xa8b919680258d369114910511cc87595aec0be6d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa8b919680258d369114910511cc87595aec0be6d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd084b83c305dafd76ae3e1b4e1f1fe2ecccb3988": {
            "chainId": 1,
            "symbol": "TVK",
            "name": "Terra Virtua Kolect",
            "address": "0xd084b83c305dafd76ae3e1b4e1f1fe2ecccb3988",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd084b83c305dafd76ae3e1b4e1f1fe2ecccb3988.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa1faa113cbe53436df28ff0aee54275c13b40975": {
            "chainId": 1,
            "symbol": "ALPHA",
            "name": "AlphaToken",
            "address": "0xa1faa113cbe53436df28ff0aee54275c13b40975",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa1faa113cbe53436df28ff0aee54275c13b40975_1.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Uniswap Labs Default",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:ALPHA",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xde4ee8057785a7e8e800db58f9784845a5c2cbd6": {
            "chainId": 1,
            "symbol": "DEXE",
            "name": "Dexe",
            "address": "0xde4ee8057785a7e8e800db58f9784845a5c2cbd6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xde4ee8057785a7e8e800db58f9784845a5c2cbd6.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3845badade8e6dff049820680d1f14bd3903a5d0": {
            "chainId": 1,
            "symbol": "SAND",
            "name": "SAND",
            "address": "0x3845badade8e6dff049820680d1f14bd3903a5d0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3845badade8e6dff049820680d1f14bd3903a5d0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SAND",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xe5caef4af8780e59df925470b050fb23c43ca68c": {
            "chainId": 1,
            "symbol": "FRM",
            "name": "Ferrum Network Token",
            "address": "0xe5caef4af8780e59df925470b050fb23c43ca68c",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xe5caef4af8780e59df925470b050fb23c43ca68c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Roll Social Money"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FRM",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x298d492e8c1d909d3f63bc4a36c66c64acb3d695": {
            "chainId": 1,
            "symbol": "PBR",
            "name": "PolkaBridge",
            "address": "0x298d492e8c1d909d3f63bc4a36c66c64acb3d695",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x298d492e8c1d909d3f63bc4a36c66c64acb3d695.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfe9a29ab92522d14fc65880d817214261d8479ae": {
            "chainId": 1,
            "symbol": "SNOW",
            "name": "SnowSwap",
            "address": "0xfe9a29ab92522d14fc65880d817214261d8479ae",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfe9a29ab92522d14fc65880d817214261d8479ae.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1337def16f9b486faed0293eb623dc8395dfe46a": {
            "chainId": 1,
            "symbol": "ARMOR",
            "name": "Armor",
            "address": "0x1337def16f9b486faed0293eb623dc8395dfe46a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1337def16f9b486faed0293eb623dc8395dfe46a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x1337def18c680af1f9f45cbcab6309562975b1dd": {
            "chainId": 1,
            "symbol": "arNXM",
            "name": "Armor NXM",
            "address": "0x1337def18c680af1f9f45cbcab6309562975b1dd",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1337def18c680af1f9f45cbcab6309562975b1dd.png",
            "providers": [
                "1inch",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x888888888889c00c67689029d7856aac1065ec11": {
            "chainId": 1,
            "symbol": "OPIUM",
            "name": "Opium Governance Token",
            "address": "0x888888888889c00c67689029d7856aac1065ec11",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x888888888889c00c67689029d7856aac1065ec11.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17": {
            "chainId": 1,
            "symbol": "DYP",
            "name": "DeFiYieldProtocol",
            "address": "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe95a203b1a91a908f9b9ce46459d101078c2c3cb": {
            "chainId": 1,
            "symbol": "ankrETH",
            "name": "Ankr Staked ETH",
            "address": "0xe95a203b1a91a908f9b9ce46459d101078c2c3cb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe95a203b1a91a908f9b9ce46459d101078c2c3cb.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:ETH",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x4e15361fd6b4bb609fa63c81a2be19d873717870": {
            "chainId": 1,
            "symbol": "FTM",
            "name": "Fantom Token",
            "address": "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4e15361fd6b4bb609fa63c81a2be19d873717870.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FTM",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa47c8bf37f92abed4a126bda807a7b7498661acd": {
            "chainId": 1,
            "symbol": "UST",
            "name": "Wrapped UST Token",
            "address": "0xa47c8bf37f92abed4a126bda807a7b7498661acd",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa47c8bf37f92abed4a126bda807a7b7498661acd.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:UST",
                "RISK:availability",
                "tokens",
                "ust",
                "wrapped"
            ]
        },
        "0x09a3ecafa817268f77be1283176b946c4ff2e608": {
            "chainId": 1,
            "symbol": "MIR",
            "name": "Wrapped MIR Token",
            "address": "0x09a3ecafa817268f77be1283176b946c4ff2e608",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x09a3ecafa817268f77be1283176b946c4ff2e608.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "mir",
                "RISK:unverified",
                "tokens",
                "wrapped"
            ]
        },
        "0x725c263e32c72ddc3a19bea12c5a0479a81ee688": {
            "chainId": 1,
            "symbol": "BMI",
            "name": "Bridge Mutual",
            "address": "0x725c263e32c72ddc3a19bea12c5a0479a81ee688",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x725c263e32c72ddc3a19bea12c5a0479a81ee688.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0000000000095413afc295d19edeb1ad7b71c952": {
            "chainId": 1,
            "symbol": "LON",
            "name": "Tokenlon",
            "address": "0x0000000000095413afc295d19edeb1ad7b71c952",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0000000000095413afc295d19edeb1ad7b71c952.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "farming",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1f3f9d3068568f8040775be2e8c03c103c61f3af": {
            "chainId": 1,
            "symbol": "ARCH",
            "name": "Archer DAO Governance Token",
            "address": "0x1f3f9d3068568f8040775be2e8c03c103c61f3af",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1f3f9d3068568f8040775be2e8c03c103c61f3af.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xa393473d64d2f9f026b60b6df7859a689715d092": {
            "chainId": 1,
            "symbol": "LTX",
            "name": "Lattice Token",
            "address": "0xa393473d64d2f9f026b60b6df7859a689715d092",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xa393473d64d2f9f026b60b6df7859a689715d092.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe0ad1806fd3e7edf6ff52fdb822432e847411033": {
            "chainId": 1,
            "symbol": "ONX",
            "name": "OnX.finance",
            "address": "0xe0ad1806fd3e7edf6ff52fdb822432e847411033",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe0ad1806fd3e7edf6ff52fdb822432e847411033.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xef3a930e1ffffacd2fc13434ac81bd278b0ecc8d": {
            "chainId": 1,
            "symbol": "FIS",
            "name": "StaFi",
            "address": "0xef3a930e1ffffacd2fc13434ac81bd278b0ecc8d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xef3a930e1ffffacd2fc13434ac81bd278b0ecc8d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3e9bc21c9b189c09df3ef1b824798658d5011937": {
            "chainId": 1,
            "symbol": "LINA",
            "name": "Linear Token",
            "address": "0x3e9bc21c9b189c09df3ef1b824798658d5011937",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3e9bc21c9b189c09df3ef1b824798658d5011937.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:LINA",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb1f871ae9462f1b2c6826e88a7827e76f86751d4": {
            "chainId": 1,
            "symbol": "GNYerc20",
            "name": "GNYerc20",
            "address": "0xb1f871ae9462f1b2c6826e88a7827e76f86751d4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb1f871ae9462f1b2c6826e88a7827e76f86751d4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9aeb50f542050172359a0e1a25a9933bc8c01259": {
            "chainId": 1,
            "symbol": "OIN",
            "name": "oinfinance",
            "address": "0x9aeb50f542050172359a0e1a25a9933bc8c01259",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x9aeb50f542050172359a0e1a25a9933bc8c01259.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce": {
            "chainId": 1,
            "symbol": "SHIB",
            "name": "SHIBA INU",
            "address": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6d0f5149c502faf215c89ab306ec3e50b15e2892": {
            "chainId": 1,
            "symbol": "PRT",
            "name": "Portion Token",
            "address": "0x6d0f5149c502faf215c89ab306ec3e50b15e2892",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6d0f5149c502faf215c89ab306ec3e50b15e2892.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x8a9c4dfe8b9d8962b31e4e16f8321c44d48e246e": {
            "chainId": 1,
            "symbol": "NCT",
            "name": "NameChangeToken",
            "address": "0x8a9c4dfe8b9d8962b31e4e16f8321c44d48e246e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8a9c4dfe8b9d8962b31e4e16f8321c44d48e246e.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:NCT",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81": {
            "chainId": 1,
            "symbol": "MUSE",
            "name": "Muse",
            "address": "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xec681f28f4561c2a9534799aa38e0d36a83cf478": {
            "chainId": 1,
            "symbol": "YVS",
            "name": "YVS.Finance",
            "address": "0xec681f28f4561c2a9534799aa38e0d36a83cf478",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xec681f28f4561c2a9534799aa38e0d36a83cf478.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x7968bc6a03017ea2de509aaa816f163db0f35148": {
            "chainId": 1,
            "symbol": "HGET",
            "name": "Hedget",
            "address": "0x7968bc6a03017ea2de509aaa816f163db0f35148",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x7968bc6a03017ea2de509aaa816f163db0f35148.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x39795344cbcc76cc3fb94b9d1b15c23c2070c66d": {
            "chainId": 1,
            "symbol": "SHARE",
            "name": "Seigniorage Shares",
            "address": "0x39795344cbcc76cc3fb94b9d1b15c23c2070c66d",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x39795344cbcc76cc3fb94b9d1b15c23c2070c66d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9ed8e7c9604790f7ec589f99b94361d8aab64e5e": {
            "chainId": 1,
            "symbol": "UNISTAKE",
            "name": "Unistake",
            "address": "0x9ed8e7c9604790f7ec589f99b94361d8aab64e5e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9ed8e7c9604790f7ec589f99b94361d8aab64e5e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0": {
            "chainId": 1,
            "symbol": "DEXTF",
            "name": "DEXTF Token",
            "address": "0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DEXTF",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x018fb5af9d015af25592a014c4266a84143de7a0": {
            "chainId": 1,
            "symbol": "MP3",
            "name": "mp3",
            "address": "0x018fb5af9d015af25592a014c4266a84143de7a0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x018fb5af9d015af25592a014c4266a84143de7a0.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xb6ff96b8a8d214544ca0dbc9b33f7ad6503efd32": {
            "chainId": 1,
            "symbol": "SYNC",
            "name": "SYNC",
            "address": "0xb6ff96b8a8d214544ca0dbc9b33f7ad6503efd32",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb6ff96b8a8d214544ca0dbc9b33f7ad6503efd32.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf9fbe825bfb2bf3e387af0dc18cac8d87f29dea8": {
            "chainId": 1,
            "symbol": "RADAR",
            "name": "Radar",
            "address": "0xf9fbe825bfb2bf3e387af0dc18cac8d87f29dea8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf9fbe825bfb2bf3e387af0dc18cac8d87f29dea8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xc0ba369c8db6eb3924965e5c4fd0b4c1b91e305f": {
            "chainId": 1,
            "symbol": "DUCK",
            "name": "DLP Duck Token",
            "address": "0xc0ba369c8db6eb3924965e5c4fd0b4c1b91e305f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc0ba369c8db6eb3924965e5c4fd0b4c1b91e305f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xcca0c9c383076649604ee31b20248bc04fdf61ca": {
            "chainId": 1,
            "symbol": "BTMX",
            "name": "BitMax token",
            "address": "0xcca0c9c383076649604ee31b20248bc04fdf61ca",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcca0c9c383076649604ee31b20248bc04fdf61ca.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xebd9d99a3982d547c5bb4db7e3b1f9f14b67eb83": {
            "chainId": 1,
            "symbol": "ID",
            "name": "Everest ID",
            "address": "0xebd9d99a3982d547c5bb4db7e3b1f9f14b67eb83",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xebd9d99a3982d547c5bb4db7e3b1f9f14b67eb83.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ID",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7": {
            "chainId": 1,
            "symbol": "SKL",
            "name": "SKALE",
            "address": "0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0f51bb10119727a7e5ea3538074fb341f56b09ad": {
            "chainId": 1,
            "symbol": "DAO",
            "name": "DAO Maker",
            "address": "0x0f51bb10119727a7e5ea3538074fb341f56b09ad",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0f51bb10119727a7e5ea3538074fb341f56b09ad.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DAO",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x76c5449f4950f6338a393f53cda8b53b0cd3ca3a": {
            "chainId": 1,
            "symbol": "BT",
            "name": "BT.Finance",
            "address": "0x76c5449f4950f6338a393f53cda8b53b0cd3ca3a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x76c5449f4950f6338a393f53cda8b53b0cd3ca3a.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x6fc13eace26590b80cccab1ba5d51890577d83b2": {
            "chainId": 1,
            "symbol": "UMB",
            "name": "Umbrella",
            "address": "0x6fc13eace26590b80cccab1ba5d51890577d83b2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6fc13eace26590b80cccab1ba5d51890577d83b2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1456688345527be1f37e9e627da0837d6f08c925": {
            "chainId": 1,
            "symbol": "USDP_2",
            "name": "USDP Stablecoin",
            "address": "0x1456688345527be1f37e9e627da0837d6f08c925",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1456688345527be1f37e9e627da0837d6f08c925.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "tokens"
            ],
            "displayedSymbol": "USDP"
        },
        "0x23b608675a2b2fb1890d3abbd85c5775c51691d5": {
            "chainId": 1,
            "symbol": "SOCKS",
            "name": "Unisocks Edition 0",
            "address": "0x23b608675a2b2fb1890d3abbd85c5775c51691d5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x23b608675a2b2fb1890d3abbd85c5775c51691d5.png",
            "providers": [
                "1inch",
                "CMC200 ERC20",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9af15d7b8776fa296019979e70a5be53c714a7ec": {
            "chainId": 1,
            "symbol": "EVN",
            "name": "Evn Token",
            "address": "0x9af15d7b8776fa296019979e70a5be53c714a7ec",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9af15d7b8776fa296019979e70a5be53c714a7ec.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x196c81385bc536467433014042788eb707703934": {
            "chainId": 1,
            "symbol": "CTASK",
            "name": "CTASK Token",
            "address": "0x196c81385bc536467433014042788eb707703934",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x196c81385bc536467433014042788eb707703934.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x89bd2e7e388fab44ae88bef4e1ad12b4f1e0911c": {
            "chainId": 1,
            "symbol": "NUX",
            "name": "NUX Peanut.trade",
            "address": "0x89bd2e7e388fab44ae88bef4e1ad12b4f1e0911c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x89bd2e7e388fab44ae88bef4e1ad12b4f1e0911c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa0bed124a09ac2bd941b10349d8d224fe3c955eb": {
            "chainId": 1,
            "symbol": "DEPAY",
            "name": "DePay",
            "address": "0xa0bed124a09ac2bd941b10349d8d224fe3c955eb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa0bed124a09ac2bd941b10349d8d224fe3c955eb.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "Kleros Tokens",
                "MyCrypto Token List",
                "PancakeSwap Default List",
                "Set",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xb9ef770b6a5e12e45983c5d80545258aa38f3b78": {
            "chainId": 1,
            "symbol": "ZCN",
            "name": "0chain",
            "address": "0xb9ef770b6a5e12e45983c5d80545258aa38f3b78",
            "decimals": 10,
            "logoURI": "https://tokens.1inch.io/0xb9ef770b6a5e12e45983c5d80545258aa38f3b78.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xadb2437e6f65682b85f814fbc12fec0508a7b1d0": {
            "chainId": 1,
            "symbol": "UNCX",
            "name": "UniCrypt",
            "address": "0xadb2437e6f65682b85f814fbc12fec0508a7b1d0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xadb2437e6f65682b85f814fbc12fec0508a7b1d0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xed40834a13129509a89be39a9be9c0e96a0ddd71": {
            "chainId": 1,
            "symbol": "WARP",
            "name": "Warp Token",
            "address": "0xed40834a13129509a89be39a9be9c0e96a0ddd71",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xed40834a13129509a89be39a9be9c0e96a0ddd71.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x0488401c3f535193fa8df029d9ffe615a06e74e6": {
            "chainId": 1,
            "symbol": "SRK",
            "name": "SparkPoint",
            "address": "0x0488401c3f535193fa8df029d9ffe615a06e74e6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0488401c3f535193fa8df029d9ffe615a06e74e6.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x038a68ff68c393373ec894015816e33ad41bd564": {
            "chainId": 1,
            "symbol": "GLCH",
            "name": "Glitch",
            "address": "0x038a68ff68c393373ec894015816e33ad41bd564",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x038a68ff68c393373ec894015816e33ad41bd564.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x10be9a8dae441d276a5027936c3aaded2d82bc15": {
            "chainId": 1,
            "symbol": "UMX",
            "name": "https://unimex.network/",
            "address": "0x10be9a8dae441d276a5027936c3aaded2d82bc15",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x10be9a8dae441d276a5027936c3aaded2d82bc15.png",
            "providers": [
                "1inch",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5f0e628b693018f639d10e4a4f59bd4d8b2b6b44": {
            "chainId": 1,
            "symbol": "WHITE",
            "name": "Whiteheart Token",
            "address": "0x5f0e628b693018f639d10e4a4f59bd4d8b2b6b44",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5f0e628b693018f639d10e4a4f59bd4d8b2b6b44.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3597bfd533a99c9aa083587b074434e61eb0a258": {
            "chainId": 1,
            "symbol": "DENT",
            "name": "DENT",
            "address": "0x3597bfd533a99c9aa083587b074434e61eb0a258",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x3597bfd533a99c9aa083587b074434e61eb0a258.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1b40183efb4dd766f11bda7a7c3ad8982e998421": {
            "chainId": 1,
            "symbol": "VSP",
            "name": "VesperToken",
            "address": "0x1b40183efb4dd766f11bda7a7c3ad8982e998421",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1b40183efb4dd766f11bda7a7c3ad8982e998421.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xed0439eacf4c4965ae4613d77a5c2efe10e5f183": {
            "chainId": 1,
            "symbol": "SHROOM",
            "name": "shroom.finance",
            "address": "0xed0439eacf4c4965ae4613d77a5c2efe10e5f183",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xed0439eacf4c4965ae4613d77a5c2efe10e5f183.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xaac41ec512808d64625576eddd580e7ea40ef8b2": {
            "chainId": 1,
            "symbol": "GSWAP",
            "name": "gameswap.org",
            "address": "0xaac41ec512808d64625576eddd580e7ea40ef8b2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaac41ec512808d64625576eddd580e7ea40ef8b2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919": {
            "chainId": 1,
            "symbol": "RAI",
            "name": "Rai Reflex Index",
            "address": "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x03ab458634910aad20ef5f1c8ee96f1d6ac54919.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Kleros Tokens",
                "Trust Wallet Assets",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:RAI",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfc05987bd2be489accf0f509e44b0145d68240f7": {
            "chainId": 1,
            "symbol": "ESS",
            "name": "ESSENTIA",
            "address": "0xfc05987bd2be489accf0f509e44b0145d68240f7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfc05987bd2be489accf0f509e44b0145d68240f7.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7ca4408137eb639570f8e647d9bd7b7e8717514a": {
            "chainId": 1,
            "symbol": "ALPA",
            "name": "AlpaToken",
            "address": "0x7ca4408137eb639570f8e647d9bd7b7e8717514a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7ca4408137eb639570f8e647d9bd7b7e8717514a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ALPA",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa58a4f5c4bb043d2cc1e170613b74e767c94189b": {
            "chainId": 1,
            "symbol": "UTU",
            "name": "UTU Coin",
            "address": "0xa58a4f5c4bb043d2cc1e170613b74e767c94189b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa58a4f5c4bb043d2cc1e170613b74e767c94189b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x7eaf9c89037e4814dc0d9952ac7f888c784548db": {
            "chainId": 1,
            "symbol": "ROYA",
            "name": "Royale",
            "address": "0x7eaf9c89037e4814dc0d9952ac7f888c784548db",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7eaf9c89037e4814dc0d9952ac7f888c784548db.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70": {
            "chainId": 1,
            "symbol": "PREMIA",
            "name": "Premia",
            "address": "0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Synthetix",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PREMIA",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0cec1a9154ff802e7934fc916ed7ca50bde6844e": {
            "chainId": 1,
            "symbol": "POOL",
            "name": "PoolTogether",
            "address": "0x0cec1a9154ff802e7934fc916ed7ca50bde6844e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0cec1a9154ff802e7934fc916ed7ca50bde6844e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x72e9d9038ce484ee986fea183f8d8df93f9ada13": {
            "chainId": 1,
            "symbol": "SMARTCREDIT",
            "name": "SMARTCREDIT Token",
            "address": "0x72e9d9038ce484ee986fea183f8d8df93f9ada13",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x72e9d9038ce484ee986fea183f8d8df93f9ada13.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xcb5f72d37685c3d5ad0bb5f982443bc8fcdf570e": {
            "chainId": 1,
            "symbol": "ROOT",
            "name": "RootKit",
            "address": "0xcb5f72d37685c3d5ad0bb5f982443bc8fcdf570e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcb5f72d37685c3d5ad0bb5f982443bc8fcdf570e.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x557b933a7c2c45672b610f8954a3deb39a51a8ca": {
            "chainId": 1,
            "symbol": "REVV",
            "name": "REVV",
            "address": "0x557b933a7c2c45672b610f8954a3deb39a51a8ca",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x557b933a7c2c45672b610f8954a3deb39a51a8ca.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:REVV",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4": {
            "chainId": 1,
            "symbol": "KIT",
            "name": "DexKit",
            "address": "0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x4691937a7508860f876c9c0a2a617e7d9e945d4b": {
            "chainId": 1,
            "symbol": "WOO",
            "name": "Wootrade Network",
            "address": "0x4691937a7508860f876c9c0a2a617e7d9e945d4b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4691937a7508860f876c9c0a2a617e7d9e945d4b.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Uniswap Labs Default",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:WOO",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf1f955016ecbcd7321c7266bccfb96c68ea5e49b": {
            "chainId": 1,
            "symbol": "RLY",
            "name": "Rally",
            "address": "0xf1f955016ecbcd7321c7266bccfb96c68ea5e49b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf1f955016ecbcd7321c7266bccfb96c68ea5e49b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x16980b3b4a3f9d89e33311b5aa8f80303e5ca4f8": {
            "chainId": 1,
            "symbol": "KEX",
            "name": "KIRA Network",
            "address": "0x16980b3b4a3f9d89e33311b5aa8f80303e5ca4f8",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x16980b3b4a3f9d89e33311b5aa8f80303e5ca4f8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c": {
            "chainId": 1,
            "symbol": "UOS",
            "name": "Ultra Token",
            "address": "0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c",
            "decimals": 4,
            "logoURI": "https://tokens.1inch.io/0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x147faf8de9d8d8daae129b187f0d02d819126750": {
            "chainId": 1,
            "symbol": "GEO",
            "name": "GeoDB Coin",
            "address": "0x147faf8de9d8d8daae129b187f0d02d819126750",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x147faf8de9d8d8daae129b187f0d02d819126750.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x8a854288a5976036a725879164ca3e91d30c6a1b": {
            "chainId": 1,
            "symbol": "GET",
            "name": "GET",
            "address": "0x8a854288a5976036a725879164ca3e91d30c6a1b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8a854288a5976036a725879164ca3e91d30c6a1b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:GET",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3a880652f47bfaa771908c07dd8673a787daed3a": {
            "chainId": 1,
            "symbol": "DDX",
            "name": "DerivaDAO",
            "address": "0x3a880652f47bfaa771908c07dd8673a787daed3a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3a880652f47bfaa771908c07dd8673a787daed3a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa1d6df714f91debf4e0802a542e13067f31b8262": {
            "chainId": 1,
            "symbol": "RFOX",
            "name": "RFOX",
            "address": "0xa1d6df714f91debf4e0802a542e13067f31b8262",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa1d6df714f91debf4e0802a542e13067f31b8262.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x275f5ad03be0fa221b4c6649b8aee09a42d9412a": {
            "chainId": 1,
            "symbol": "MONA",
            "name": "Monavale",
            "address": "0x275f5ad03be0fa221b4c6649b8aee09a42d9412a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x275f5ad03be0fa221b4c6649b8aee09a42d9412a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MONA",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x9b53e429b0badd98ef7f01f03702986c516a5715": {
            "chainId": 1,
            "symbol": "HY",
            "name": "hybrix hydra",
            "address": "0x9b53e429b0badd98ef7f01f03702986c516a5715",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9b53e429b0badd98ef7f01f03702986c516a5715.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55": {
            "chainId": 1,
            "symbol": "SUPER",
            "name": "SuperFarm",
            "address": "0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SUPER",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x69af81e73a73b40adf4f3d4223cd9b1ece623074": {
            "chainId": 1,
            "symbol": "MASK",
            "name": "Mask Network",
            "address": "0x69af81e73a73b40adf4f3d4223cd9b1ece623074",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x69af81e73a73b40adf4f3d4223cd9b1ece623074.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7777777777697cfeecf846a76326da79cc606517": {
            "chainId": 1,
            "symbol": "SIG",
            "name": "xSigma",
            "address": "0x7777777777697cfeecf846a76326da79cc606517",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7777777777697cfeecf846a76326da79cc606517.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xf5581dfefd8fb0e4aec526be659cfab1f8c781da": {
            "chainId": 1,
            "symbol": "HOPR",
            "name": "HOPR Token",
            "address": "0xf5581dfefd8fb0e4aec526be659cfab1f8c781da",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf5581dfefd8fb0e4aec526be659cfab1f8c781da.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24": {
            "chainId": 1,
            "symbol": "RNDR",
            "name": "Render Token",
            "address": "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:RNDR",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x21bfbda47a0b4b5b1248c767ee49f7caa9b23697": {
            "chainId": 1,
            "symbol": "OVR",
            "name": "OVR",
            "address": "0x21bfbda47a0b4b5b1248c767ee49f7caa9b23697",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x21bfbda47a0b4b5b1248c767ee49f7caa9b23697.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Synthetix",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2e1e15c44ffe4df6a0cb7371cd00d5028e571d14": {
            "chainId": 1,
            "symbol": "MTLX",
            "name": "Mettalex",
            "address": "0x2e1e15c44ffe4df6a0cb7371cd00d5028e571d14",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2e1e15c44ffe4df6a0cb7371cd00d5028e571d14.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd478161c952357f05f0292b56012cd8457f1cfbf": {
            "chainId": 1,
            "symbol": "POLK",
            "name": "Polkamarkets",
            "address": "0xd478161c952357f05f0292b56012cd8457f1cfbf",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd478161c952357f05f0292b56012cd8457f1cfbf.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6e9730ecffbed43fd876a264c982e254ef05a0de": {
            "chainId": 1,
            "symbol": "NORD",
            "name": "Nord Token",
            "address": "0x6e9730ecffbed43fd876a264c982e254ef05a0de",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6e9730ecffbed43fd876a264c982e254ef05a0de.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0c7d5ae016f806603cb1782bea29ac69471cab9c": {
            "chainId": 1,
            "symbol": "BFC",
            "name": "Bifrost",
            "address": "0x0c7d5ae016f806603cb1782bea29ac69471cab9c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0c7d5ae016f806603cb1782bea29ac69471cab9c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd23ac27148af6a2f339bd82d0e3cff380b5093de": {
            "chainId": 1,
            "symbol": "SI",
            "name": "SIREN",
            "address": "0xd23ac27148af6a2f339bd82d0e3cff380b5093de",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd23ac27148af6a2f339bd82d0e3cff380b5093de.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4c25bdf026ea05f32713f00f73ca55857fbf6342": {
            "chainId": 1,
            "symbol": "FONT",
            "name": "Font",
            "address": "0x4c25bdf026ea05f32713f00f73ca55857fbf6342",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4c25bdf026ea05f32713f00f73ca55857fbf6342.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FONT",
                "tokens"
            ]
        },
        "0x68a3637ba6e75c0f66b61a42639c4e9fcd3d4824": {
            "chainId": 1,
            "symbol": "MOON",
            "name": "MoonToken",
            "address": "0x68a3637ba6e75c0f66b61a42639c4e9fcd3d4824",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x68a3637ba6e75c0f66b61a42639c4e9fcd3d4824.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x4b1e80cac91e2216eeb63e29b957eb91ae9c2be8": {
            "chainId": 1,
            "symbol": "JUP",
            "name": "Jupiter",
            "address": "0x4b1e80cac91e2216eeb63e29b957eb91ae9c2be8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4b1e80cac91e2216eeb63e29b957eb91ae9c2be8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x739763a258640919981f9ba610ae65492455be53": {
            "chainId": 1,
            "symbol": "NDR",
            "name": "NodeRunners",
            "address": "0x739763a258640919981f9ba610ae65492455be53",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x739763a258640919981f9ba610ae65492455be53.png",
            "providers": [
                "1inch",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x31c8eacbffdd875c74b94b077895bd78cf1e64a3": {
            "chainId": 1,
            "symbol": "RAD",
            "name": "Radicle",
            "address": "0x31c8eacbffdd875c74b94b077895bd78cf1e64a3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x31c8eacbffdd875c74b94b077895bd78cf1e64a3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdbdb4d16eda451d0503b854cf79d55697f90c8df": {
            "chainId": 1,
            "symbol": "ALCX",
            "name": "Alchemix",
            "address": "0xdbdb4d16eda451d0503b854cf79d55697f90c8df",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xdbdb4d16eda451d0503b854cf79d55697f90c8df.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x24a6a37576377f63f194caa5f518a60f45b42921": {
            "chainId": 1,
            "symbol": "BANK_1",
            "name": "Float Bank",
            "address": "0x24a6a37576377f63f194caa5f518a60f45b42921",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x24a6a37576377f63f194caa5f518a60f45b42921.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ],
            "displayedSymbol": "BANK"
        },
        "0x9b99cca871be05119b2012fd4474731dd653febe": {
            "chainId": 1,
            "symbol": "MATTER",
            "name": "Antimatter.Finance Governance Token",
            "address": "0x9b99cca871be05119b2012fd4474731dd653febe",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f_1.png",
            "providers": [
                "1inch",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xf411903cbc70a74d22900a5de66a2dda66507255": {
            "chainId": 1,
            "symbol": "VRA",
            "name": "VERA",
            "address": "0xf411903cbc70a74d22900a5de66a2dda66507255",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf411903cbc70a74d22900a5de66a2dda66507255.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf3dcbc6d72a4e1892f7917b7c43b74131df8480e": {
            "chainId": 1,
            "symbol": "BDP",
            "name": "BDPToken",
            "address": "0xf3dcbc6d72a4e1892f7917b7c43b74131df8480e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf3dcbc6d72a4e1892f7917b7c43b74131df8480e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbbc2ae13b23d715c30720f079fcd9b4a74093505": {
            "chainId": 1,
            "symbol": "ERN",
            "name": "@EthernityChain $ERN Token",
            "address": "0xbbc2ae13b23d715c30720f079fcd9b4a74093505",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbbc2ae13b23d715c30720f079fcd9b4a74093505.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x892a6f9df0147e5f079b0993f486f9aca3c87881": {
            "chainId": 1,
            "symbol": "xFUND",
            "name": "unification.com/xfund",
            "address": "0x892a6f9df0147e5f079b0993f486f9aca3c87881",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x892a6f9df0147e5f079b0993f486f9aca3c87881.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x7a5ce6abd131ea6b148a022cb76fc180ae3315a6": {
            "chainId": 1,
            "symbol": "bALPHA",
            "name": "bAlpha",
            "address": "0x7a5ce6abd131ea6b148a022cb76fc180ae3315a6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7a5ce6abd131ea6b148a022cb76fc180ae3315a6.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3506424f91fd33084466f402d5d97f05f8e3b4af": {
            "chainId": 1,
            "symbol": "CHZ",
            "name": "chiliZ",
            "address": "0x3506424f91fd33084466f402d5d97f05f8e3b4af",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3506424f91fd33084466f402d5d97f05f8e3b4af.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68": {
            "chainId": 1,
            "symbol": "INV",
            "name": "Inverse DAO",
            "address": "0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xeeaa40b28a2d1b0b08f6f97bb1dd4b75316c6107": {
            "chainId": 1,
            "symbol": "GOVI",
            "name": "GOVI",
            "address": "0xeeaa40b28a2d1b0b08f6f97bb1dd4b75316c6107",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xeeaa40b28a2d1b0b08f6f97bb1dd4b75316c6107.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:GOVI",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcf3c8be2e2c42331da80ef210e9b1b307c03d36a": {
            "chainId": 1,
            "symbol": "BEPRO",
            "name": "BetProtocolToken",
            "address": "0xcf3c8be2e2c42331da80ef210e9b1b307c03d36a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcf3c8be2e2c42331da80ef210e9b1b307c03d36a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1cbb83ebcd552d5ebf8131ef8c9cd9d9bab342bc": {
            "chainId": 1,
            "symbol": "NFY",
            "name": "Non-Fungible Yearn",
            "address": "0x1cbb83ebcd552d5ebf8131ef8c9cd9d9bab342bc",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1cbb83ebcd552d5ebf8131ef8c9cd9d9bab342bc.png",
            "providers": [
                "1inch",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x888888435fde8e7d4c54cab67f206e4199454c60": {
            "chainId": 1,
            "symbol": "DFX",
            "name": "DFX Token",
            "address": "0x888888435fde8e7d4c54cab67f206e4199454c60",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x888888435fde8e7d4c54cab67f206e4199454c60.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DFX",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xed30dd7e50edf3581ad970efc5d9379ce2614adb": {
            "chainId": 1,
            "symbol": "ARCX",
            "name": "ARC Governance Token",
            "address": "0xed30dd7e50edf3581ad970efc5d9379ce2614adb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xed30dd7e50edf3581ad970efc5d9379ce2614adb.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xcd91538b91b4ba7797d39a2f66e63810b50a33d0": {
            "chainId": 1,
            "symbol": "STABLEx",
            "name": "ARC STABLEx",
            "address": "0xcd91538b91b4ba7797d39a2f66e63810b50a33d0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcd91538b91b4ba7797d39a2f66e63810b50a33d0.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x940a2db1b7008b6c776d4faaca729d6d4a4aa551": {
            "chainId": 1,
            "symbol": "DUSK",
            "name": "Dusk Network",
            "address": "0x940a2db1b7008b6c776d4faaca729d6d4a4aa551",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x940a2db1b7008b6c776d4faaca729d6d4a4aa551.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DUSK",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9": {
            "chainId": 1,
            "symbol": "FTX Token",
            "name": "FTT",
            "address": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x037a54aab062628c9bbae1fdb1583c195585fe41": {
            "chainId": 1,
            "symbol": "LCX",
            "name": "LCX",
            "address": "0x037a54aab062628c9bbae1fdb1583c195585fe41",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x037a54aab062628c9bbae1fdb1583c195585fe41.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x32a7c02e79c4ea1008dd6564b35f131428673c41": {
            "chainId": 1,
            "symbol": "CRU",
            "name": "CRUST",
            "address": "0x32a7c02e79c4ea1008dd6564b35f131428673c41",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x32a7c02e79c4ea1008dd6564b35f131428673c41.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1c9922314ed1415c95b9fd453c3818fd41867d0b": {
            "chainId": 1,
            "symbol": "TOWER",
            "name": "TOWER",
            "address": "0x1c9922314ed1415c95b9fd453c3818fd41867d0b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1c9922314ed1415c95b9fd453c3818fd41867d0b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:TOWER",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa8b61cff52564758a204f841e636265bebc8db9b": {
            "chainId": 1,
            "symbol": "YIELD",
            "name": "Yield Protocol",
            "address": "0xa8b61cff52564758a204f841e636265bebc8db9b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa8b61cff52564758a204f841e636265bebc8db9b.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x850aab69f0e0171a9a49db8be3e71351c8247df4": {
            "chainId": 1,
            "symbol": "KONO",
            "name": "Konomi",
            "address": "0x850aab69f0e0171a9a49db8be3e71351c8247df4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x850aab69f0e0171a9a49db8be3e71351c8247df4.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xac3211a5025414af2866ff09c23fc18bc97e79b1": {
            "chainId": 1,
            "symbol": "DOV",
            "name": "DOVU",
            "address": "0xac3211a5025414af2866ff09c23fc18bc97e79b1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xac3211a5025414af2866ff09c23fc18bc97e79b1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x73374ea518de7addd4c2b624c0e8b113955ee041": {
            "chainId": 1,
            "symbol": "JGN",
            "name": "Juggernaut DeFi",
            "address": "0x73374ea518de7addd4c2b624c0e8b113955ee041",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x73374ea518de7addd4c2b624c0e8b113955ee041.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:JGN",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfad45e47083e4607302aa43c65fb3106f1cd7607": {
            "chainId": 1,
            "symbol": "HOGE",
            "name": "hoge.finance",
            "address": "0xfad45e47083e4607302aa43c65fb3106f1cd7607",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xfad45e47083e4607302aa43c65fb3106f1cd7607.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xe9a95d175a5f4c9369f3b74222402eb1b837693b": {
            "chainId": 1,
            "symbol": "NOW",
            "name": "ChangeNOW",
            "address": "0xe9a95d175a5f4c9369f3b74222402eb1b837693b",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xe9a95d175a5f4c9369f3b74222402eb1b837693b.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdea67845a51e24461d5fed8084e69b426af3d5db": {
            "chainId": 1,
            "symbol": "HTRE",
            "name": "HodlTree",
            "address": "0xdea67845a51e24461d5fed8084e69b426af3d5db",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xdea67845a51e24461d5fed8084e69b426af3d5db.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x8b39b70e39aa811b69365398e0aace9bee238aeb": {
            "chainId": 1,
            "symbol": "PKF",
            "name": "PolkaFoundry",
            "address": "0x8b39b70e39aa811b69365398e0aace9bee238aeb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8b39b70e39aa811b69365398e0aace9bee238aeb.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb20043f149817bff5322f1b928e89abfc65a9925": {
            "chainId": 1,
            "symbol": "EXRT",
            "name": "EXRT",
            "address": "0xb20043f149817bff5322f1b928e89abfc65a9925",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xb20043f149817bff5322f1b928e89abfc65a9925.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x14da7b27b2e0fedefe0a664118b0c9bc68e2e9af": {
            "chainId": 1,
            "symbol": "BCUG",
            "name": "Blockchain Cuties Universe Governance Token",
            "address": "0x14da7b27b2e0fedefe0a664118b0c9bc68e2e9af",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x14da7b27b2e0fedefe0a664118b0c9bc68e2e9af.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcbfef8fdd706cde6f208460f2bf39aa9c785f05d": {
            "chainId": 1,
            "symbol": "KINE",
            "name": "Kine Governance Token",
            "address": "0xcbfef8fdd706cde6f208460f2bf39aa9c785f05d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcbfef8fdd706cde6f208460f2bf39aa9c785f05d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54": {
            "chainId": 1,
            "symbol": "HAPI",
            "name": "HAPI",
            "address": "0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc5bddf9843308380375a611c18b50fb9341f502a": {
            "chainId": 1,
            "symbol": "yveCRV-DAO",
            "name": "veCRV-DAO yVault",
            "address": "0xc5bddf9843308380375a611c18b50fb9341f502a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc5bddf9843308380375a611c18b50fb9341f502a.png",
            "providers": [
                "1inch",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb9d99c33ea2d86ec5ec6b8a4dd816ebba64404af": {
            "chainId": 1,
            "symbol": "K21",
            "name": "k21.kanon.art",
            "address": "0xb9d99c33ea2d86ec5ec6b8a4dd816ebba64404af",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb9d99c33ea2d86ec5ec6b8a4dd816ebba64404af.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa42f266684ac2ad6ecb00df95b1c76efbb6f136c": {
            "chainId": 1,
            "symbol": "CATE",
            "name": "Cash Tech",
            "address": "0xa42f266684ac2ad6ecb00df95b1c76efbb6f136c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa42f266684ac2ad6ecb00df95b1c76efbb6f136c.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc4c2614e694cf534d407ee49f8e44d125e4681c4": {
            "chainId": 1,
            "symbol": "CHAIN",
            "name": "Chain Games",
            "address": "0xc4c2614e694cf534d407ee49f8e44d125e4681c4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc4c2614e694cf534d407ee49f8e44d125e4681c4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:CHAIN",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24": {
            "chainId": 1,
            "symbol": "GLQ",
            "name": "GraphLinq",
            "address": "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc690f7c7fcffa6a82b79fab7508c466fefdfc8c5": {
            "chainId": 1,
            "symbol": "LYM",
            "name": "Lympo tokens",
            "address": "0xc690f7c7fcffa6a82b79fab7508c466fefdfc8c5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc690f7c7fcffa6a82b79fab7508c466fefdfc8c5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3d3d35bb9bec23b06ca00fe472b50e7a4c692c30": {
            "chainId": 1,
            "symbol": "VIDYA",
            "name": "Vidya",
            "address": "0x3d3d35bb9bec23b06ca00fe472b50e7a4c692c30",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3d3d35bb9bec23b06ca00fe472b50e7a4c692c30.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xfc979087305a826c2b2a0056cfaba50aad3e6439": {
            "chainId": 1,
            "symbol": "DAFI",
            "name": "DAFI Token",
            "address": "0xfc979087305a826c2b2a0056cfaba50aad3e6439",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfc979087305a826c2b2a0056cfaba50aad3e6439.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xceb286c9604c542d3cc08b41aa6c9675b078a832": {
            "chainId": 1,
            "symbol": "VTX",
            "name": "Vortex DeFi",
            "address": "0xceb286c9604c542d3cc08b41aa6c9675b078a832",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xceb286c9604c542d3cc08b41aa6c9675b078a832.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b": {
            "chainId": 1,
            "symbol": "TRIBE",
            "name": "Tribe",
            "address": "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc7283b66eb1eb5fb86327f08e1b5816b0720212b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x956f47f50a910163d8bf957cf5846d573e7f87ca": {
            "chainId": 1,
            "symbol": "FEI",
            "name": "Fei USD",
            "address": "0x956f47f50a910163d8bf957cf5846d573e7f87ca",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x956f47f50a910163d8bf957cf5846d573e7f87ca.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x70e8de73ce538da2beed35d14187f6959a8eca96": {
            "chainId": 1,
            "symbol": "XSGD",
            "name": "XSGD",
            "address": "0x70e8de73ce538da2beed35d14187f6959a8eca96",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x70e8de73ce538da2beed35d14187f6959a8eca96.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:XSGD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x626e8036deb333b408be468f951bdb42433cbf18": {
            "chainId": 1,
            "symbol": "AIOZ",
            "name": "AIOZ Network",
            "address": "0x626e8036deb333b408be468f951bdb42433cbf18",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x626e8036deb333b408be468f951bdb42433cbf18.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1796ae0b0fa4862485106a0de9b654efe301d0b2": {
            "chainId": 1,
            "symbol": "PMON",
            "name": "Polkamon",
            "address": "0x1796ae0b0fa4862485106a0de9b654efe301d0b2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1796ae0b0fa4862485106a0de9b654efe301d0b2.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BA ERC20 SEC Action",
                "BORGSWAP",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf293d23bf2cdc05411ca0eddd588eb1977e8dcd4": {
            "chainId": 1,
            "symbol": "SYLO",
            "name": "Sylo",
            "address": "0xf293d23bf2cdc05411ca0eddd588eb1977e8dcd4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf293d23bf2cdc05411ca0eddd588eb1977e8dcd4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1735db6ab5baa19ea55d0adceed7bcdc008b3136": {
            "chainId": 1,
            "symbol": "URQA",
            "name": "UREEQA Token",
            "address": "0x1735db6ab5baa19ea55d0adceed7bcdc008b3136",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1735db6ab5baa19ea55d0adceed7bcdc008b3136.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xff75ced57419bcaebe5f05254983b013b0646ef5": {
            "chainId": 1,
            "symbol": "COOK",
            "name": "Cook Token",
            "address": "0xff75ced57419bcaebe5f05254983b013b0646ef5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xff75ced57419bcaebe5f05254983b013b0646ef5.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:COOK",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x26c8afbbfe1ebaca03c2bb082e69d0476bffe099": {
            "chainId": 1,
            "symbol": "CELL",
            "name": "Cellframe Token",
            "address": "0x26c8afbbfe1ebaca03c2bb082e69d0476bffe099",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x26c8afbbfe1ebaca03c2bb082e69d0476bffe099.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5b09a0371c1da44a8e24d36bf5deb1141a84d875": {
            "chainId": 1,
            "symbol": "MAD",
            "name": "MADToken",
            "address": "0x5b09a0371c1da44a8e24d36bf5deb1141a84d875",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5b09a0371c1da44a8e24d36bf5deb1141a84d875.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xc834fa996fa3bec7aad3693af486ae53d8aa8b50": {
            "chainId": 1,
            "symbol": "CONV",
            "name": "Convergence",
            "address": "0xc834fa996fa3bec7aad3693af486ae53d8aa8b50",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc834fa996fa3bec7aad3693af486ae53d8aa8b50.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x106538cc16f938776c7c180186975bca23875287": {
            "chainId": 1,
            "symbol": "BASv2",
            "name": "BASv2",
            "address": "0x106538cc16f938776c7c180186975bca23875287",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x106538cc16f938776c7c180186975bca23875287.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3505f494c3f0fed0b594e01fa41dd3967645ca39": {
            "chainId": 1,
            "symbol": "SWM",
            "name": "SWARM",
            "address": "0x3505f494c3f0fed0b594e01fa41dd3967645ca39",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3505f494c3f0fed0b594e01fa41dd3967645ca39.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Roll Social Money"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xfbbe9b1142c699512545f47937ee6fae0e4b0aa9": {
            "chainId": 1,
            "symbol": "EDDA",
            "name": "EDDA",
            "address": "0xfbbe9b1142c699512545f47937ee6fae0e4b0aa9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfbbe9b1142c699512545f47937ee6fae0e4b0aa9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x29cbd0510eec0327992cd6006e63f9fa8e7f33b7": {
            "chainId": 1,
            "symbol": "TIDAL",
            "name": "Tidal Token",
            "address": "0x29cbd0510eec0327992cd6006e63f9fa8e7f33b7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x29cbd0510eec0327992cd6006e63f9fa8e7f33b7.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb78b3320493a4efaa1028130c5ba26f0b6085ef8": {
            "chainId": 1,
            "symbol": "DRC_1",
            "name": "Dracula Token",
            "address": "0xb78b3320493a4efaa1028130c5ba26f0b6085ef8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb78b3320493a4efaa1028130c5ba26f0b6085ef8.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ],
            "displayedSymbol": "DRC"
        },
        "0x55296f69f40ea6d20e478533c15a6b08b654e758": {
            "chainId": 1,
            "symbol": "XYO",
            "name": "XY Oracle",
            "address": "0x55296f69f40ea6d20e478533c15a6b08b654e758",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x55296f69f40ea6d20e478533c15a6b08b654e758.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0f71b8de197a1c84d31de0f1fa7926c365f052b3": {
            "chainId": 1,
            "symbol": "ARCONA",
            "name": "Arcona Distribution Contract",
            "address": "0x0f71b8de197a1c84d31de0f1fa7926c365f052b3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0f71b8de197a1c84d31de0f1fa7926c365f052b3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf3ae5d769e153ef72b4e3591ac004e89f48107a1": {
            "chainId": 1,
            "symbol": "DPR",
            "name": "Deeper Network",
            "address": "0xf3ae5d769e153ef72b4e3591ac004e89f48107a1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf3ae5d769e153ef72b4e3591ac004e89f48107a1.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5f98805a4e8be255a32880fdec7f6728c6568ba0": {
            "chainId": 1,
            "symbol": "LUSD",
            "name": "LUSD Stablecoin",
            "address": "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5f98805a4e8be255a32880fdec7f6728c6568ba0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:LUSD",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe0b9a2c3e9f40cf74b2c7f591b2b0cca055c3112": {
            "chainId": 1,
            "symbol": "GS",
            "name": "Gen Shards",
            "address": "0xe0b9a2c3e9f40cf74b2c7f591b2b0cca055c3112",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe0b9a2c3e9f40cf74b2c7f591b2b0cca055c3112.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xec213f83defb583af3a000b1c0ada660b1902a0f": {
            "chainId": 1,
            "symbol": "PRE",
            "name": "Presearch",
            "address": "0xec213f83defb583af3a000b1c0ada660b1902a0f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xec213f83defb583af3a000b1c0ada660b1902a0f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf418588522d5dd018b425e472991e52ebbeeeeee": {
            "chainId": 1,
            "symbol": "PUSH",
            "name": "Ethereum Push Notification Service",
            "address": "0xf418588522d5dd018b425e472991e52ebbeeeeee",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf418588522d5dd018b425e472991e52ebbeeeeee.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc477d038d5420c6a9e0b031712f61c5120090de9": {
            "chainId": 1,
            "symbol": "BOSON",
            "name": "Boson Token",
            "address": "0xc477d038d5420c6a9e0b031712f61c5120090de9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc477d038d5420c6a9e0b031712f61c5120090de9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x53c8395465a84955c95159814461466053dedede": {
            "chainId": 1,
            "symbol": "DG",
            "name": "DeGate Token",
            "address": "0x53c8395465a84955c95159814461466053dedede",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x53c8395465a84955c95159814461466053dedede.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DG",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x16c52ceece2ed57dad87319d91b5e3637d50afa4": {
            "chainId": 1,
            "symbol": "TCAP",
            "name": "TCAP Token",
            "address": "0x16c52ceece2ed57dad87319d91b5e3637d50afa4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x16c52ceece2ed57dad87319d91b5e3637d50afa4.png",
            "providers": [
                "1inch",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x44564d0bd94343f72e3c8a0d22308b7fa71db0bb": {
            "chainId": 1,
            "symbol": "BASK",
            "name": "BasketDAO Gov",
            "address": "0x44564d0bd94343f72e3c8a0d22308b7fa71db0bb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x44564d0bd94343f72e3c8a0d22308b7fa71db0bb.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5cf04716ba20127f1e2297addcf4b5035000c9eb": {
            "chainId": 1,
            "symbol": "NKN",
            "name": "NKN",
            "address": "0x5cf04716ba20127f1e2297addcf4b5035000c9eb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5cf04716ba20127f1e2297addcf4b5035000c9eb.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4730fb1463a6f1f44aeb45f6c5c422427f37f4d0": {
            "chainId": 1,
            "symbol": "FOUR",
            "name": "The 4th Pillar Token",
            "address": "0x4730fb1463a6f1f44aeb45f6c5c422427f37f4d0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4730fb1463a6f1f44aeb45f6c5c422427f37f4d0.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x77fba179c79de5b7653f68b5039af940ada60ce0": {
            "chainId": 1,
            "symbol": "FORTH",
            "name": "Ampleforth Governance",
            "address": "0x77fba179c79de5b7653f68b5039af940ada60ce0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x77fba179c79de5b7653f68b5039af940ada60ce0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xe796d6ca1ceb1b022ece5296226bf784110031cd": {
            "chainId": 1,
            "symbol": "BLES",
            "name": "Blind Boxes Token",
            "address": "0xe796d6ca1ceb1b022ece5296226bf784110031cd",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe796d6ca1ceb1b022ece5296226bf784110031cd.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2": {
            "chainId": 1,
            "symbol": "SWISE",
            "name": "StakeWise",
            "address": "0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202": {
            "chainId": 1,
            "symbol": "KNC",
            "name": "Kyber Network Crystal v2",
            "address": "0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:KNC",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa": {
            "chainId": 1,
            "symbol": "ORBS",
            "name": "Orbs",
            "address": "0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ORBS",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa02120696c7b8fe16c09c749e4598819b2b0e915": {
            "chainId": 1,
            "symbol": "WXT",
            "name": "Wirex Token",
            "address": "0xa02120696c7b8fe16c09c749e4598819b2b0e915",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa02120696c7b8fe16c09c749e4598819b2b0e915.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:WXT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2f109021afe75b949429fe30523ee7c0d5b27207": {
            "chainId": 1,
            "symbol": "OCC",
            "name": "OCC",
            "address": "0x2f109021afe75b949429fe30523ee7c0d5b27207",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2f109021afe75b949429fe30523ee7c0d5b27207.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x767fe9edc9e0df98e07454847909b5e959d7ca0e": {
            "chainId": 1,
            "symbol": "ILV",
            "name": "Illuvium",
            "address": "0x767fe9edc9e0df98e07454847909b5e959d7ca0e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x767fe9edc9e0df98e07454847909b5e959d7ca0e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf16e81dce15b08f326220742020379b855b87df9": {
            "chainId": 1,
            "symbol": "ICE",
            "name": "IceToken",
            "address": "0xf16e81dce15b08f326220742020379b855b87df9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf16e81dce15b08f326220742020379b855b87df9.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "PancakeSwap Top 100",
                "Quickswap Token List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ICE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5a666c7d92e5fa7edcb6390e4efd6d0cdd69cf37": {
            "chainId": 1,
            "symbol": "MARSH",
            "name": "UnmarshalToken",
            "address": "0x5a666c7d92e5fa7edcb6390e4efd6d0cdd69cf37",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5a666c7d92e5fa7edcb6390e4efd6d0cdd69cf37.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MARSH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3d658390460295fb963f54dc0899cfb1c30776df": {
            "chainId": 1,
            "symbol": "Coval",
            "name": "CircuitsOfValue",
            "address": "0x3d658390460295fb963f54dc0899cfb1c30776df",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x3d658390460295fb963f54dc0899cfb1c30776df.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7dd9c5cba05e151c895fde1cf355c9a1d5da6429": {
            "chainId": 1,
            "symbol": "GLM",
            "name": "Golem Network Token",
            "address": "0x7dd9c5cba05e151c895fde1cf355c9a1d5da6429",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7dd9c5cba05e151c895fde1cf355c9a1d5da6429.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x467bccd9d29f223bce8043b84e8c8b282827790f": {
            "chainId": 1,
            "symbol": "TEL",
            "name": "Telcoin",
            "address": "0x467bccd9d29f223bce8043b84e8c8b282827790f",
            "decimals": 2,
            "logoURI": "https://tokens.1inch.io/0x467bccd9d29f223bce8043b84e8c8b282827790f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:TEL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x808507121b80c02388fad14726482e061b8da827": {
            "chainId": 1,
            "symbol": "PENDLE",
            "name": "Pendle",
            "address": "0x808507121b80c02388fad14726482e061b8da827",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x808507121b80c02388fad14726482e061b8da827.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PENDLE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7a2bc711e19ba6aff6ce8246c546e8c4b4944dfd": {
            "chainId": 1,
            "symbol": "WAXE",
            "name": "WAX Economic Token",
            "address": "0x7a2bc711e19ba6aff6ce8246c546e8c4b4944dfd",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x7a2bc711e19ba6aff6ce8246c546e8c4b4944dfd.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4": {
            "chainId": 1,
            "symbol": "ROUTE",
            "name": "Route",
            "address": "0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "BA ERC20 SEC Action",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "MyCrypto Token List",
                "Roll Social Money",
                "Synthetix",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ROUTE",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x182f4c4c97cd1c24e1df8fc4c053e5c47bf53bef": {
            "chainId": 1,
            "symbol": "TANGO",
            "name": "keyTango Token",
            "address": "0x182f4c4c97cd1c24e1df8fc4c053e5c47bf53bef",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x182f4c4c97cd1c24e1df8fc4c053e5c47bf53bef.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x321c2fe4446c7c963dc41dd58879af648838f98d": {
            "chainId": 1,
            "symbol": "CTX",
            "name": "Cryptex",
            "address": "0x321c2fe4446c7c963dc41dd58879af648838f98d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x321c2fe4446c7c963dc41dd58879af648838f98d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198": {
            "chainId": 1,
            "symbol": "BANK",
            "name": "Bankless Token",
            "address": "0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BANK",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x841fb148863454a3b3570f515414759be9091465": {
            "chainId": 1,
            "symbol": "SHIH",
            "name": "Shih Tzu",
            "address": "0x841fb148863454a3b3570f515414759be9091465",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x841fb148863454a3b3570f515414759be9091465.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa2b4c0af19cc16a6cfacce81f192b024d625817d": {
            "chainId": 1,
            "symbol": "KISHU",
            "name": "Kishu Inu",
            "address": "0xa2b4c0af19cc16a6cfacce81f192b024d625817d",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xa2b4c0af19cc16a6cfacce81f192b024d625817d_1.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa4cf2afd3b165975afffbf7e487cdd40c894ab6b": {
            "chainId": 1,
            "symbol": "SHIBAKEN",
            "name": "ShibaKen.Finance",
            "address": "0xa4cf2afd3b165975afffbf7e487cdd40c894ab6b",
            "decimals": 0,
            "logoURI": "https://tokens.1inch.io/0xa4cf2afd3b165975afffbf7e487cdd40c894ab6b.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb1191f691a355b43542bea9b8847bc73e7abb137": {
            "chainId": 1,
            "symbol": "KIRO",
            "name": "Kirobo",
            "address": "0xb1191f691a355b43542bea9b8847bc73e7abb137",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb1191f691a355b43542bea9b8847bc73e7abb137.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b": {
            "chainId": 1,
            "symbol": "CVX",
            "name": "Convex Token",
            "address": "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa3c4dc4a9ce2a6b40b57f25f8b50decc2c64dec2": {
            "chainId": 1,
            "symbol": "SNFT",
            "name": "SeedSwap Token",
            "address": "0xa3c4dc4a9ce2a6b40b57f25f8b50decc2c64dec2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa3c4dc4a9ce2a6b40b57f25f8b50decc2c64dec2.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f": {
            "chainId": 1,
            "symbol": "GTC",
            "name": "Gitcoin",
            "address": "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xde30da39c46104798bb5aa3fe8b9e0e1f348163f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9": {
            "chainId": 1,
            "symbol": "alUSD",
            "name": "Alchemix USD",
            "address": "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbc6da0fe9ad5f3b0d58160288917aa56653660e9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:alUSD",
                "PEG:USD",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x7697b462a7c4ff5f8b55bdbc2f4076c2af9cf51a": {
            "chainId": 1,
            "symbol": "SARCO",
            "name": "Sarcophagus",
            "address": "0x7697b462a7c4ff5f8b55bdbc2f4076c2af9cf51a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7697b462a7c4ff5f8b55bdbc2f4076c2af9cf51a.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x677ddbd918637e5f2c79e164d402454de7da8619": {
            "chainId": 1,
            "symbol": "VUSD",
            "name": "VUSD",
            "address": "0x677ddbd918637e5f2c79e164d402454de7da8619",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x677ddbd918637e5f2c79e164d402454de7da8619.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "tokens"
            ]
        },
        "0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3": {
            "chainId": 1,
            "symbol": "ELON",
            "name": "Dogelon",
            "address": "0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x06a01a4d579479dd5d884ebf61a31727a3d8d442": {
            "chainId": 1,
            "symbol": "Skey",
            "name": "SmartKey",
            "address": "0x06a01a4d579479dd5d884ebf61a31727a3d8d442",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x06a01a4d579479dd5d884ebf61a31727a3d8d442.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x27c70cd1946795b66be9d954418546998b546634": {
            "chainId": 1,
            "symbol": "LEASH",
            "name": "DOGE KILLER",
            "address": "0x27c70cd1946795b66be9d954418546998b546634",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x27c70cd1946795b66be9d954418546998b546634.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9695e0114e12c0d3a3636fab5a18e6b737529023": {
            "chainId": 1,
            "symbol": "DFYN",
            "name": "DFYN Token",
            "address": "0x9695e0114e12c0d3a3636fab5a18e6b737529023",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9695e0114e12c0d3a3636fab5a18e6b737529023.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DFYN",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x72e364f2abdc788b7e918bc238b21f109cd634d7": {
            "chainId": 1,
            "symbol": "MVI",
            "name": "Metaverse Index",
            "address": "0x72e364f2abdc788b7e918bc238b21f109cd634d7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x72e364f2abdc788b7e918bc238b21f109cd634d7.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MVI",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3301ee63fb29f863f2333bd4466acb46cd8323e6": {
            "chainId": 1,
            "symbol": "AKITA",
            "name": "Akita Inu",
            "address": "0x3301ee63fb29f863f2333bd4466acb46cd8323e6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3301ee63fb29f863f2333bd4466acb46cd8323e6.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d": {
            "chainId": 1,
            "symbol": "LQTY",
            "name": "LQTY",
            "address": "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:LQTY",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf65b5c5104c4fafd4b709d9d60a185eae063276c": {
            "chainId": 1,
            "symbol": "TRU_1",
            "name": "Truebit",
            "address": "0xf65b5c5104c4fafd4b709d9d60a185eae063276c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf65b5c5104c4fafd4b709d9d60a185eae063276c.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ],
            "displayedSymbol": "TRU"
        },
        "0x9be89d2a4cd102d8fecc6bf9da793be995c22541": {
            "chainId": 1,
            "symbol": "BBTC",
            "name": "Binance Wrapped BTC",
            "address": "0x9be89d2a4cd102d8fecc6bf9da793be995c22541",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x9be89d2a4cd102d8fecc6bf9da793be995c22541.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "binance",
                "bitcoin",
                "crosschain",
                "PEG:BTC",
                "RISK:availability",
                "tokens",
                "wrapped"
            ]
        },
        "0x944eee930933be5e23b690c8589021ec8619a301": {
            "chainId": 1,
            "symbol": "MUNCH",
            "name": "MUNCH Token",
            "address": "0x944eee930933be5e23b690c8589021ec8619a301",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x944eee930933be5e23b690c8589021ec8619a301.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0xdc349913d53b446485e98b76800b6254f43df695": {
            "chainId": 1,
            "symbol": "BEZOGE",
            "name": "Bezoge Earth",
            "address": "0xdc349913d53b446485e98b76800b6254f43df695",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xdc349913d53b446485e98b76800b6254f43df695.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1681bcb589b3cfcf0c0616b0ce9b19b240643dc1": {
            "chainId": 1,
            "symbol": "ISLE",
            "name": "Island",
            "address": "0x1681bcb589b3cfcf0c0616b0ce9b19b240643dc1",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x1681bcb589b3cfcf0c0616b0ce9b19b240643dc1.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0xa150db9b1fa65b44799d4dd949d922c0a33ee606": {
            "chainId": 1,
            "symbol": "DRC",
            "name": "Digital Reserve Currency",
            "address": "0xa150db9b1fa65b44799d4dd949d922c0a33ee606",
            "decimals": 0,
            "logoURI": "https://tokens.1inch.io/0xa150db9b1fa65b44799d4dd949d922c0a33ee606.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x15874d65e649880c2614e7a480cb7c9a55787ff6": {
            "chainId": 1,
            "symbol": "eMax",
            "name": "EthereumMax",
            "address": "0x15874d65e649880c2614e7a480cb7c9a55787ff6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x15874d65e649880c2614e7a480cb7c9a55787ff6.png",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "CMC DeFi",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x6f40d4a6237c257fff2db00fa0510deeecd303eb": {
            "chainId": 1,
            "symbol": "FLUID",
            "name": "Fluid",
            "address": "0x6f40d4a6237c257fff2db00fa0510deeecd303eb",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x6f40d4a6237c257fff2db00fa0510deeecd303eb_0x1dd920bbf2537627bce591a027d2a73413dbeb258061358deed90a00538187f2.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:INST",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x456d8f0d25a4e787ee60c401f8b963a465148f70": {
            "chainId": 1,
            "symbol": "CAVA",
            "name": "Cavapoo",
            "address": "0x456d8f0d25a4e787ee60c401f8b963a465148f70",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x456d8f0d25a4e787ee60c401f8b963a465148f70.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x8cb924583681cbfe487a62140a994a49f833c244": {
            "chainId": 1,
            "symbol": "SWAPP",
            "name": "Swapp Token",
            "address": "0x8cb924583681cbfe487a62140a994a49f833c244",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8cb924583681cbfe487a62140a994a49f833c244.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x10633216e7e8281e33c86f02bf8e565a635d9770": {
            "chainId": 1,
            "symbol": "DVI",
            "name": "Dvision",
            "address": "0x10633216e7e8281e33c86f02bf8e565a635d9770",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x10633216e7e8281e33c86f02bf8e565a635d9770.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8798249c2e607446efb7ad49ec89dd1865ff4272": {
            "chainId": 1,
            "symbol": "xSUSHI",
            "name": "SushiBar",
            "address": "0x8798249c2e607446efb7ad49ec89dd1865ff4272",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8798249c2e607446efb7ad49ec89dd1865ff4272.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5b7533812759b45c2b44c19e320ba2cd2681b542": {
            "chainId": 1,
            "symbol": "AGIX",
            "name": "SingularityNET Token",
            "address": "0x5b7533812759b45c2b44c19e320ba2cd2681b542",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x5b7533812759b45c2b44c19e320ba2cd2681b542.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6595b8fd9c920c81500dca94e53cdc712513fb1f": {
            "chainId": 1,
            "symbol": "OLY",
            "name": "Olyseum",
            "address": "0x6595b8fd9c920c81500dca94e53cdc712513fb1f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6595b8fd9c920c81500dca94e53cdc712513fb1f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x474021845c4643113458ea4414bdb7fb74a01a77": {
            "chainId": 1,
            "symbol": "UNO",
            "name": "UnoRe",
            "address": "0x474021845c4643113458ea4414bdb7fb74a01a77",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x474021845c4643113458ea4414bdb7fb74a01a77.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6243d8cea23066d098a15582d81a598b4e8391f4": {
            "chainId": 1,
            "symbol": "FLX_1",
            "name": "Flex Ungovernance Token",
            "address": "0x6243d8cea23066d098a15582d81a598b4e8391f4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6243d8cea23066d098a15582d81a598b4e8391f4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ],
            "displayedSymbol": "FLX"
        },
        "0x69fa8e7f6bf1ca1fb0de61e1366f7412b827cc51": {
            "chainId": 1,
            "symbol": "NRCH",
            "name": "EnreachDAO",
            "address": "0x69fa8e7f6bf1ca1fb0de61e1366f7412b827cc51",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x69fa8e7f6bf1ca1fb0de61e1366f7412b827cc51.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "Coinmarketcap",
                "SpookySwap Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xfb7b4564402e5500db5bb6d63ae671302777c75a": {
            "chainId": 1,
            "symbol": "DEXT",
            "name": "DEXTools",
            "address": "0xfb7b4564402e5500db5bb6d63ae671302777c75a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x26ce25148832c04f3d7f26f32478a9fe55197166.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x853bb55c1f469902f088a629db8c8803a9be3857": {
            "chainId": 1,
            "symbol": "one1INCH",
            "name": "one1INCH",
            "address": "0x853bb55c1f469902f088a629db8c8803a9be3857",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x853bb55c1f469902f088a629db8c8803a9be3857.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611": {
            "chainId": 1,
            "symbol": "MM",
            "name": "Million",
            "address": "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc581b735a1688071a1746c968e0798d642ede491": {
            "chainId": 1,
            "symbol": "EURT",
            "name": "Euro Tether",
            "address": "0xc581b735a1688071a1746c968e0798d642ede491",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:EUR",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x72e5390edb7727e3d4e3436451dadaff675dbcc0": {
            "chainId": 1,
            "symbol": "HANU",
            "name": "Hanu Yokia",
            "address": "0x72e5390edb7727e3d4e3436451dadaff675dbcc0",
            "decimals": 12,
            "logoURI": "https://tokens.1inch.io/0x72e5390edb7727e3d4e3436451dadaff675dbcc0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x76417e660df3e5c90c0361674c192da152a806e4": {
            "chainId": 1,
            "symbol": "zUSD",
            "name": "Zerogoki USD",
            "address": "0x76417e660df3e5c90c0361674c192da152a806e4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x76417e660df3e5c90c0361674c192da152a806e4.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x8e6cd950ad6ba651f6dd608dc70e5886b1aa6b24": {
            "chainId": 1,
            "symbol": "STARL",
            "name": "StarLink",
            "address": "0x8e6cd950ad6ba651f6dd608dc70e5886b1aa6b24",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8e6cd950ad6ba651f6dd608dc70e5886b1aa6b24.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1559fa1b8f28238fd5d76d9f434ad86fd20d1559": {
            "chainId": 1,
            "symbol": "EDEN",
            "name": "EDEN",
            "address": "0x1559fa1b8f28238fd5d76d9f434ad86fd20d1559",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1559fa1b8f28238fd5d76d9f434ad86fd20d1559.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x515d7e9d75e2b76db60f8a051cd890eba23286bc": {
            "chainId": 1,
            "symbol": "GDAO",
            "name": "Governor",
            "address": "0x515d7e9d75e2b76db60f8a051cd890eba23286bc",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x515d7e9d75e2b76db60f8a051cd890eba23286bc.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb26631c6dda06ad89b93c71400d25692de89c068": {
            "chainId": 1,
            "symbol": "MINDS",
            "name": "Minds",
            "address": "0xb26631c6dda06ad89b93c71400d25692de89c068",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb26631c6dda06ad89b93c71400d25692de89c068.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x106552c11272420aad5d7e94f8acab9095a6c952": {
            "chainId": 1,
            "symbol": "KEANU",
            "name": "Keanu Inu",
            "address": "0x106552c11272420aad5d7e94f8acab9095a6c952",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x106552c11272420aad5d7e94f8acab9095a6c952.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xddb3422497e61e13543bea06989c0789117555c5": {
            "chainId": 1,
            "symbol": "COTI",
            "name": "COTI Token",
            "address": "0xddb3422497e61e13543bea06989c0789117555c5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xddb3422497e61e13543bea06989c0789117555c5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa4ef4b0b23c1fc81d3f9ecf93510e64f58a4a016": {
            "chainId": 1,
            "symbol": "1MIL",
            "name": "1MILNFT",
            "address": "0xa4ef4b0b23c1fc81d3f9ecf93510e64f58a4a016",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa4ef4b0b23c1fc81d3f9ecf93510e64f58a4a016.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x25e1474170c4c0aa64fa98123bdc8db49d7802fa": {
            "chainId": 1,
            "symbol": "BID",
            "name": "Bidao",
            "address": "0x25e1474170c4c0aa64fa98123bdc8db49d7802fa",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x25e1474170c4c0aa64fa98123bdc8db49d7802fa.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x738865301a9b7dd80dc3666dd48cf034ec42bdda": {
            "chainId": 1,
            "symbol": "AGRS",
            "name": "Agoras Token",
            "address": "0x738865301a9b7dd80dc3666dd48cf034ec42bdda",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x738865301a9b7dd80dc3666dd48cf034ec42bdda.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x62dc4817588d53a056cbbd18231d91ffccd34b2a": {
            "chainId": 1,
            "symbol": "DHV",
            "name": "DeHive.finance",
            "address": "0x62dc4817588d53a056cbbd18231d91ffccd34b2a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x62dc4817588d53a056cbbd18231d91ffccd34b2a.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x15b7c0c907e4c6b9adaaaabc300c08991d6cea05": {
            "chainId": 1,
            "symbol": "GEL",
            "name": "Gelato Network Token",
            "address": "0x15b7c0c907e4c6b9adaaaabc300c08991d6cea05",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x15b7c0c907e4c6b9adaaaabc300c08991d6cea05.png",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "PancakeSwap Top 100",
                "Roll Social Money",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa64dfe8d86963151e6496bee513e366f6e42ed79": {
            "chainId": 1,
            "symbol": "GOKU",
            "name": "Goku Inu",
            "address": "0xa64dfe8d86963151e6496bee513e366f6e42ed79",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xa64dfe8d86963151e6496bee513e366f6e42ed79.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3": {
            "chainId": 1,
            "symbol": "MIM",
            "name": "Magic Internet Money",
            "address": "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MIM",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x090185f2135308bad17527004364ebcc2d37e5f6": {
            "chainId": 1,
            "symbol": "SPELL",
            "name": "Spell Token",
            "address": "0x090185f2135308bad17527004364ebcc2d37e5f6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x090185f2135308bad17527004364ebcc2d37e5f6.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SPELL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xde5ed76e7c05ec5e4572cfc88d1acea165109e44": {
            "chainId": 1,
            "symbol": "DEUS",
            "name": "DEUS",
            "address": "0xde5ed76e7c05ec5e4572cfc88d1acea165109e44",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xde5ed76e7c05ec5e4572cfc88d1acea165109e44.png",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "BORGSWAP",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Defiprime",
                "Dharma Token List",
                "Quickswap Token List",
                "Roll Social Money"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc221b7e65ffc80de234bbb6667abdd46593d34f0": {
            "chainId": 1,
            "symbol": "wCFG",
            "name": "Wrapped Centrifuge",
            "address": "0xc221b7e65ffc80de234bbb6667abdd46593d34f0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc221b7e65ffc80de234bbb6667abdd46593d34f0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0": {
            "chainId": 1,
            "symbol": "wstETH",
            "name": "Wrapped liquid staked Ether 2.0",
            "address": "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:Wst ETH",
                "PEG:ETH",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf50a07e4ff052a14f3f608da8936d8ae0ed5be50": {
            "chainId": 1,
            "symbol": "FLOKIPUP",
            "name": "Floki Pup",
            "address": "0xf50a07e4ff052a14f3f608da8936d8ae0ed5be50",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xf50a07e4ff052a14f3f608da8936d8ae0ed5be50.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xaecc217a749c2405b5ebc9857a16d58bdc1c367f": {
            "chainId": 1,
            "symbol": "PAWTH",
            "name": "Pawthereum",
            "address": "0xaecc217a749c2405b5ebc9857a16d58bdc1c367f",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xaecc217a749c2405b5ebc9857a16d58bdc1c367f.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x949d48eca67b17269629c7194f4b727d4ef9e5d6": {
            "chainId": 1,
            "symbol": "MC",
            "name": "Merit Circle",
            "address": "0x949d48eca67b17269629c7194f4b727d4ef9e5d6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x949d48eca67b17269629c7194f4b727d4ef9e5d6.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Uniswap Labs Default",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc50ef449171a51fbeafd7c562b064b6471c36caa": {
            "chainId": 1,
            "symbol": "ZINU",
            "name": "Zombie Inu",
            "address": "0xc50ef449171a51fbeafd7c562b064b6471c36caa",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xc50ef449171a51fbeafd7c562b064b6471c36caa.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0c3685559af6f3d20c501b1076a8056a0a14426a": {
            "chainId": 1,
            "symbol": "miniSAITAMA",
            "name": "mini SAITAMA",
            "address": "0x0c3685559af6f3d20c501b1076a8056a0a14426a",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x0c3685559af6f3d20c501b1076a8056a0a14426a.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "Coinmarketcap",
                "SpookySwap Default List"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x24e89bdf2f65326b94e36978a7edeac63623dafa": {
            "chainId": 1,
            "symbol": "TKING",
            "name": "Tiger King",
            "address": "0x24e89bdf2f65326b94e36978a7edeac63623dafa",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x24e89bdf2f65326b94e36978a7edeac63623dafa.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xaaaaaa20d9e0e2461697782ef11675f668207961": {
            "chainId": 1,
            "symbol": "AURORA",
            "name": "Aurora",
            "address": "0xaaaaaa20d9e0e2461697782ef11675f668207961",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaaaaaa20d9e0e2461697782ef11675f668207961.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:AURORA",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72": {
            "chainId": 1,
            "symbol": "ENS",
            "name": "Ethereum Name Service",
            "address": "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc18360217d8f7ab5e7c516566761ea12ce7f9d72.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfb40e79e56cc7d406707b66c4fd175e07eb2ae3c": {
            "chainId": 1,
            "symbol": "ROTTS",
            "name": "ROTTSCHILD.com",
            "address": "0xfb40e79e56cc7d406707b66c4fd175e07eb2ae3c",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xfb40e79e56cc7d406707b66c4fd175e07eb2ae3c.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x37fe0f067fa808ffbdd12891c0858532cfe7361d": {
            "chainId": 1,
            "symbol": "CIV",
            "name": "Civilization",
            "address": "0x37fe0f067fa808ffbdd12891c0858532cfe7361d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x37fe0f067fa808ffbdd12891c0858532cfe7361d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf32aa187d5bc16a2c02a6afb7df1459d0d107574": {
            "chainId": 1,
            "symbol": "Inu",
            "name": "Hachiko Inu",
            "address": "0xf32aa187d5bc16a2c02a6afb7df1459d0d107574",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf32aa187d5bc16a2c02a6afb7df1459d0d107574.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0xc08512927d12348f6620a698105e1baac6ecd911": {
            "chainId": 1,
            "symbol": "GYEN",
            "name": "GMO JPY",
            "address": "0xc08512927d12348f6620a698105e1baac6ecd911",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xc08512927d12348f6620a698105e1baac6ecd911.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xcafe001067cdef266afb7eb5a286dcfd277f3de5": {
            "chainId": 1,
            "symbol": "PSP",
            "name": "ParaSwap",
            "address": "0xcafe001067cdef266afb7eb5a286dcfd277f3de5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcafe001067cdef266afb7eb5a286dcfd277f3de5.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "GROUP:PSP",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbb1ee07d6c7baeb702949904080eb61f5d5e7732": {
            "chainId": 1,
            "symbol": "DINU",
            "name": "Dogey-Inu",
            "address": "0xbb1ee07d6c7baeb702949904080eb61f5d5e7732",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbb1ee07d6c7baeb702949904080eb61f5d5e7732.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x582d872a1b094fc48f5de31d3b73f2d9be47def1": {
            "chainId": 1,
            "symbol": "TONCOIN",
            "name": "Wrapped TON Coin",
            "address": "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x582d872a1b094fc48f5de31d3b73f2d9be47def1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:TONCOIN",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4104b135dbc9609fc1a9490e61369036497660c8": {
            "chainId": 1,
            "symbol": "APW",
            "name": "APWine Token",
            "address": "0x4104b135dbc9609fc1a9490e61369036497660c8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4104b135dbc9609fc1a9490e61369036497660c8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:APW",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xae78736cd615f374d3085123a210448e74fc6393": {
            "chainId": 1,
            "symbol": "rETH",
            "name": "Rocket Pool ETH",
            "address": "0xae78736cd615f374d3085123a210448e74fc6393",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xae78736cd615f374d3085123a210448e74fc6393.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:rETH",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb1a88c33091490218965787919fcc9862c1798ee": {
            "chainId": 1,
            "symbol": "SHIBLI",
            "name": "Studio Shibli",
            "address": "0xb1a88c33091490218965787919fcc9862c1798ee",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xb1a88c33091490218965787919fcc9862c1798ee.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x41a3dba3d677e573636ba691a70ff2d606c29666": {
            "chainId": 1,
            "symbol": "BLANK",
            "name": "GoBlank Token",
            "address": "0x41a3dba3d677e573636ba691a70ff2d606c29666",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaec7e1f531bb09115103c53ba76829910ec48966.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BLANK",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3b484b82567a09e2588a13d54d032153f0c0aee0": {
            "chainId": 1,
            "symbol": "SOS",
            "name": "SOS",
            "address": "0x3b484b82567a09e2588a13d54d032153f0c0aee0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3b484b82567a09e2588a13d54d032153f0c0aee0.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x44709a920fccf795fbc57baa433cc3dd53c44dbe": {
            "chainId": 1,
            "symbol": "RADAR_1",
            "name": "DappRadar",
            "address": "0x44709a920fccf795fbc57baa433cc3dd53c44dbe",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x44709a920fccf795fbc57baa433cc3dd53c44dbe.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ],
            "displayedSymbol": "RADAR"
        },
        "0xb6ed7644c69416d67b522e20bc294a9a9b405b31": {
            "chainId": 1,
            "symbol": "0xBTC",
            "name": "0xBitcoin Token",
            "address": "0xb6ed7644c69416d67b522e20bc294a9a9b405b31",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xb6ed7644c69416d67b522e20bc294a9a9b405b31.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Synthetix",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xbc19712feb3a26080ebf6f2f7849b417fdd792ca": {
            "chainId": 1,
            "symbol": "BORING",
            "name": "BoringDAO",
            "address": "0xbc19712feb3a26080ebf6f2f7849b417fdd792ca",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbc19712feb3a26080ebf6f2f7849b417fdd792ca.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BORING",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa68dd8cb83097765263adad881af6eed479c4a33": {
            "chainId": 1,
            "symbol": "WTF",
            "name": "fees.wtf",
            "address": "0xa68dd8cb83097765263adad881af6eed479c4a33",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa68dd8cb83097765263adad881af6eed479c4a33.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x39fbbabf11738317a448031930706cd3e612e1b9": {
            "chainId": 1,
            "symbol": "WXRP",
            "name": "Wrapped XRP",
            "address": "0x39fbbabf11738317a448031930706cd3e612e1b9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x39fbbabf11738317a448031930706cd3e612e1b9_1.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xcdf7028ceab81fa0c6971208e83fa7872994bee5": {
            "chainId": 1,
            "symbol": "T",
            "name": "Threshold Network Token",
            "address": "0xcdf7028ceab81fa0c6971208e83fa7872994bee5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcdf7028ceab81fa0c6971208e83fa7872994bee5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e": {
            "chainId": 1,
            "symbol": "FLOKI",
            "name": "FLOKI",
            "address": "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xcf0c122c6b73ff809c693db761e7baebe62b6a2e_1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "GROUP:FLOKI",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x73d7c860998ca3c01ce8c808f5577d94d545d1b4": {
            "chainId": 1,
            "symbol": "IXS",
            "name": "Ixs Token",
            "address": "0x73d7c860998ca3c01ce8c808f5577d94d545d1b4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x73d7c860998ca3c01ce8c808f5577d94d545d1b4.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1a7e4e63778b4f12a199c062f3efdd288afcbce8": {
            "chainId": 1,
            "symbol": "EURA",
            "name": "EURA (previously agEUR)",
            "address": "0x1a7e4e63778b4f12a199c062f3efdd288afcbce8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1a7e4e63778b4f12a199c062f3efdd288afcbce8.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:EURA",
                "PEG:EUR",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf4d2888d29d722226fafa5d9b24f9164c092421e": {
            "chainId": 1,
            "symbol": "LOOKS",
            "name": "LooksRare Token",
            "address": "0xf4d2888d29d722226fafa5d9b24f9164c092421e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf4d2888d29d722226fafa5d9b24f9164c092421e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x916c5de09cf63f6602d1e1793fb41f6437814a62": {
            "chainId": 1,
            "symbol": "JACY",
            "name": "JACY",
            "address": "0x916c5de09cf63f6602d1e1793fb41f6437814a62",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x916c5de09cf63f6602d1e1793fb41f6437814a62.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x31429d1856ad1377a8a0079410b297e1a9e214c2": {
            "chainId": 1,
            "symbol": "ANGLE",
            "name": "ANGLE",
            "address": "0x31429d1856ad1377a8a0079410b297e1a9e214c2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x31429d1856ad1377a8a0079410b297e1a9e214c2.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e": {
            "chainId": 1,
            "symbol": "Metis",
            "name": "Metis Token",
            "address": "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9e32b13ce7f2e80a01932b42553652e053d6ed8e.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9": {
            "chainId": 1,
            "symbol": "SIS",
            "name": "Symbiosis",
            "address": "0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SIS",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1e4ede388cbc9f4b5c79681b7f94d36a11abebc9": {
            "chainId": 1,
            "symbol": "X2Y2",
            "name": "X2Y2Token",
            "address": "0x1e4ede388cbc9f4b5c79681b7f94d36a11abebc9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1e4ede388cbc9f4b5c79681b7f94d36a11abebc9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x249e38ea4102d0cf8264d3701f1a0e39c4f2dc3b": {
            "chainId": 1,
            "symbol": "UFO",
            "name": "THE TRUTH",
            "address": "0x249e38ea4102d0cf8264d3701f1a0e39c4f2dc3b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x249e38ea4102d0cf8264d3701f1a0e39c4f2dc3b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff": {
            "chainId": 1,
            "symbol": "IMX",
            "name": "Immutable X",
            "address": "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf57e7e7c23978c3caec3c3548e3d615c346e79ff.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2e9d63788249371f1dfc918a52f8d799f4a38c94": {
            "chainId": 1,
            "symbol": "TOKE",
            "name": "Tokemak",
            "address": "0x2e9d63788249371f1dfc918a52f8d799f4a38c94",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2e9d63788249371f1dfc918a52f8d799f4a38c94.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdb5c3c46e28b53a39c255aa39a411dd64e5fed9c": {
            "chainId": 1,
            "symbol": "NCR",
            "name": "Neos Credits",
            "address": "0xdb5c3c46e28b53a39c255aa39a411dd64e5fed9c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xdb5c3c46e28b53a39c255aa39a411dd64e5fed9c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0f2d719407fdbeff09d87557abb7232601fd9f29": {
            "chainId": 1,
            "symbol": "SYN",
            "name": "Synapse",
            "address": "0x0f2d719407fdbeff09d87557abb7232601fd9f29",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0f2d719407fdbeff09d87557abb7232601fd9f29.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SYN",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5c147e74d63b1d31aa3fd78eb229b65161983b2b": {
            "chainId": 1,
            "symbol": "WFLOW",
            "name": "Wrapped Flow",
            "address": "0x5c147e74d63b1d31aa3fd78eb229b65161983b2b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5c147e74d63b1d31aa3fd78eb229b65161983b2b.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x509a38b7a1cc0dcd83aa9d06214663d9ec7c7f4a": {
            "chainId": 1,
            "symbol": "BST",
            "name": "BlocksquareToken",
            "address": "0x509a38b7a1cc0dcd83aa9d06214663d9ec7c7f4a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x509a38b7a1cc0dcd83aa9d06214663d9ec7c7f4a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Set",
                "Synthetix",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x44017598f2af1bd733f9d87b5017b4e7c1b28dde": {
            "chainId": 1,
            "symbol": "stkATOM",
            "name": "pSTAKE Staked ATOM",
            "address": "0x44017598f2af1bd733f9d87b5017b4e7c1b28dde",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x44017598f2af1bd733f9d87b5017b4e7c1b28dde.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xa5f2211b9b8170f694421f2046281775e8468044": {
            "chainId": 1,
            "symbol": "THOR",
            "name": "THORSwap Token",
            "address": "0xa5f2211b9b8170f694421f2046281775e8468044",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa5f2211b9b8170f694421f2046281775e8468044.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:THOR",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4c2e59d098df7b6cbae0848d66de2f8a4889b9c3": {
            "chainId": 1,
            "symbol": "FODL",
            "name": "Fodl",
            "address": "0x4c2e59d098df7b6cbae0848d66de2f8a4889b9c3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4c2e59d098df7b6cbae0848d66de2f8a4889b9c3.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4d224452801aced8b2f0aebe155379bb5d594381": {
            "chainId": 1,
            "symbol": "APE",
            "name": "ApeCoin",
            "address": "0x4d224452801aced8b2f0aebe155379bb5d594381",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4d224452801aced8b2f0aebe155379bb5d594381.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6": {
            "chainId": 1,
            "symbol": "STG",
            "name": "StargateToken",
            "address": "0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:STG",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25": {
            "chainId": 1,
            "symbol": "SLP",
            "name": "Smooth Love Potion",
            "address": "0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25",
            "decimals": 0,
            "logoURI": "https://tokens.1inch.io/0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5": {
            "chainId": 1,
            "symbol": "OHM",
            "name": "Olympus",
            "address": "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab": {
            "chainId": 1,
            "symbol": "COW",
            "name": "CoW Protocol Token",
            "address": "0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:COW",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3541a5c1b04adaba0b83f161747815cd7b1516bc": {
            "chainId": 1,
            "symbol": "KNIGHT",
            "name": "CitaDAO",
            "address": "0x3541a5c1b04adaba0b83f161747815cd7b1516bc",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3541a5c1b04adaba0b83f161747815cd7b1516bc.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xf0f9d895aca5c8678f706fb8216fa22957685a13": {
            "chainId": 1,
            "symbol": "CULT_2",
            "name": "Cult DAO",
            "address": "0xf0f9d895aca5c8678f706fb8216fa22957685a13",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf0f9d895aca5c8678f706fb8216fa22957685a13.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Roll Social Money",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ],
            "displayedSymbol": "CULT"
        },
        "0x9506d37f70eb4c3d79c398d326c871abbf10521d": {
            "chainId": 1,
            "symbol": "MLT",
            "name": "Media Licensing Token",
            "address": "0x9506d37f70eb4c3d79c398d326c871abbf10521d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9506d37f70eb4c3d79c398d326c871abbf10521d.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MLT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4f640f2529ee0cf119a2881485845fa8e61a782a": {
            "chainId": 1,
            "symbol": "ORE",
            "name": "pTokens ORE",
            "address": "0x4f640f2529ee0cf119a2881485845fa8e61a782a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4f640f2529ee0cf119a2881485845fa8e61a782a.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ORE",
                "tokens"
            ]
        },
        "0x7c07f7abe10ce8e33dc6c5ad68fe033085256a84": {
            "chainId": 1,
            "symbol": "icETH",
            "name": "Interest Compounding ETH Index",
            "address": "0x7c07f7abe10ce8e33dc6c5ad68fe033085256a84",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7c07f7abe10ce8e33dc6c5ad68fe033085256a84.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xab2a7b5876d707e0126b3a75ef7781c77c8877ee": {
            "chainId": 1,
            "symbol": "QUAD",
            "name": "Quadency Token",
            "address": "0xab2a7b5876d707e0126b3a75ef7781c77c8877ee",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xab2a7b5876d707e0126b3a75ef7781c77c8877ee.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9fa69536d1cda4a04cfb50688294de75b505a9ae": {
            "chainId": 1,
            "symbol": "DERC",
            "name": "DeRace Token",
            "address": "0x9fa69536d1cda4a04cfb50688294de75b505a9ae",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9fa69536d1cda4a04cfb50688294de75b505a9ae.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DERC",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0ab87046fbb341d058f17cbc4c1133f25a20a52f": {
            "chainId": 1,
            "symbol": "gOHM",
            "name": "Governance OHM",
            "address": "0x0ab87046fbb341d058f17cbc4c1133f25a20a52f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0ab87046fbb341d058f17cbc4c1133f25a20a52f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:gOHM",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3b9be07d622accaed78f479bc0edabfd6397e320": {
            "chainId": 1,
            "symbol": "LSS",
            "name": "Lossless Token",
            "address": "0x3b9be07d622accaed78f479bc0edabfd6397e320",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3b9be07d622accaed78f479bc0edabfd6397e320.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa67e9f021b9d208f7e3365b2a155e3c55b27de71": {
            "chainId": 1,
            "symbol": "KLEE",
            "name": "KleeKai",
            "address": "0xa67e9f021b9d208f7e3365b2a155e3c55b27de71",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xa67e9f021b9d208f7e3365b2a155e3c55b27de71.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x8c543aed163909142695f2d2acd0d55791a9edb9": {
            "chainId": 1,
            "symbol": "VLX",
            "name": "VLX",
            "address": "0x8c543aed163909142695f2d2acd0d55791a9edb9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8c543aed163909142695f2d2acd0d55791a9edb9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:VLX",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8f693ca8d21b157107184d29d398a8d082b38b76": {
            "chainId": 1,
            "symbol": "DATA",
            "name": "Streamr",
            "address": "0x8f693ca8d21b157107184d29d398a8d082b38b76",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8f693ca8d21b157107184d29d398a8d082b38b76.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd9016a907dc0ecfa3ca425ab20b6b785b42f2373": {
            "chainId": 1,
            "symbol": "GMEE",
            "name": "GAMEE",
            "address": "0xd9016a907dc0ecfa3ca425ab20b6b785b42f2373",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd9016a907dc0ecfa3ca425ab20b6b785b42f2373.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:GMEE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf406f7a9046793267bc276908778b29563323996": {
            "chainId": 1,
            "symbol": "VISION_1",
            "name": "Vision Token",
            "address": "0xf406f7a9046793267bc276908778b29563323996",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf406f7a9046793267bc276908778b29563323996.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Zerion"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:VISION",
                "tokens"
            ],
            "displayedSymbol": "VISION"
        },
        "0xe7f58a92476056627f9fdb92286778abd83b285f": {
            "chainId": 1,
            "symbol": "DWEB",
            "name": "DecentraWeb",
            "address": "0xe7f58a92476056627f9fdb92286778abd83b285f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe7f58a92476056627f9fdb92286778abd83b285f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DWEB",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x7815bda662050d84718b988735218cffd32f75ea": {
            "chainId": 1,
            "symbol": "YEL",
            "name": "YEL Token",
            "address": "0x7815bda662050d84718b988735218cffd32f75ea",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7815bda662050d84718b988735218cffd32f75ea.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:YEL",
                "tokens"
            ]
        },
        "0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361": {
            "chainId": 1,
            "symbol": "MYST",
            "name": "Mysterium",
            "address": "0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MYST",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x68037790a0229e9ce6eaa8a99ea92964106c4703": {
            "chainId": 1,
            "symbol": "PAR",
            "name": "PAR Stablecoin",
            "address": "0x68037790a0229e9ce6eaa8a99ea92964106c4703",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x68037790a0229e9ce6eaa8a99ea92964106c4703.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PAR",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x232fb065d9d24c34708eedbf03724f2e95abe768": {
            "chainId": 1,
            "symbol": "SHEESHA",
            "name": "Sheesha Finance",
            "address": "0x232fb065d9d24c34708eedbf03724f2e95abe768",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x232fb065d9d24c34708eedbf03724f2e95abe768.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6": {
            "chainId": 1,
            "symbol": "USDD",
            "name": "Decentralized USD",
            "address": "0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:USDD",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490": {
            "chainId": 1,
            "symbol": "3Crv",
            "name": "Curve.fi DAI/USDC/USDT",
            "address": "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x6c3f90f043a72fa612cbac8115ee7e52bde6e490_0xb5d61f7db145eb7b27e0917c3049030a8d66f8362c39becc2339c76a874b545f.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x7659ce147d0e714454073a5dd7003544234b6aa0": {
            "chainId": 1,
            "symbol": "XCAD",
            "name": "XCAD Token",
            "address": "0x7659ce147d0e714454073a5dd7003544234b6aa0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7659ce147d0e714454073a5dd7003544234b6aa0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:XCAD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x579cea1889991f68acc35ff5c3dd0621ff29b0c9": {
            "chainId": 1,
            "symbol": "IQ",
            "name": "Everipedia IQ",
            "address": "0x579cea1889991f68acc35ff5c3dd0621ff29b0c9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x579cea1889991f68acc35ff5c3dd0621ff29b0c9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:IQ",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa52bffad02b1fe3f86a543a4e81962d3b3bb01a7": {
            "chainId": 1,
            "symbol": "DUCKER",
            "name": "Duckereum",
            "address": "0xa52bffad02b1fe3f86a543a4e81962d3b3bb01a7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa52bffad02b1fe3f86a543a4e81962d3b3bb01a7.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c": {
            "chainId": 1,
            "symbol": "EURC",
            "name": "Euro Coin",
            "address": "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x1abaea1f7c830bd89acc67ec4af516284b1bc33c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:EURC",
                "PEG:EUR",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a": {
            "chainId": 1,
            "symbol": "ADS",
            "name": "Adshares",
            "address": "0xcfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a",
            "decimals": 11,
            "logoURI": "https://tokens.1inch.io/0xcfcecfe2bd2fed07a9145222e8a7ad9cf1ccd22a.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ADS",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6fb3e0a217407efff7ca062d46c26e5d60a14d69": {
            "chainId": 1,
            "symbol": "IOTX",
            "name": "IoTeX Network",
            "address": "0x6fb3e0a217407efff7ca062d46c26e5d60a14d69",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6fb3e0a217407efff7ca062d46c26e5d60a14d69.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:IOTX",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6": {
            "chainId": 1,
            "symbol": "BED",
            "name": "Bankless BED Index",
            "address": "0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb29130cbcc3f791f077eade0266168e808e5151e": {
            "chainId": 1,
            "symbol": "a1INCH",
            "name": "Aave interest bearing 1INCH",
            "address": "0xb29130cbcc3f791f077eade0266168e808e5151e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb29130cbcc3f791f077eade0266168e808e5151e.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xd33526068d116ce69f19a9ee46f0bd304f21a51f": {
            "chainId": 1,
            "symbol": "RPL",
            "name": "Rocket Pool Protocol",
            "address": "0xd33526068d116ce69f19a9ee46f0bd304f21a51f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd33526068d116ce69f19a9ee46f0bd304f21a51f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:RPL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6bea7cfef803d1e3d5f7c0103f7ded065644e197": {
            "chainId": 1,
            "symbol": "GAMMA",
            "name": "Gamma",
            "address": "0x6bea7cfef803d1e3d5f7c0103f7ded065644e197",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6bea7cfef803d1e3d5f7c0103f7ded065644e197.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:GAMMA",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x111111517e4929d3dcbdfa7cce55d30d4b6bc4d6": {
            "chainId": 1,
            "symbol": "ICHI",
            "name": "ICHI",
            "address": "0x111111517e4929d3dcbdfa7cce55d30d4b6bc4d6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x111111517e4929d3dcbdfa7cce55d30d4b6bc4d6.png",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3aada3e213abf8529606924d8d1c55cbdc70bf74": {
            "chainId": 1,
            "symbol": "XMON",
            "name": "XMON",
            "address": "0x3aada3e213abf8529606924d8d1c55cbdc70bf74",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3aada3e213abf8529606924d8d1c55cbdc70bf74.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb4b9dc1c77bdbb135ea907fd5a08094d98883a35": {
            "chainId": 1,
            "symbol": "SWEAT",
            "name": "SWEAT",
            "address": "0xb4b9dc1c77bdbb135ea907fd5a08094d98883a35",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb4b9dc1c77bdbb135ea907fd5a08094d98883a35.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd084944d3c05cd115c09d072b9f44ba3e0e45921": {
            "chainId": 1,
            "symbol": "FOLD",
            "name": "Manifold Finance",
            "address": "0xd084944d3c05cd115c09d072b9f44ba3e0e45921",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd084944d3c05cd115c09d072b9f44ba3e0e45921.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb0b195aefa3650a6908f15cdac7d92f8a5791b0b": {
            "chainId": 1,
            "symbol": "BOB",
            "name": "BOB",
            "address": "0xb0b195aefa3650a6908f15cdac7d92f8a5791b0b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb0b195aefa3650a6908f15cdac7d92f8a5791b0b.png",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "BORGSWAP",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Quickswap Token List",
                "Roll Social Money"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BOB",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x865377367054516e17014ccded1e7d814edc9ce4": {
            "chainId": 1,
            "symbol": "DOLA",
            "name": "Dola USD Stablecoin",
            "address": "0x865377367054516e17014ccded1e7d814edc9ce4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x865377367054516e17014ccded1e7d814edc9ce4.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DOLA",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3af33bef05c2dcb3c7288b77fe1c8d2aeba4d789": {
            "chainId": 1,
            "symbol": "KROM",
            "name": "Kromatika",
            "address": "0x3af33bef05c2dcb3c7288b77fe1c8d2aeba4d789",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3af33bef05c2dcb3c7288b77fe1c8d2aeba4d789.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:KROM",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5afe3855358e112b5647b952709e6165e1c1eeee": {
            "chainId": 1,
            "symbol": "SAFE",
            "name": "Safe Token",
            "address": "0x5afe3855358e112b5647b952709e6165e1c1eeee",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5afe3855358e112b5647b952709e6165e1c1eeee_1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7420b4b9a0110cdc71fb720908340c03f9bc03ec": {
            "chainId": 1,
            "symbol": "JASMY",
            "name": "JasmyCoin",
            "address": "0x7420b4b9a0110cdc71fb720908340c03f9bc03ec",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7420b4b9a0110cdc71fb720908340c03f9bc03ec.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6dca182ac5e3f99985bc4ee0f726d6472ab1ec55": {
            "chainId": 1,
            "symbol": "USHI",
            "name": "Ushi",
            "address": "0x6dca182ac5e3f99985bc4ee0f726d6472ab1ec55",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6dca182ac5e3f99985bc4ee0f726d6472ab1ec55.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x52662717e448be36cb54588499d5a8328bd95292": {
            "chainId": 1,
            "symbol": "TENSHI",
            "name": "TENSHI v2",
            "address": "0x52662717e448be36cb54588499d5a8328bd95292",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x52662717e448be36cb54588499d5a8328bd95292.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb3999f658c0391d94a37f7ff328f3fec942bcadc": {
            "chainId": 1,
            "symbol": "HFT",
            "name": "Hashflow",
            "address": "0xb3999f658c0391d94a37f7ff328f3fec942bcadc",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb3999f658c0391d94a37f7ff328f3fec942bcadc.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x03be5c903c727ee2c8c4e9bc0acc860cca4715e2": {
            "chainId": 1,
            "symbol": "CAPS",
            "name": "Capsule Coin",
            "address": "0x03be5c903c727ee2c8c4e9bc0acc860cca4715e2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x03be5c903c727ee2c8c4e9bc0acc860cca4715e2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:CAPS",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfe2e637202056d30016725477c5da089ab0a043a": {
            "chainId": 1,
            "symbol": "sETH2",
            "name": "StakeWise Staked ETH2",
            "address": "0xfe2e637202056d30016725477c5da089ab0a043a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfe2e637202056d30016725477c5da089ab0a043a.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xfd09911130e6930bf87f2b0554c44f400bd80d3e": {
            "chainId": 1,
            "symbol": "ETHIX",
            "name": "Ethix",
            "address": "0xfd09911130e6930bf87f2b0554c44f400bd80d3e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfd09911130e6930bf87f2b0554c44f400bd80d3e.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x72b886d09c117654ab7da13a14d603001de0b777": {
            "chainId": 1,
            "symbol": "XDEFI",
            "name": "XDEFI",
            "address": "0x72b886d09c117654ab7da13a14d603001de0b777",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x72b886d09c117654ab7da13a14d603001de0b777.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "defi",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xfb782396c9b20e564a64896181c7ac8d8979d5f4": {
            "chainId": 1,
            "symbol": "DIVER",
            "name": "DivergenceProtocol",
            "address": "0xfb782396c9b20e564a64896181c7ac8d8979d5f4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfb782396c9b20e564a64896181c7ac8d8979d5f4.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf3b9569f82b18aef890de263b84189bd33ebe452": {
            "chainId": 1,
            "symbol": "CAW",
            "name": "A Hunters Dream",
            "address": "0xf3b9569f82b18aef890de263b84189bd33ebe452",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf3b9569f82b18aef890de263b84189bd33ebe452.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf203ca1769ca8e9e8fe1da9d147db68b6c919817": {
            "chainId": 1,
            "symbol": "WNCG",
            "name": "Wrapped NCG",
            "address": "0xf203ca1769ca8e9e8fe1da9d147db68b6c919817",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf203ca1769ca8e9e8fe1da9d147db68b6c919817.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xedf6568618a00c6f0908bf7758a16f76b6e04af9": {
            "chainId": 1,
            "symbol": "ARIA20",
            "name": "ARIANEE",
            "address": "0xedf6568618a00c6f0908bf7758a16f76b6e04af9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xedf6568618a00c6f0908bf7758a16f76b6e04af9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xeb953eda0dc65e3246f43dc8fa13f35623bdd5ed": {
            "chainId": 1,
            "symbol": "RAINI",
            "name": "Rainicorn",
            "address": "0xeb953eda0dc65e3246f43dc8fa13f35623bdd5ed",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xeb953eda0dc65e3246f43dc8fa13f35623bdd5ed.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:RAINI",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9393fdc77090f31c7db989390d43f454b1a6e7f3": {
            "chainId": 1,
            "symbol": "DEC",
            "name": "DarkEnergyCrystals",
            "address": "0x9393fdc77090f31c7db989390d43f454b1a6e7f3",
            "decimals": 3,
            "logoURI": "https://tokens.1inch.io/0x9393fdc77090f31c7db989390d43f454b1a6e7f3.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:DEC",
                "tokens"
            ]
        },
        "0xe76c6c83af64e4c60245d8c7de953df673a7a33d": {
            "chainId": 1,
            "symbol": "RAIL",
            "name": "Rail",
            "address": "0xe76c6c83af64e4c60245d8c7de953df673a7a33d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe76c6c83af64e4c60245d8c7de953df673a7a33d.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4740735aa98dc8aa232bd049f8f0210458e7fca3": {
            "chainId": 1,
            "symbol": "RDT",
            "name": "Ridotto",
            "address": "0x4740735aa98dc8aa232bd049f8f0210458e7fca3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4740735aa98dc8aa232bd049f8f0210458e7fca3.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:RDT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd31a59c85ae9d8edefec411d448f90841571b89c": {
            "chainId": 1,
            "symbol": "SOL",
            "name": "Wrapped SOL",
            "address": "0xd31a59c85ae9d8edefec411d448f90841571b89c",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xd31a59c85ae9d8edefec411d448f90841571b89c.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SOL",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe0a189c975e4928222978a74517442239a0b86ff": {
            "chainId": 1,
            "symbol": "KEYS",
            "name": "Keys",
            "address": "0xe0a189c975e4928222978a74517442239a0b86ff",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xe0a189c975e4928222978a74517442239a0b86ff.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xdf801468a808a32656d2ed2d2d80b72a129739f4": {
            "chainId": 1,
            "symbol": "CUBE",
            "name": "Somnium Space Cubes",
            "address": "0xdf801468a808a32656d2ed2d2d80b72a129739f4",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xdf801468a808a32656d2ed2d2d80b72a129739f4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5aa158404fed6b4730c13f49d3a7f820e14a636f": {
            "chainId": 1,
            "symbol": "ULX",
            "name": "Ultron",
            "address": "0x5aa158404fed6b4730c13f49d3a7f820e14a636f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5aa158404fed6b4730c13f49d3a7f820e14a636f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ULX",
                "tokens"
            ]
        },
        "0xc6dddb5bc6e61e0841c54f3e723ae1f3a807260b": {
            "chainId": 1,
            "symbol": "URUS",
            "name": "Aurox Token",
            "address": "0xc6dddb5bc6e61e0841c54f3e723ae1f3a807260b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc6dddb5bc6e61e0841c54f3e723ae1f3a807260b.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:URUS",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbe9895146f7af43049ca1c1ae358b0541ea49704": {
            "chainId": 1,
            "symbol": "cbETH",
            "name": "Coinbase Wrapped Staked ETH",
            "address": "0xbe9895146f7af43049ca1c1ae358b0541ea49704",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbe9895146f7af43049ca1c1ae358b0541ea49704.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:cbETH",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd3e4ba569045546d09cf021ecc5dfe42b1d7f6e4": {
            "chainId": 1,
            "symbol": "MNW",
            "name": "Morpheus.Network",
            "address": "0xd3e4ba569045546d09cf021ecc5dfe42b1d7f6e4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd3e4ba569045546d09cf021ecc5dfe42b1d7f6e4.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xd3c51de3e6dd9b53d7f37699afb3ee3bf9b9b3f4": {
            "chainId": 1,
            "symbol": "MCONTENT",
            "name": "MContent",
            "address": "0xd3c51de3e6dd9b53d7f37699afb3ee3bf9b9b3f4",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0xd3c51de3e6dd9b53d7f37699afb3ee3bf9b9b3f4.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcd7492db29e2ab436e819b249452ee1bbdf52214": {
            "chainId": 1,
            "symbol": "SMI",
            "name": "SafeMoon Inu",
            "address": "0xcd7492db29e2ab436e819b249452ee1bbdf52214",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xcd7492db29e2ab436e819b249452ee1bbdf52214.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc98d64da73a6616c42117b582e832812e7b8d57f": {
            "chainId": 1,
            "symbol": "RSS3",
            "name": "RSS3",
            "address": "0xc98d64da73a6616c42117b582e832812e7b8d57f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc98d64da73a6616c42117b582e832812e7b8d57f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc82e3db60a52cf7529253b4ec688f631aad9e7c2": {
            "chainId": 1,
            "symbol": "ARC",
            "name": "ARC",
            "address": "0xc82e3db60a52cf7529253b4ec688f631aad9e7c2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc82e3db60a52cf7529253b4ec688f631aad9e7c2.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xac57de9c1a09fec648e93eb98875b212db0d460b": {
            "chainId": 1,
            "symbol": "BabyDoge",
            "name": "Baby Doge Coin",
            "address": "0xac57de9c1a09fec648e93eb98875b212db0d460b",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xac57de9c1a09fec648e93eb98875b212db0d460b.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc669928185dbce49d2230cc9b0979be6dc797957": {
            "chainId": 1,
            "symbol": "BTT",
            "name": "BitTorrent",
            "address": "0xc669928185dbce49d2230cc9b0979be6dc797957",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc669928185dbce49d2230cc9b0979be6dc797957.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BTT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc52c326331e9ce41f04484d3b5e5648158028804": {
            "chainId": 1,
            "symbol": "ZCX",
            "name": "ZEN Exchange Token",
            "address": "0xc52c326331e9ce41f04484d3b5e5648158028804",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc52c326331e9ce41f04484d3b5e5648158028804.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc0c293ce456ff0ed870add98a0828dd4d2903dbf": {
            "chainId": 1,
            "symbol": "AURA",
            "name": "Aura",
            "address": "0xc0c293ce456ff0ed870add98a0828dd4d2903dbf",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc0c293ce456ff0ed870add98a0828dd4d2903dbf.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xba5bde662c17e2adff1075610382b9b691296350": {
            "chainId": 1,
            "symbol": "RARE",
            "name": "SuperRare",
            "address": "0xba5bde662c17e2adff1075610382b9b691296350",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xba5bde662c17e2adff1075610382b9b691296350.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb26c4b3ca601136daf98593feaeff9e0ca702a8d": {
            "chainId": 1,
            "symbol": "ALD",
            "name": "Aladdin Token",
            "address": "0xb26c4b3ca601136daf98593feaeff9e0ca702a8d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb26c4b3ca601136daf98593feaeff9e0ca702a8d.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xaa8330fb2b4d5d07abfe7a72262752a8505c6b37": {
            "chainId": 1,
            "symbol": "POLC",
            "name": "Polka City",
            "address": "0xaa8330fb2b4d5d07abfe7a72262752a8505c6b37",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaa8330fb2b4d5d07abfe7a72262752a8505c6b37.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:POLC",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xba3335588d9403515223f109edc4eb7269a9ab5d": {
            "chainId": 1,
            "symbol": "GEAR",
            "name": "Gearbox",
            "address": "0xba3335588d9403515223f109edc4eb7269a9ab5d",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xba3335588d9403515223f109edc4eb7269a9ab5d.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6": {
            "chainId": 1,
            "symbol": "alETH",
            "name": "Alchemix ETH",
            "address": "0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:alETH",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4236f8aaf2b1f3a28420eb15b8e0ddf63201a95e": {
            "chainId": 1,
            "symbol": "BMDA",
            "name": "Bermuda",
            "address": "0x4236f8aaf2b1f3a28420eb15b8e0ddf63201a95e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4236f8aaf2b1f3a28420eb15b8e0ddf63201a95e.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x18084fba666a33d37592fa2633fd49a74dd93a88": {
            "chainId": 1,
            "symbol": "tBTC",
            "name": "tBTC v2",
            "address": "0x18084fba666a33d37592fa2633fd49a74dd93a88",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x18084fba666a33d37592fa2633fd49a74dd93a88.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x662b67d00a13faf93254714dd601f5ed49ef2f51": {
            "chainId": 1,
            "symbol": "ORC",
            "name": "Orbit Chain",
            "address": "0x662b67d00a13faf93254714dd601f5ed49ef2f51",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x662b67d00a13faf93254714dd601f5ed49ef2f51.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9a0c8ff858d273f57072d714bca7411d717501d7": {
            "chainId": 1,
            "symbol": "st1INCH",
            "name": "Staking 1INCH v2",
            "address": "0x9a0c8ff858d273f57072d714bca7411d717501d7",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9a0c8ff858d273f57072d714bca7411d717501d7.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "staking"
            ]
        },
        "0xaccfac2339e16dc80c50d2fa81b5c2b049b4f947": {
            "chainId": 1,
            "symbol": "dst1INCH",
            "name": "Delegated st1INCH",
            "address": "0xaccfac2339e16dc80c50d2fa81b5c2b049b4f947",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xaccfac2339e16dc80c50d2fa81b5c2b049b4f947.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x9813037ee2218799597d83d4a5b6f3b6778218d9": {
            "chainId": 1,
            "symbol": "BONE",
            "name": "BONE SHIBASWAP",
            "address": "0x9813037ee2218799597d83d4a5b6f3b6778218d9",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9813037ee2218799597d83d4a5b6f3b6778218d9.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9625ce7753ace1fa1865a47aae2c5c2ce4418569": {
            "chainId": 1,
            "symbol": "KAP",
            "name": "Kapital DAO Token",
            "address": "0x9625ce7753ace1fa1865a47aae2c5c2ce4418569",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9625ce7753ace1fa1865a47aae2c5c2ce4418569.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9ab7bb7fdc60f4357ecfef43986818a2a3569c62": {
            "chainId": 1,
            "symbol": "GOG",
            "name": "Guild of Guardians",
            "address": "0x9ab7bb7fdc60f4357ecfef43986818a2a3569c62",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9ab7bb7fdc60f4357ecfef43986818a2a3569c62.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x993864e43caa7f7f12953ad6feb1d1ca635b875f": {
            "chainId": 1,
            "symbol": "SDAO",
            "name": "Singularity Dao",
            "address": "0x993864e43caa7f7f12953ad6feb1d1ca635b875f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x993864e43caa7f7f12953ad6feb1d1ca635b875f.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SDAO",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x98585dfc8d9e7d48f0b1ae47ce33332cf4237d96": {
            "chainId": 1,
            "symbol": "NEWO",
            "name": "New Order",
            "address": "0x98585dfc8d9e7d48f0b1ae47ce33332cf4237d96",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x98585dfc8d9e7d48f0b1ae47ce33332cf4237d96.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:NEWO",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x954b890704693af242613edef1b603825afcd708": {
            "chainId": 1,
            "symbol": "CARD",
            "name": "Cardstack",
            "address": "0x954b890704693af242613edef1b603825afcd708",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x954b890704693af242613edef1b603825afcd708.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x8db1d28ee0d822367af8d220c0dc7cb6fe9dc442": {
            "chainId": 1,
            "symbol": "ETHPAD",
            "name": "ETHPAD.network",
            "address": "0x8db1d28ee0d822367af8d220c0dc7cb6fe9dc442",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8db1d28ee0d822367af8d220c0dc7cb6fe9dc442.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x1a4b46696b2bb4794eb3d4c26f1c55f9170fa4c5": {
            "chainId": 1,
            "symbol": "BIT",
            "name": "BitDAO",
            "address": "0x1a4b46696b2bb4794eb3d4c26f1c55f9170fa4c5",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x1a4b46696b2bb4794eb3d4c26f1c55f9170fa4c5.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x823556202e86763853b40e9cde725f412e294689": {
            "chainId": 1,
            "symbol": "ASTO",
            "name": "Altered State Machine Utility Token",
            "address": "0x823556202e86763853b40e9cde725f412e294689",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x823556202e86763853b40e9cde725f412e294689.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7d29a64504629172a429e64183d6673b9dacbfce": {
            "chainId": 1,
            "symbol": "VXV",
            "name": "VectorspaceAI",
            "address": "0x7d29a64504629172a429e64183d6673b9dacbfce",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7d29a64504629172a429e64183d6673b9dacbfce.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5e8422345238f34275888049021821e8e08caa1f": {
            "chainId": 1,
            "symbol": "frxETH",
            "name": "Frax Ether",
            "address": "0x5e8422345238f34275888049021821e8e08caa1f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x5e8422345238f34275888049021821e8e08caa1f_0x296bf4ccc3620b734afab8e064ff357e3d96336dd63ec65e7130d595e4bc58c8.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FRXETH",
                "PEG:ETH",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x777e2ae845272a2f540ebf6a3d03734a5a8f618e": {
            "chainId": 1,
            "symbol": "RYOSHI",
            "name": "Ryoshis Vision",
            "address": "0x777e2ae845272a2f540ebf6a3d03734a5a8f618e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x777e2ae845272a2f540ebf6a3d03734a5a8f618e.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x65ef703f5594d2573eb71aaf55bc0cb548492df4": {
            "chainId": 1,
            "symbol": "MULTI",
            "name": "Multichain",
            "address": "0x65ef703f5594d2573eb71aaf55bc0cb548492df4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x65ef703f5594d2573eb71aaf55bc0cb548492df4.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:MULTI",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7": {
            "chainId": 1,
            "symbol": "cvxCRV",
            "name": "Convex CRV",
            "address": "0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7_0xbef1ba2277dcc4ab4722514caa15600ebe8c63aeb1c8dcfd16c2de33dadd7a82.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Furucombo",
                "Gemini Token List"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5283d291dbcf85356a21ba090e6db59121208b44": {
            "chainId": 1,
            "symbol": "BLUR",
            "name": "Blur",
            "address": "0x5283d291dbcf85356a21ba090e6db59121208b44",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5283d291dbcf85356a21ba090e6db59121208b44.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x7b95ec873268a6bfc6427e7a28e396db9d0ebc65": {
            "chainId": 1,
            "symbol": "aEthCRV",
            "name": "Aave Ethereum CRV",
            "address": "0x7b95ec873268a6bfc6427e7a28e396db9d0ebc65",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7b95ec873268a6bfc6427e7a28e396db9d0ebc65.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x5de8ab7e27f6e7a1fff3e5b337584aa43961beef": {
            "chainId": 1,
            "symbol": "SDEX",
            "name": "SmarDex Token",
            "address": "0x5de8ab7e27f6e7a1fff3e5b337584aa43961beef",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5de8ab7e27f6e7a1fff3e5b337584aa43961beef.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1": {
            "chainId": 1,
            "symbol": "ARB",
            "name": "Arbitrum",
            "address": "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ARB",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x152649ea73beab28c5b49b26eb48f7ead6d4c898": {
            "chainId": 1,
            "symbol": "Cake",
            "name": "PancakeSwap Token",
            "address": "0x152649ea73beab28c5b49b26eb48f7ead6d4c898",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x152649ea73beab28c5b49b26eb48f7ead6d4c898_0x0899766cba1f694dd58e3505476405e75b048124960815a98874543067c9c6de.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:Cake",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x83f20f44975d03b1b09e64809b757c47f942beea": {
            "chainId": 1,
            "symbol": "sDAI",
            "name": "Savings Dai",
            "address": "0x83f20f44975d03b1b09e64809b757c47f942beea",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x83f20f44975d03b1b09e64809b757c47f942beea.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:sDAI",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb755506531786c8ac63b756bab1ac387bacb0c04": {
            "chainId": 1,
            "symbol": "ZARP",
            "name": "ZARP Stablecoin",
            "address": "0xb755506531786c8ac63b756bab1ac387bacb0c04",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb755506531786c8ac63b756bab1ac387bacb0c04.png",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xf6d2224916ddfbbab6e6bd0d1b7034f4ae0cab18": {
            "chainId": 1,
            "symbol": "aEthUNI",
            "name": "Aave Ethereum UNI",
            "address": "0xf6d2224916ddfbbab6e6bd0d1b7034f4ae0cab18",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf6d2224916ddfbbab6e6bd0d1b7034f4ae0cab18.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8a458a9dc9048e005d22849f470891b840296619": {
            "chainId": 1,
            "symbol": "aEthMKR",
            "name": "Aave Ethereum MKR",
            "address": "0x8a458a9dc9048e005d22849f470891b840296619",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x8a458a9dc9048e005d22849f470891b840296619_0xf4baee1294ee09040d8ce3e4b556c44ac74e44b518b29b6cc757af30473ad82b.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x2516e7b3f76294e03c42aa4c5b5b4dce9c436fb8": {
            "chainId": 1,
            "symbol": "aEthBAL",
            "name": "Aave Ethereum BAL",
            "address": "0x2516e7b3f76294e03c42aa4c5b5b4dce9c436fb8",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x2516e7b3f76294e03c42aa4c5b5b4dce9c436fb8.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc7b4c17861357b8abb91f25581e7263e08dcb59c": {
            "chainId": 1,
            "symbol": "aEthSNX",
            "name": "Aave Ethereum SNX",
            "address": "0xc7b4c17861357b8abb91f25581e7263e08dcb59c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xc7b4c17861357b8abb91f25581e7263e08dcb59c.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf951e335afb289353dc249e82926178eac7ded78": {
            "chainId": 1,
            "symbol": "swETH",
            "name": "swETH",
            "address": "0xf951e335afb289353dc249e82926178eac7ded78",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf951e335afb289353dc249e82926178eac7ded78.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6982508145454ce325ddbe47a25d4ec3d2311933": {
            "chainId": 1,
            "symbol": "PEPE",
            "name": "Pepe",
            "address": "0x6982508145454ce325ddbe47a25d4ec3d2311933",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x6982508145454ce325ddbe47a25d4ec3d2311933.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PEPE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5026f006b85729a8b14553fae6af249ad16c9aab": {
            "chainId": 1,
            "symbol": "WOJAK",
            "name": "Wojak Coin",
            "address": "0x5026f006b85729a8b14553fae6af249ad16c9aab",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x5026f006b85729a8b14553fae6af249ad16c9aab.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3": {
            "chainId": 1,
            "symbol": "OETH",
            "name": "Origin Ether",
            "address": "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe72b141df173b999ae7c1adcbf60cc9833ce56a8": {
            "chainId": 1,
            "symbol": "ETH+",
            "name": "ETHPlus",
            "address": "0xe72b141df173b999ae7c1adcbf60cc9833ce56a8",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xe72b141df173b999ae7c1adcbf60cc9833ce56a8_0x68b396f96610ae1100d51a49a7635a9d82cafb60a2a37f35313cb0eaf4fb6800.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:ETH",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x9a44fd41566876a39655f74971a3a6ea0a17a454": {
            "chainId": 1,
            "symbol": "aEthLDO",
            "name": "Aave Ethereum LDO",
            "address": "0x9a44fd41566876a39655f74971a3a6ea0a17a454",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9a44fd41566876a39655f74971a3a6ea0a17a454.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa2e3356610840701bdf5611a53974510ae27e2e1": {
            "chainId": 1,
            "symbol": "wBETH",
            "name": "Wrapped Binance Beacon ETH",
            "address": "0xa2e3356610840701bdf5611a53974510ae27e2e1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa2e3356610840701bdf5611a53974510ae27e2e1.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:WBETH",
                "PEG:ETH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xba386a4ca26b85fd057ab1ef86e3dc7bdeb5ce70": {
            "chainId": 1,
            "symbol": "JESUS",
            "name": "Jesus Coin",
            "address": "0xba386a4ca26b85fd057ab1ef86e3dc7bdeb5ce70",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xba386a4ca26b85fd057ab1ef86e3dc7bdeb5ce70_0xa832d17d235aab88f918a34561fbdef4e69c2025f8da8f1888f2309976d02770.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd1d2eb1b1e90b638588728b4130137d262c87cae": {
            "chainId": 1,
            "symbol": "GALA",
            "name": "Gala",
            "address": "0xd1d2eb1b1e90b638588728b4130137d262c87cae",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xd1d2eb1b1e90b638588728b4130137d262c87cae.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x32b86b99441480a7e5bd3a26c124ec2373e3f015": {
            "chainId": 1,
            "symbol": "BAD",
            "name": "BAD IDEA AI",
            "address": "0x32b86b99441480a7e5bd3a26c124ec2373e3f015",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x32b86b99441480a7e5bd3a26c124ec2373e3f015.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb90b2a35c65dbc466b04240097ca756ad2005295": {
            "chainId": 1,
            "symbol": "BOBO",
            "name": "BOBO",
            "address": "0xb90b2a35c65dbc466b04240097ca756ad2005295",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/25269.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf939e0a03fb07f59a73314e73794be0e57ac1b4e": {
            "chainId": 1,
            "symbol": "crvUSD",
            "name": "Curve.Fi USD Stablecoin",
            "address": "0xf939e0a03fb07f59a73314e73794be0e57ac1b4e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xf939e0a03fb07f59a73314e73794be0e57ac1b4e.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:crvUSD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xea81dab2e0ecbc6b5c4172de4c22b6ef6e55bd8f": {
            "chainId": 1,
            "symbol": "PLEB",
            "name": "Plebbit",
            "address": "0xea81dab2e0ecbc6b5c4172de4c22b6ef6e55bd8f",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xea81dab2e0ecbc6b5c4172de4c22b6ef6e55bd8f.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc5f0f7b66764f6ec8c8dff7ba683102295e16409": {
            "chainId": 1,
            "symbol": "FDUSD",
            "name": "First Digital USD",
            "address": "0xc5f0f7b66764f6ec8c8dff7ba683102295e16409",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xc5f0f7b66764f6ec8c8dff7ba683102295e16409_0xb36fdeeae658e3cec6f559a71079dac5e086e784ed5592d2f73cef61ec6dbd5f.webp",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:FDUSD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb2e96a63479c2edd2fd62b382c89d5ca79f572d3": {
            "chainId": 1,
            "symbol": "wZNN",
            "name": "Wrapped ZNN",
            "address": "0xb2e96a63479c2edd2fd62b382c89d5ca79f572d3",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0xb2e96a63479c2edd2fd62b382c89d5ca79f572d3.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa35b1b31ce002fbf2058d22f30f95d405200a15b": {
            "chainId": 1,
            "symbol": "ETHx",
            "name": "ETHx",
            "address": "0xa35b1b31ce002fbf2058d22f30f95d405200a15b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xa35b1b31ce002fbf2058d22f30f95d405200a15b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3c3a81e81dc49a522a592e7622a7e711c06bf354": {
            "chainId": 1,
            "symbol": "MNT",
            "name": "Mantle",
            "address": "0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/27075.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x71aef7b30728b9bb371578f36c5a1f1502a5723e": {
            "chainId": 1,
            "symbol": "aEth1INCH",
            "name": "Aave Ethereum 1INCH",
            "address": "0x71aef7b30728b9bb371578f36c5a1f1502a5723e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x71aef7b30728b9bb371578f36c5a1f1502a5723e.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x545bd6c032efdde65a377a6719def2796c8e0f2e": {
            "chainId": 1,
            "symbol": "aEthENS",
            "name": "Aave Ethereum ENS",
            "address": "0x545bd6c032efdde65a377a6719def2796c8e0f2e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x545bd6c032efdde65a377a6719def2796c8e0f2e.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x12e2b8033420270db2f3b328e32370cb5b2ca134": {
            "chainId": 1,
            "symbol": "SFP",
            "name": "SafePalToken",
            "address": "0x12e2b8033420270db2f3b328e32370cb5b2ca134",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x12e2b8033420270db2f3b328e32370cb5b2ca134_0xd7230f2c2f51927fdf4685fbea4df995d77a0702f2fab839e5b5870802c7134a.svg",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SAFEPAL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6e2a43be0b1d33b726f0ca3b8de60b3482b8b050": {
            "chainId": 1,
            "symbol": "ARKM",
            "name": "Arkham",
            "address": "0x6e2a43be0b1d33b726f0ca3b8de60b3482b8b050",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/30929/large/Arkham_Logo_CG.png?1689672102",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f": {
            "chainId": 1,
            "symbol": "GHO",
            "name": "Gho Token",
            "address": "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f_0xfa9f64b60da903540bb6b8ab54123a4a5ef1d487401b69a5b681dbbebf4e6929.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:GHO",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a": {
            "chainId": 1,
            "symbol": "Mog",
            "name": "Mog Coin",
            "address": "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/27659.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x14fee680690900ba0cccfc76ad70fd1b95d10e16": {
            "chainId": 1,
            "symbol": "PAAL",
            "name": "PAAL AI",
            "address": "0x14fee680690900ba0cccfc76ad70fd1b95d10e16",
            "decimals": 9,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x14feE680690900BA0ccCfC76AD70Fd1b95D10e16/logo.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb76cf92076adbf1d9c39294fa8e7a67579fde357": {
            "chainId": 1,
            "symbol": "aEthRPL",
            "name": "Aave Ethereum RPL",
            "address": "0xb76cf92076adbf1d9c39294fa8e7a67579fde357",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb76cf92076adbf1d9c39294fa8e7a67579fde357.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x163f8c2467924be0ae7b5347228cabf260318753": {
            "chainId": 1,
            "symbol": "WLD",
            "name": "Worldcoin",
            "address": "0x163f8c2467924be0ae7b5347228cabf260318753",
            "decimals": 18,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x163f8C2467924be0ae7B5347228CABF260318753/logo.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0xd4e245848d6e1220dbe62e155d89fa327e43cb06": {
            "chainId": 1,
            "symbol": "aEthFRAX",
            "name": "Aave Ethereum FRAX",
            "address": "0xd4e245848d6e1220dbe62e155d89fa327e43cb06",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd4e245848d6e1220dbe62e155d89fa327e43cb06.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8ed97a637a790be1feff5e888d43629dc05408f6": {
            "chainId": 1,
            "symbol": "NPC",
            "name": "Non-Playable Coin",
            "address": "0x8ed97a637a790be1feff5e888d43629dc05408f6",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/27960.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39": {
            "chainId": 1,
            "symbol": "HEX",
            "name": "HEX",
            "address": "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39",
            "decimals": 8,
            "logoURI": "https://tokens.1inch.io/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Dharma Token List",
                "Furucombo",
                "Gemini Token List",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:HEX",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe063f04f280c60aeca68b38341c2eecbec703ae2": {
            "chainId": 1,
            "symbol": "xETH",
            "name": "Leveraged ETH",
            "address": "0xe063f04f280c60aeca68b38341c2eecbec703ae2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe063f04f280c60aeca68b38341c2eecbec703ae2.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xe0f63a424a4439cbe457d80e4f4b51ad25b2c56c": {
            "chainId": 1,
            "symbol": "SPX",
            "name": "SPX6900",
            "address": "0xe0f63a424a4439cbe457d80e4f4b51ad25b2c56c",
            "decimals": 8,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/28081.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0xb1f1ee126e9c96231cc3d3fad7c08b4cf873b1f1": {
            "chainId": 1,
            "symbol": "BIFI",
            "name": "Beefy",
            "address": "0xb1f1ee126e9c96231cc3d3fad7c08b4cf873b1f1",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb1f1ee126e9c96231cc3d3fad7c08b4cf873b1f1.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xed1167b6dc64e8a366db86f2e952a482d0981ebd": {
            "chainId": 1,
            "symbol": "LBR",
            "name": "Lybra",
            "address": "0xed1167b6dc64e8a366db86f2e952a482d0981ebd",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xed1167b6dc64e8a366db86f2e952a482d0981ebd.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x59d9356e565ab3a36dd77763fc0d87feaf85508c": {
            "chainId": 1,
            "symbol": "USDM",
            "name": "Mountain Protocol USD",
            "address": "0x59d9356e565ab3a36dd77763fc0d87feaf85508c",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x59d9356e565ab3a36dd77763fc0d87feaf85508c_0xc4e51e399471beb75e6313ee625bcee614399759f99cf3a9a958445359c8b36a.webp",
            "providers": [
                "1inch",
                "BA ERC20 SEC Action",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Coinmarketcap",
                "Quickswap Token List",
                "Roll Social Money"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:USDM",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4c612e3b15b96ff9a6faed838f8d07d479a8dd4c": {
            "chainId": 1,
            "symbol": "aEthsDAI",
            "name": "Aave Ethereum sDAI",
            "address": "0x4c612e3b15b96ff9a6faed838f8d07d479a8dd4c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x4c612e3b15b96ff9a6faed838f8d07d479a8dd4c.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3f67093dffd4f0af4f2918703c92b60acb7ad78b": {
            "chainId": 1,
            "symbol": "21BTC",
            "name": "21.co Wrapped Bitcoin",
            "address": "0x3f67093dffd4f0af4f2918703c92b60acb7ad78b",
            "decimals": 8,
            "logoURI": "https://assets.coingecko.com/coins/images/34616/large/64ffa735ee23dbcd35498914_21co_W_Token_v2_21BTC-4.png?1705503435",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:BTC",
                "tokens"
            ]
        },
        "0xda47862a83dac0c112ba89c6abc2159b95afd71c": {
            "chainId": 1,
            "symbol": "PRISMA",
            "name": "Prisma Governance Token",
            "address": "0xda47862a83dac0c112ba89c6abc2159b95afd71c",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xda47862a83dac0c112ba89c6abc2159b95afd71c.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x056c1d42fb1326f57da7f19ebb7dda4673f1ff55": {
            "chainId": 1,
            "symbol": "GAINS",
            "name": "GAINS",
            "address": "0x056c1d42fb1326f57da7f19ebb7dda4673f1ff55",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x056c1d42fb1326f57da7f19ebb7dda4673f1ff55.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x38e68a37e401f7271568cecaac63c6b1e19130b4": {
            "chainId": 1,
            "symbol": "BANANA",
            "name": "Banana",
            "address": "0x38e68a37e401f7271568cecaac63c6b1e19130b4",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/28066.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x365accfca291e7d3914637abf1f7635db165bb09": {
            "chainId": 1,
            "symbol": "FXN",
            "name": "FXN Token",
            "address": "0x365accfca291e7d3914637abf1f7635db165bb09",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x365accfca291e7d3914637abf1f7635db165bb09.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa": {
            "chainId": 1,
            "symbol": "mETH",
            "name": "mETH",
            "address": "0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xec53bf9167f50cdeb3ae105f56099aaab9061f83": {
            "chainId": 1,
            "symbol": "EIGEN",
            "name": "Eigen",
            "address": "0xec53bf9167f50cdeb3ae105f56099aaab9061f83",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xec53bf9167f50cdeb3ae105f56099aaab9061f83_0xd39e732b0aa2b06eb502b269f59f161432f1b0ebb59506ccd51348991b5d09c2.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x62d0a8458ed7719fdaf978fe5929c6d342b0bfce": {
            "chainId": 1,
            "symbol": "BEAM",
            "name": "Beam",
            "address": "0x62d0a8458ed7719fdaf978fe5929c6d342b0bfce",
            "decimals": 18,
            "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/28298.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "Roll Social Money",
                "SpookySwap Default List",
                "Uniswap Labs Default",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:BEAM",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x455e53cbb86018ac2b8092fdcd39d8444affc3f6": {
            "chainId": 1,
            "symbol": "POL",
            "name": "Polygon Ecosystem Token",
            "address": "0x455e53cbb86018ac2b8092fdcd39d8444affc3f6",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x455e53cbb86018ac2b8092fdcd39d8444affc3f6.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:POL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb131f4a55907b10d1f0a50d8ab8fa09ec342cd74": {
            "chainId": 1,
            "symbol": "MEME",
            "name": "Memecoin",
            "address": "0xb131f4a55907b10d1f0a50d8ab8fa09ec342cd74",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb131f4a55907b10d1f0a50d8ab8fa09ec342cd74.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4507cef57c46789ef8d1a19ea45f4216bae2b528": {
            "chainId": 1,
            "symbol": "TOKEN",
            "name": "TokenFi",
            "address": "0x4507cef57c46789ef8d1a19ea45f4216bae2b528",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x4507cef57c46789ef8d1a19ea45f4216bae2b528.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Uniswap Labs Default",
                "Venus Default List",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8390a1da07e376ef7add4be859ba74fb83aa02d5": {
            "chainId": 1,
            "symbol": "GROK",
            "name": "GROK",
            "address": "0x8390a1da07e376ef7add4be859ba74fb83aa02d5",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x8390a1da07e376ef7add4be859ba74fb83aa02d5_0x7a29c280bdcb343ebcfd58a298ca5cf655c6c1aa42d600dd07d116db1dd8d901.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee": {
            "chainId": 1,
            "symbol": "weETH",
            "name": "Wrapped eETH",
            "address": "0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:weETH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x35fa164735182de50811e8e2e824cfb9b6118ac2": {
            "chainId": 1,
            "symbol": "eETH",
            "name": "ether.fi ETH",
            "address": "0x35fa164735182de50811e8e2e824cfb9b6118ac2",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x35fa164735182de50811e8e2e824cfb9b6118ac2.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf1c9acdc66974dfb6decb12aa385b9cd01190e38": {
            "chainId": 1,
            "symbol": "osETH",
            "name": "Staked ETH",
            "address": "0xf1c9acdc66974dfb6decb12aa385b9cd01190e38",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xf1c9acdc66974dfb6decb12aa385b9cd01190e38_0x67c02b6160bd792d8c51aaed61592fec79f53f5fdb9a08391cf9da1dae32f4f9.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xe07f9d810a48ab5c3c914ba3ca53af14e4491e8a": {
            "chainId": 1,
            "symbol": "GYD",
            "name": "Gyro Dollar",
            "address": "0xe07f9d810a48ab5c3c914ba3ca53af14e4491e8a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xe07f9d810a48ab5c3c914ba3ca53af14e4491e8a.png",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x4c9edd5852cd905f086c759e8383e09bff1e68b3": {
            "chainId": 1,
            "symbol": "USDe",
            "name": "USDe",
            "address": "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x4c9edd5852cd905f086c759e8383e09bff1e68b3_0x1f0da9cb8c0ece04bf3873925bfbbbdf615baa973a3d26e206f3c4fa4c23f49f.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:USDe",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x9d39a5de30e57443bff2a8307a4256c8797a3497": {
            "chainId": 1,
            "symbol": "sUSDe",
            "name": "Staked USDe",
            "address": "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9d39a5de30e57443bff2a8307a4256c8797a3497.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb82fa9f31612989525992fcfbb09ab22eff5c85a": {
            "chainId": 1,
            "symbol": "aEthcrvUSD",
            "name": "Aave Ethereum crvUSD",
            "address": "0xb82fa9f31612989525992fcfbb09ab22eff5c85a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xb82fa9f31612989525992fcfbb09ab22eff5c85a.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xbf5495efe5db9ce00f80364c8b423567e58d2110": {
            "chainId": 1,
            "symbol": "ezETH",
            "name": "Renzo Restaked ETH",
            "address": "0xbf5495efe5db9ce00f80364c8b423567e58d2110",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xbf5495efe5db9ce00f80364c8b423567e58d2110.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ezETH",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xde342a3e269056fc3305f9e315f4c40d917ba521": {
            "chainId": 1,
            "symbol": "BYTE",
            "name": "Byte",
            "address": "0xde342a3e269056fc3305f9e315f4c40d917ba521",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0xde342a3e269056fc3305f9e315f4c40d917ba521.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xa1290d69c65a6fe4df752f95823fae25cb99e5a7": {
            "chainId": 1,
            "symbol": "rsETH",
            "name": "rsETH",
            "address": "0xa1290d69c65a6fe4df752f95823fae25cb99e5a7",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xa1290d69c65a6fe4df752f95823fae25cb99e5a7_0x9cc209d64bb512c8b2b52ec60c7f9774860accb3edaf8625ab18d772b59d0dfd.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x04c154b66cb340f3ae24111cc767e0184ed00cc6": {
            "chainId": 1,
            "symbol": "pxETH",
            "name": "Pirex Ether",
            "address": "0x04c154b66cb340f3ae24111cc767e0184ed00cc6",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x04c154b66cb340f3ae24111cc767e0184ed00cc6_0x7b913f93b54d56249c5de39d3656b159253412498eed517c54958f3186438099.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:availability"
            ]
        },
        "0x24fcfc492c1393274b6bcd568ac9e225bec93584": {
            "chainId": 1,
            "symbol": "MAVIA",
            "name": "Heroes of Mavia",
            "address": "0x24fcfc492c1393274b6bcd568ac9e225bec93584",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x24fcfc492c1393274b6bcd568ac9e225bec93584_0x2f3e0bdeb55063c658fa66887e5e64e342e04e117fdd10473981d5a367a9e8dd.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x44ff8620b8ca30902395a7bd3f2407e1a091bf73": {
            "chainId": 1,
            "symbol": "VIRTUAL",
            "name": "Virtual Protocol",
            "address": "0x44ff8620b8ca30902395a7bd3f2407e1a091bf73",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x44ff8620b8ca30902395a7bd3f2407e1a091bf73_0x89cdbe26f1c5ceabe3bddf31c9a33418e069f37c44ed5328d306828fc6f80d76.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:VIRTUAL",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8457ca5040ad67fdebbcc8edce889a335bc0fbfb": {
            "chainId": 1,
            "symbol": "ALT",
            "name": "AltLayer Token",
            "address": "0x8457ca5040ad67fdebbcc8edce889a335bc0fbfb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x8457ca5040ad67fdebbcc8edce889a335bc0fbfb.png",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Uniswap Labs Default",
                "Venus Default List",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x15e6e0d4ebeac120f9a97e71faa6a0235b85ed12": {
            "chainId": 1,
            "symbol": "SAVM",
            "name": "SatoshiVM",
            "address": "0x15e6e0d4ebeac120f9a97e71faa6a0235b85ed12",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x15e6e0d4ebeac120f9a97e71faa6a0235b85ed12.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfe18ae03741a5b84e39c295ac9c856ed7991c38e": {
            "chainId": 1,
            "symbol": "CDCETH",
            "name": "Crypto.com Wrapped Staked ETH",
            "address": "0xfe18ae03741a5b84e39c295ac9c856ed7991c38e",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xfe18ae03741a5b84e39c295ac9c856ed7991c38e_0x195e8e08eff8dac19b3fb16121376fbe927bfd9280c944bb3af90acf1b00400f.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "PEG:ETH",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0xfae103dc9cf190ed75350761e95403b7b8afa6c0": {
            "chainId": 1,
            "symbol": "rswETH",
            "name": "rswETH",
            "address": "0xfae103dc9cf190ed75350761e95403b7b8afa6c0",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfae103dc9cf190ed75350761e95403b7b8afa6c0.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd9a442856c234a39a81a089c06451ebaa4306a72": {
            "chainId": 1,
            "symbol": "pufETH",
            "name": "pufETH",
            "address": "0xd9a442856c234a39a81a089c06451ebaa4306a72",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xd9a442856c234a39a81a089c06451ebaa4306a72_0x688b2b93cd9a8a04ea64f29a871506eebdecf1583c912e53e53a108361e4c5c5.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x922d8563631b03c2c4cf817f4d18f6883aba0109": {
            "chainId": 1,
            "symbol": "LOCK",
            "name": "Houdini Swap",
            "address": "0x922d8563631b03c2c4cf817f4d18f6883aba0109",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x922d8563631b03c2c4cf817f4d18f6883aba0109.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb528edbef013aff855ac3c50b381f253af13b997": {
            "chainId": 1,
            "symbol": "AEVO",
            "name": "Aevo",
            "address": "0xb528edbef013aff855ac3c50b381f253af13b997",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb528edbef013aff855ac3c50b381f253af13b997_0xbf0a2d0c3840508ea2db213fdddcf5fd42f699fc926466053f417be849bb71a0.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8aec4bbdcfb451aa289bfbd3c2f4e34a44ada1be": {
            "chainId": 1,
            "symbol": "dogwifhat",
            "name": "dogwifhat",
            "address": "0x8aec4bbdcfb451aa289bfbd3c2f4e34a44ada1be",
            "decimals": 9,
            "logoURI": "https://tokens.1inch.io/0x8aec4bbdcfb451aa289bfbd3c2f4e34a44ada1be.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3429d03c6f7521aec737a0bbf2e5ddcef2c3ae31": {
            "chainId": 1,
            "symbol": "PIXEL",
            "name": "PIXEL",
            "address": "0x3429d03c6f7521aec737a0bbf2e5ddcef2c3ae31",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3429d03c6f7521aec737a0bbf2e5ddcef2c3ae31.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xba0dda8762c24da9487f5fa026a9b64b695a07ea": {
            "chainId": 1,
            "symbol": "OX",
            "name": "OX Coin",
            "address": "0xba0dda8762c24da9487f5fa026a9b64b695a07ea",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xba0dda8762c24da9487f5fa026a9b64b695a07ea.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "BA ERC20 SEC Action",
                "BORGSWAP",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "Roll Social Money",
                "Venus Default List",
                "Zerion"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x00907f9921424583e7ffbfedf84f92b7b2be4977": {
            "chainId": 1,
            "symbol": "aEthGHO",
            "name": "Aave Ethereum GHO",
            "address": "0x00907f9921424583e7ffbfedf84f92b7b2be4977",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x00907f9921424583e7ffbfedf84f92b7b2be4977.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x4a029f7bcf33acb03547d8fa7be840347973e24e": {
            "chainId": 1,
            "symbol": "MAZZE",
            "name": "MAZZE",
            "address": "0x4a029f7bcf33acb03547d8fa7be840347973e24e",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x4a029f7bcf33acb03547d8fa7be840347973e24e_0xa742d321550ad4a0fb7047b4558a17245278f7b732b259b00b3f284511781837.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0x73eddfa87c71addc275c2b9890f5c3a8480bc9e6": {
            "chainId": 1,
            "symbol": "stataEthUSDC",
            "name": "Static Aave Ethereum USDC",
            "address": "0x73eddfa87c71addc275c2b9890f5c3a8480bc9e6",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x00f2a835758b33f3ac53516ebd69f3dc77b0d152": {
            "chainId": 1,
            "symbol": "stataEthPYUSD",
            "name": "Static Aave Ethereum PYUSD",
            "address": "0x00f2a835758b33f3ac53516ebd69f3dc77b0d152",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x862c57d48becb45583aeba3f489696d22466ca1b": {
            "chainId": 1,
            "symbol": "stataEthUSDT",
            "name": "Static Aave Ethereum USDT",
            "address": "0x862c57d48becb45583aeba3f489696d22466ca1b",
            "decimals": 6,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x252231882fb38481497f3c767469106297c8d93b": {
            "chainId": 1,
            "symbol": "stataEthWETH",
            "name": "Static Aave Ethereum WETH",
            "address": "0x252231882fb38481497f3c767469106297c8d93b",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdbf5e36569798d1e39ee9d7b1c61a7409a74f23a": {
            "chainId": 1,
            "symbol": "stataEthLUSD",
            "name": "Static Aave Ethereum LUSD",
            "address": "0xdbf5e36569798d1e39ee9d7b1c61a7409a74f23a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xaf270c38ff895ea3f95ed488ceace2386f038249": {
            "chainId": 1,
            "symbol": "stataEthDAI",
            "name": "Static Aave Ethereum DAI",
            "address": "0xaf270c38ff895ea3f95ed488ceace2386f038249",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x848107491e029afde0ac543779c7790382f15929": {
            "chainId": 1,
            "symbol": "stataEthcrvUSD",
            "name": "Static Aave Ethereum crvUSD",
            "address": "0x848107491e029afde0ac543779c7790382f15929",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xee66abd4d0f9908a48e08ae354b0f425de3e237e": {
            "chainId": 1,
            "symbol": "stataEthFRAX",
            "name": "Static Aave Ethereum FRAX",
            "address": "0xee66abd4d0f9908a48e08ae354b0f425de3e237e",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0xae41b275aaaf484b541a5881a2dded9515184cca": {
            "chainId": 1,
            "symbol": "CSWAP",
            "name": "ChainSwap",
            "address": "0xae41b275aaaf484b541a5881a2dded9515184cca",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xae41b275aaaf484b541a5881a2dded9515184cca_0x7e7ab75d8eeccd8f40b3e838eb1c7a07a38cd9bc1e1a749ee6c4af2d9c0799dc.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc71b5f631354be6853efe9c3ab6b9590f8302e81": {
            "chainId": 1,
            "symbol": "ZK",
            "name": "Polyhedra Network",
            "address": "0xc71b5f631354be6853efe9c3ab6b9590f8302e81",
            "decimals": 18,
            "logoURI": null,
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ZKJ",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf94e7d0710709388bce3161c32b4eea56d3f91cc": {
            "chainId": 1,
            "symbol": "DSync",
            "name": "Destra Network",
            "address": "0xf94e7d0710709388bce3161c32b4eea56d3f91cc",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xf94e7d0710709388bce3161c32b4eea56d3f91cc_0x27156e7df0bdb107c0ce3eef373a91ea3915283807700539e7b58fd37e34eb56.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x594daad7d77592a2b97b725a7ad59d7e188b5bfa": {
            "chainId": 1,
            "symbol": "APU",
            "name": "Apu Apustaja",
            "address": "0x594daad7d77592a2b97b725a7ad59d7e188b5bfa",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x594daad7d77592a2b97b725a7ad59d7e188b5bfa_0x1ae49af2cb11c16feecfed6af3c1d31d1ece3b4f299a631c40521bf3b0d033cc.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb": {
            "chainId": 1,
            "symbol": "ETHFI",
            "name": "ether.fi governance token",
            "address": "0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x3d1c949a761c11e4cc50c3ae6bdb0f24fd7a39da": {
            "chainId": 1,
            "symbol": "NEURA",
            "name": "Neurahub",
            "address": "0x3d1c949a761c11e4cc50c3ae6bdb0f24fd7a39da",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x3d1c949a761c11e4cc50c3ae6bdb0f24fd7a39da.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xdbb7a34bf10169d6d2d0d02a6cbb436cf4381bfa": {
            "chainId": 1,
            "symbol": "ZENT",
            "name": "Zentry",
            "address": "0xdbb7a34bf10169d6d2d0d02a6cbb436cf4381bfa",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xdbb7a34bf10169d6d2d0d02a6cbb436cf4381bfa_0xafece6b847653136b7c79ef806a58c88d6b88d4611d3d0011d6db2db69229e88.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x57e114b691db790c35207b2e685d4a43181e6061": {
            "chainId": 1,
            "symbol": "ENA",
            "name": "ENA",
            "address": "0x57e114b691db790c35207b2e685d4a43181e6061",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x57e114b691db790c35207b2e685d4a43181e6061.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x292fcdd1b104de5a00250febba9bc6a5092a0076": {
            "chainId": 1,
            "symbol": "HashAI",
            "name": "HashAI",
            "address": "0x292fcdd1b104de5a00250febba9bc6a5092a0076",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x292fcdd1b104de5a00250febba9bc6a5092a0076_0x90d81b4a8800cee5b0aaac6a538bf3f3bad86f222efcbe4f3416859dec8d7118.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x36e66fbbce51e4cd5bd3c62b637eb411b18949d4": {
            "chainId": 1,
            "symbol": "OMNI",
            "name": "Omni Network",
            "address": "0x36e66fbbce51e4cd5bd3c62b637eb411b18949d4",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x36e66fbbce51e4cd5bd3c62b637eb411b18949d4.png",
            "providers": [
                "1inch",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbdfa7b7893081b35fb54027489e2bc7a38275129": {
            "chainId": 1,
            "symbol": "aEthweETH",
            "name": "Aave Ethereum weETH",
            "address": "0xbdfa7b7893081b35fb54027489e2bc7a38275129",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xbdfa7b7893081b35fb54027489e2bc7a38275129_0x31670393de5caffb378286a37fb133afe37f1264831d6089e325b952b4342e93.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb0ffa8000886e57f86dd5264b9582b2ad87b2b91": {
            "chainId": 1,
            "symbol": "W",
            "name": "Wormhole Token",
            "address": "0xb0ffa8000886e57f86dd5264b9582b2ad87b2b91",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb0ffa8000886e57f86dd5264b9582b2ad87b2b91_0xd4d24c7d1ae38efeba06ffce954b2759bb597012c724a3219ededadd107589ad.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:W",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbdc7c08592ee4aa51d06c27ee23d5087d65adbcd": {
            "chainId": 1,
            "symbol": "USDL",
            "name": "Lift Dollar",
            "address": "0xbdc7c08592ee4aa51d06c27ee23d5087d65adbcd",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xbdc7c08592ee4aa51d06c27ee23d5087d65adbcd_0xf294e2821b3e56977ecd5964f22260cd49b15e280a38e3e4ba45e0e649055628.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3b50805453023a91a8bf641e279401a0b23fa6f9": {
            "chainId": 1,
            "symbol": "REZ",
            "name": "Renzo",
            "address": "0x3b50805453023a91a8bf641e279401a0b23fa6f9",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x3b50805453023a91a8bf641e279401a0b23fa6f9_0x56658367e3da02e63ab112fe36f213474a7602ae74c7fc1ca660d299aee4f16a.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6985884c4392d348587b19cb9eaaf157f13271cd": {
            "chainId": 1,
            "symbol": "ZRO",
            "name": "LayerZero",
            "address": "0x6985884c4392d348587b19cb9eaaf157f13271cd",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x6985884c4392d348587b19cb9eaaf157f13271cd_0x57c3a4a64c78803212dae14a949da8aefbb19e6c25ab54827ef952e66ed5cc2c.webp",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "BA ERC20 SEC Action",
                "BORGSWAP",
                "CMC DeFi",
                "CMC Stablecoin",
                "CoinGecko",
                "Defiprime",
                "Dharma Token List",
                "Quickswap Token List",
                "Roll Social Money"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ZRO",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x289ff00235d2b98b0145ff5d4435d3e92f9540a6": {
            "chainId": 1,
            "symbol": "BOOE",
            "name": "Book of Ethereum",
            "address": "0x289ff00235d2b98b0145ff5d4435d3e92f9540a6",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x289ff00235d2b98b0145ff5d4435d3e92f9540a6_0x7943aac02304d97d2bfdc09f697843263bb49752cd3c02ba2fd10334f49db84e.jpg",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa059b81568fee88791de88232e838465826cf419": {
            "chainId": 1,
            "symbol": "THREE",
            "name": "Three Protocol Token",
            "address": "0xa059b81568fee88791de88232e838465826cf419",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xa059b81568fee88791de88232e838465826cf419_0xb7a907f3fae9ec50392b45fb0cd7516ebec1332ed0529fc01aa8f34e877c775e.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0x6033f7f88332b8db6ad452b7c6d5bb643990ae3f": {
            "chainId": 1,
            "symbol": "LSK",
            "name": "Lisk",
            "address": "0x6033f7f88332b8db6ad452b7c6d5bb643990ae3f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x6033f7f88332b8db6ad452b7c6d5bb643990ae3f_0x9ca292ce23168b4fe0506d42dd7a8fdd47a7179a84b03593774252ef27007e30.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xcb1592591996765ec0efc1f92599a19767ee5ffa": {
            "chainId": 1,
            "symbol": "BIO",
            "name": "BIO",
            "address": "0xcb1592591996765ec0efc1f92599a19767ee5ffa",
            "decimals": 18,
            "logoURI": null,
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x73a15fed60bf67631dc6cd7bc5b6e8da8190acf5": {
            "chainId": 1,
            "symbol": "USD0",
            "name": "Usual USD",
            "address": "0x73a15fed60bf67631dc6cd7bc5b6e8da8190acf5",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x73a15fed60bf67631dc6cd7bc5b6e8da8190acf5_0x71cedd8970bf0ec2d6d6c71ae8526a4ec5a300ec4060b28afe138404beda7645.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x525574c899a7c877a11865339e57376092168258": {
            "chainId": 1,
            "symbol": "GURU",
            "name": "GURU Token",
            "address": "0x525574c899a7c877a11865339e57376092168258",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x525574c899a7c877a11865339e57376092168258_0x4076941cfc0c9d0fac4dd04681018ad43503f4578dd066d76f6f0d63110b09ec.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified"
            ]
        },
        "0x8236a87084f8b84306f72007f36f2618a5634494": {
            "chainId": 1,
            "symbol": "LBTC",
            "name": "Lombard Staked Bitcoin",
            "address": "0x8236a87084f8b84306f72007f36f2618a5634494",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x8236a87084f8b84306f72007f36f2618a5634494_0x111b91b21b9fc5518d897e033859d17001bc315d5bb26da980ee8625ab8f167b.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:BTC",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x66a1e37c9b0eaddca17d3662d6c05f4decf3e110": {
            "chainId": 1,
            "symbol": "USR",
            "name": "Resolv USD",
            "address": "0x66a1e37c9b0eaddca17d3662d6c05f4decf3e110",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x66a1e37c9b0eaddca17d3662d6c05f4decf3e110_0x422ba1b7710f6640912d1071b3546215210bc8c52ef5349c2c2abd18621ff6bb.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:USR",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x3ffeea07a27fab7ad1df5297fa75e77a43cb5790": {
            "chainId": 1,
            "symbol": "PEIPEI",
            "name": "PeiPei",
            "address": "0x3ffeea07a27fab7ad1df5297fa75e77a43cb5790",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x3ffeea07a27fab7ad1df5297fa75e77a43cb5790_0x00c416d4a30ffae7835c1bb7705d68a496a013cb8cf967b0a6389948165ac794.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xf944e35f95e819e752f3ccb5faf40957d311e8c5": {
            "chainId": 1,
            "symbol": "MOCA",
            "name": "Moca",
            "address": "0xf944e35f95e819e752f3ccb5faf40957d311e8c5",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xf944e35f95e819e752f3ccb5faf40957d311e8c5_0xff01f165e2448540b73d4a4b49ea932623d993481147ed1677da3e0fe68aebdc.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "MyCrypto Token List",
                "Roll Social Money",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xbe0ed4138121ecfc5c0e56b40517da27e6c5226b": {
            "chainId": 1,
            "symbol": "ATH",
            "name": "Aethir Token",
            "address": "0xbe0ed4138121ecfc5c0e56b40517da27e6c5226b",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xbe0ed4138121ecfc5c0e56b40517da27e6c5226b_0x24c1a6684c9fdafdade3e4144c1b6a75244b623115443da85603876cc3531146.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ATH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4f5923fc5fd4a93352581b38b7cd26943012decf": {
            "chainId": 1,
            "symbol": "aEthUSDe",
            "name": "Aave Ethereum USDe",
            "address": "0x4f5923fc5fd4a93352581b38b7cd26943012decf",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x4f5923fc5fd4a93352581b38b7cd26943012decf_0xed15eab9ba12eab541467b5f2b129c8e642388c2e1cfb4216debfcd24dd684c4.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x9e6be44cc1236eef7e1f197418592d363bedcd5a": {
            "chainId": 1,
            "symbol": "AZUR",
            "name": "Azuro",
            "address": "0x9e6be44cc1236eef7e1f197418592d363bedcd5a",
            "decimals": 18,
            "logoURI": "https://tokens.1inch.io/0x9e6be44cc1236eef7e1f197418592d363bedcd5a.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x35d8949372d46b7a3d5a56006ae77b215fc69bc0": {
            "chainId": 1,
            "symbol": "USD0++",
            "name": "USD0 Liquid Bond",
            "address": "0x35d8949372d46b7a3d5a56006ae77b215fc69bc0",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x35d8949372d46b7a3d5a56006ae77b215fc69bc0_0x5643f6fdf595820da211406e6a57ffac52c2e464b320d8cd35e4a1776b79cbda.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x20157dbabb84e3bbfe68c349d0d44e48ae7b5ad2": {
            "chainId": 1,
            "symbol": "IBTC",
            "name": "iBTC",
            "address": "0x20157dbabb84e3bbfe68c349d0d44e48ae7b5ad2",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x20157dbabb84e3bbfe68c349d0d44e48ae7b5ad2_0xd4ea2cf3222d4072c00d6e2c888ddc097c72a63f4641aa4d9233a299f3241bcc.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP: DLCBTC",
                "PEG:BTC",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1c0e06a0b1a4c160c17545ff2a951bfca57c0002": {
            "chainId": 1,
            "symbol": "aEthETHx",
            "name": "Aave Ethereum ETHx",
            "address": "0x1c0e06a0b1a4c160c17545ff2a951bfca57c0002",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x1c0e06a0b1a4c160c17545ff2a951bfca57c0002_0xde05bc6d1608d26c3495f9c0d566478ee51c70425a22478bc5a1aaf94428de79.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x15700b564ca08d9439c58ca5053166e8317aa138": {
            "chainId": 1,
            "symbol": "deUSD",
            "name": "deUSD",
            "address": "0x15700b564ca08d9439c58ca5053166e8317aa138",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x15700b564ca08d9439c58ca5053166e8317aa138_0x494d4a06acf11b293dee256585733cd2a82a437d46e3230a5b7786fa8e07236a.jpeg",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x6df0e641fc9847c0c6fde39be6253045440c14d3": {
            "chainId": 1,
            "symbol": "DINERO",
            "name": "Dinero Governance Token",
            "address": "0x6df0e641fc9847c0c6fde39be6253045440c14d3",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x6df0e641fc9847c0c6fde39be6253045440c14d3_0x5979ae964c1c4097566e35dc64b43a393b742fbd6fd44269a099beafd01b42dc.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0x812ba41e071c7b7fa4ebcfb62df5f45f6fa853ee": {
            "chainId": 1,
            "symbol": "Neiro",
            "name": "Neiro",
            "address": "0x812ba41e071c7b7fa4ebcfb62df5f45f6fa853ee",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x812ba41e071c7b7fa4ebcfb62df5f45f6fa853ee_0x18f28518c6b88befe1c96102bcd0bd45ce8c69e25bf650aff20dd80202041ae5.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xee2a03aa6dacf51c18679c516ad5283d8e7c2637": {
            "chainId": 1,
            "symbol": "NEIRO",
            "name": "Neiro",
            "address": "0xee2a03aa6dacf51c18679c516ad5283d8e7c2637",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xee2a03aa6dacf51c18679c516ad5283d8e7c2637_0x58f79aedea11ea34b6dbf3f88d6bde677e98a8b1b2e0534ee7308580a82aa92b.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfd418e42783382e86ae91e445406600ba144d162": {
            "chainId": 1,
            "symbol": "ZRC",
            "name": "Zircuit",
            "address": "0xfd418e42783382e86ae91e445406600ba144d162",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xfd418e42783382e86ae91e445406600ba144d162_0x3a73cfd6f9746dc210a6bd1b38ad4e2aafdcf8af2fd50dc5dd4e112eea03c118.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4c1746a800d224393fe2470c70a35717ed4ea5f1": {
            "chainId": 1,
            "symbol": "PLUME",
            "name": "Plume",
            "address": "0x4c1746a800d224393fe2470c70a35717ed4ea5f1",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x4c1746a800d224393fe2470c70a35717ed4ea5f1_0x1806452add31cd1736d8d215ea3131750e8ae262af1ecf7f2977515a314144f1.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x8292bb45bf1ee4d140127049757c2e0ff06317ed": {
            "chainId": 1,
            "symbol": "RLUSD",
            "name": "RLUSD",
            "address": "0x8292bb45bf1ee4d140127049757c2e0ff06317ed",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x8292bb45bf1ee4d140127049757c2e0ff06317ed_0x8c1ed0eb8a591ef712aff44817a4226537766582228aa9121d2c26c5a9623013.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x048459e4fb3402e58d8900af7283ad574b91d742": {
            "chainId": 1,
            "symbol": "stataEthGHO",
            "name": "Static Aave Ethereum GHO",
            "address": "0x048459e4fb3402e58d8900af7283ad574b91d742",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x048459e4fb3402e58d8900af7283ad574b91d742_0x2a9d59ac9fe18f6736903059c2641270feb9c509417b94e285e5e8769199ef67.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x149ee12310d499f701b6a5714edad2c832008fd2": {
            "chainId": 1,
            "symbol": "stataEthCRV",
            "name": "Static Aave Ethereum CRV",
            "address": "0x149ee12310d499f701b6a5714edad2c832008fd2",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x149ee12310d499f701b6a5714edad2c832008fd2_0xf54aa3a7c230e60773d3d33dca6ca65e9a61d7f873bae01182fe6134b3ba6551.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xb07e357cc262e92eee03d8b81464d596b258ea7a": {
            "chainId": 1,
            "symbol": "stataEthWBTC",
            "name": "Static Aave Ethereum WBTC",
            "address": "0xb07e357cc262e92eee03d8b81464d596b258ea7a",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb07e357cc262e92eee03d8b81464d596b258ea7a_0x57392b76c2962069a42239ca3dd26582488bf616d2e7a771097db8b593d4e597.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x95ef7cb3494e65da4926ba330dbf540a13affd17": {
            "chainId": 1,
            "symbol": "stataEthRPL",
            "name": "Static Aave Ethereum RPL",
            "address": "0x95ef7cb3494e65da4926ba330dbf540a13affd17",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x95ef7cb3494e65da4926ba330dbf540a13affd17_0xf2abe82366d9b68d6945de0bcb1224dae7d10ec748587379223819e681a6ce59.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x46e5d6a33c8bd8ed38f3c95991c78c9b2ff3bc99": {
            "chainId": 1,
            "symbol": "stataEthUSDe",
            "name": "Static Aave Ethereum USDe",
            "address": "0x46e5d6a33c8bd8ed38f3c95991c78c9b2ff3bc99",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x46e5d6a33c8bd8ed38f3c95991c78c9b2ff3bc99_0x8f648eed1e403dac4aeaa6946ba3967b2706849f8fda57d5dc84470012978bd7.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x57bd8c73838d1781b4f6e0d5cf89eb676488d3df": {
            "chainId": 1,
            "symbol": "stataEthLINK",
            "name": "Static Aave Ethereum LINK",
            "address": "0x57bd8c73838d1781b4f6e0d5cf89eb676488d3df",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x57bd8c73838d1781b4f6e0d5cf89eb676488d3df_0x452f68ad96a56bf3ed1c477eb5f840af9c0c8085201167dda40808994e2dc97a.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:availability"
            ]
        },
        "0x867cf025b5da438c4e215c60b59bbb3afe896fda": {
            "chainId": 1,
            "symbol": "stataEthrETH",
            "name": "Static Aave Ethereum rETH",
            "address": "0x867cf025b5da438c4e215c60b59bbb3afe896fda",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x867cf025b5da438c4e215c60b59bbb3afe896fda_0x4be9467b4393d8c2258d9c236b1846acb5d2ab48b17c90e0bf3d95de4df54c0c.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xfeb859a50f92c6d5ad7c9ef7c2c060d164b3280f": {
            "chainId": 1,
            "symbol": "stataEthAAVE",
            "name": "Static Aave Ethereum AAVE",
            "address": "0xfeb859a50f92c6d5ad7c9ef7c2c060d164b3280f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xfeb859a50f92c6d5ad7c9ef7c2c060d164b3280f_0xeae2fabc0e5315585ea11607d9e21df44ad2f7326d8922f53e84fc73e7f6e5cb.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xe2a6863c8f043457b497667ef3c43073e2d69089": {
            "chainId": 1,
            "symbol": "stataEthcbETH",
            "name": "Static Aave Ethereum cbETH",
            "address": "0xe2a6863c8f043457b497667ef3c43073e2d69089",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xe2a6863c8f043457b497667ef3c43073e2d69089_0xa3c9ae2b2ce89ea7b7bacf7909fdb758928016fb6ebf4467f62d96b8a206f839.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xfa7e3571786ce9489bbc58d9cb8ece8aae6b56f3": {
            "chainId": 1,
            "symbol": "stataEthsDAI",
            "name": "Static Aave Ethereum sDAI",
            "address": "0xfa7e3571786ce9489bbc58d9cb8ece8aae6b56f3",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xfa7e3571786ce9489bbc58d9cb8ece8aae6b56f3_0xb0ca9aa09f184a69c88735c3011736b7bb94a42659863006b2e26f5d97d473b8.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x78fb5e79d5cb59729d0cd72bea7879ad2683454d": {
            "chainId": 1,
            "symbol": "stataEthUNI",
            "name": "Static Aave Ethereum UNI",
            "address": "0x78fb5e79d5cb59729d0cd72bea7879ad2683454d",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x78fb5e79d5cb59729d0cd72bea7879ad2683454d_0x3d73489f45ac701672f16685c82393f1231a548a47b7a79a66e9141f0b284654.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x7cc6694cf75c18d488d16fb4bf3c71a3b31cc7fb": {
            "chainId": 1,
            "symbol": "stataEthETHx",
            "name": "Static Aave Ethereum ETHx",
            "address": "0x7cc6694cf75c18d488d16fb4bf3c71a3b31cc7fb",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x7cc6694cf75c18d488d16fb4bf3c71a3b31cc7fb_0x319a551860e147be7531dd2b1809675d2c3327ea78b93e465c4a896432cbc6ed.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x1ea6e1ba21601258401d0b9db24ea0a07948458e": {
            "chainId": 1,
            "symbol": "stataEthLDO",
            "name": "Static Aave Ethereum LDO",
            "address": "0x1ea6e1ba21601258401d0b9db24ea0a07948458e",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x1ea6e1ba21601258401d0b9db24ea0a07948458e_0x2e0207320d3a6acccf3b70bad2dfe633fe3287b3c82c4ef7b457cba93fc5b908.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe5248968166206d14ab57345971e32facd839ada": {
            "chainId": 1,
            "symbol": "stataEthosETH",
            "name": "Static Aave Ethereum osETH",
            "address": "0xe5248968166206d14ab57345971e32facd839ada",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xe5248968166206d14ab57345971e32facd839ada_0x1e1786343045106cfa9d80821cbd3a004a4f6cca2bf8b45f5153eb4093b2a545.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": []
        },
        "0x2767c27eeaf3566082e74b963b6a0f5c9a46c8a1": {
            "chainId": 1,
            "symbol": "stataEthENS",
            "name": "Static Aave Ethereum ENS",
            "address": "0x2767c27eeaf3566082e74b963b6a0f5c9a46c8a1",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x2767c27eeaf3566082e74b963b6a0f5c9a46c8a1_0xa2fffee69ce2ef4ae92443856126b30d72b54e6a0cc45caad0d501ec6e0bc130.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xaecebdfe454d869a626cab38226c52a1575d1866": {
            "chainId": 1,
            "symbol": "stataEthSNX",
            "name": "Static Aave Ethereum SNX",
            "address": "0xaecebdfe454d869a626cab38226c52a1575d1866",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xaecebdfe454d869a626cab38226c52a1575d1866_0x4c655e3c2dfc08f328c5a720305fe02d26cfea1d86086111c86a8281559f5182.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x54d612b000697bd8b0094889d7d6a92ba0bf2dea": {
            "chainId": 1,
            "symbol": "stataEthsUSDe",
            "name": "Static Aave Ethereum sUSDe",
            "address": "0x54d612b000697bd8b0094889d7d6a92ba0bf2dea",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x54d612b000697bd8b0094889d7d6a92ba0bf2dea_0xd6bd6b317be0fe709a0f25153f61d8cd14c7778bb7d52fec16efc45b08b1fa95.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xb490ff18e55b8881c9527fe7e358dd363780449f": {
            "chainId": 1,
            "symbol": "stataEth1INCH",
            "name": "Static Aave Ethereum 1INCH",
            "address": "0xb490ff18e55b8881c9527fe7e358dd363780449f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb490ff18e55b8881c9527fe7e358dd363780449f_0xf8e7d91343662e82850a71186efc6febb5789ecc2b69bb115eb5687414cee576.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x1121acc14c63f3c872bfca497d10926a6098aac5": {
            "chainId": 1,
            "symbol": "DOGE",
            "name": "Department Of Government Efficiency",
            "address": "0x1121acc14c63f3c872bfca497d10926a6098aac5",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x1121acc14c63f3c872bfca497d10926a6098aac5_0x05170572d45d99c7277e4c3ed50121dd1583f64725ee883e68869cdd817e1e7e.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf": {
            "chainId": 1,
            "symbol": "cbBTC",
            "name": "Coinbase Wrapped BTC",
            "address": "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf_0xbb26aef6ee7f2e06b0a80f11ea81a981d20f871bcafa6e01d293c5719a97aecf.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:CBBTC",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8be3460a480c80728a8c4d7a5d5303c85ba7b3b9": {
            "chainId": 1,
            "symbol": "sENA",
            "name": "Staked ENA",
            "address": "0x8be3460a480c80728a8c4d7a5d5303c85ba7b3b9",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x8be3460a480c80728a8c4d7a5d5303c85ba7b3b9_0x07c8f0844b1e42c4e0fbd9d6c19f05b1470db05dc0e9c8355629ca6f84f17669.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1ba9843bd4327c6c77011406de5fa8749f7e3479": {
            "chainId": 1,
            "symbol": "aEthSTG",
            "name": "Aave Ethereum STG",
            "address": "0x1ba9843bd4327c6c77011406de5fa8749f7e3479",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x1ba9843bd4327c6c77011406de5fa8749f7e3479_0x68c6ed1980f3d7c2379e5dd96615bafab77b127a22609000935a37d74e29a607.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x5b502e3796385e1e9755d7043b9c945c3accec9c": {
            "chainId": 1,
            "symbol": "aEthKNC",
            "name": "Aave Ethereum KNC",
            "address": "0x5b502e3796385e1e9755d7043b9c945c3accec9c",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x5b502e3796385e1e9755d7043b9c945c3accec9c_0x6753b508d6e0abbde9bd7aa902214d57c58e98c9385728cc12184164a5c0b4bc.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ]
        },
        "0x799ebfabe77a6e34311eeee9825190b9ece32824": {
            "chainId": 1,
            "symbol": "BTRST",
            "name": "BTRST",
            "address": "0x799ebfabe77a6e34311eeee9825190b9ece32824",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x799ebfabe77a6e34311eeee9825190b9ece32824.png",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0c0d01abf3e6adfca0989ebba9d6e85dd58eab1e": {
            "chainId": 1,
            "symbol": "aEthPYUSD",
            "name": "Aave Ethereum PYUSD",
            "address": "0x0c0d01abf3e6adfca0989ebba9d6e85dd58eab1e",
            "decimals": 6,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x0c0d01abf3e6adfca0989ebba9d6e85dd58eab1e_0xad2b3d2ea2bc71b8d82bf690411168199b2104845ea4cc89ccaaa99b79e1eaca.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x82f9c5ad306bba1ad0de49bb5fa6f01bf61085ef": {
            "chainId": 1,
            "symbol": "aEthFXS",
            "name": "Aave Ethereum FXS",
            "address": "0x82f9c5ad306bba1ad0de49bb5fa6f01bf61085ef",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x82f9c5ad306bba1ad0de49bb5fa6f01bf61085ef_0xec847a70b774f57233a766f540a05130fbb48023b34db22dcea7bd5c4526b22c.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x322aa5f5be95644d6c36544b6c5061f072d16df5": {
            "chainId": 1,
            "symbol": "stataEthwstETH",
            "name": "Static Aave Ethereum wstETH",
            "address": "0x322aa5f5be95644d6c36544b6c5061f072d16df5",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x322aa5f5be95644d6c36544b6c5061f072d16df5_0x8e486c38b3a2c0d22713e74ac68b2a0b09ee7fa024f480d8954fbed6865dcb7e.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x28561b8a2360f463011c16b6cc0b0cbef8dbbcad": {
            "chainId": 1,
            "symbol": "MOODENG",
            "name": "MOO DENG",
            "address": "0x28561b8a2360f463011c16b6cc0b0cbef8dbbcad",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x28561b8a2360f463011c16b6cc0b0cbef8dbbcad_0x2c665df04458f5b1ad042454c654244529de0dfc28538ac0fba9f73ccc26b659.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified"
            ]
        },
        "0x56072c95faa701256059aa122697b133aded9279": {
            "chainId": 1,
            "symbol": "SKY",
            "name": "SKY Governance Token",
            "address": "0x56072c95faa701256059aa122697b133aded9279",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x56072c95faa701256059aa122697b133aded9279_0x182e659166e8fdc836107cb1c17f62de14a68cec266ca42022e2c430e64ceb75.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xdc035d45d973e3ec169d2276ddab16f1e407384f": {
            "chainId": 1,
            "symbol": "USDS",
            "name": "USDS Stablecoin",
            "address": "0xdc035d45d973e3ec169d2276ddab16f1e407384f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xdc035d45d973e3ec169d2276ddab16f1e407384f_0xe1c67b446974698898760753eebb83b8f05e1db22dd87352e658b58898e7d4a2.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set",
                "Uniswap Labs Default"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "GROUP:USDS",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xa3931d71877c0e7a3148cb7eb4463524fec27fbd": {
            "chainId": 1,
            "symbol": "sUSDS",
            "name": "Savings USDS",
            "address": "0xa3931d71877c0e7a3148cb7eb4463524fec27fbd",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xa3931d71877c0e7a3148cb7eb4463524fec27fbd_0x27913ffe573b6b3f16ed25edf7944143f7aea51e5886d17bc8c54b5e550e8c4a.svg",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:sUSDS",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x10ac93971cdb1f5c778144084242374473c350da": {
            "chainId": 1,
            "symbol": "aEthtBTC",
            "name": "Aave Ethereum tBTC",
            "address": "0x10ac93971cdb1f5c778144084242374473c350da",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x10ac93971cdb1f5c778144084242374473c350da_0x346d32f6b4a074d26eacd79d4ccd377301575392d2f73c63547052fc01048faa.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5c647ce0ae10658ec44fa4e11a51c96e94efd1dd": {
            "chainId": 1,
            "symbol": "aEthcbBTC",
            "name": "Aave Ethereum cbBTC",
            "address": "0x5c647ce0ae10658ec44fa4e11a51c96e94efd1dd",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x5c647ce0ae10658ec44fa4e11a51c96e94efd1dd_0x8deb32c0ea86e6f4439fee963b35180a64d2e9093a5ba4b9d85672651612deaa.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x73e0c0d45e048d25fc26fa3159b0aa04bfa4db98": {
            "chainId": 1,
            "symbol": "kBTC",
            "name": "Kraken Wrapped Bitcoin",
            "address": "0x73e0c0d45e048d25fc26fa3159b0aa04bfa4db98",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x73e0c0d45e048d25fc26fa3159b0aa04bfa4db98_0xab8daf45f9a19bc0ff968922a9a59af2179bc3ade016f8cfcd6eca8d97175ae1.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "GROUP:kBTC",
                "PEG:BTC",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x32a6268f9ba3642dda7892add74f1d34469a4259": {
            "chainId": 1,
            "symbol": "aEthUSDS",
            "name": "Aave Ethereum USDS",
            "address": "0x32a6268f9ba3642dda7892add74f1d34469a4259",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x32a6268f9ba3642dda7892add74f1d34469a4259_0x0101175a78e35ac8b9591e76627ae23201ea4cd05c52d5b0ed79ea8ce2c07f06.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x7c1156e515aa1a2e851674120074968c905aaf37": {
            "chainId": 1,
            "symbol": "lvlUSD",
            "name": "Level USD",
            "address": "0x7c1156e515aa1a2e851674120074968c905aaf37",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x7c1156e515aa1a2e851674120074968c905aaf37_0x8aed1e7d50b90123cbd629cbaaa9d86a606fbcebb0cf525ada357aeb5842f002.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6b7774cb12ed7573a7586e7d0e62a2a563ddd3f0": {
            "chainId": 1,
            "symbol": "SOPH",
            "name": "Sophon",
            "address": "0x6b7774cb12ed7573a7586e7d0e62a2a563ddd3f0",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x6b7774cb12ed7573a7586e7d0e62a2a563ddd3f0_0xe940c3fe26659dcad3de8895cb4f5f434ad46ac3572b35eddc23d2feadd85d4e.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SOPH",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0655977feb2f289a4ab78af67bab0d17aab84367": {
            "chainId": 1,
            "symbol": "scrvUSD",
            "name": "Savings crvUSD",
            "address": "0x0655977feb2f289a4ab78af67bab0d17aab84367",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x0655977feb2f289a4ab78af67bab0d17aab84367_0xb58ed5a0a815818f9bfa80a3186d099a281aef5f1a99d2d46c3a14d89efccf1f.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Trust Wallet Assets"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:availability"
            ]
        },
        "0x58d97b57bb95320f9a05dc918aef65434969c2b2": {
            "chainId": 1,
            "symbol": "MORPHO",
            "name": "Morpho Token",
            "address": "0x58d97b57bb95320f9a05dc918aef65434969c2b2",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x58d97b57bb95320f9a05dc918aef65434969c2b2_0xd700dff375fea378b42a0a7e6a2f985544dd958f1ce0adb8319a58b472ebb212.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2e44f3f609ff5aa4819b323fd74690f07c3607c4": {
            "chainId": 1,
            "symbol": "Pin",
            "name": "PinLink",
            "address": "0x2e44f3f609ff5aa4819b323fd74690f07c3607c4",
            "decimals": 18,
            "logoURI": null,
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xc83e27f270cce0a3a3a29521173a83f402c1768b": {
            "chainId": 1,
            "symbol": "USDQ",
            "name": "Quantoz USDQ",
            "address": "0xc83e27f270cce0a3a3a29521173a83f402c1768b",
            "decimals": 6,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xc83e27f270cce0a3a3a29521173a83f402c1768b_0x232cd28bbbf559f4d4ffa22bddaf03c2a0037b54501871f35b5da5874c77fa96.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Roll Social Money",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xdd3b11ef34cd511a2da159034a05fcb94d806686": {
            "chainId": 1,
            "symbol": "REKT",
            "name": "Rekt",
            "address": "0xdd3b11ef34cd511a2da159034a05fcb94d806686",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xdd3b11ef34cd511a2da159034a05fcb94d806686_0x41ee76060fba0da5f0224ffa6847490cc72ad3366489d0e0c88137ecb14008f0.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x2d62109243b87c4ba3ee7ba1d91b0dd0a074d7b1": {
            "chainId": 1,
            "symbol": "aEthrsETH",
            "name": "Aave Ethereum rsETH",
            "address": "0x2d62109243b87c4ba3ee7ba1d91b0dd0a074d7b1",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x2d62109243b87c4ba3ee7ba1d91b0dd0a074d7b1_0x160a3c63747be8b957dc5d6ab1dcfc3d3631796b5e69d3ef0037d4b95b07c877.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xccb365d2e11ae4d6d74715c680f56cf58bf4bf10": {
            "chainId": 1,
            "symbol": "WEPE",
            "name": "Wall Street Pepe",
            "address": "0xccb365d2e11ae4d6d74715c680f56cf58bf4bf10",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xccb365d2e11ae4d6d74715c680f56cf58bf4bf10_0x29b152019460acc7fc6f26b8bf1a155d0e64a65bef3233ec322a07a629653eb8.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb0ac2b5a73da0e67a8e5489ba922b3f8d582e058": {
            "chainId": 1,
            "symbol": "SHIRO",
            "name": "Shiro Neko",
            "address": "0xb0ac2b5a73da0e67a8e5489ba922b3f8d582e058",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb0ac2b5a73da0e67a8e5489ba922b3f8d582e058_0x4734db62b9e5c18cdfba7b055261b6de5a6cc859906734d6ce1f0f70179b0e2f.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xe0b7ad7f8f26e2b00c8b47b5df370f15f90fcf48": {
            "chainId": 1,
            "symbol": "SOLX",
            "name": "Solaxy",
            "address": "0xe0b7ad7f8f26e2b00c8b47b5df370f15f90fcf48",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xe0b7ad7f8f26e2b00c8b47b5df370f15f90fcf48_0xd6a73e43523acaf64715d8c68a90437ed78dca7081a0923dc6549fa9e0f49fe5.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0000000000c5dc95539589fbd24be07c6c14eca4": {
            "chainId": 1,
            "symbol": "CULT",
            "name": "Milady Cult Coin",
            "address": "0x0000000000c5dc95539589fbd24be07c6c14eca4",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x0000000000c5dc95539589fbd24be07c6c14eca4_0xb6e4bda7b6e98552eca59c231fcd32ffecadee41bedeb16e5118fc4427040a20.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0bfc9d54fc184518a81162f8fb99c2eaca081202": {
            "chainId": 1,
            "symbol": "waEthWETH",
            "name": "Wrapped Aave Ethereum WETH",
            "address": "0x0bfc9d54fc184518a81162f8fb99c2eaca081202",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x0bfc9d54fc184518a81162f8fb99c2eaca081202_0x9cdf5bda7948bd0aa4ec3f15c03f7e7a7cb93bf0dc085a71ec1b681645db0089.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x0fe906e030a44ef24ca8c7dc7b7c53a6c4f00ce9": {
            "chainId": 1,
            "symbol": "waEthLidoWETH",
            "name": "Wrapped Aave Ethereum Lido WETH",
            "address": "0x0fe906e030a44ef24ca8c7dc7b7c53a6c4f00ce9",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x0fe906e030a44ef24ca8c7dc7b7c53a6c4f00ce9_0x0fac82063a31686f772dc0829433a62f56b8510771f3d4af91e04911153d82ed.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x775f661b0bd1739349b9a2a3ef60be277c5d2d29": {
            "chainId": 1,
            "symbol": "waEthLidowstETH",
            "name": "Wrapped Aave Ethereum Lido wstETH",
            "address": "0x775f661b0bd1739349b9a2a3ef60be277c5d2d29",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x775f661b0bd1739349b9a2a3ef60be277c5d2d29_0x63b34b1171800a22c9e4ddb5bbb4d8bf0c06c63c9b411e0b34f516f113aed045.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x7bc3485026ac48b6cf9baf0a377477fff5703af8": {
            "chainId": 1,
            "symbol": "waEthUSDT",
            "name": "Wrapped Aave Ethereum USDT",
            "address": "0x7bc3485026ac48b6cf9baf0a377477fff5703af8",
            "decimals": 6,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x7bc3485026ac48b6cf9baf0a377477fff5703af8_0x984bbd32550a1dd6c9cfbe98599d58f56969cbecd1eebb6bdb3cb9f14d85fa25.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xd4fa2d31b7968e448877f69a96de69f5de8cd23e": {
            "chainId": 1,
            "symbol": "waEthUSDC",
            "name": "Wrapped Aave Ethereum USDC",
            "address": "0xd4fa2d31b7968e448877f69a96de69f5de8cd23e",
            "decimals": 6,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xd4fa2d31b7968e448877f69a96de69f5de8cd23e_0x36515c9123da94ab630d73686c94df9291fcae8c7d2694c8d0aa5a0578237518.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xde17a000ba631c5d7c2bd9fb692efea52d90dee2": {
            "chainId": 1,
            "symbol": "USDN",
            "name": "Ultimate Synthetic Delta Neutral",
            "address": "0xde17a000ba631c5d7c2bd9fb692efea52d90dee2",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xde17a000ba631c5d7c2bd9fb692efea52d90dee2_0x75a51b7796ba0daedfb23a180a3e6d3d400c6e2d92f1cef1411ffd4dea051b9f.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x97ad75064b20fb2b2447fed4fa953bf7f007a706": {
            "chainId": 1,
            "symbol": "beraSTONE",
            "name": "Berachain STONE",
            "address": "0x97ad75064b20fb2b2447fed4fa953bf7f007a706",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x97ad75064b20fb2b2447fed4fa953bf7f007a706_0x44175e43fed9d0fdd4ea684152a05edcb573592761aa5592380484623ae3fbb7.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x5f9d59db355b4a60501544637b00e94082ca575b": {
            "chainId": 1,
            "symbol": "waEthUSDe",
            "name": "Wrapped Aave Ethereum USDe",
            "address": "0x5f9d59db355b4a60501544637b00e94082ca575b",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x5f9d59db355b4a60501544637b00e94082ca575b_0xb422bf383b1a71094e552aa7eaab1910c66d5ec1115ef58f29d0cdc714e66aa0.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x867b0cdc4b39a19945e616c29639b0390b39db3b": {
            "chainId": 1,
            "symbol": "stataEthweETH",
            "name": "Static Aave Ethereum weETH",
            "address": "0x867b0cdc4b39a19945e616c29639b0390b39db3b",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x867b0cdc4b39a19945e616c29639b0390b39db3b_0x39492685ed31618a04e052f17eadcb9ad5dfee51c30619e0d26faf7c2b9b713f.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xc71ea051a5f82c67adcf634c36ffe6334793d24c": {
            "chainId": 1,
            "symbol": "waEthLidoGHO",
            "name": "Wrapped Aave Ethereum Lido GHO",
            "address": "0xc71ea051a5f82c67adcf634c36ffe6334793d24c",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xc71ea051a5f82c67adcf634c36ffe6334793d24c_0xb69f9496957a83ddc682f2dbfcc20495718744a91f3f8063d97406833430378c.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xad55aebc9b8c03fc43cd9f62260391c13c23e7c0": {
            "chainId": 1,
            "symbol": "cUSDO",
            "name": "Compounding Open Dollar",
            "address": "0xad55aebc9b8c03fc43cd9f62260391c13c23e7c0",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xad55aebc9b8c03fc43cd9f62260391c13c23e7c0_0x3d0b1a1762c5a7d6a29632c0c82c6a3bef0a174a6457b467ef108d4d8491e884.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x4dc26fc5854e7648a064a4abd590bbe71724c277": {
            "chainId": 1,
            "symbol": "ANIME",
            "name": "Animecoin",
            "address": "0x4dc26fc5854e7648a064a4abd590bbe71724c277",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x4dc26fc5854e7648a064a4abd590bbe71724c277_0xfa35daa458a7c830ad4a3ca72aea99ebc39cc9895b3bce3cf3511555c3bd849f.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:ANIME",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x99999999999999cc837c997b882957dafdcb1af9": {
            "chainId": 1,
            "symbol": "WUSDN",
            "name": "Wrapped Ultimate Synthetic Delta Neutral",
            "address": "0x99999999999999cc837c997b882957dafdcb1af9",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x99999999999999cc837c997b882957dafdcb1af9_0xbf6e0bf82cbc7cb935607808071b4a9defa204f4a6f90ae6952c1a1f0355e646.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:malicious",
                "tokens"
            ]
        },
        "0x65906988adee75306021c417a1a3458040239602": {
            "chainId": 1,
            "symbol": "aEthLBTC",
            "name": "Aave Ethereum LBTC",
            "address": "0x65906988adee75306021c417a1a3458040239602",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x65906988adee75306021c417a1a3458040239602_0xd97cf3878beedc2653e2f7656da3eb4f526d80acd8a826e8d7f1c5c972fdc507.png",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0xb51edddd8c47856d81c8681ea71404cec93e92c6": {
            "chainId": 1,
            "symbol": "waEthPYUSD",
            "name": "Wrapped Aave Ethereum PYUSD",
            "address": "0xb51edddd8c47856d81c8681ea71404cec93e92c6",
            "decimals": 6,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb51edddd8c47856d81c8681ea71404cec93e92c6_0x5305c67e1d91f6638a17dad237401f0646e11d53fec047c718de98e30461d3b0.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0xbdf43ecadc5cef51b7d1772f722e40596bc1788b": {
            "chainId": 1,
            "symbol": "SEI",
            "name": "SEI",
            "address": "0xbdf43ecadc5cef51b7d1772f722e40596bc1788b",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xbdf43ecadc5cef51b7d1772f722e40596bc1788b_0xaeadaef4588d071fb4f5db0a36d495ec8c79a9faafff09347970ee021d514a18.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x57ab1e0003f623289cd798b1824be09a793e4bec": {
            "chainId": 1,
            "symbol": "reUSD",
            "name": "Resupply USD",
            "address": "0x57ab1e0003f623289cd798b1824be09a793e4bec",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x57ab1e0003f623289cd798b1824be09a793e4bec_0x672cf9d2976807167c8d83014e711ebfc56da37466c72fde910a3af685932a03.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "PEG:USD",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d": {
            "chainId": 1,
            "symbol": "USD1",
            "name": "World Liberty Financial USD",
            "address": "0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d_0x9333bfcde7fedad614ccf4a3d03fcd33c03d4c7156ddc3d859f00576f2eee80f.webp",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:USD1",
                "PEG:USD",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xb80b3215ea8183a064073f9892eb64236160a4df": {
            "chainId": 1,
            "symbol": "waEthUSDS",
            "name": "Wrapped Aave Ethereum USDS",
            "address": "0xb80b3215ea8183a064073f9892eb64236160a4df",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb80b3215ea8183a064073f9892eb64236160a4df_0xd3b1860b62fb5ad02434814e87940d4edfb1e538b73dd6096f52c7eb7941660c.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xef4461891dfb3ac8572ccf7c794664a8dd927945": {
            "chainId": 1,
            "symbol": "WCT",
            "name": "WalletConnect",
            "address": "0xef4461891dfb3ac8572ccf7c794664a8dd927945",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xef4461891dfb3ac8572ccf7c794664a8dd927945_0xab273efdb82140ed651b9bd4c074a30d1f357ca1ad80ea133fbeb8df2bb9c090.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "GROUP:WCT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x5caf5a86f39073637ac7c8a7b5290871de80cb9b": {
            "chainId": 1,
            "symbol": "waEthDAI",
            "name": "Wrapped Aave Ethereum DAI",
            "address": "0x5caf5a86f39073637ac7c8a7b5290871de80cb9b",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x5caf5a86f39073637ac7c8a7b5290871de80cb9b_0x8387132d41c5a05f314edf87b0ca7e3422d1d2d03faa4fa536781e4efb2b6407.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x5fefd7069a7d91d01f269dade14526ccf3487810": {
            "chainId": 1,
            "symbol": "aEtheBTC",
            "name": "Aave Ethereum eBTC",
            "address": "0x5fefd7069a7d91d01f269dade14526ccf3487810",
            "decimals": 8,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x5fefd7069a7d91d01f269dade14526ccf3487810_0x256e996b7b98ce20bcc66ef573631858dd9df0b75d4a40613a3bea085a6fde0a.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x28d38df637db75533bd3f71426f3410a82041544": {
            "chainId": 1,
            "symbol": "PROMPT",
            "name": "Prompt",
            "address": "0x28d38df637db75533bd3f71426f3410a82041544",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x28d38df637db75533bd3f71426f3410a82041544_0xc9b6cea6f7e626df85a64022149e82ee791e08e1502cc3cb5b0ac48abe86d93c.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:PROMPT",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x0f81001ef0a83ecce5ccebf63eb302c70a39a654": {
            "chainId": 1,
            "symbol": "DOLO",
            "name": "Dolomite",
            "address": "0x0f81001ef0a83ecce5ccebf63eb302c70a39a654",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x0f81001ef0a83ecce5ccebf63eb302c70a39a654_0x39c9407d40dd63f0cdac7a01395ac2ecc20bd989147937b1148579a37d311ba5.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0xfa82580c16a31d0c1bc632a36f82e83efef3eec0": {
            "chainId": 1,
            "symbol": "aEthRLUSD",
            "name": "Aave Ethereum RLUSD",
            "address": "0xfa82580c16a31d0c1bc632a36f82e83efef3eec0",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xfa82580c16a31d0c1bc632a36f82e83efef3eec0_0xa1cdb7574b3548a5f7c9304241ec7228015e7b46fa2bbdf1e08a79e7014cf666.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x91ad1f5443cf356010d2171d6d26b11c309c4b16": {
            "chainId": 1,
            "symbol": "waEthRPL",
            "name": "Wrapped Aave Ethereum RPL",
            "address": "0x91ad1f5443cf356010d2171d6d26b11c309c4b16",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x91ad1f5443cf356010d2171d6d26b11c309c4b16_0x11f447b6ec2d5db723c14c10036bbed3ea4512d63f3b8e1f9270e1aa109248b4.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x6a1792a91c08e9f0bfe7a990871b786643237f0f": {
            "chainId": 1,
            "symbol": "waEthRLUSD",
            "name": "Wrapped Aave Ethereum RLUSD",
            "address": "0x6a1792a91c08e9f0bfe7a990871b786643237f0f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x6a1792a91c08e9f0bfe7a990871b786643237f0f_0xaba15b5b4a75ce3bc42e40bad180d4a20ed97eb9045437773cadd67f2a9d3e58.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "tokens"
            ]
        },
        "0x4d4574f50dd8b9dbe623cf329dcc78d76935e610": {
            "chainId": 1,
            "symbol": "ZEUS",
            "name": "Zeus",
            "address": "0x4d4574f50dd8b9dbe623cf329dcc78d76935e610",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x4d4574f50dd8b9dbe623cf329dcc78d76935e610_0xc7a1c6a31f2e56f454c269a3855b37330293366bc23e37dee6cba80b835326d9.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x61dbbbb552dc893ab3aad09f289f811e67cef285": {
            "chainId": 1,
            "symbol": "SKATE",
            "name": "Skate",
            "address": "0x61dbbbb552dc893ab3aad09f289f811e67cef285",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x61dbbbb552dc893ab3aad09f289f811e67cef285_0x30dc537b5767fb8cb1745b4308ee947387f47a6f5ddd92a44be1a0cda7959262.jpg",
            "providers": [
                "1inch",
                "Arb Whitelist Era",
                "BORGSWAP",
                "CoinGecko",
                "Coinmarketcap",
                "PancakeSwap Default List",
                "SpookySwap Default List",
                "Venus Default List",
                "Zerion"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "GROUP:SKATE",
                "RISK:unverified",
                "tokens"
            ]
        },
        "0x4f1aac70b303818ddd0823570af3bb46681d9bd8": {
            "chainId": 1,
            "symbol": "SBET",
            "name": "SharpLink Gaming",
            "address": "0x4f1aac70b303818ddd0823570af3bb46681d9bd8",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x4f1aac70b303818ddd0823570af3bb46681d9bd8_0x12340fd052cd70f9c3de41def3032fcd552b897bf8bca916541a314c1cdee1c0.jpg",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x926759a8eaecfadb5d8bdc7a9c7b193c5085f507": {
            "chainId": 1,
            "symbol": "NURA",
            "name": "Nura Labs",
            "address": "0x926759a8eaecfadb5d8bdc7a9c7b193c5085f507",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x926759a8eaecfadb5d8bdc7a9c7b193c5085f507_0x5cba4a8cc529091e0d6900fddbe904ba253c1f97f5777952e81b794bb7e8409a.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xf5f52266a57e6d7312da39bd7ab9527b9e975c40": {
            "chainId": 1,
            "symbol": "AVM",
            "name": "Agents Virtual Machine",
            "address": "0xf5f52266a57e6d7312da39bd7ab9527b9e975c40",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xf5f52266a57e6d7312da39bd7ab9527b9e975c40_0x8b6e839e22237474741f74602008c0e86a69d097434b1b2833c7c362c28a9a8d.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:suspicious",
                "tokens"
            ]
        },
        "0x9f277edfc463ebaa3d2a6274b01177697e910391": {
            "chainId": 1,
            "symbol": "WOOLLY",
            "name": "Miniature Woolly Mammoth",
            "address": "0x9f277edfc463ebaa3d2a6274b01177697e910391",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x9f277edfc463ebaa3d2a6274b01177697e910391_0x8203b86d9872bb55a0802f74794a3c6caaf7e29d8201b0fab8f4cb0f15f56daa.webp",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xc20059e0317de91738d13af027dfc4a50781b066": {
            "chainId": 1,
            "symbol": "SPK",
            "name": "Spark",
            "address": "0xc20059e0317de91738d13af027dfc4a50781b066",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xc20059e0317de91738d13af027dfc4a50781b066_0xe1967236cb77a5916bc97d828df5948eb7b9f55389d389b3300ffd0bba3c4768.png",
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko",
                "Uniswap Labs Default",
                "Wrapped Tokens"
            ],
            "eip2612": true,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xe6f98920852a360497dbcc8ec895f1bb1f7c8df4": {
            "chainId": 1,
            "symbol": "VISION",
            "name": "OpenVision",
            "address": "0xe6f98920852a360497dbcc8ec895f1bb1f7c8df4",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xe6f98920852a360497dbcc8ec895f1bb1f7c8df4_0xdd35b2a6fda346c98327c0fc44410d13982ee74379d6090c51ac6d64c8ba8bc5.jpg",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0xb17be9a85d1e04d1aa6ea4b83c0bb6a2030c261f": {
            "chainId": 1,
            "symbol": "QBIT",
            "name": "Qubit",
            "address": "0xb17be9a85d1e04d1aa6ea4b83c0bb6a2030c261f",
            "decimals": 18,
            "logoURI": "https://tokens-data.1inch.io/images/1/0xb17be9a85d1e04d1aa6ea4b83c0bb6a2030c261f_0x00fa8aebb37089106182fc41bc17f3ad4ccc828476473699a56a05ab6890c04e.webp",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "tokens"
            ]
        },
        "0x95af4af910c28e8ece4512bfe46f1f33687424ce": {
            "chainId": 1,
            "symbol": "MANYU",
            "name": "Manyu",
            "address": "0x95af4af910c28e8ece4512bfe46f1f33687424ce",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x95af4af910c28e8ece4512bfe46f1f33687424ce_0x9bff6be7f40de935d6d334bfa695cbeed884155e6e83df38f4606ccedeca8a99.jpg",
            "providers": [
                "1inch",
                "CoinGecko",
                "Kleros Tokens",
                "MyCrypto Token List",
                "Set"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0xcab84bc21f9092167fcfe0ea60f5ce053ab39a1e": {
            "chainId": 1,
            "symbol": "Block",
            "name": "Block",
            "address": "0xcab84bc21f9092167fcfe0ea60f5ce053ab39a1e",
            "decimals": 18,
            "logoURI": null,
            "providers": [
                "1inch",
                "Arbed Arb Whitelist Era",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "RISK:availability",
                "tokens"
            ]
        },
        "0x0b2fa18342d38909e3e44d7103cf3f37b0a0403a": {
            "chainId": 1,
            "symbol": "TANUKI",
            "name": "Tanuki",
            "address": "0x0b2fa18342d38909e3e44d7103cf3f37b0a0403a",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x0b2fa18342d38909e3e44d7103cf3f37b0a0403a_0x39048daf910128c613e22077cf8764d8d43a14b49c8997333a54091200ea9eff.png",
            "providers": [
                "1inch",
                "CoinGecko"
            ],
            "eip2612": false,
            "isFoT": true,
            "tags": [
                "RISK:availability",
                "tokens"
            ]
        },
        "0x1eb02047a8a1686a9e80f355d37d72fbc446685f": {
            "chainId": 1,
            "symbol": "ORAI_1",
            "name": "Ordium AI",
            "address": "0x1eb02047a8a1686a9e80f355d37d72fbc446685f",
            "decimals": 9,
            "logoURI": "https://tokens-data.1inch.io/images/1/0x1eb02047a8a1686a9e80f355d37d72fbc446685f_0x30e63e53edb87c6328a7e244bf04c6b6b94398271583d8536e3bbfa5e3000026.webp",
            "providers": [
                "1inch"
            ],
            "eip2612": false,
            "isFoT": false,
            "tags": [
                "crosschain",
                "tokens"
            ],
            "displayedSymbol": "ORAI"
        }
    }

    return Object.keys(hardcodedTokens).map((token) => {
        return {
            symbol: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).symbol as string,
            name: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).name as string,
            address: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).address as string,
            decimals: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).decimals as number,
            logoURI: (hardcodedTokens[token as keyof typeof hardcodedTokens] as any).logoURI as string
        }
    })  
}