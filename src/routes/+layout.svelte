<script lang="ts">
	import '$lib/styles/app.scss';
	import '$lib/styles/fnt.scss';
	import { onMount } from 'svelte';
	import { flat } from '$lib/internal/app';
	import { stylesheet, isLight, updateCurrentDayPercentage } from '$lib/index';
	import Colors from './Colors.svelte';
	import Warp from './Warp.svelte';
	import Toggle from '$lib/component-input/Toggle.svelte';
	import Picker from './Picker.svelte';

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

<header>
	<h1>@ivynya/leaf</h1>
</header>
<main>
	<section>
		{@render children?.()}
	</section>
	<section class="global-options">
		<h2>Color Output</h2>
		<Colors />
		<br />
		<h2>Time of Day</h2>
		<Warp />
		<Picker />
		<br />
		<h2>Style Options</h2>
		<Toggle iconOn="check" iconOff="x" bind:state={$flat} />
	</section>
</main>

<style lang="scss">
	main,
	header {
		display: flex;
		gap: 4rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.25rem 1rem;
	}

	h1 {
		margin-bottom: 0;
	}

	section {
		flex: 2 1;
	}

	.global-options {
		display: flex;
		flex-direction: column;
		flex: 1 1;
	}
</style>
