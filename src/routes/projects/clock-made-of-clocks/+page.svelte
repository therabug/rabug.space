<script>
	import { onDestroy } from 'svelte';
	import LittleClock from './LittleClock.svelte';

	import { ArrowLeft, ArrowUpRight } from 'lucide-svelte';
	import { SiGithub } from '@icons-pack/svelte-simple-icons';

	let numbers = $state([0, 0, 0, 0, 0, 0]);

	function updateTime() {
		const now = new Date();
		const h = now.getHours().toString().padStart(2, '0');
		const m = now.getMinutes().toString().padStart(2, '0');
		const s = now.getSeconds().toString().padStart(2, '0');
		numbers = [...h, ...m, ...s].map(Number);
	}

	const interval = setInterval(updateTime, 1000);
	updateTime();

	onDestroy(() => clearInterval(interval));
</script>

<a
	class="fixed right-0 bottom-0 m-6 flex gap-2 text-white/20"
	href="https://github.com/therabug/rabug.space/tree/main/src/routes/projects/clock-made-of-clocks"
	><SiGithub />
	<p class="flex">Source Code<ArrowUpRight /></p></a
>

<a
	class="fixed m-6 rounded-xl bg-dark-3 p-6 transition-all duration-250 ease-out not-md:bottom-0 hover:cursor-pointer hover:bg-dark-2 active:bg-dark-1 md:p-4"
	href="/projects"><ArrowLeft /></a
>

<div class="flex min-h-screen flex-col items-center justify-center transition-all">
	<div
		class="flex scale-25 items-center justify-center gap-3 transition-all md:scale-55 lg:scale-75 xl:scale-95"
	>
		{#each numbers as num, i (i)}
			<div>
				<LittleClock numberToRender={num} />
			</div>
			{#if i == 1 || i == 3}
				<p class="text-9xl">:</p>
			{/if}
		{/each}
	</div>
	<p class="text-center text-gray-500">
		<i>
			Inspired by <a href="https://www.youtube.com/@Hyperplexed">hyperplexed</a> and
			<a href="https://www.reddit.com/user/EntropyReversed_/">u/EntropyReserved</a>
		</i>
	</p>
</div>

<style>
	a {
		text-decoration: underline;
	}
</style>
