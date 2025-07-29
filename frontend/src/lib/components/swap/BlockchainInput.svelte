<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';

	let { source, blockchain }: { source: boolean; blockchain: 'ETH' | 'POL' } = $props();
</script>

<!-- --------------------------------------- CONTENT -->
<div
	class="relative bg-base-300 border border-neutral-700 flex w-full flex-col gap-2 overflow-hidden rounded-2xl p-4"
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
			{:else if blockchain === 'POL'}
				<Icon icon="token-branded:polkadot" color="white" width="28" height="28" />
			{/if}
			<p class="text-sm">{blockchain}</p>
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
				Etherum
			{:else if blockchain === 'POL'}
				Polkadot
			{/if}
		</p>
		<p class="text-sm text-white">~ 0.00$</p>
	</div>
	<div
		class="absolute bottom-0 left-0 h-10 -mb-10 w-[200%] bg-gradient-to-r from-transparent"
		class:shadow-eth={blockchain === 'ETH'}
		class:shadow-pol={blockchain === 'POL'}
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
