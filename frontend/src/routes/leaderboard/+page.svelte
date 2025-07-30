<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import { getLeaderboard, type LeaderboardEntry } from '$lib/api/getLeaderboard';
	import Icon from '@iconify/svelte';

	let leaderboard = $state<LeaderboardEntry[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	async function loadLeaderboard() {
		loading = true;
		error = null;

		try {
			leaderboard = await getLeaderboard();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error loading leaderboard';
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	// Load leaderboard on mount
	onMount(() => {
		loadLeaderboard();
	});

	function getRankIcon(index: number): string {
		switch (index) {
			case 0:
				return 'mdi:trophy';
			case 1:
				return 'mdi:medal-outline';
			case 2:
				return 'mdi:medal-outline';
			default:
				return 'mdi:account-circle-outline';
		}
	}

	function getRankColor(index: number): string {
		switch (index) {
			case 0:
				return 'text-yellow-400';
			case 1:
				return 'text-gray-300';
			case 2:
				return 'text-amber-600';
			default:
				return 'text-gray-400';
		}
	}

	function formatWalletAddress(address: string): string {
		if (address.length <= 12) return address;
		return `${address.slice(0, 6)}...${address.slice(-6)}`;
	}
</script>

<!-- --------------------------------------- CONTENT -->
<div class="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-6">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-3xl font-bold text-white">Leaderboard</h1>
		<p class="text-gray-400">Top players ranked by points</p>
	</div>

	{#if loading}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:loading" class="mx-auto mb-4 animate-spin text-4xl" />
				<p class="text-gray-400">Loading leaderboard...</p>
			</div>
		</Card>
	{:else if error}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:alert-circle-outline" class="mx-auto mb-4 text-6xl text-red-500" />
				<h2 class="mb-2 text-xl font-semibold text-white">Error</h2>
				<p class="mb-4 text-red-400">{error}</p>
				<button
					onclick={loadLeaderboard}
					class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Retry
				</button>
			</div>
		</Card>
	{:else if leaderboard.length === 0}
		<Card width="lg">
			<div class="p-8 text-center">
				<Icon icon="mdi:trophy-outline" class="mx-auto mb-4 text-6xl text-gray-500" />
				<h2 class="mb-2 text-xl font-semibold text-white">No Players Yet</h2>
				<p class="text-gray-400">Be the first one to join the leaderboard!</p>
			</div>
		</Card>
	{:else}
		<div class="w-full space-y-4">
			{#each leaderboard as entry, index (entry.wallet_address)}
				<Card>
					<div class="p-6">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div class="flex items-center gap-2">
									<div
										class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
									>
										<Icon icon={getRankIcon(index)} class="text-xl text-white" />
									</div>
									<div class="text-center">
										<p class="text-lg font-bold {getRankColor(index)}">
											#{index + 1}
										</p>
									</div>
								</div>
								<div>
									<h3 class="text-lg font-semibold text-white">
										{formatWalletAddress(entry.wallet_address)}
									</h3>
									<p class="text-sm text-gray-400">Wallet Address</p>
								</div>
							</div>
							<div class="text-right">
								<p class="text-2xl font-bold text-green-400">
									{entry.points.toLocaleString()}
								</p>
								<p class="text-sm text-gray-400">Points</p>
							</div>
						</div>
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<button
				onclick={loadLeaderboard}
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
