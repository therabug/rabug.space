<script lang="ts">
	let password = $state('');
	let error = $state('');

	const handleLogin = async () => {
		const response = await fetch('/sozluk/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password })
		});

		if (response.ok) {
			window.location.href = '/sozluk';
		} else {
			error = 'Invalid password';
		}
	};
</script>

<div class="flex h-screen items-center justify-center">
	<div class="flex flex-col gap-4 rounded-lg bg-dark-1 p-8">
		<h1 class="text-2xl font-bold">Enter Password</h1>

		<input
			type="password"
			bind:value={password}
			placeholder="Password..."
			class="rounded-lg bg-dark-2 p-4"
			onkeydown={(e) => e.key === 'Enter' && handleLogin()}
		/>

		<button
			onclick={handleLogin}
			class="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
		>
			Login
		</button>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
	</div>
</div>
