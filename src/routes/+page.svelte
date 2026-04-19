<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	/* eslint-disable svelte/no-at-html-tags */
	import {
		SiBevy,
		SiBlender,
		SiBun,
		SiCplusplus,
		SiDeno,
		SiDrizzle,
		SiGo,
		SiGodotengine,
		SiKrita,
		SiNextdotjs,
		SiNodedotjs,
		SiNuke,
		SiReact,
		SiRust,
		SiSvelte,
		SiUnrealengine
	} from '@icons-pack/svelte-simple-icons';
	import { Gamepad } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	const helloList = [
		'Hello!',
		'Merhaba!',
		'Hola!',
		'Bonjour!',
		'Ciao!',
		'こんにちは!',
		'안녕하세요!',
		'你好!'
	];
	let currentIndex = 0;
	let displayedText = $state('Hello!');
	let isDeleting = false;
	const baseTypeSpeed = 150;
	const baseDeleteSpeed = 10;
	const speedVariation = 50;
	const pauseTime = 2000;
	let timeout: number;

	let { data } = $props();

	const techStack = [
		{ name: 'SvelteKit', icon: SiSvelte },
		{ name: 'React', icon: SiReact },
		{ name: 'Next.js', icon: SiNextdotjs },
		{ name: 'Deno', icon: SiDeno },
		{ name: 'Node.js', icon: SiNodedotjs },
		{ name: 'Bun.js', icon: SiBun },
		{ name: 'Godot', icon: SiGodotengine },
		{ name: 'Unreal Engine', icon: SiUnrealengine },
		{ name: 'Bevy', icon: SiBevy },
		{ name: 'Blender', icon: SiBlender },
		{ name: 'C/C++', icon: SiCplusplus },
		{ name: 'Rust', icon: SiRust },
		{ name: 'Krita', icon: SiKrita },
		{ name: 'Go', icon: SiGo },
		{ name: 'Drizzle (PostgreSQL)', icon: SiDrizzle },
		{ name: 'Adobe Creative Suite', icon: SiNuke }
	];

	function getRandomSpeed(baseSpeed: number): number {
		const variation = (Math.random() - 0.5) * 2 * speedVariation;
		return Math.max(50, baseSpeed + variation);
	}

	function typeText() {
		const currentHello = helloList[currentIndex];
		if (!isDeleting && displayedText.length < currentHello.length) {
			displayedText = currentHello.substring(0, displayedText.length + 1);
			timeout = setTimeout(typeText, getRandomSpeed(baseTypeSpeed));
		} else if (!isDeleting && displayedText.length === currentHello.length) {
			isDeleting = true;
			timeout = setTimeout(typeText, pauseTime);
		} else if (isDeleting && displayedText.length > 0) {
			displayedText = currentHello.substring(0, displayedText.length - 1);
			timeout = setTimeout(typeText, getRandomSpeed(baseDeleteSpeed));
		} else if (isDeleting && displayedText.length === 0) {
			isDeleting = false;
			currentIndex = (currentIndex + 1) % helloList.length;
			timeout = setTimeout(typeText, getRandomSpeed(baseTypeSpeed));
		}
	}
	typeText();
	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div class="p-4 md:px-32 lg:px-64">
	<section class="flex flex-col items-center justify-center gap-4 py-0">
		<div
			class="mt-8 flex min-h-[1.2em] items-center justify-center text-6xl font-bold select-none md:mt-0 md:text-9xl"
		>
			<h1 class="hello">
				{displayedText}
			</h1>
			<span class="cursor">|</span>
		</div>

		<div class="mt-8 flex flex-col gap-4">
			<p class="text-md mb-2 text-center md:text-xl">
				<span class="rounded-2xl border-2 border-white/20 bg-dark-5 p-3"
					>I'm Buğra! I'm
					{@html `<!--get dunked this is what you receive from the server. no JS needed, no hydration, just pure SSR. birthdate? what birthdate? i don't know her.-->`}
					<span class="font-bold text-primary">{data.age.years}</span>
					years old.</span
				>
			</p>
			<p
				class="rounded-3xl border-2 border-white/20 bg-dark-5 p-4 text-lg md:rounded-xl lg:text-xl"
			>
				Also known as rabug, I started coding at age 9 with C#. Still, I love programming, and my
				goal is to be successful. I live in Turkiye 🇹🇷. I studied English in the English project
				class for 4 years straight. I don't believe coding requires math because solving a math
				problem is a computer job, and I find this funny. I also make animations, 3D models, games,
				and design. Anyway, if you want to contact me or something, you can look at the <a
					href="/contact">contact</a
				> page.
			</p>
		</div>
	</section>

	<section class="flex flex-col items-center justify-center gap-4 py-4">
		<div class="mt-8 flex w-full flex-col gap-4">
			<p class="text-md mb-2 text-center md:text-xl">
				<span class="rounded-2xl border-2 border-white/20 bg-dark-5 p-3 text-2xl">Tech Stack</span>
			</p>
			<div
				class="grid grid-cols-2 rounded-3xl border-2 border-white/20 bg-dark-5 text-lg sm:grid-cols-3 md:rounded-xl lg:text-xl xl:grid-cols-4"
			>
				{#each techStack as tech (tech.name)}
					<div class="flex flex-col items-center justify-center gap-2 p-4">
						<tech.icon size={48} />
						<p class="text-center text-gray-400">{tech.name}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<a
		draggable={false}
		href="https://apps.rabug.space"
		class="flex h-20 items-center justify-between gap-2 rounded-lg bg-primary p-4 text-xl text-white! decoration-0! transition-all duration-300 ease-out hover:bg-purple-7 active:bg-purple-5 md:hidden"
	>
		<Gamepad size={30}></Gamepad> Check out at apps & games!
		<p></p>
	</a>
</div>

<style>
	.hello {
		background: linear-gradient(
			45deg,
			#ff8a00 0%,
			#e52e71 25%,
			#ff8a00 50%,
			#e52e71 75%,
			#ff8a00 100%
		);
		background-size: 300% 100%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
		animation: shine 3s linear infinite;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		letter-spacing: -0.02em;
		line-height: 1;
		padding: 0.1em 0;
		margin: 0;
		white-space: nowrap;
	}
	a {
		color: #4f46e5;
		text-decoration: underline;
	}
	.cursor {
		color: white;
		animation: blink 1s infinite;
		font-weight: 500;
	}
	@keyframes shine {
		0% {
			background-position: 0% center;
		}
		100% {
			background-position: 300% center;
		}
	}
	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}
</style>
