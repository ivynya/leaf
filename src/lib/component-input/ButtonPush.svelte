<script lang="ts">
	interface Props {
		label: string;
		push: () => void;
	}
	let { label, push }: Props = $props();
</script>

<button class:active={true} onclick={() => push}>
	<span class="pip"></span>
	<span class="label">{label}</span>
</button>

<style lang="scss">
	button {
		background: transparent;
		border: none;
		box-shadow: var(--nm-shadow-sm-primary), var(--nm-shadow-sm-secondary);
		color: inherit;
		cursor: pointer;
		overflow: hidden;

		border-radius: var(--border-radius-sm);

		height: 30px;
		min-width: 80px;

		line-height: 1;
		font-family: inherit;
		font-size: 0.6rem;
		letter-spacing: 1px;
		text-align: center;
		text-transform: uppercase;
		transition-duration: 0.2s;
		position: relative;

		.label {
			background: var(--background-darker);
			border: 1px solid var(--border-secondary);
			border-top: 1px solid var(--border-primary);
			border-bottom: 1px solid var(--border-secondary);
			border-radius: var(--border-radius-sm);
			display: grid;
			place-items: center;
			padding: 0 5px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
		}

		.pip {
			background: radial-gradient(var(--border-primary), var(--border-secondary));
			box-shadow: var(--nm-shadow-sm-secondary) inset;
			box-sizing: border-box;
			display: block;
			width: 6px;
			height: 6px;
			position: absolute;
			top: 8px;
			left: 8px;
			z-index: 2;
			transition-duration: 0.15s;
			transition-delay: 0.15s;
		}

		&:active {
			box-shadow: none;
			transform: translateY(1px);
		}
		&:active .label {
			background: var(--background);
			border-right: none;
			border-left: none;
			box-shadow:
				var(--nm-shadow-sm-primary) inset,
				var(--nm-shadow-sm-secondary) inset;
		}
		&:active .pip {
			background: #e9a559;
			box-shadow: 0 0 2px var(--border-primary) inset;
		}

		&:not(:active) {
			color: var(--text-color);
		}
	}
</style>
