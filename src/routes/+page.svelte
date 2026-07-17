<script lang="ts">
    import { resolve } from "$app/paths";
    import Markdown from "$lib/components/Markdown.svelte";
    import TypeWriter from "$lib/components/TypeWriter.svelte";

    let { data } = $props();

    let buttons: { img: string, href: string, alt: string }[] = [
      { img: "https://yesterhost.neocities.org/archive/buttons/button222.png", href: "https://godotengine.org", alt: "godot engine" },
      { img: "https://capstasher.neocities.org/88x31Buttons/anybrowser6.gif", href: "about:config", alt: "viewed with any browser" },
      { img: "https://88x31.nl/gifs/blender_get.gif", href: "https://blender.org", alt: "blender" },
      { img: "https://capstasher.neocities.org/88x31Buttons/click_here.gif", href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", alt: "click here!" },
      { img: "", href: "", alt: "" },
    ];

    const welcomeMessage = "Hello, friend. Hello friend? That's lame.";
</script>

<div class="home-container">
    <div class="terminal">
        <div class="terminal-body">
            <span>$</span>
            <div class="welcome-text">
                <TypeWriter text={welcomeMessage} />
            </div>
        </div>
    </div>

    {@html "<!-- hehe I embed the age data with ssr so you can't get the date -->"}

    <p class="intro">
        hello! I'm buğra, a <span class="highlight-text">{data.age}</span> year old individual
        who values experience, the learning process, and creation.
    </p>

    <div class="bio">
        <Markdown html={data.bio} />
    </div>

    <span>here is some cool buttons:</span>
    <div class="buttons">
        {#each buttons as button}
            <a href={button.href}><img src={button.img} alt={button.alt}></a>
        {/each}
    </div>
</div>

<style>
    .buttons {
        display: flex;
        gap: 0.2rem;
    }

    .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        max-width: 720px;
        width: 100%;
        margin: 0 auto;
        text-align: center;

        font-size: 1.3rem;
    }

    .terminal {
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid rgba(128, 128, 128, 0.3);
        background: rgba(0, 0, 0, 0.85);
        text-align: left;
    }

    .terminal-body {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 1.5rem;
        font-size: clamp(1rem, 2.2vw, 1.6rem);
    }

    .welcome-text {
        color: #55f055;
        font-weight: bold;
        display: flex;
        align-items: center;
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .intro {
        font-size: 1.5rem;
        line-height: 1.6;
        max-width: 60ch;
    }

    .bio {
        width: 100%;
        text-align: left;
        line-height: 1.7;
    }

    @media (max-width: 768px) {
        .home-container { padding: 1.5rem 1rem; }
        .intro { font-size: 1rem; }
    }
</style>
