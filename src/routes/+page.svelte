<script lang="ts">
	import ButtonDeck from '$lib/component-input/ButtonDeck.svelte';
	import ButtonIcon from '$lib/component-input/ButtonIcon.svelte';
	import ButtonPush from '$lib/component-input/ButtonPush.svelte';
	import Rotary from '$lib/component-input/Rotary.svelte';
	import Select from '$lib/component-input/Select.svelte';
	import Slider from '$lib/component-input/Slider.svelte';
	import Toggle from '$lib/component-input/Toggle.svelte';
	import Glass from '$lib/component-decorative/Glass.svelte';
</script>

<div>
	<h2>Design Requirements</h2>
	<p>
		Versatile set of components that can be styled dynamically by nearly any one base color. Should
		be able to construct nearly any kind of application using these components, styles, and
		guidelines. Components should stand out and be recongizable as interactive elements.
	</p>
	<p>
		The primary feature of this design system is the thematic versatility - therefore, it comes in
		standard and flat variants. Either may be used as seen fit.
	</p>
	<br />
	<section class="components">
		<div class="cols">
			<div>
				<h2>Standard Components</h2>
				<Slider
					value={0.01}
					label="Slider Example"
					on:change={() => console.log('Slider changed')}
				/>
				<Select
					options={['Option 1', 'Option 2', 'Option 3']}
					selected="Option 2"
					on:change={() => console.log('Select changed')}
				/>
				<ButtonDeck
					options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
					selected="Option 2"
				/>
				<Toggle
					iconOn="check"
					iconOff="x"
					state={true}
					on:change={() => console.log('Toggle changed')}
				/>
				<Rotary max={10} />
				<ButtonIcon title="check" icon="check" />
				<ButtonPush label="meow" push={() => {}} />
				<Glass />
			</div>
			<div>
				<h2>Flat Variant</h2>
				<Slider
					value={0.01}
					label="Slider Example"
					on:change={() => console.log('Slider changed')}
					flat
				/>
				<Select
					options={['Option 1', 'Option 2', 'Option 3']}
					selected="Option 2"
					on:change={() => console.log('Select changed')}
					flat
				/>
			</div>
		</div>
	</section>
</div>

<style>
	.cols {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem;
		align-items: flex-start;
	}

	.components .cols div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
