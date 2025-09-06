<script>
	const projects = [
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
</script>

<h1 class="pt-4 text-center text-6xl font-bold select-none">Projects</h1>

<div class="grid grid-cols-1 gap-6 p-8 xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
	{#each projects as project}
		<label
			class="group relative flex min-h-48 w-full cursor-pointer flex-col overflow-clip rounded-2xl border-1 border-dark-1 bg-dark-3"
		>
			<input type="checkbox" class="peer sr-only" />

			<img src={project.thumbnailUrl} alt={project.title} class="h-full w-full object-cover" />
			<div class="flex items-center justify-center p-3">
				<h3 class="text-lg font-bold">{project.title}</h3>
			</div>

			<p
				class="absolute inset-0 flex items-center justify-center bg-dark-3/95 p-4 px-8 text-sm text-gray-300 opacity-0 transition-opacity ease-out group-hover:opacity-100 peer-checked:opacity-100"
			>
				{project.description}
			</p>
		</label>
	{/each}
</div>
