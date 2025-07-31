<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import BlockchainInput from '$lib/components/swap/BlockchainInput.svelte';
	import Icon from '@iconify/svelte';
	import Details from './Details.svelte';
    import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { createUser } from '$lib/api/createUser';
	import { getEthAndDotPrices } from '$lib/api/getSpotPrices';
	let playAuto = $state(true);

    const AUTO_RELOAD_TIME = 10;
	let swapDirection = $state<'ETH_TO_DOT' | 'DOT_TO_ETH'>('ETH_TO_DOT');

    let autoReloadSec = $state(AUTO_RELOAD_TIME);
    let autoReload = new Tween(AUTO_RELOAD_TIME, {
		duration: 800,
		easing: cubicOut
	});

	let ethSpotPrice = $state(0);
	let dotSpotPrice = $state(0);

	function handleRefresh() {
		getEthAndDotPrices().then((prices) => {
			console.log(prices);
			ethSpotPrice = prices.eth?.price_usd || 0;
			dotSpotPrice = prices.dot?.price_usd || 0;
		}).catch((error) => {
			console.error(error);
		});
        autoReloadSec = AUTO_RELOAD_TIME;
		autoReload.set(AUTO_RELOAD_TIME);
	}

	function autoReloadInterval() {
		setInterval(() => {
			    if (autoReloadSec === 0) handleRefresh();
			else {
                autoReloadSec--;
                autoReload.set(autoReload.current - 1)
            };
		}, 1000);
	}

    $effect(() => {
        autoReloadInterval();
    });

	async function handleSwap() {
		console.log('swap');
		const user = await createUser("chat");
		console.log(user);
	}

	function handleSwapDirection() {
		swapDirection = swapDirection === 'ETH_TO_DOT' ? 'DOT_TO_ETH' : 'ETH_TO_DOT';
	}
</script>

<!-- --------------------------------------- CONTENT -->
<Card width="lg">
	<header class="flex items-center justify-between p-2">
		<div class="flex items-center gap-2">
			<h3>Swap</h3>
			<Icon icon="mdi:exchange" color="white" width="20" height="20" />
		</div>
		<div class="flex items-center gap-2">
            <div class="relative -mt-2">
                <p class="text-xs text-neutral-400">auto reload: {autoReloadSec.toString().padStart(2, '0')} sec</p>
                <div class="absolute -bottom-1 left-0 h-[1px] w-full bg-neutral-700"></div>
                <div class="absolute -bottom-1 left-0 h-[1px] w-full bg-neutral-500" style="width: {(AUTO_RELOAD_TIME - autoReload.current) / AUTO_RELOAD_TIME * 100}%"></div>
            </div>
			<button class="btn-rotate-full btn btn-sm btn-accent btn-ghost w-8 rounded-full p-0">
				<div>
					<Icon icon="material-symbols:refresh" color="white" width="20" height="20" />
				</div>
			</button>
		</div>
	</header>
	<div class="flex flex-col items-center justify-between gap-4 p-2">
		<div class="flex w-full flex-col items-center justify-between gap-2">
			<div style="order: {swapDirection === 'ETH_TO_DOT' ? 1 : 3}" class="w-full">
				<BlockchainInput source={true} blockchain="ETH" spotPrice={ethSpotPrice} />
			</div>
			<div class="bg-base-100 z-10 -my-5 rounded-2xl order-2">
				<button class="btn-rotate btn btn-sm btn-accent btn-ghost w-8 rounded-full" onclick={handleSwapDirection}>
					<div>
						<Icon icon="mdi:arrow-bottom" color="white" width="20" height="20" />
					</div>
				</button>
			</div>
			<div style="order: {swapDirection === 'ETH_TO_DOT' ? 3 : 1}" class="w-full">
				<BlockchainInput source={false} blockchain="DOT" spotPrice={dotSpotPrice} />
			</div>
			<div class="order-4 w-full">
				<Details blockchain="ETH" source={true} />
			</div>
		</div>
		<div class="flex w-full items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				<input type="checkbox" class="toggle toggle-white" bind:checked={playAuto} />
				<p class="text-sm font-bold">Play auto</p>
			</div>
			<p class="text-base-content text-xs">Spent directly my flip points</p>
		</div>
		<button class="btn btn-primary w-full rounded-2xl text-white" onclick={handleSwap}>
			{playAuto ? 'Swap and Play' : 'Swap'}
		</button>
	</div>
</Card>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';
</style>
