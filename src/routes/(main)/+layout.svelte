<script lang="ts">
	import '../../app.css';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<title>therabug</title>
</svelte:head>

<Header />
<div class="pt-2 md:pt-30">
	{@render children?.()}
</div>
