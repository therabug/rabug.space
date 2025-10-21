<script lang="ts">
	import { Download } from 'lucide-svelte';

	let loading = $state(false);
	let results = $state<Array<{ word: string; meaning: string }>>([]);
	let input = $state('');

	const submit = async () => {
		const wordList = input
			.split('\n')
			.map((word) => word.trim())
			.filter((word) => word.length > 0);

		if (wordList.length === 0) return;

		loading = true;
		results = [];

		try {
			const response = await fetch('/sozluk', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ wordList })
			});

			if (!response.ok) {
				throw new Error('Failed to fetch');
			}

			const data = await response.json();
			console.log('Received data:', data);

			results = [...data];

			console.log('Results set:', results);
		} catch (err) {
			console.error('Error:', err);
		} finally {
			loading = false;
			console.log('Loading finished, results:', results);
		}
	};

	const downloadResults = () => {
		if (results.length === 0) return;

		const content = results.map(({ word, meaning }) => `${word}: ${meaning}`).join('\n');

		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'meanings.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
</script>

<div class="flex h-screen flex-col gap-4 overflow-auto p-8">
	<textarea
		bind:value={input}
		placeholder="Enter words (one per line)..."
		class="flex-shrink-0 rounded-lg bg-dark-1 p-4"
		rows="10"
	></textarea>

	<div class="flex flex-shrink-0 gap-2">
		<button
			onclick={submit}
			disabled={loading}
			class="flex-1 rounded-lg bg-blue-600 px-6 py-2 text-white transition-all hover:bg-blue-700 disabled:opacity-50"
		>
			{loading ? 'Searching...' : 'Get Meanings'}
		</button>

		<button
			onclick={downloadResults}
			disabled={results.length === 0}
			class="flex items-center gap-2 rounded-lg border-1 border-dark-1 bg-dark-3 px-6 py-2 text-white transition-all hover:bg-dark-2 disabled:opacity-50"
			title="Download results"
		>
			<Download size={16} />
			Download ({results.length})
		</button>
	</div>

	{#if loading}
		<div class="text-center text-blue-400">Loading...</div>
	{/if}

	{#if !loading && results.length === 0}
		<div class="text-center text-gray-400">No results yet</div>
	{/if}

	{#if results.length > 0}
		<div class="flex flex-col gap-2">
			<h2 class="text-xl font-bold">Results ({results.length}):</h2>
			{#each results as { word, meaning }, i (word + i)}
				<div class="rounded-lg bg-dark-2 p-4">
					<strong>{word}:</strong>
					{meaning}
				</div>
			{/each}
		</div>
	{/if}
</div>
