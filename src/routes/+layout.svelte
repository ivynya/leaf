<script lang="ts">
	import '$lib/styles/app.scss';
	import { onMount } from 'svelte';
	import { stylesheet, isLight } from '$lib/index';

	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();

	onMount(() => {
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
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.5rem 1rem;
	}
</style>
