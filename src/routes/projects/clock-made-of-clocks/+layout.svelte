<script lang="ts">
	let { children } = $props();
	import '../../../app.css';
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<title>therabug</title>
</svelte:head>

{@render children?.()}

<style>
</style>
