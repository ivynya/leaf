<script lang="ts">
</script>

<section class="grid">
	<div style="background-color: var(--bg-lighter);">bg-lighter</div>
	<div style="background-color: var(--bg-light);">bg-light</div>
	<div style="background-color: var(--bg);">bg</div>
	<div style="background-color: var(--bg-dark);">bg-dark</div>
	<div style="background-color: var(--bg-darker);">bg-darker</div>
	<div style="background-color: var(--tx);">tx</div>
	<div style="background-color: var(--tx-accent);">tx-accent</div>
	<div style="background-color: var(--tx-muted);">tx-muted</div>
	<div style="background-color: var(--bd-primary);">bd-primary</div>
	<div style="background-color: var(--bd-secondary);">bd-secondary</div>

	<div style="background-color: var(--sb-lightest);">sb-lightest</div>
	<div style="background-color: var(--sb-light);">sb-light</div>
	<div style="background-color: var(--sb-dark);">sb-dark</div>
	<div style="background-color: var(--sb-darkest);">sb-darkest</div>
</section>

<style class="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.125rem;

		div {
			border-radius: 0.125rem;
			box-sizing: border-box;
			width: 100%;
			height: 60px;
			padding: 5px;
		}
	}
</style>
