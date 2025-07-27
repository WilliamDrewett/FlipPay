<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
import Icon from '@iconify/svelte';
</script>

<!-- --------------------------------------- CONTENT -->
<header class="bg-base-100 w-full p-6 flex items-center justify-between">
    <div class="flex items-center gap-8">
        <h1>FlipPay</h1>
        <nav class="-mb-4">
            <ul class="flex items-center gap-6">
                <li>
                    <a href="/">
                        <p>Trade</p>
                    </a>
                </li>
                <li>
                    <a href="/about">
                        <p>Explore</p>
                    </a>
                </li>
                <li>
                    <a href="/contact">
                        <p>Play</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="flex items-center gap-2">
        <button class="btn btn-primary btn-md">
            <Icon icon="mingcute:wallet-line" color="white" width="20" height="20" />
            <span class="hidden md:block text-white">Connect Wallet</span>
        </button>
        <button class="btn btn-primary btn-ghost btn-md w-11 p-0">
            <Icon icon="material-symbols:settings" color="white" width="20" height="20" />
        </button>
        <button class="btn btn-primary btn-ghost btn-md w-11 p-0">
            <Icon icon="ix:about" color="white" width="20" height="20" />
        </button>
    </div>
</header>

<!-- --------------------------------------- STYLE -->
<style>

</style>