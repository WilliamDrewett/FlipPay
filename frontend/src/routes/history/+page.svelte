<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import { getTransactions, type Transaction } from '$lib/api/getTransactions';
	import ethereumAddress from '$lib/store/wallets/ethereum';
	import polkadotAddress from '$lib/store/wallets/polkadot';
	import Icon from '@iconify/svelte';

	let transactions = $state<Transaction[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);

	// Reactive wallet address from either ethereum or polkadot store
	let walletAddress = $derived($ethereumAddress || $polkadotAddress);

	async function loadTransactions() {
		if (!walletAddress) {
			error = 'No wallet address connected';
			return;
		}

		loading = true;
		error = null;

		try {
			transactions = await getTransactions(walletAddress);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error loading transactions';
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	// Load transactions when wallet address changes
	$effect(() => {
		if (walletAddress) {
			loadTransactions();
		} else {
			transactions = [];
			error = null;
		}
	});

    loadTransactions();

	function formatTokenName(token: string): string {
		return token.toUpperCase();
	}

	function formatAmount(amount: number): string {
		return amount.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 6
		});
	}

	function formatFee(fee: number): string {
		return fee.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 4
		});
	}
</script>

<!-- --------------------------------------- CONTENT -->
<div class="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-6">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-3xl font-bold text-white">Transaction History</h1>
		<p class="text-gray-400">View your swaps and earned points</p>
	</div>
	{#if !walletAddress}
		<div class="flex flex-col items-center justify-center gap-4 p-8">
			<Icon icon="hugeicons:connect" color="white" width="42" height="42" class="opacity-50" />
			<p class="text-center text-gray-400">
				Connect your both wallets (Ethereum and Polkadot) to view your transactions
			</p>
		</div>
	{:else if loading}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:loading" class="mx-auto mb-4 animate-spin text-4xl" />
				<p class="text-gray-400">Loading transactions...</p>
			</div>
		</Card>
	{:else if error}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:alert-circle-outline" class="mx-auto mb-4 text-6xl text-red-500" />
				<h2 class="mb-2 text-xl font-semibold text-white">Error</h2>
				<p class="mb-4 text-red-400">{error}</p>
				<button
					onclick={loadTransactions}
					class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Retry
				</button>
			</div>
		</Card>
	{:else if transactions.length === 0}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:history" class="mx-auto mb-4 text-6xl text-gray-500" />
				<h2 class="mb-2 text-xl font-semibold text-white">No Transactions</h2>
				<p class="text-gray-400">You haven't made any transactions yet</p>
			</div>
		</Card>
	{:else}
		<div class="space-y-4">
			{#each transactions as transaction (transaction.id)}
				<Card>
					<div class="p-6">
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center gap-3">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
								>
									<Icon icon="mdi:swap-horizontal" class="text-xl text-white" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-white">
										{formatTokenName(transaction.from_token)} → {formatTokenName(
											transaction.to_token
										)}
									</h3>
									<p class="text-sm text-gray-400">Transaction #{transaction.id}</p>
								</div>
							</div>
							<div class="text-right">
								<p class="text-xl font-bold text-white">{formatAmount(transaction.amount)}</p>
								<p class="text-sm text-gray-400">{formatTokenName(transaction.from_token)}</p>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4 md:grid-cols-4">
							<div class="text-center">
								<p class="text-sm text-gray-400">Points Earned</p>
								<p class="text-lg font-semibold text-green-400">
									+{transaction.points_earned}
								</p>
							</div>
							<div class="text-center">
								<p class="text-sm text-gray-400">Fee</p>
								<p class="text-lg font-semibold text-white">
									{transaction.was_free
										? 'Free'
										: `${formatFee(transaction.fee_paid)} ${formatTokenName(transaction.from_token)}`}
								</p>
							</div>
							<div class="text-center">
								<p class="text-sm text-gray-400">Type</p>
								<p class="text-lg font-semibold text-white">
									{transaction.was_free ? 'Free Swap' : 'Paid Swap'}
								</p>
							</div>
							<div class="text-center">
								<p class="text-sm text-gray-400">Status</p>
								<div class="flex items-center justify-center gap-1">
									<Icon icon="mdi:check-circle" class="text-green-400" />
									<span class="text-sm font-semibold text-green-400">Completed</span>
								</div>
							</div>
						</div>
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<button
				onclick={loadTransactions}
				class="transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-purple-700"
			>
				<Icon icon="mdi:refresh" class="mr-2 inline" />
				Refresh
			</button>
		</div>
	{/if}
</div>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';
</style>
