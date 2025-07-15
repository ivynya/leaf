<script lang="ts">
	import { isLight } from '$lib/time';

	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="glass" class:isDark={!$isLight}>
	{@render children?.()}
</div>

<style lang="scss">
	@use '$lib/styles/mxn.scss';

	.glass {
		@include mxn.glass;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 20px 0;
		min-width: 200px;
		width: fit-content;
		min-height: 200px;
		height: fit-content;
		padding: 1rem;
		position: absolute;
		z-index: 5;
		top: 50px;
		right: 100px;

		:global(*) {
			opacity: 0.95;
			--bg-lighter: var(--bg-lighter-td);
			--bg-light: var(--bg-t8);
			--bg: var(--bg-td);
			--bg-dark: var(--bg-t8);
			--bg-darker: var(--bg-darker-td);
			--nm-sm-h-primary: var(--nm-sm-hb-secondary);
			--nm-sm-hb-primary: var(--nm-sm-b-secondary);
			--nm-md-h-primary: var(--nm-md-h-secondary);
		}
	}
</style>
