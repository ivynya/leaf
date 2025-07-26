<script lang="ts">
	import Rotary from '$lib/component-input/Rotary.svelte';

	interface Props {}
	let {}: Props = $props();

	const colors = ['', '-red', '-orange', '-green', '-blue', '-purple'];
	let hueSelected = $state(0);
	let hue = $derived(`var(--ax${colors[hueSelected]})`);
</script>

<section class="picker">
	<Rotary max={5} bind:value={hueSelected} arcColor={hue} indicatorColor={hue} />
</section>

<style lang="scss">
</style>
