<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="glass">
	{@render children?.()}
</div>

<style lang="scss">
	.glass {
		background: var(--bg-darker-t5);
		backdrop-filter: blur(2px);
		border: 3px solid var(--bg-lighter-t5);
		border-radius: 20px;
		box-shadow:
			-1px 1px 0 var(--bg-lighter-t5),
			-1px 3px 0 var(--bg-lighter-t5),
			-1px 4px 0 var(--bg-lighter-t5),
			-1px 5px 0 var(--bg-lighter-t5),
			-2px 1px 0 var(--bg-lighter-t5),
			-2px 2px 0 var(--bg-lighter-t5),
			-2px 3px 0 var(--bg-lighter-t5),
			-2px 6px 0 var(--bg-lighter-t5),
			-3px 2px 0 var(--bg-lighter-t5),
			-3px 4px 0 var(--bg-lighter-t5),
			-4px 5px 0 var(--bg-lighter-t5),
			var(--nm-md-b-primary) inset,
			var(--nm-md-h-secondary) inset,
			var(--nm-md-b-primary),
			var(--nm-md-h-secondary),
			var(--nm-md-b-primary) inset,
			var(--nm-md-h-secondary) inset;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 20px 0;
		min-width: 200px;
		width: fit-content;
		min-height: 200px;
		height: fit-content;
		padding: 1rem;

		:global(*) {
			opacity: 0.9;
			--nm-sm-h-primary: var(--nm-sm-b-primary);
			--nm-sm-h-secondary: var(--nm-sm-b-secondary);
		}
	}
</style>
