<script lang="ts">
	import '../style/app.css';
	import Header from '$lib/components/layout/Header.svelte';
	let { children } = $props();
</script>

<Header />
<main class="w-full flex flex-col items-center justify-center p-6">
	{@render children()}
</main>
