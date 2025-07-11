<script lang="ts">
</script>

<section class="grid">
	<div style="background-color: var(--bg-lighter);">bg-lighter</div>
	<div style="background-color: var(--bg-light);">bg-light</div>
	<div style="background-color: var(--bg);">bg</div>
	<div style="background-color: var(--bg-dark);">bg-dark</div>
	<div style="background-color: var(--bg-darker);">bg-darker</div>

	<div class="secondary" style="background-color: var(--bg-lighter-t9);">bg-lighter-t9</div>
	<div class="secondary" style="background-color: var(--bg-lighter-t5);">bg-lighter-t5</div>
	<div class="secondary" style="background-color: var(--bg-t8);">bg-t8</div>
	<div class="secondary" style="background-color: var(--bg-darker-t5);">bg-darker-t5</div>
	<div class="secondary" style="background-color: var(--bg-darker-t9);">bg-darker-t9</div>

	<div style="background-color: var(--bd-primary);">bd-primary</div>
	<div style="background-color: var(--bd-secondary);">bd-secondary</div>
	<div style="background-color: var(--ax-lighter);">ax-lighter</div>
	<div style="background-color: var(--ax);">ax</div>
	<div style="background-color: var(--ax-darker);">ax-darker</div>

	<div style="background-color: var(--tx);">tx</div>
	<div style="background-color: var(--tx-accent);">tx-accent</div>
	<div style="background-color: var(--tx-muted);">tx-muted</div>
	<div style="background-color: var(--sb-light);">sb-light</div>
	<div style="background-color: var(--sb-dark);">sb-dark</div>

	<div class="secondary" style="background-color: var(--ax-red);">ax-red</div>
	<div class="secondary" style="background-color: var(--ax-orange);">ax-orange</div>
	<div class="secondary" style="background-color: var(--ax-green);">ax-green</div>
	<div class="secondary" style="background-color: var(--ax-blue);">ax-blue</div>
	<div class="secondary" style="background-color: var(--ax-purple);">ax-purple</div>
</section>

<style class="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.1rem;

		div {
			border-radius: 0.1rem;
			box-sizing: border-box;
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.6rem;
			font-weight: 400;
			width: 100%;
			height: 45px;
			padding: 5px;

			&.secondary {
				height: 35px;
			}
		}
	}
</style>
