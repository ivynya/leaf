<script lang="ts">
	export let big = false;
	export let value = 0;
	export let label: string;
</script>

<input
	class="slider"
	class:big
	type="range"
	max="1"
	min="0"
	step="0.005"
	bind:value
	on:click
	on:dblclick
	aria-label={label}
/>

<style lang="scss">
	.slider {
		-webkit-appearance: none;
		appearance: none;
		border-radius: 10px;
		margin: 10px 0;
		height: 12px;
		width: 100%;
		outline: none;

		--slider-thumb-size: 25px;

		&.big {
			--slider-thumb-size: 30px;
			height: 15px;
		}

		&::-webkit-slider-thumb {
			background-color: var(--background-darker);
			border-radius: 50%;
			-webkit-appearance: none;
			appearance: none;
			height: var(--slider-thumb-size);
			width: var(--slider-thumb-size);
			cursor: pointer; /* Cursor on hover */
		}

		&::-moz-range-thumb {
			background-color: var(--background-darker);
			border-radius: 50%;
			-webkit-appearance: none;
			appearance: none;
			height: var(--slider-thumb-size);
			width: var(--slider-thumb-size);
			cursor: pointer; /* Cursor on hover */
		}
	}
</style>
