<script lang="ts">
	import ButtonDeck from '$lib/component-input/ButtonDeck.svelte';
	import ButtonIcon from '$lib/component-input/ButtonIcon.svelte';
	import ButtonPush from '$lib/component-input/ButtonPush.svelte';
	import Rotary from '$lib/component-input/Rotary.svelte';
	import Select from '$lib/component-input/Select.svelte';
	import Slider from '$lib/component-input/Slider.svelte';
	import Toggle from '$lib/component-input/Toggle.svelte';
	import Glass from '$lib/component-decorative/Glass.svelte';

	let flat = false;
</script>

<h2>Design Requirements</h2>
<p>
	Versatile set of components that can be styled dynamically by nearly any one base color. Should be
	able to construct nearly any kind of application using these components, styles, and guidelines.
	Components should stand out and be recongizable as interactive elements.
</p>
<section class="components">
	<h2>Component Examples</h2>
	<Select
		options={['Option 1', 'Option 2', 'Option 3']}
		selected="Option 2"
		on:change={() => console.log('Select changed')}
		bind:flat
	/>
	<ButtonDeck options={['Option 1', 'Option 2', 'Option 3', 'Option 4']} selected="Option 2" />
	<Toggle iconOn="check" iconOff="x" state={true} on:change={() => console.log('Toggle changed')} />
	<Rotary max={10} />
	<ButtonIcon title="check" icon="check" />
	<ButtonPush label="meow" push={() => {}} />
	<Glass>
		<Slider
			value={0.01}
			label="Slider Example"
			on:change={() => console.log('Slider changed')}
			bind:flat
		/>
		<ButtonIcon title="check" icon="check" />
		<ButtonPush label="meow" push={() => {}} />
		<ButtonDeck options={['Option 1', 'Option 2', 'Option 3', 'Option 4']} selected="Option 2" />
		<Toggle
			iconOn="check"
			iconOff="x"
			state={true}
			on:change={() => console.log('Toggle changed')}
		/>
		<Rotary max={10} />
	</Glass>
</section>

<style>
	.components {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
