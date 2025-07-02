<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Props {
		options: string[];
		selected: string;
	}
	let { options, selected = $bindable() }: Props = $props();
	let active = $derived(Math.abs(options.findIndex((o) => o === selected)));

	let isOpen = $state(false);

	function toggleDropdown() {
		isOpen = !isOpen;
	}
	function selectOption(option: string) {
		selected = option;
		isOpen = false;
	}
	function handleClickOutside(event: MouseEvent) {
		if (event.target instanceof HTMLElement) {
			const target = event.target as HTMLElement;
			if (isOpen && !target.closest('.select')) {
				isOpen = false;
			}
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="select">
	{#each options.slice(0, 3) as o, i}
		<button class:active={i === active} onclick={() => (selected = o)}>
			<span class="pip"></span>
			<span class="label">{o}</span>
		</button>
	{/each}

	<button
		onclick={toggleDropdown}
		class:active={active >= 3}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="pip"></span>
		<span class="label">{active >= 3 ? selected : '[...]'}</span>
	</button>
	{#if isOpen}
		<ul class="dropdown-menu" role="listbox" transition:fly={{ y: 5, x: 2, duration: 200 }}>
			{#each options.slice(3) as option (option)}
				<li
					role="option"
					aria-selected={option === selected}
					onclick={() => selectOption(option)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') selectOption(option);
					}}
					tabindex="0"
					class:selected={option === selected}
				>
					{option}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.select {
		display: flex;
		align-items: center;
		height: 40px;
		position: relative;

		button:first-child {
			border-top-left-radius: var(--bd-radius-sm);
			border-bottom-left-radius: var(--bd-radius-sm);
			.label {
				border-top-left-radius: var(--bd-radius-sm);
				border-bottom-left-radius: var(--bd-radius-sm);
				border-left: 1px solid var(--bd-primary);
			}
		}
		button:last-child {
			border-top-right-radius: var(--bd-radius-sm);
			border-bottom-right-radius: var(--bd-radius-sm);
			.label {
				border-top-right-radius: var(--bd-radius-sm);
				border-bottom-right-radius: var(--bd-radius-sm);
				border-right: 1px solid var(--bd-secondary);
			}
		}

		button {
			background: transparent;
			border: none;
			box-shadow: var(--nm-sm-h-primary), var(--nm-sm-h-secondary);
			color: inherit;
			cursor: pointer;
			flex: 1 1;
			overflow: hidden;

			height: 100%;
			min-width: 80px;

			line-height: 1;
			font-family: inherit;
			font-size: 0.6rem;
			letter-spacing: 1px;
			text-align: center;
			text-transform: uppercase;
			transition-duration: 0.2s;
			position: relative;

			.label {
				background: var(--bg-darker);
				border: 1px solid var(--bd-secondary);
				border-top: 1px solid var(--bd-primary);
				border-bottom: 1px solid var(--bd-secondary);
				display: grid;
				place-items: center;
				padding: 0 5px;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}

			.pip {
				background: radial-gradient(var(--bd-primary), var(--bd-secondary));
				border-radius: 1px;
				box-shadow: var(--nm-sm-h-secondary) inset;
				box-sizing: border-box;
				display: block;
				width: 6px;
				height: 6px;
				position: absolute;
				top: 8px;
				left: 8px;
				z-index: 2;
				transition-duration: 0.15s;
				transition-delay: 0.15s;
			}

			&.active {
				box-shadow: none;
				transform: translateY(1px);
			}
			&.active .label {
				background: var(--bg-dark);
				border-right: none;
				border-left: none;
				box-shadow:
					var(--nm-sm-b-primary) inset,
					var(--nm-sm-b-secondary) inset;
			}
			&.active:first-child .label {
				box-shadow:
					var(--nm-sm-hb-primary) inset,
					var(--nm-sm-h-secondary) inset;
			}
			&.active .pip {
				background: #e9a559;
				box-shadow: 0 0 2px var(--bd-primary) inset;
			}

			&:not(.active) {
				color: var(--tx);
			}
		}
	}

	.dropdown-menu {
		border-radius: var(--bd-radius-sm);
		box-shadow: var(--nm-md-h-primary), var(--nm-md-h-secondary);
		backdrop-filter: blur(3px);
		background-blend-mode: revert;
		position: absolute;
		top: calc(100% + 1rem);
		right: 0;
		width: 60%;
		list-style: none;
		padding: 0.5rem 0;
		margin: 0;
		z-index: 1;
		max-height: 200px;
		overflow-y: auto;
	}

	.dropdown-menu li {
		padding: 0.75rem 1rem;
		color: var(--tx-muted);
		cursor: pointer;
		font-size: 0.7rem;
		text-transform: uppercase;
		transition:
			background-color 0.15s ease-out,
			color 0.15s ease-out;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&:hover {
			background-color: var(--bg-darker);
		}

		&.selected {
			color: var(--tx);
		}

		&:focus,
		&:focus-visible {
			outline: none; // Remove default outline
			background-color: var(--bg-darker);
		}
	}
</style>
