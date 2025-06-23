<section class="grid">
	<div style="background-color: var(--background-lighter);">background-lighter</div>
	<div style="background-color: var(--background);">background</div>
	<div style="background-color: var(--background-darker);">background-darker</div>
	<div style="background-color: var(--text-color);">text-color</div>
	<div style="background-color: var(--text-accent);">text-accent</div>
	<div style="background-color: var(--text-muted);">text-muted</div>
	<div style="background-color: var(--border-primary);">border-primary</div>
	<div style="background-color: var(--border-secondary);">border-secondary</div>

	<div style="background-color: var(--scrollbar-lightest);">scrollbar-lightest</div>
	<div style="background-color: var(--scrollbar-light);">scrollbar-light</div>
	<div style="background-color: var(--scrollbar-dark);">scrollbar-dark</div>
	<div style="background-color: var(--scrollbar-darkest);">scrollbar-darkest</div>
</section>

<style class="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.125rem;

		div {
			width: 100%;
			height: 60px;
			border-radius: 0.125rem;
		}
	}
</style>
