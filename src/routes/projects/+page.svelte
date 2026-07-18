<script lang="ts">
    import type { Project } from "./+page";

    let { data } = $props();

    let game_development: Project[] = $derived(data.games);
    const social_media: Project[] = [
      {  title: "Boorah", description: "Tech videos", href: "https://youtube.com/@theboorah", image_url: "https://yt3.ggpht.com/1egf-hd9-kpRBNppsUDneIFzPHUWr2O-2Bm1aR8AJYNQN17wdcKwu3Imsf0FDaKI4491NXbIlWo=s600-c-k-c0x00ffffff-no-rj-rp-mo" },
      {  title: "The Rabug", href: "https://youtube.com/@therabug", image_url: "https://yt3.ggpht.com/bNrJiPqr8SmWRaS-LIxxVGkkaZ2ag1jg9ph6iaIUdzHUtbU4AG2ra3X7_o-rwp-RXguSp18Oow=s600-c-k-c0x00ffffff-no-rj-rp-mo" },
      {  title: "That Rabug", description: "Hobbies", href: "https://youtube.com/@thatrabug", image_url: "https://yt3.ggpht.com/B12yGyellXt9K10E4kP-5F3VouAi34E-HDOLBOCugkuVTjhLW9hLnbJwBzatNRGXdhEta_ls=s600-c-k-c0x00ffffff-no-rj-rp-mo" },
    ];

    let categories: { title: string, projects: Project[] }[] = $derived([
      { title: "Game Development", projects: game_development },
      { title: "Social Media", projects: social_media },
    ]);
</script>

<div class="window">
    {#each categories as category (category.title)}
        <div style:width={"100%"}>
            <h1>{category.title}</h1>
            <div class="project-grid">
                {#each category.projects as project}
                    <a href={project.href} class="project-element">
                        {#if project.image_url}
                            <img src={project.image_url} alt={project.title}>
                        {/if}
                        <h2>{project.title}</h2>
                        {#if project.description}
                            <p>{project.description}</p>
                        {/if}
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 300px));
        justify-content: center;
        gap: 1rem;
    }
    .project-element {
        overflow: hidden;
        background-color: #1a1a1a;
        padding: 1rem 1rem 0rem;
        text-decoration: none;
        color: var(--accent-color);
        border-radius: 2rem;
        display: flex;
        flex-direction: column;
        transition: 100ms ease-out all;
    }
    .project-element:hover {
        scale: 110%;
    }
    .project-element p {
        color: white;
    }
    .project-element h2 {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .project-element img {
        object-fit: cover;
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 2rem;
    }
    .window {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
    }

    .project-element h2,
    .project-element p {
        margin: 0;
        padding: 0.5rem;
    }

    h1 {
        font-size: 40px;
        margin: 0;
    }
</style>
