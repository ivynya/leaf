<script lang="ts">
	import '$lib/app.scss';
	import { onMount } from 'svelte';
	import { stylesheet, initialize, isLight, currentDayPercentage } from '$lib/index';

	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();

	onMount(() => {
		initialize();
		stylesheet.subscribe((sheet) => {
			document.body.setAttribute('style', sheet);
			document.body.setAttribute('data-dark', $isLight ? 'false' : 'true');
		});
	});
</script>

<main>
	{@render children?.()}
</main>

<style lang="scss">
</style>
