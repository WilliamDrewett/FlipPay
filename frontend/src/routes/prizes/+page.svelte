<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import { getPrizes, type Prize } from '$lib/api/getPrizes';
	import ethereumAddress from '$lib/store/wallets/ethereum';
	import polkadotAddress from '$lib/store/wallets/polkadot';
	import Icon from '@iconify/svelte';

	let prizes = $state<Prize[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);

	// Reactive wallet address from either ethereum or polkadot store
	let walletAddress = $derived($ethereumAddress || $polkadotAddress);

	async function loadPrizes() {
		if (!walletAddress) {
			error = 'No wallet address connected';
			return;
		}

		loading = true;
		error = null;

		try {
			prizes = await getPrizes(walletAddress);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error loading prizes';
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	// Load prizes when wallet address changes
	$effect(() => {
		if (walletAddress) {
			loadPrizes();
		} else {
			prizes = [];
			error = null;
		}
	});

    loadPrizes();

	function formatGameType(gameType: string): string {
		return gameType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
	}

	function formatOutcome(outcome: string): string {
		return outcome.charAt(0).toUpperCase() + outcome.slice(1);
	}

	function getGameTypeIcon(gameType: string): string {
		switch (gameType) {
			case 'spin_wheel':
				return 'mdi:wheel-barrow';
			case 'mystery_box':
				return 'mdi:package-variant-closed';
			case 'nft_crate':
				return 'mdi:cube-outline';
			case 'loot_box':
				return 'mdi:treasure-chest';
			default:
				return 'mdi:gift-outline';
		}
	}

	function getOutcomeColor(outcome: string): string {
		switch (outcome.toLowerCase()) {
			case 'win':
				return 'text-green-400';
			case 'rare':
				return 'text-blue-400';
			case 'epic':
				return 'text-purple-400';
			case 'legendary':
				return 'text-yellow-400';
			case 'uncommon':
				return 'text-orange-400';
			default:
				return 'text-gray-400';
		}
	}
</script>

<!-- --------------------------------------- CONTENT -->
<div class="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-6">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-3xl font-bold text-white">Prize Collection</h1>
		<p class="text-gray-400">View your won prizes and rewards</p>
	</div>
	{#if !walletAddress}
		<div class="flex flex-col items-center justify-center gap-4 p-8">
			<Icon icon="hugeicons:connect" color="white" width="42" height="42" class="opacity-50" />
			<p class="text-center text-gray-400">
				Connect your both wallets (Ethereum and Polkadot) to view your prizes
			</p>
		</div>
	{:else if loading}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:loading" class="mx-auto mb-4 animate-spin text-4xl" />
				<p class="text-gray-400">Loading prizes...</p>
			</div>
		</Card>
	{:else if error}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:alert-circle-outline" class="mx-auto mb-4 text-6xl text-red-500" />
				<h2 class="mb-2 text-xl font-semibold text-white">Error</h2>
				<p class="mb-4 text-red-400">{error}</p>
				<button
					onclick={loadPrizes}
					class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Retry
				</button>
			</div>
		</Card>
	{:else if prizes.length === 0}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:treasure-chest" class="mx-auto mb-4 text-6xl text-gray-500" />
				<h2 class="mb-2 text-xl font-semibold text-white">No Prizes Yet</h2>
				<p class="text-gray-400">You haven't won any prizes yet. Start playing to earn rewards!</p>
			</div>
		</Card>
	{:else}
		<div class="space-y-4">
			{#each prizes as prize (prize.id)}
				<Card>
					<div class="p-6">
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center gap-3">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
								>
									<Icon icon={getGameTypeIcon(prize.game_type)} class="text-xl text-white" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-white">
										{prize.prize}
									</h3>
									<p class="text-sm text-gray-400">From {formatGameType(prize.game_type)}</p>
								</div>
							</div>
							<div class="text-right">
								<p class="text-xl font-bold {getOutcomeColor(prize.outcome)}">
									{formatOutcome(prize.outcome)}
								</p>
								<p class="text-sm text-gray-400">Prize #{prize.id}</p>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4 md:grid-cols-3">
							<div class="text-center">
								<p class="text-sm text-gray-400">Points Spent</p>
								<p class="text-lg font-semibold text-red-400">
									-{prize.points_spent}
								</p>
							</div>
							<div class="text-center">
								<p class="text-sm text-gray-400">Game Type</p>
								<p class="text-lg font-semibold text-white">
									{formatGameType(prize.game_type)}
								</p>
							</div>
							<div class="text-center">
								<p class="text-sm text-gray-400">Status</p>
								<div class="flex items-center justify-center gap-1">
									<Icon icon="mdi:trophy" class="text-yellow-400" />
									<span class="text-sm font-semibold text-yellow-400">Won</span>
								</div>
							</div>
						</div>
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<button
				onclick={loadPrizes}
				class="transform rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
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
