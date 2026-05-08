<script>
	import { ArrowUpRight } from 'lucide-svelte';

	const project = [
		{
			title: 'Youtube',
			thumbnailUrl: 'projects/youtube.png',
			description:
				'I am also an active content creator. I have managed two separate YouTube channels, both of which reached 10,000 subscribers in a short period. One of my videos has reached over 520,000 views, and I have multiple videos with more than 20,000 views. On Instagram, I occasionally produce content in the form of reels, including one that has surpassed 1.8 million views. As someone who enjoys consuming content, playing an active role in content creation is both a creative outlet and a great source of motivation for me.'
		},
		{
			title: 'Game Development',
			thumbnailUrl: 'projects/itchio.png',
			description:
				'I also have 4 years of experience in game development using both Godot and Unreal Engine. I regularly share my experimental projects on my itch.io page, and I am currently working on several active game projects. This experience has helped me strengthen both my technical skills and creative problem-solving abilities.'
		},
		{
			title: 'Website',
			thumbnailUrl: 'projects/website.png',
			description:
				"I have 1 year of experience in web development using modern technologies such as SvelteKit, Svelte, React, Next.js, Deno, Node.js, and Bun.js. I'm comfortable working on both frontend and backend, and have contributed to full-stack projects by building end-to-end solutions. This portfolio site you're viewing is actually my third full rewrite. :)"
		}
	];

	const projects = [
		{
			name: 'Clock Made Out of Clocks',
			thumbnailUrl: 'projects/tinyclocks.png',
			navigate: '/projects/clock-made-of-clocks'
		}
	];
</script>

<h1 class="mx-10 pt-4 text-center text-xl font-bold select-none md:text-6xl">Works</h1>

<div class="grid grid-cols-1 gap-6 p-8 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
	{#each project as work (work.title)}
		<label for="project" class="group relative aspect-video overflow-clip">
			<div class="overflow-clip rounded-xl border border-white/20 bg-dark-3">
				<p class="p-4 text-center text-2xl font-bold">{work.title}</p>
				<img src={work.thumbnailUrl} alt="" class="h-full w-full object-cover" />
				<p class="inset-0 h-full bg-white/5 p-4 text-center">
					{work.description}
				</p>
			</div>
		</label>
	{/each}
</div>

<h1 class="mx-10 pt-4 text-center text-xl font-bold select-none md:text-6xl">Projects</h1>

<div
	class="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
>
	{#each projects as project (project.name)}
		<label for="project" class="group relative aspect-video overflow-clip">
			<div class="relative overflow-clip rounded-xl border border-white/20 bg-dark-3">
				<a href={project.navigate} class="absolute h-full w-full" aria-label="link"></a>
				<img src={project.thumbnailUrl} alt="" class="h-full w-full object-cover" />
				<div class="flex items-center justify-center text-blue-300 underline underline-offset-5">
					<p class="p-4 text-center text-2xl font-bold">{project.name}</p>
					<ArrowUpRight />
				</div>
			</div>
		</label>
	{/each}
</div>
