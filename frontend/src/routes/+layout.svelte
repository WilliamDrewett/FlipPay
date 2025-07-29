<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import '../style/app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	let { children } = $props();
</script>

<!-- --------------------------------------- CONTENT -->
<div class="min-h-screen w-full flex flex-col">
	<Header />
	<main class="flex w-full flex-col items-center justify-center h-full">
		{@render children()}
	</main>
	<Footer />
  <div class="gradient-background fixed top-0 left-0 inset-0 -z-10"></div>
</div>

<!-- --------------------------------------- STYLE -->
<style>
	/* https://animated-gradient-background-generator.netlify.app/ */
	.gradient-background {
  background: linear-gradient(120deg, #5151f388 0%, #000000 45%, #000000 55%, #630532 100%);
  background-size: 160% 160%;
  animation: gradient-animation 60s ease-in-out infinite;
  animation-delay: -45s;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
