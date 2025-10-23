<script lang="ts">
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	let { children } = $props();

	injectAnalytics();
</script>

{@render children?.()}
