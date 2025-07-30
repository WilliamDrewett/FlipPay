<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
	import Page from '../../../routes/+page.svelte';

	let { source, blockchain }: { source: boolean; blockchain: 'ETH' | 'DOT' } = $props();
</script>

<!-- --------------------------------------- CONTENT -->
<div
	class="border border-neutral-600 flex w-full flex-col gap-2 rounded-2xl p-4 text-xs"
	style={source ? 'background-color: #111' : ''}
>
    <div class="flex items-center justify-between gap-2 text-sm w-full">
		<p class="collapse-title m-0 p-0 font-semibold text-white">
            1 ETH <span class="text-base-content/50">=</span> 12 DOT
            <span class="text-base-content/50">~3452.12$</span>
        </p>
        <div class="flex items-center gap-2">
            <p class="flex items-center gap-2">rewards: <span class="text-white font-bold">30</span></p>
            <Icon icon="mdi:gambling-chip" color="white" width="20" height="20" />
        </div>
	</div>
	<div class="flex items-center justify-between gap-2">
		<p>Slippage tolerance</p>
		<p>Auto <span class="text-white font-bold">0.1%</span></p>
	</div>
	<div class="flex items-center justify-between gap-2">
		<p>Minimum receive</p>
		<p>~$3829.54 <span class="text-white font-bold">13.24 DOT</span></p>
	</div>
	<div class="flex items-center justify-between gap-2">
		<p>Network Fee</p>
		<p><span class="text-white font-bold">0.3%</span></p>
	</div>
</div>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';
</style>
