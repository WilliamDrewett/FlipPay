<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import BlockchainInput from '$lib/components/swap/BlockchainInput.svelte';
	import Icon from '@iconify/svelte';
	import Details from './Details.svelte';
    import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let playAuto = $state(true);

    const AUTO_RELOAD_TIME = 10;

    let autoReloadSec = $state(AUTO_RELOAD_TIME);
    let autoReload = new Tween(AUTO_RELOAD_TIME, {
		duration: 800,
		easing: cubicOut
	});

	function handleRefresh() {
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
			<BlockchainInput source={true} blockchain="ETH" />
			<div class="bg-base-100 z-10 -my-5 rounded-2xl">
				<button class="btn-rotate btn btn-sm btn-accent btn-ghost w-8 rounded-full">
					<div>
						<Icon icon="mdi:arrow-bottom" color="white" width="20" height="20" />
					</div>
				</button>
			</div>
			<BlockchainInput source={false} blockchain="POL" />
			<Details blockchain="ETH" source={true} />
		</div>
		<div class="flex w-full items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				<input type="checkbox" class="toggle toggle-white" bind:checked={playAuto} />
				<p class="text-sm font-bold">Play auto</p>
			</div>
			<p class="text-base-content text-xs">Spent directly my flip points</p>
		</div>
		<button class="btn btn-primary w-full rounded-2xl text-white">
			{playAuto ? 'Swap and Play' : 'Swap'}
		</button>
	</div>
</Card>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';
</style>
