<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<!-- --------------------------------------- CONTENT -->
<footer class="flex flex-col mt-auto items-center justify-center w-full py-4 px-8">
	<div class="w-full border-t border-base-content/30 mb-4"/>
	<div class="relative flex items-center justify-between w-full text-sm">
		<p>2025 FlipPay</p>
		<ul class="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
			<li class="opacity-50 hover:opacity-100 transition-opacity duration-300">
				<a href="#discord" target="_blank">
					<Icon icon="bi:discord" color="white" width="20" height="20" />
				</a>
			</li>
			<li class="opacity-50 hover:opacity-100 transition-opacity duration-300">
				<a href="#twitter" target="_blank">
					<Icon icon="hugeicons:new-twitter" color="white" width="20" height="20" />
				</a>
			</li>
			<li class="opacity-50 hover:opacity-100 transition-opacity duration-300">
				<a href="https://ethglobal.com/events/unite" target="_blank">
					<Icon icon="fa-solid:seedling" color="white" width="20" height="20" />
				</a>
			</li>
		</ul>
		<ul class="flex items-center gap-4">
			<li>
				<a href="/about">
					<p>About</p>
				</a>
			</li>
			<li>
				<a href="/terms">
					<p>Terms</p>
				</a>
			</li>
			<li>
				<a href="/privacy">
					<p>Privacy</p>
				</a>
			</li>
		</ul>
	</div>
</footer>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';

</style>
