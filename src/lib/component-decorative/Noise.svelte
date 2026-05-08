<div class="noise">.</div>
<svg style="display: none;">
	<filter id="affinityNoise">
		<feTurbulence
			type="fractalNoise"
			baseFrequency="0.8"
			numOctaves="1"
			stitchTiles="stitch"
			result="rawNoise"
		/>
		<feColorMatrix type="saturate" values="6" result="monoNoise" />
		<feBlend in="SourceGraphic" in2="monoNoise" mode="soft-light" result="finalResult" />
	</filter>
</svg>

<style>
	.noise {
		display: block;
		color: transparent;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		filter: url(#affinityNoise) brightness(0.65);
		mix-blend-mode: soft-light;
		pointer-events: none;
	}
</style>
