<script lang="ts">
	export let big = false;
	export let value = 0;
	export let label: string;
	export let flat: boolean = false;
</script>

<input
	class="slider"
	class:big
	class:flat
	style="--slider-percentage: {value * 100}%"
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
		position: relative;

		--slider-thumb-size: 30px;

		&::-webkit-slider-thumb {
			@include mxn.nm-shadow-sm;
			background-color: var(--bg-darker);
			border-radius: 50%;
			box-shadow: var(--nm-sm-hb-primary), var(--nm-sm-h-secondary);
			-webkit-appearance: none;
			appearance: none;
			height: var(--slider-thumb-size);
			width: var(--slider-thumb-size);
			cursor: pointer; /* Cursor on hover */
		}

		&::-moz-range-thumb {
			@include mxn.nm-shadow-sm;
			background-color: var(--bg-darker);
			border-radius: 50%;
			box-shadow: var(--nm-sm-hb-primary), var(--nm-sm-h-secondary);
			-webkit-appearance: none;
			appearance: none;
			height: var(--slider-thumb-size);
			width: var(--slider-thumb-size);
			cursor: pointer; /* Cursor on hover */
		}

		&.flat {
			background-color: var(--bg-darker);
			border: none;
			box-shadow: none;
			height: 1.5px;

			--slider-thumb-size: 20px;

			&::before {
				border-radius: 1px;
				content: '';
				position: absolute;
				top: calc(50% - 1px);
				left: 0;
				right: 0;
				height: 2px;
				background-color: var(--ax);
				width: var(--slider-percentage, 0%);
			}

			&::-webkit-slider-thumb {
				background-color: var(--bg);
				border: 2px solid var(--ax);
				box-shadow: none;
				position: relative;
				z-index: 1;
			}
			&::-moz-range-thumb {
				background-color: var(--bg);
				border: 2px solid var(--ax);
				box-shadow: none;
				position: relative;
				z-index: 1;
			}
		}
	}
</style>
