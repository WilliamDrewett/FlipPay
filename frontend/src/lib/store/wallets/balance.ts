import { writable } from 'svelte/store';

// Store for balance
// Can be either a number (balance) or null (no balance)
const balance = writable<number | null>(null);

balance.subscribe((value) => {
	console.log('Balance:', value);
}); // logs 'Balance: null' by default

export default balance;
