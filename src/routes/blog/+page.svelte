<script lang="ts">
	import type { PageData } from './$types';
	import { Calendar } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-7xl px-4 py-8">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<a
				class="relative block min-h-48 w-full cursor-pointer flex-col overflow-clip rounded-2xl border-1 border-dark-1 bg-dark-3 p-6 shadow-md transition-all duration-300 ease-out hover:bg-dark-2 hover:shadow-lg"
				href="/blog/{post.slug}"
			>
				{#if post.thumbnail}
					<div class="mb-4 h-48 w-full overflow-hidden rounded-lg">
						<img
							src={post.thumbnail}
							alt={post.title}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<h2 class="mb-2 text-xl font-semibold">
					{post.title}
				</h2>
				<p class="mb-4 text-gray-600">{post.description}</p>
				<div class="flex items-center gap-4">
					<div class="text-md flex items-center gap-1 text-gray-400">
						<Calendar size={16} />
						{new Date(post.date).toLocaleDateString()}
					</div>

					{#if post.tags}
						<div class="flex flex-wrap items-center gap-2">
							{#each post.tags as tag}
								<span class="inline-block rounded bg-dark-1 px-2 py-1 text-xs">
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
