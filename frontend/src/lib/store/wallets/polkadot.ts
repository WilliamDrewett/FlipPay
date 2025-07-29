import { writable } from 'svelte/store';

// Store for Polkadot wallet public address
// Can be either a string (address) or null (no wallet connected)
const polkadotAddress = writable<string | null>(null);

polkadotAddress.subscribe((value) => {
	console.log('Polkadot address:', value);
}); // logs 'Polkadot address: null' by default

export default polkadotAddress;
