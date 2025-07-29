<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	let { width = undefined }: { width?: 'sm' | 'md' | 'lg' } = $props();
</script>

<!-- --------------------------------------- CONTENT -->
<section
	class="card bg-neutral-900 rounded-3xl p-2 shadow-2xl shadow-black"
	style={width === 'sm'
		? 'width: 2160px'
		: width === 'md'
			? 'width: 330px'
			: width === 'lg'
				? 'width: 450px'
				: ''}
>
	<slot />
</section>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';
</style>
