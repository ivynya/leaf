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
		box-shadow: var(--nm-sm-h-primary), var(--nm-sm-h-secondary);
		color: inherit;
		cursor: pointer;
		overflow: hidden;

		border-radius: var(--bd-radius-sm);

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
			background: var(--bg-darker);
			border: 1px solid var(--bd-secondary);
			border-top: 1px solid var(--bd-primary);
			border-bottom: 1px solid var(--bd-secondary);
			border-radius: var(--bd-radius-sm);
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
			background: radial-gradient(var(--bd-primary), var(--bd-secondary));
			box-shadow: var(--nm-sm-h-secondary) inset;
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
			background: var(--bg-dark);
			border-right: none;
			border-left: none;
			box-shadow:
				var(--nm-sm-hb-primary) inset,
				var(--nm-sm-h-secondary) inset;
		}
		&:active .pip {
			background: #e9a559;
			box-shadow: 0 0 2px var(--bd-primary) inset;
		}

		&:not(:active) {
			color: var(--tx);
		}
	}
</style>
