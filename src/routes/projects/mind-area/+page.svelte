<script lang="ts">
	import { onMount } from 'svelte';
	import { getMousePosition } from './utils/mouse.svelte';

	import { Pointer } from 'lucide-svelte';
	import { map_range } from './utils/remap';

	let buttonIsHold = $state(false);
	let canClean = $state(false);

	let mousePosition = getMousePosition();

	let button: HTMLButtonElement;
	let textarea: HTMLTextAreaElement;

	onMount(() => {
		window.addEventListener('mouseup', () => {
			buttonIsHold = false;
		});
	});

	const removeTextContent = () => {
		textarea.value = '';
		textarea.style.scale = '1';
		textarea.style.opacity = '1';
	};

	const handleButtonRelease = () => {
		textarea.style.scale = '0.25';
		textarea.style.opacity = '0';

		setTimeout(removeTextContent, 1000);
		canClean = false;
	};

	$effect(() => {
		if (buttonIsHold) {
			canClean = mousePosition.y / window.innerHeight > 0.3;

			if (!canClean) {
				button.style.transform = `translate(0px, ${mousePosition.y * map_range(mousePosition.y / window.innerHeight / 0.6, 0.0, 1.0, 1.0, 0.0) - 30}px)`;
			} else {
				button.style.transform = `translate(0px, ${window.innerHeight * 0.2}px)`;
			}
		} else {
			button.style.transform = `translate(0px, 0px)`;

			if (canClean) {
				handleButtonRelease();
			}
		}
	});
</script>

<div class="fixed inset-0 flex h-screen w-screen flex-col gap-4 p-5">
	<div class="flex items-center justify-center">
		<button
			style:position="1000px"
			bind:this={button}
			onmousedown={() => {
				buttonIsHold = true;
			}}
			class="z-10 flex w-full justify-center gap-2 rounded-lg bg-purple-2 p-2 text-center text-white transition-all ease-out hover:bg-purple-3 active:w-80 active:bg-purple-4"
		>
			<Pointer></Pointer>pull this when you are finished</button
		>
	</div>
	<textarea
		bind:this={textarea}
		class="mr-auto ml-auto block h-full w-full resize-none rounded-2xl border border-white/20 bg-dark-3 p-4 align-text-bottom text-white transition-all duration-750 ease-out outline-none"
	></textarea>
</div>
