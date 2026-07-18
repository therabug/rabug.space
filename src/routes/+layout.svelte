<script lang="ts">
	import './layout.css';
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import "./app.css";
    import { SiGithub } from '@icons-pack/svelte-simple-icons';

	type Page = { path: string; name: string };

	let pages: Page[] = [
		{ name: "home", path: resolve("/") },
		{ name: "projects", path: resolve("/projects") },
		{ name: "contact", path: resolve("/contact") }
	];

	const amIHere = (path: string): boolean => {
		return page.url.pathname === path;
	};

	let { children } = $props();
</script>

<svelte:head><title>rabug.space</title></svelte:head>

<div class="root">
	<div class="pages">
		{#each pages as page}
			<a
				href={page.path}
				class={`${amIHere(page.path) ? "currentPage" : ""}`}
			>{page.name}</a>
		{/each}
	</div>

	<div class="pageContanier">{@render children()}</div>

	<span class="flex gap-2">source code: <a class="text-primary underline flex gap-2 items-center" href="https://github.com/therabug/rabug.space">github <SiGithub size={16} /></a></span>
</div>

<style>
	.pageContanier {
		padding: 2rem;
		width: 100%;
		min-width: 0;
		box-sizing: border-box;
		overflow-wrap: anywhere;
	}

	.root {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.pages {
		margin: 1.5rem;
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		min-width: 0;
		font-size: 1.5rem;
	}

	.pages a {
		color: var(--accent-color);
		text-decoration: none;
		transition: 250ms ease-out all;
	}

	.pages a:hover {
		color: color-mix(in srgb, white 50%, var(--accent-color));
	}

	.currentPage {
		color: white !important;
	}
</style>
