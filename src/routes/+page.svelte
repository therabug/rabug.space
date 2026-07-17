<script lang="ts">
    import { marked } from 'marked';

    type TypewriterContanier = {
      display: string,
      index: number
    };

    let { data } = $props();

    const getBio = async () => {
      const response = await fetch("https://raw.githubusercontent.com/therabug/therabug/refs/heads/main/README.md");

      if (!response.ok) {
        throw new Error('Failed to fetch!');
      }

      return response.text();
    }

    let bio = $state<Promise<string>>();

    let timer: number;

    const typeEffect = (typewriter: TypewriterContanier, text: string) => {
      const lastIndex = text.length - 1;
      typewriter.index = typewriter.index < lastIndex ? typewriter.index + 1 : lastIndex;

      typewriter.display = text.substring(0, typewriter.index + 1);
    };

    const welcomeMessage = "Hello, friend. Hello friend? That's lame.";

    let typewriter: TypewriterContanier = $state({ display: "", index: -1 });

    const tick = () => {
      typeEffect(typewriter, welcomeMessage);

      let timeout = /[.?!]/.test(welcomeMessage[typewriter.index]) ? 1000 : 100;

      if (typewriter.index < welcomeMessage.length - 1) {
        timer = setTimeout(tick, timeout);
      }
    };

    $effect(() => {
      timer = setTimeout(tick, 100);

      bio = getBio();

      return () => {
        clearTimeout(timer);
      }
    });
</script>


<div class="home-contanier">
    <div class="terminal">
        $
        <div class="welcome-text">
            <noscript>{welcomeMessage}</noscript>
            <span>{typewriter.display}</span>
            <div class="cursor"></div>
            <span class="ghost">{welcomeMessage.substring(typewriter.index + 1)}</span>
        </div>
    </div>


    {@html "<!-- hehe I embed the age data with ssr so you can't get the date -->"}
    <span>hello! I'm buğra, a <span class="highlight-text">{data.age}</span> old indiviual that values experience, learning process and creation.</span>

    <div class="markdown">
        {#await bio}
        <p>bio is loading...</p>

        {:then markdown}
        {@html marked(markdown || '')}

        {:catch error}
        oops {error}
        {/await}
    </div>
</div>

<style>
    .ghost {
        visibility: hidden;
    }

    .terminal {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: start;
    }

    .home-contanier {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        text-align: center;

        font-size: 1.5rem;
    }

    .markdown {
        width: 100%;
        height: 100%;
    }

    .markdown :global(img) {
        object-fit: contain;
        max-width: 70vw;

        overflow: hidden;

        border-radius: 1rem;
    }

    .cursor {
        background-color: #55f055;
        width: 0.3rem;
        height: 1.5rem;
        translate: 0rem -0.27rem;

        animation: 1s linear blink infinite;
    }

    @keyframes blink {
        0% {
            opacity: 100%;
        }
        70% {
            opacity: 100%;
        }
        100% {
            opacity: 0%;
        }
    }

    .welcome-text {
        white-space: pre-wrap;

        height: 2rem;

        color: #55f055;
        font-weight: bold;

        display: flex;
        gap: 0.2rem;

        align-items: center;
    }

    @media (max-width: 768px) {
        .home-contanier { font-size: 1.7rem; }
        .markdown :global(img) { border-radius: 2rem; }
        .cursor { visibility: hidden; }
        .ghost { display: none; }
    }
</style>
