<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiGmail, SiInstagram, SiProtonmail, SiX } from "@icons-pack/svelte-simple-icons";
    import type { Component } from "svelte";
    import Stoat from "./assets/Stoat.svelte";

    type Contact = {
      title?: string;
      handle: string;
      href?: string;
      icon?: Component;
      copy?: string;
    };

    const contacts: Contact[] = [
      { title: "Discord", handle: "@therabug", icon: SiDiscord, href: "https://discord.com/users/541194606214250496" },
      { title: "Stoat", handle: "rabug#9986", icon: Stoat, copy: "rabug#9986" },
      { title: "Instagram", handle: "@therabug", icon: SiInstagram, href: "https://instagram.com/therabug" },
      { title: "Github", handle: "@therabug", icon: SiGithub, href: "https://github.com/therabug" },
      { title: "(Twitter)", handle: "@therabug", icon: SiX, href: "https://x.com/therabug" },
      { title: "Bluesky", handle: "@rabug.bsky.social", icon: SiBluesky, href: "https://bsky.app/profile/rabug.bsky.social" },
      { title: "Email", handle: "rabug50@gmail.com", icon: SiGmail, href: "mailto:rabug50@gmail.com" },
    ];

    const setClipboard = (clipboardData: string | undefined) => {
      if (clipboardData) {
        navigator.clipboard.writeText(clipboardData);
      }
    };
</script>

<div class="w-full">
    <div class="gap-2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-w-500">
        {#each contacts as contact}
            {#if contact.copy && !contact.href}
                <button class="flex group relative cursor-pointer flex-col items-center justify-center bg-[#2d2d2d] p-2 aspect-square rounded-2xl border-[#505050] border transition-all ease-out hover:scale-110" onclick={() => { setClipboard(contact.copy); }}>
                    <contact.icon />
                    <h1>{contact.title}</h1>
                    <span class="text-sm text-[#afafaf]">{contact.handle}</span>
                    <div class="opacity-0 transition-all ease-out group-hover:opacity-100 bg-black/80 absolute w-full h-full flex items-center flex-col justify-center">Click to copy</div>
                </button>
            {:else}
                <a class="flex flex-col items-center justify-center bg-[#2d2d2d] p-2 aspect-square rounded-2xl border-[#505050] border transition-all ease-out hover:scale-110" href={contact.href}>
                    <contact.icon />
                    <h1>{contact.title}</h1>
                    <span class="text-sm text-[#afafaf]">{contact.handle}</span>
                </a>
            {/if}

        {/each}
    </div>
</div>
