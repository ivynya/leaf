<script lang="ts">
	import Slider from '$lib/component-input/Slider.svelte';
	import { isLight } from '$lib/time';
	import { currentDayPercentage, isLocked, updateCurrentDayPercentage } from '$lib/time';

	// Formats currentDayPercentage to projected time
	function getTime(percent: number): string {
		const time = new Date();
		time.setHours(0);
		time.setMinutes(0);
		time.setSeconds(0);
		time.setMilliseconds(0);
		const adjustedTime = new Date(time.getTime() + percent * 86400000);
		const hours = adjustedTime.getHours() % 12;
		const minutes = adjustedTime.getMinutes().toString().padStart(2, '0');
		return `${hours === 0 ? 12 : hours}:${minutes}`;
	}
	$: time = getTime($currentDayPercentage);

	// Freezes and unfreezes the localized time continuum
	const timeLock = () => ($isLocked = true);
	const timeUnlock = () => {
		$isLocked = false;
		updateCurrentDayPercentage();
	};
</script>

<div class="time-machine">
	<Slider
		bind:value={$currentDayPercentage}
		on:click={timeLock}
		on:dblclick={timeUnlock}
		label="Time Warp"
	/>
	<span>
		{#if $isLocked}
			<svg><use xlink:href="/img/bootstrap.svg#lock" /></svg>
		{:else if $isLight}
			<svg><use xlink:href="/img/bootstrap.svg#sun" /></svg>
		{:else}
			<svg><use xlink:href="/img/bootstrap.svg#moon" /></svg>
		{/if}
		{time}
	</span>
</div>

<style lang="scss">
	.time-machine {
		display: flex;
		align-items: center;
		flex-direction: row;
		color: var(--tx-muted);
		font-weight: 300;
		font-size: 0.8rem;
		letter-spacing: 2px;

		span {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			column-gap: 10px;
			width: 115px;

			svg {
				height: 12px;
				width: 12px;
			}
		}
	}
</style>
