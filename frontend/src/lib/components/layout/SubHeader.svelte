<!-- --------------------------------------- SCRIPT -->
<script lang="ts">
	import { onMount } from 'svelte';

	// Target word
	const targetLetters = ['P', 'l', 'a', 'y'];

	// Letters pool for each position
	const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');

	// Create letter columns for each position
	let letterColumns: string[][] = [];
	let animations: boolean[] = [true, true, true, true];
	let translateY: number[] = [0, 0, 0, 0];

	// Animation intervals
	let intervals: number[] = [];

	function createLetterColumn(index: number): string[] {
		const isUppercase = index === 0;
		const baseLetters = isUppercase ? uppercaseLetters : lowercaseLetters;
		const targetLetter = targetLetters[index];

		// Create a long column of random letters ending with target letter
		const column: string[] = [];

		// Add many random letters for scrolling effect
		for (let i = 0; i < 50; i++) {
			column.push(baseLetters[Math.floor(Math.random() * baseLetters.length)]);
		}

		// Add target letter at the end
		column.push(targetLetter);

		return column;
	}

	function startSlotMachine() {
		// Create columns
		letterColumns = targetLetters.map((_, index) => createLetterColumn(index));

		// Start animations for each column with different speeds
		intervals = targetLetters.map((_, index) => {
			let currentPos = 0;
			const maxPos = letterColumns[index].length - 1;

			return setInterval(() => {
				if (animations[index] && currentPos < maxPos) {
					currentPos += 0.5; // Speed of scrolling
					translateY[index] = -currentPos * 2.5; // Height of each letter
					translateY = [...translateY]; // Trigger reactivity
				}
			}, 50) as unknown as number;
		});

		// Stop animations one by one
		targetLetters.forEach((_, index) => {
			setTimeout(
				() => {
					animations[index] = false;
					// Snap to exact target position
					const targetPos = -(letterColumns[index].length - 1) * 2.5;
					translateY[index] = targetPos;
					translateY = [...translateY];

					if (intervals[index]) {
						clearInterval(intervals[index]);
					}
				},
				1000 + index * 600
			); // Stagger the stops
		});
	}

	onMount(() => {
		setTimeout(startSlotMachine, 300);

		return () => {
			intervals.forEach((interval) => clearInterval(interval));
		};
	});
</script>

<!-- --------------------------------------- CONTENT -->
<h2 class="text-3xl! m-8 text-center font-bold">
	Connect, Swap,
	<button class="cursor-pointer">
		<span class="text-secondary slot-machine">
			{#each targetLetters as _, index}
				<div class="letter-container">
					<div
						class="letter-column"
						style="transform: translateY({translateY[index]}rem); transition: {animations[index]
							? 'none'
							: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'};"
					>
						{#each letterColumns[index] || [] as letter}
							<div class="letter">{letter}</div>
						{/each}
					</div>
				</div>
			{/each}
		</span>
	</button>
	and Repeat
</h2>

<!-- --------------------------------------- STYLE -->
<style>
	.slot-machine {
		display: inline-flex;
		align-items: baseline;
	}

	.letter-container {
		width: 0.5em;
		height: 2.5rem;
		overflow: hidden;
		position: relative;
		display: inline-block;
		transform: translateY(0.7rem);
	}

	.letter-column {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.letter {
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: inherit;
		font-weight: inherit;
		line-height: 1;
	}
</style>
