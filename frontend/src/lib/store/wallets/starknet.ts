import { writable } from 'svelte/store';

// Store for Starknet wallet address (felt-252 hex string) – null when not connected
const starknetAddress = writable<string | null>(null);

starknetAddress.subscribe((value) => {
	console.log('Starknet address:', value);
});

export default starknetAddress;
