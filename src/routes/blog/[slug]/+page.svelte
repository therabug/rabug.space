<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-dark-7 via-dark-6 to-dark-5">
	<header class="relative overflow-hidden">
		{#if data.meta.thumbnail}
			<div class="relative h-[60vh] min-h-[400px]">
				<img
					src={data.meta.thumbnail}
					alt={data.meta.title}
					class="absolute inset-0 h-full w-full object-cover"
					loading="lazy"
				/>
				<div
					class="via-gray-5/60 absolute inset-0 bg-gradient-to-t from-dark-7 to-transparent"
				></div>
			</div>
		{:else}
			<div
				class="h-[40vh] min-h-[300px] bg-gradient-to-br from-dark-7/20 via-dark-6/20 to-dark-5/20"
			></div>
		{/if}

		<div class="relative z-10 -mt-32">
			<div class="mx-auto max-w-4xl px-6">
				<div class="rounded-2xl border border-white/10 bg-dark-3/75 p-8 shadow-2xl">
					<h1 class="mb-4 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
						{data.meta.title}
					</h1>
					<p class="mb-6 max-w-3xl text-xl leading-relaxed text-gray-300">
						{data.meta.description}
					</p>
					<div class="flex items-center text-gray-400">
						{new Date(data.meta.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
				</div>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-4xl px-6 py-16">
		<article
			class="prose-h2:border-gradient-to-r prose prose-lg
            max-w-none prose-headings:font-semibold
            prose-headings:text-white prose-h1:mt-12 prose-h1:mb-8
            prose-h1:text-4xl prose-h2:mt-16 prose-h2:mb-6
            prose-h2:border-b prose-h2:border-blue-500/30 prose-h2:pb-4 prose-h2:text-3xl
            prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-2xl prose-h3:text-blue-300
            prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-xl
            
            prose-p:mb-6 prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-200
            
            prose-a:font-medium prose-a:text-blue-400 prose-a:no-underline
            prose-a:transition-all prose-a:duration-200
            hover:prose-a:text-blue-300 hover:prose-a:underline
            
            prose-blockquote:my-8 prose-blockquote:rounded-r-lg
            prose-blockquote:border-l-4 prose-blockquote:border-blue-400
            
            prose-blockquote:bg-slate-800/30 prose-blockquote:px-8
            prose-blockquote:py-6 prose-blockquote:text-gray-300
            prose-blockquote:italic prose-blockquote:shadow-lg prose-blockquote:backdrop-blur-sm
            prose-strong:font-semibold prose-strong:text-white
            prose-em:text-blue-200 prose-em:italic
            
            prose-code:rounded-md prose-code:border
            prose-code:border-slate-700/50 prose-code:bg-slate-800/50 prose-code:px-2
            prose-code:py-1 prose-code:font-mono
            prose-code:text-sm prose-code:text-emerald-300
            prose-code:before:content-none prose-code:after:content-none
            
            prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border
            prose-pre:border-slate-700/50 prose-pre:bg-slate-900/50 prose-pre:p-6
            prose-pre:shadow-lg prose-pre:backdrop-blur-sm
            
            prose-ol:space-y-2 prose-ul:space-y-2
            prose-li:text-gray-200 prose-li:marker:text-blue-400
            
            prose-table:border-collapse prose-table:overflow-hidden prose-table:rounded-xl
            prose-table:border-0 prose-table:shadow-lg
            prose-thead:bg-slate-800/50 prose-thead:backdrop-blur-sm
            prose-tr:border-b prose-tr:border-slate-800/30 prose-th:border-b prose-th:border-slate-700/50
            prose-th:px-6 prose-th:py-4 prose-th:text-left
            prose-th:font-semibold prose-th:text-gray-200
            prose-td:px-6 prose-td:py-4 prose-td:text-gray-300
            
            prose-img:my-8 prose-img:rounded-xl prose-img:shadow-2xl
            prose-img:ring-1 prose-img:ring-white/10
            
            prose-hr:my-12 prose-hr:border-slate-700/50"
		>
			<data.content />
		</article>
	</main>

	<div class="mx-auto max-w-4xl px-6 pb-12">
		<div class="h-px bg-gray-700"></div>
	</div>
</div>
