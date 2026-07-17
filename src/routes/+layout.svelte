<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import "$lib/app.css";

	import favicon from '$lib/assets/favicon.svg';

	type Page = {
	  path: string,
	  name: string
	};

	let pages: Page[] = [
      { name: "home", path: resolve("/") },
      { name: "projects", path: resolve("/projects") },
	  { name: "contact", path: resolve("/contact") },
	];

	const amIHere = (path: string): boolean => {
	  return page.url.pathname === path;
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="root">
    <div class="pages">
        {#each pages as page }
            <a href={page.path} class={`${amIHere(page.path) ? "currentPage" : ""}`}>{page.name}</a>
        {/each}
    </div>
    <div class="pageContanier">
        {@render children()}
    </div>
</div>

<style>
    .pageContanier {
        padding: 0rem 3rem;
    }

    .root {

    }

    .pages {
        margin: 1.5rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;

        font-size: 1.5rem;
    }

    .pages a {
        color: var(--accent-color);
        text-decoration: none;

        transition: 250ms ease-out all;
    }

    .pages a:hover {
        color: color-mix(in srgb, white 50%, var(--accent-color))
    }

    .currentPage {
        color: white !important;
    }

    @media (max-width: 768px) {
        .pageContanier { padding: 0rem 0rem; }
    }
</style>
