import { writable } from 'svelte/store';

// Store for Ethereum wallet public address
// Can be either a string (address) or null (no wallet connected)
const ethereumAddress = writable<string | null>(null);

ethereumAddress.subscribe((value) => {
	console.log('Ethereum address:', value);
}); // logs 'Ethereum address: null' by default

export default ethereumAddress;
