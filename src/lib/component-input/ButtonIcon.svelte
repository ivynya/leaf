<script lang="ts">
	export let href = '';
	export let icon: string;
	export let title: string;
	$: external = href.startsWith('http') || href.startsWith('mailto:');
	$: target = external ? '_blank' : '';
</script>

{#if href}
	<a class="btn" {href} {target} on:click {title}>
		<svg class="icon"><use xlink:href="/img/bootstrap.svg#{icon}" /></svg>
		{#if external}
			<svg class="hover"><use xlink:href="/img/bootstrap.svg#external" /></svg>
		{/if}
	</a>
{:else}
	<button class="btn" on:click {title}>
		<svg class="icon"><use xlink:href="/img/bootstrap.svg#{icon}" /></svg>
	</button>
{/if}

<style lang="scss">
	.btn {
		background-color: transparent;
		border: var(--text-accent) 1.5px solid;
		border-radius: 5px;
		box-sizing: border-box;
		cursor: pointer;
		display: grid;
		place-items: center;
		padding: 0;
		height: 32px;
		width: 32px;
		transition-duration: 0.2s;
		position: relative;

		svg {
			color: var(--text-accent);
			height: 60%;
			width: 60%;
			transition-duration: 0.2s;
		}

		.hover {
			background-color: var(--background);
			border-radius: 50%;
			box-sizing: border-box;
			height: 14px;
			width: 14px;
			position: absolute;
			right: -6px;
			bottom: -6px;
			transform: translateY(2px);
			opacity: 0;
		}

		&:hover {
			background-color: var(--background-lighter);
			border-color: var(--text-muted);
		}
		&:hover svg {
			color: var(--text-muted);
		}
		&:hover .hover {
			transform: translate(0);
			opacity: 1;
		}

		&:active {
			transform: scale(0.95);
		}
	}
</style>
