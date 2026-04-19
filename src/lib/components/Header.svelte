<script lang="ts">
	import { Book, Folder, Headset, House, Icon, Gamepad } from 'lucide-svelte';
	import { page } from '$app/state';

	interface Page {
		icon: typeof Icon;
		label: string;
		path: string;
	}

	const navItems: Page[] = [
		{ icon: House, label: 'Home', path: '/' },
		{ icon: Folder, label: 'Projects', path: '/projects' },
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
	class="fixed top-0 z-50 hidden min-w-screen items-center justify-between border-b border-dark-3 bg-dark-5 p-4 select-none md:flex"
>
	<div>
		<a
			draggable={false}
			href="https://apps.rabug.space"
			class="flex aspect-square h-full items-center gap-2 rounded-lg bg-primary p-2 transition-all duration-300 ease-out hover:bg-purple-7 active:bg-purple-5"
		>
			<Gamepad></Gamepad>
		</a>
	</div>

	<div class="flex gap-2">
		{#each navItems as item (item.label)}
			<a
				draggable={false}
				href={item.path}
				class={`flex items-center gap-2 rounded-lg p-2 px-8 text-lg transition-all duration-300 ease-out hover:bg-dark-1 active:bg-dark-2 ${isActive(item.path) ? 'bg-dark-3' : ''}`}
			>
				<item.icon size={20} />
				{item.label}
			</a>
		{/each}
	</div>

	<div></div>
</header>

<nav
	class="fixed right-0 bottom-0 left-0 z-50 border-t border-dark-3 bg-dark-5 select-none md:hidden"
>
	<div class="flex gap-4 p-4">
		{#each navItems as item (item.label)}
			<a
				href={item.path}
				class={`flex flex-1 cursor-pointer items-center justify-center rounded-xl py-4 transition-all duration-300 ease-out hover:bg-dark-1 active:bg-dark-2 ${isActive(item.path) ? 'bg-dark-2' : ''}`}
			>
				<item.icon size={24} />
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
