<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		value?: number; // bindable
		min?: number;
		max?: number;
		size?: number; // Diameter of the knob
		arcColor?: string; // Color of the value arc
		arcWidth?: number; // Thickness of the arc
		knobColor?: string; // Background color of the knob itself
		indicatorColor?: string; // Color of the line/dot on the knob
		step?: number; // Optional step for snapping values
		showTicks?: boolean;
		tickLength?: number;
		tickColor?: string;
		tickWidth?: number;
		tickOffset?: number; // Distance ticks are offset from the main arc track
		label?: string; // Text label to display around the knob
	}
	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		size = 100,
		arcColor = 'var(--tx-muted, #007bff)',
		arcWidth = 8,
		knobColor = 'var(--bg-darker)',
		indicatorColor = 'var(--tx, #333)',
		step = 1,
		showTicks = true,
		tickLength = 3,
		tickColor = 'var(--tx-accent)',
		tickWidth = 1,
		tickOffset = 1.5, // How far out the ticks start from the arc track
		label = ''
	}: Props = $props();

	const labelMaxLength = 15;
	let labelFreeSpace = $derived(Math.max(Math.floor(labelMaxLength - label.length) / 2 - 1, 0));
	let labelStylized = $derived(
		label && !showTicks
			? `${''.padStart(labelFreeSpace, '•')} ${label} ${''.padStart(labelFreeSpace, '•')}`
			: ''
	);

	// Constants for VALUE ARC geometry
	const VALUE_ARC_TOTAL_SWEEP_DEGREES = 180;
	const VALUE_ARC_START_OFFSET_DEGREES = -135; // Visual: 0 up, CW positive. -135 is ~7:30 o'clock.

	// Constants for TICK MARKS ARC geometry
	const TICK_ARC_START_OFFSET_DEGREES =
		VALUE_ARC_START_OFFSET_DEGREES + VALUE_ARC_TOTAL_SWEEP_DEGREES; // Starts where value arc ends
	const TICK_ARC_TOTAL_SWEEP_DEGREES = 360 - VALUE_ARC_TOTAL_SWEEP_DEGREES; // The "other side"

	let knobElement: HTMLDivElement | undefined = $state();
	let isDragging = $state(false);
	let mouseAngleAtDragStart = $state(0);
	let knobAngleAtDragStart = $state(0);

	let normalizedValue = $derived(max === min ? 0 : (value - min) / (max - min));

	let currentKnobRotationDegrees = $derived(
		VALUE_ARC_START_OFFSET_DEGREES + normalizedValue * VALUE_ARC_TOTAL_SWEEP_DEGREES
	);

	const radius = $derived(size / 2 - arcWidth / 2); // Radius of the centerline of the arc track
	const circumference = $derived(2 * Math.PI * radius);
	const valueArcSweepProportion = $derived(VALUE_ARC_TOTAL_SWEEP_DEGREES / 360);

	const fullValueArcPathLength = $derived(circumference * valueArcSweepProportion);
	const valueArcDashoffset = $derived(fullValueArcPathLength * (1 - normalizedValue));

	function polarToCartesian(centerX: number, centerY: number, r: number, angleInDegrees: number) {
		const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
		return {
			x: centerX + r * Math.cos(angleInRadians),
			y: centerY - r * Math.sin(angleInRadians)
		};
	}

	function describeArcPath(
		cx: number,
		cy: number,
		r: number,
		startAngle: number,
		endAngle: number
	): string {
		const start = polarToCartesian(cx, cy, r, endAngle + 180);
		const end = polarToCartesian(cx, cy, r, startAngle + 180);

		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

		const d = ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');

		return d;
	}

	function describeArcPathReversed(
		cx: number,
		cy: number,
		r: number,
		startAngle: number,
		endAngle: number
	): string {
		const start = polarToCartesian(cx, cy, r, startAngle + 180);
		const end = polarToCartesian(cx, cy, r, endAngle + 180);

		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

		const d = ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 1, end.x, end.y].join(' ');

		return d;
	}

	let svgValueArcPathD = $derived(
		describeArcPath(
			size / 2,
			size / 2,
			radius,
			VALUE_ARC_START_OFFSET_DEGREES,
			VALUE_ARC_START_OFFSET_DEGREES + VALUE_ARC_TOTAL_SWEEP_DEGREES
		)
	);

	const labelArcRadius = $derived(radius - arcWidth / 2 + tickOffset - tickLength + 1);
	let svgLabelArcPathD = $derived(
		describeArcPathReversed(
			size / 2,
			size / 2,
			labelArcRadius,
			VALUE_ARC_START_OFFSET_DEGREES + 180,
			VALUE_ARC_START_OFFSET_DEGREES + VALUE_ARC_TOTAL_SWEEP_DEGREES + 180
		)
	);

	// Derived state for tick marks
	let ticks = $derived(() => {
		if (!showTicks || step <= 0 || min >= max) return [];

		const tickData: {
			x1: number;
			y1: number;
			x2: number;
			y2: number;
			key: string;
		}[] = [];
		const numSteps = Math.floor((max - min) / step);
		const tickLineInnerRadius = radius - arcWidth / 2 + tickOffset;

		for (let i = 1; i < numSteps; i++) {
			const tickVal = min + i * step;
			if (tickVal > max) continue;

			const normalizedTickVal = (tickVal - min) / (max - min);
			const tickAngle =
				VALUE_ARC_START_OFFSET_DEGREES + normalizedTickVal * VALUE_ARC_TOTAL_SWEEP_DEGREES + 180;

			const startPt = polarToCartesian(size / 2, size / 2, tickLineInnerRadius, tickAngle);
			const endPt = polarToCartesian(
				size / 2,
				size / 2,
				tickLineInnerRadius + tickLength,
				tickAngle
			);

			tickData.push({ x1: startPt.x, y1: startPt.y, x2: endPt.x, y2: endPt.y, key: `tick-${i}` });
		}
		return tickData;
	});

	function handleMouseDown(event: MouseEvent) {
		if (!knobElement) return;
		isDragging = true;
		knobElement.focus();

		const rect = knobElement.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const dx = event.clientX - centerX;
		const dy = event.clientY - centerY;

		mouseAngleAtDragStart = Math.atan2(dy, dx) * (180 / Math.PI);
		knobAngleAtDragStart = currentKnobRotationDegrees;

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		event.preventDefault();
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging || !knobElement) return;

		const rect = knobElement.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const dx = event.clientX - centerX;
		const dy = event.clientY - centerY;

		const currentMouseAngle = Math.atan2(dy, dx) * (180 / Math.PI);
		let deltaMouseAngle = currentMouseAngle - mouseAngleAtDragStart;

		// Handle angle wrapping
		if (deltaMouseAngle > 180) deltaMouseAngle -= 360;
		else if (deltaMouseAngle < -180) deltaMouseAngle += 360;

		let newKnobRotation = knobAngleAtDragStart + deltaMouseAngle;

		const minVisualRotation = VALUE_ARC_START_OFFSET_DEGREES;
		const maxVisualRotation = VALUE_ARC_START_OFFSET_DEGREES + VALUE_ARC_TOTAL_SWEEP_DEGREES;

		newKnobRotation = Math.max(minVisualRotation, Math.min(maxVisualRotation, newKnobRotation));

		let newNormalizedValue = (newKnobRotation - minVisualRotation) / VALUE_ARC_TOTAL_SWEEP_DEGREES;

		newNormalizedValue = Math.max(0, Math.min(1, newNormalizedValue));

		let newValue = min + newNormalizedValue * (max - min);

		if (step > 0) {
			newValue = Math.round(newValue / step) * step;
		}

		value = Math.max(min, Math.min(max, newValue));
	}

	function handleMouseUp() {
		if (!isDragging) return;
		isDragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	onMount(() => {
		return () => {
			if (isDragging) {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseup', handleMouseUp);
			}
		};
	});
</script>

<div class="rotary-knob-wrapper" style:width="{size}px" style:height="{size}px">
	<svg class="arc-svg" viewBox="0 0 {size} {size}">
		<!-- Background Arc Track for Value -->
		<path
			class="arc-track"
			d={svgValueArcPathD}
			fill="none"
			stroke="var(--bd-primary)"
			stroke-width={arcWidth}
			stroke-linecap="round"
		/>
		<!-- Value Arc -->
		<path
			class="arc-value"
			d={svgValueArcPathD}
			fill="none"
			stroke={arcColor}
			stroke-width={arcWidth}
			stroke-linecap="round"
			stroke-dasharray={fullValueArcPathLength}
			stroke-dashoffset={valueArcDashoffset}
		/>

		<!-- Tick Marks -->
		{#if showTicks}
			{#each ticks() as tick (tick.key)}
				<line
					class="tick-mark"
					x1={tick.x1}
					y1={tick.y1}
					x2={tick.x2}
					y2={tick.y2}
					stroke={tickColor}
					stroke-width={tickWidth}
					stroke-linecap="round"
				/>
			{/each}
		{/if}

		<!-- Label -->
		{#if labelStylized}
			<defs>
				<path id="labelPath" d={svgLabelArcPathD} fill="none" />
			</defs>
			<text class="label-text" text-anchor="middle">
				<textPath href="#labelPath" startOffset="50%">
					{labelStylized}
				</textPath>
			</text>
		{/if}
	</svg>
	<div
		bind:this={knobElement}
		class="knob"
		style:width="{size * 0.7}px"
		style:height="{size * 0.7}px"
		style:background={knobColor}
		onmousedown={handleMouseDown}
		role="slider"
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={value}
		tabindex="0"
		onkeydown={(e) => {
			let changed = false;
			let currentValue = value;
			if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
				currentValue = Math.max(min, value - step);
				changed = true;
			} else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
				currentValue = Math.min(max, value + step);
				changed = true;
			}

			if (changed && currentValue !== value) {
				value = currentValue;
				e.preventDefault();
			}
		}}
	>
		<div
			class="knob-indicator"
			style:transform="rotate({currentKnobRotationDegrees}deg) translateY(-15px)"
			style:background={indicatorColor}
			style:color={indicatorColor}
		></div>
	</div>
</div>

<style lang="scss">
	.rotary-knob-wrapper {
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		user-select: none;
	}

	.arc-svg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
		transform: translateY(0);
	}

	.arc-track,
	.arc-value {
		transition: stroke-dashoffset 0.05s linear;
	}

	.label-text {
		fill: var(--tx);
		font-size: 11px;
		font-family: 'IBM Plex Mono', monospace;
		font-weight: 300;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.knob {
		position: relative;
		border-radius: 50%;
		background: var(--bg);
		border: 1px solid;
		border-color: var(--bd-primary) var(--bd-secondary) var(--bd-secondary) var(--bd-primary);
		box-shadow:
			var(--nm-md-h-primary, 2px 2px 5px #bababa, -2px -2px 5px #ffffff),
			var(--nm-md-h-secondary, 2px 2px 5px #bababa, -2px -2px 5px #ffffff);

		display: flex;
		justify-content: center;
		align-items: flex-start;
		cursor: grab;
		z-index: 10;

		&:active {
			cursor: grabbing;
		}
		transition: transform 0.05s linear;
	}

	.knob-indicator {
		width: calc(var(--knob-indicator-width, 4px));
		height: 30%;
		background: var(--indicator-color, var(--tx));
		border-radius: 2px;
		margin: auto;
		box-shadow: 0 0 5px currentColor;
	}

	.knob:focus-visible {
		outline: 1px solid var(--tx-accent);
	}
</style>
