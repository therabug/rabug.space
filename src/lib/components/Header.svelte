<script lang="ts">
	import { Book, Headset, House } from 'lucide-svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	interface Page {
		icon: any;
		label: string;
		path: string;
	}

	const navItems: Page[] = [
		{ icon: House, label: 'Home', path: '/' },
		{ icon: Book, label: 'Blog', path: '/blog' },
		{ icon: Headset, label: 'Contact', path: '/contact' }
	];

	function isActive(path: string): boolean {
		if (path === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(path);
	}
</script>

<header
	class="sticky top-0 z-50 hidden items-center justify-center border-b border-dark-3 bg-dark-5 p-4 md:flex"
>
	<div class="flex gap-2">
		{#each navItems as item}
			<a
				href={item.path}
				class={`flex items-center gap-2 rounded-lg p-2 px-8 text-lg transition-all duration-300 ease-out hover:bg-dark-1 active:bg-dark-2 ${isActive(item.path) ? 'bg-dark-3' : ''}`}
			>
				<svelte:component this={item.icon} size={20} />
				{item.label}
			</a>
		{/each}
	</div>
</header>

<nav class="fixed right-0 bottom-0 left-0 z-50 border-t border-dark-3 bg-dark-5 md:hidden">
	<div class="flex gap-4 p-4">
		{#each navItems as item}
			<a
				href={item.path}
				class={`flex flex-1 cursor-pointer items-center justify-center rounded-xl py-4 transition-all duration-300 ease-out hover:bg-dark-1 active:bg-dark-2 ${isActive(item.path) ? 'bg-dark-2' : ''}`}
			>
				<svelte:component this={item.icon} size={24} />
			</a>
		{/each}
	</div>
</nav>

<style>
	@media (max-width: 768px) {
		:global(body) {
			padding-bottom: 128px;
		}
	}
</style>
