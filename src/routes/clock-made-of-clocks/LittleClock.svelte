<script lang="ts">
	import './LittleClock.css';
	import { cell } from './digit';

	let { numberToRender } = $props();

	let clocks = $derived(Array.from({ length: 24 }, (_, i) => cell(numberToRender, i)));
</script>

<div class="clocks">
	{#each clocks as degrees, i (i)}
		<div class="little-clock">
			<div class="ayrac" style={`transform: rotate(${degrees[0]}deg)`}></div>
			<div class="ayrac" style={`transform: rotate(${degrees[1]}deg)`}></div>
		</div>
	{/each}
</div>
