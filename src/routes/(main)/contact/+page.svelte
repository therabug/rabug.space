<script lang="ts">
	import {
		SiDiscord,
		SiGmail,
		SiInstagram,
		SiYoutube,
		SiGithub,
		SiX,
		SiBluesky,
		SiMastodon
	} from '@icons-pack/svelte-simple-icons';

	interface Social {
		name: string;
		url: string;
		username: string;
		icon: typeof SiDiscord;
	}

	const socials: Social[] = [
		{
			name: 'discord',
			url: 'https://discord.com/users/therabug',
			username: 'therabug',
			icon: SiDiscord
		},
		{
			name: 'instagram',
			url: 'http://www.instagram.com/therabug',
			username: 'therabug',
			icon: SiInstagram
		},
		{
			name: 'github',
			url: 'http://github.com/therabug',
			username: 'therabug',
			icon: SiGithub
		},
		{
			name: '(twitter)',
			url: 'http://x.com/therabug',
			username: '@therabug',
			icon: SiX
		},
		{
			name: 'bluesky',
			url: 'https://bsky.app/profile/rabug.bsky.social',
			username: '@rabug.bsky.social',
			icon: SiBluesky
		},
		{
			name: 'mastodon',
			url: 'https://mastodon.social/@rabug',
			username: '@rabug',
			icon: SiMastodon
		},
		{
			name: 'youtube',
			url: 'https://youtube.com/@therabug',
			username: '@therabug',
			icon: SiYoutube
		},
		{
			name: 'email',
			url: 'mailto:rabug50@gmail.com',
			username: 'rabug50@gmail.com',
			icon: SiGmail
		}
	];
</script>

<div class="m-4 rounded-3xl border-2 border-white/20 bg-dark-5">
	{#each socials as social (social.name)}
		<div
			class="flex items-center justify-center gap-2 p-4 text-lg select-none md:rounded-xl lg:text-xl"
		>
			<social.icon />
			<p>{social.name}: <a href={social.url}>{social.username}</a></p>
		</div>
	{/each}
</div>

<style>
	a {
		color: #4f46e5;
		text-decoration: underline;
	}
</style>
