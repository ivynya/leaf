<script lang="ts">
	export let iconOn = '';
	export let iconOff = '';
	export let state: boolean;
	$: icon = state ? iconOn : iconOff;
</script>

<label class="switch">
	<input type="checkbox" bind:checked={state} on:change />
	<span class="slider">
		<span>
			<svg><use xlink:href="/img/bootstrap.svg#{icon}" /></svg>
		</span>
	</span>
</label>

<style lang="scss">
	@use '$lib/styles/mxn.scss';

	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 28px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;

		&:checked + .slider:before {
			left: calc(100% - 30px);
		}
		&:checked + .slider svg {
			color: #6b7c32;
			margin-left: 32px;
		}
	}

	.slider {
		@include mxn.nm-shadow-sm-inset;
		border-radius: var(--border-radius-sm);
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition-duration: 0.3s;

		svg {
			box-sizing: border-box;
			color: var(--text-accent);
			display: grid;
			place-items: center;
			height: 26px;
			width: 24px;
			margin-left: 4px;
			padding: 3px;
			position: absolute;
			z-index: 50;
			transition-duration: 0.3s;
		}

		&::before {
			@include mxn.nm-shadow-sm;
			background-color: var(--background-darker);
			border-radius: var(--border-radius-sm);
			content: '';
			height: 30px;
			width: 30px;
			margin: auto;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			transition-duration: 0.3s;
		}
	}
</style>
