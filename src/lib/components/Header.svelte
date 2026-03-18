<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Book, House, Pencil, type IconProps } from '@lucide/svelte';
	import type { Component } from 'svelte';

	interface Item {
		label: string;
		icon: Component<IconProps>;
		path: string;
	}

	const menu_items: Item[] = [
		{ label: 'Home', icon: House, path: `/` },
		{ label: 'Blog', icon: Book, path: `/blog` },
		{ label: 'Submit', icon: Pencil, path: `/submit` }
	];

	const isActive = (path: string): boolean => {
		if (path === '/') {
			return page.url.pathname === '/';
		}

		return page.url.pathname.startsWith(path);
	};
</script>

<header
	class="fixed bottom-0 flex h-24 w-screen items-center justify-around gap-2 bg-dark-4 p-2 text-white not-md:px-4 md:top-0 md:h-16 md:border-b"
>
	<!-- Left -->
	<div class="not-md:hidden"></div>

	<!-- Center -->
	<div class="flex gap-2">
		{#each menu_items as item (item.label)}
			<a
				class={`btn ${isActive(item.path) ? 'active' : 'regular'} gap-1 not-md:flex-col not-md:text-xs md:gap-2`}
				href={item.path}
			>
				<item.icon size={24} />
				{item.label}
			</a>
		{/each}
	</div>

	<!-- Right -->
	<div class="not-md:hidden"></div>
</header>

<style>
	header * {
		height: 100%;

		@media (width >= 48rem) {
			min-width: 8rem;
		}

		@media (width <= 48rem) {
			width: 100%;
		}
	}
</style>
