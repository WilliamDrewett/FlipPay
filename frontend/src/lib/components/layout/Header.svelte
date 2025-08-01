<!-- https://www.freepik.com/premium-ai-image/neon-futuristic-loot-crate-treasure-chest-vector-illustration-game-desgin-spritesheet-white_159931526.htm#fromView=keyword&page=3&position=6&uuid=c5e60241-2775-4fe9-ba40-f19534fbbca4&query=Loot+Box -->
<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
	import { ethers } from 'ethers';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { derived } from 'svelte/store';
	import ethereumAddress from '$lib/store/wallets/ethereum';
	import polkadotAddress from '$lib/store/wallets/polkadot';
	import balance from '$lib/store/wallets/balance';
	import { getBalance } from '$lib/api/getBalance';

	// Provider for Ethereum
	let provider: ethers.BrowserProvider | null = null;

	// Interval ID for balance polling
	let balancePollingInterval: NodeJS.Timeout | null = null;

	// Derived stores for connection status
	const isEthereumConnected = derived(
		ethereumAddress,
		($ethereumAddress) => $ethereumAddress !== null
	);
	const isPolkadotConnected = derived(
		polkadotAddress,
		($polkadotAddress) => $polkadotAddress !== null
	);

	// Function to fetch and update balance
	async function fetchAndUpdateBalance() {
		// Get the connected wallet address (prioritize Ethereum, then Polkadot)
		const currentEthereumAddress = $ethereumAddress;
		const currentPolkadotAddress = $polkadotAddress;

		const walletAddress = currentEthereumAddress || currentPolkadotAddress;

		if (!walletAddress) {
			balance.set(null);
			return;
		}

		try {
			const balanceResponse = await getBalance(walletAddress);
			balance.set(balanceResponse.points);
		} catch (error) {
			console.error('Error fetching balance:', error);
			// Don't update balance on error to keep the last known value
		}
	}

	// Function to start balance polling
	function startBalancePolling() {
		if (balancePollingInterval) return; // Already polling

		// Fetch balance immediately
		fetchAndUpdateBalance();

		// Set up interval to fetch balance every second
		balancePollingInterval = setInterval(fetchAndUpdateBalance, 1000);
	}

	// Function to stop balance polling
	function stopBalancePolling() {
		if (balancePollingInterval) {
			clearInterval(balancePollingInterval);
			balancePollingInterval = null;
		}
		balance.set(null);
	}

	// Reactive statement to start/stop polling based on wallet connection
	$: {
		const hasConnectedWallet = $isEthereumConnected || $isPolkadotConnected;
		if (hasConnectedWallet) {
			startBalancePolling();
		} else {
			stopBalancePolling();
		}
	}

	// Check if wallets are already connected on component mount
	onMount(async () => {
		// Check Ethereum connection
		if (browser && typeof window !== 'undefined' && (window as any).ethereum) {
			try {
				const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
				if (accounts.length > 0) {
					provider = new ethers.BrowserProvider((window as any).ethereum);
					ethereumAddress.set(accounts[0]);
				}
			} catch (error) {
				console.error('Error checking existing Ethereum connection:', error);
			}
		}

		// Check Polkadot connection
		if (browser) {
			try {
				const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
				const extensions = await web3Enable('FlipPay');
				if (extensions.length > 0) {
					const allAccounts = await web3Accounts();
					if (allAccounts.length > 0) {
						polkadotAddress.set(allAccounts[0].address);
					}
				}
			} catch (error) {
				console.error('Error checking existing Polkadot connection:', error);
			}
		}
	});

	// Cleanup interval on component destroy
	onDestroy(() => {
		if (balancePollingInterval) {
			clearInterval(balancePollingInterval);
			balancePollingInterval = null;
		}
	});

	// Connect Ethereum wallet function
	async function connectEthereumWallet() {
		if (browser && typeof window !== 'undefined' && (window as any).ethereum) {
			try {
				// Request account access
				await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

				// Create provider and get signer
				provider = new ethers.BrowserProvider((window as any).ethereum);
				const signer = await provider.getSigner();

				// Get address and update store
				const address = await signer.getAddress();
				ethereumAddress.set(address);

				console.log('Ethereum wallet connected:', address);
			} catch (error) {
				console.error('Error connecting Ethereum wallet:', error);
			}
		} else {
			alert('Please install MetaMask or another Ethereum wallet to connect');
		}
	}

	// Connect Polkadot wallet function
	async function connectPolkadotWallet() {
		if (!browser) return;

		try {
			// Import Polkadot modules dynamically (client-side only)
			const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
			const { ApiPromise, WsProvider } = await import('@polkadot/api');

			// Request access to extension
			const extensions = await web3Enable('FlipPay');
			if (extensions.length === 0) {
				alert('No Polkadot.js extension detected. Please install the Polkadot.js extension');
				return;
			}

			// Get accounts
			const allAccounts = await web3Accounts();
			if (allAccounts.length === 0) {
				alert('No Polkadot account found. Please create an account in your extension');
				return;
			}

			console.log('Available Substrate accounts:', allAccounts);

			// Network connection (here Polkadot mainnet)
			const wsProvider = new WsProvider('wss://rpc.polkadot.io');
			const polkadotApi = await ApiPromise.create({ provider: wsProvider });

			// Use the first available account and update store
			const { address } = allAccounts[0];
			polkadotAddress.set(address);

			// Connection successful
			console.log('Polkadot wallet connected:', address);
		} catch (error) {
			console.error('Error connecting to Polkadot wallet:', error);
			alert('Error connecting to Polkadot wallet. Check your extension.');
		}
	}

	// Format address for display (show first 6 and last 4 characters)
	function formatAddress(address: string): string {
		if (!address) return '';
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	}
</script>

