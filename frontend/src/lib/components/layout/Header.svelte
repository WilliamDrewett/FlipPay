<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<!-- --------------------------------------- CONTENT -->
<header class=" flex flex-col">
	<div class="flex w-full items-center justify-between px-6 py-3">
		<div class="flex items-center gap-8">
			<h1>FlipPay</h1>
			<nav class="-mb-4">
				<ul class="flex items-center gap-8">
					<li>
						<a href="/">
							<p>Trade</p>
						</a>
					</li>
					<li>
						<a href="/explore">
							<p>Explore</p>
						</a>
					</li>
					<li>
						<a href="/pool">
							<p>Pool</p>
						</a>
					</li>
					<li>
						<a href="/play">
                            <button class="btn btn-accent text-white btn-outline btn-sm rounded-full">
                                <Icon icon="mdi:slot-machine" color="white" width="20" height="20" />
                                <p>Play Now!</p>
                            </button>
						</a>
					</li>
				</ul>
			</nav>
		</div>
		<div class="flex items-center gap-2">
			<button class="btn btn-primary btn-sm rounded-full">
				<Icon icon="mingcute:wallet-line" color="white" width="20" height="20" />
				<span class="hidden text-white md:block">Connect Wallet</span>
			</button>
			<button class="btn-rotate btn btn-sm btn-accent btn-ghost w-8 rounded-full p-0">
                <div>
                    <Icon icon="material-symbols:settings" color="white" width="20" height="20" />
                </div>
			</button>
			<button class="btn-flip-x btn btn-sm btn-accent btn-ghost w-8 rounded-full p-0">
                <div>
                    <Icon icon="ix:about" color="white" width="20" height="20" />
                </div>
			</button>
		</div>
	</div>
    <!-- <div class="bg-black/50 w-full text-sm text-white">
        <ul class="message-line flex items-center gap-2">
            <li>
                <p class="bg-black">yo bien?</p>
            </li>
            <li>
                <p class="bg-pink-500">yolo</p>
            </li>
            <li>
                <p class="">Lorem ipdicta veritatis nihil, ex consectetur debitis aliquid enim odit quas.</p>
            </li>
            <li>
                <p>okok</p>
            </li>
        </ul>
    </div> -->
</header>

<!-- --------------------------------------- STYLE -->
<style>
	@import 'tailwindcss';
	li a {
		@apply transition-all duration-200 hover:text-white;
	}

    .message-line {
        animation: message-line 30s linear infinite;
        width: 100%;
        overflow: hidden;
    }
    @keyframes message-line {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }
</style>
