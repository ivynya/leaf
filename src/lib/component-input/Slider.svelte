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
	@use '$lib/styles/mxn.scss';

	.slider {
		@include mxn.nm-shadow-sm-inset;
		-webkit-appearance: none;
		appearance: none;
		border-radius: 10px;
		box-sizing: border-box;
		height: 15px;
		margin: 5px 0;
		width: 100%;
		outline: none;

		--slider-thumb-size: 25px;

		&::-webkit-slider-thumb {
			@include mxn.nm-shadow-sm;
			background-color: var(--background-darker);
			border-radius: 50%;
			-webkit-appearance: none;
			appearance: none;
			height: var(--slider-thumb-size);
			width: var(--slider-thumb-size);
			cursor: pointer; /* Cursor on hover */
		}

		&::-moz-range-thumb {
			@include mxn.nm-shadow-sm;
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
