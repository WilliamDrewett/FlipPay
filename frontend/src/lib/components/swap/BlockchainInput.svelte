<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import { getEthTokensHARDCODED } from '$lib/api/getEthTokens';
	import Icon from '@iconify/svelte';

	let {
		source,
		blockchain,
		spotPrice
	}: { source: boolean; blockchain: 'ETH' | 'DOT'; spotPrice: number } = $props();

	let tokens = $state<
		{ symbol: string; name: string; address: string; decimals: number; logoURI: string }[]
	>([]);

	if (blockchain === 'ETH') {
		tokens = getEthTokensHARDCODED() as {
			symbol: string;
			name: string;
			address: string;
			decimals: number;
			logoURI: string;
		}[];
	} else {
		tokens = [
			{
				symbol: 'DOT',
				name: 'Polkadot',
				address: '0x0000000000000000000000000000000000000000', // Example address
				decimals: 10,
				logoURI: 'https://polkadot.network/assets/img/favicon/favicon-32x32.png'
			}
		];
	}

	let selectedToken = $state<{
		symbol: string;
		name: string;
		address: string;
		decimals: number;
		logoURI: string;
	} | null>(null);
</script>

<!-- --------------------------------------- CONTENT -->
<div
	class="bg-base-300 relative flex w-full flex-col gap-2 overflow-hidden rounded-2xl border border-neutral-700 p-4"
	style={source ? 'background-color: #111' : ''}
>
	<p class="text-base-content text-xs">
		{#if source}
			You pay
		{:else}
			You receive
		{/if}
	</p>
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-1 text-white">
			{#if blockchain === 'ETH'}
				<Icon icon="token-branded:eth" color="white" width="28" height="28" />
			{:else if blockchain === 'DOT'}
				<Icon icon="token-branded:polkadot" color="white" width="28" height="28" />
			{/if}
			<p class="text-sm">{blockchain}</p>
			<select class="select select-bordered select-sm ml-2 w-28 text-sm">
				{#each tokens as token}
					<option value={token.symbol}> {token.symbol}</option>
				{/each}
			</select>
		</div>
		<input
			type="number"
			max="100"
			min="0"
			placeholder="0.0"
			class="w-full text-right text-xl text-white"
		/>
	</div>
	<div class="flex items-center justify-between gap-2">
		<p class="text-sm">
			{#if blockchain === 'ETH'}
				Ethereum
			{:else if blockchain === 'DOT'}
				Polkadot
			{/if}
		</p>
		<p class="text-sm text-white">~ {spotPrice.toFixed(2)}$</p>
	</div>
	<div
		class="absolute bottom-0 left-0 -mb-10 h-10 w-[200%] bg-gradient-to-r from-transparent"
		class:shadow-eth={blockchain === 'ETH'}
		class:shadow-pol={blockchain === 'DOT'}
	/>
</div>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';

	.shadow-eth {
		box-shadow: 0px -6px 20px 0px #5151f388;
	}

	.shadow-pol {
		box-shadow: 0px -6px 20px 0px rgba(243, 81, 121, 0.527);
	}
</style>