<!-- --------------------------------------- CONTENT -->
<header class=" flex flex-col">
	<div class="flex w-full items-center justify-between px-6 py-3">
		<div class="flex items-center gap-8">
			<a href="/">
				<h1>FlipPay</h1>
			</a>
			<nav class="-mb-4">
				<ul class="flex items-center gap-8">
					<li>
						<a href="/">
							<p>Swap</p>
						</a>
					</li>
					<li>
						<a href="/transactions">
							<p>Transactions</p>
						</a>
					</li>
					<li>
						<a href="/leaderboard">
							<p>Leaderboard</p>
						</a>
					</li>
					<li>
						<a href="/prizes">
							<p>Prizes</p>
						</a>
					</li>
					<li>
						<a href="/play">
							<button class="btn btn-accent btn-outline btn-sm rounded-full text-white">
								<Icon icon="mdi:slot-machine" color="white" width="20" height="20" />
								<p>Play Now!</p>
							</button>
						</a>
					</li>
				</ul>
			</nav>
		</div>
		<div class="flex items-center gap-2">
			<!-- Points natifs de la plateforme -->
			<button class="btn btn-outline btn-sm btn-success rounded-full" disabled>
				<Icon icon="ri:gemini-fill" color="white" width="18" height="18" />
				{#if !$isEthereumConnected && !$isPolkadotConnected}
					<span class="hidden text-white opacity-50 md:block"> 0 </span>
				{:else if $balance !== null}
					<span class="hidden text-white md:block">
						{$balance}
					</span>
				{:else}
					<span class="loading loading-spinner loading-xs text-white"></span>
				{/if}
			</button>
			<button
				class="btn btn-secondary btn-sm rounded-full {$isEthereumConnected ? 'btn-success' : ''}"
				on:click={connectEthereumWallet}
				disabled={$isEthereumConnected}
			>
				<Icon icon="ri:eth-fill" color="white" width="18" height="18" />
				<span class="hidden text-white md:block">
					{$isEthereumConnected ? formatAddress($ethereumAddress || '') : 'Connect Ethereum Wallet'}
				</span>
			</button>
			<button
				class="btn btn-secondary btn-sm rounded-full {$isPolkadotConnected ? 'btn-success' : ''}"
				on:click={connectPolkadotWallet}
				disabled={$isPolkadotConnected}
			>
				<Icon icon="simple-icons:polkadot" color="white" width="18" height="18" />
				<span class="hidden text-white md:block">
					{$isPolkadotConnected ? formatAddress($polkadotAddress || '') : 'Connect Polkadot Wallet'}
				</span>
			</button>
			<a href="/settings">
				<button class="btn-rotate btn btn-sm btn-accent btn-ghost w-8 rounded-full p-0">
					<div>
						<Icon icon="material-symbols:settings" color="white" width="20" height="20" />
					</div>
				</button>
			</a>
			<a href="/about">
				<button class="btn-flip-x btn btn-sm btn-accent btn-ghost w-8 rounded-full p-0">
					<div>
						<Icon icon="ix:about" color="white" width="20" height="20" />
					</div>
				</button>
			</a>
		</div>
	</div>
	<!-- <div class="bg-black/50 w-full text-sm text-white">
        <ul class="message-line flex items-center gap-2">
            <li>
                <p class="bg-black">yo bien?</p>
            </li>
            <li>
                <p class="bg-pink-500">yolo</p>
            </li>
            <li>
                <p class="">Lorem ipdicta veritatis nihil, ex consectetur debitis aliquid enim odit quas.</p>
            </li>
            <li>
                <p>okok</p>
            </li>
        </ul>
    </div> -->
</header>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';
	li a {
		@apply transition-all duration-200 hover:text-white;
	}

	.message-line {
		animation: message-line 30s linear infinite;
		width: 100%;
		overflow: hidden;
	}
	@keyframes message-line {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
