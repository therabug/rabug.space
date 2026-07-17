<script lang="ts">
    type Props = {
      text: string,
      typingSpeed?: number,
      pauseSpeed?: number
    };

    let { text, typingSpeed = 100, pauseSpeed = 1000 }: Props = $props();

    let index = $state(-1);
    let display = $derived(text.substring(0, index + 1));
    let remaining = $derived(text.substring(index + 1));


    $effect(() => {
      let timer: ReturnType<typeof setTimeout>;

      const tick = () => {
        if (index < text.length - 1) {
          index++;

          const isPause = /[.?!]/.test(text[index]);

          timer = setTimeout(tick, isPause ? pauseSpeed : typingSpeed);
        }
      };

      timer = setTimeout(tick, typingSpeed);

      return () => {
        clearTimeout(timer);
      };
    });
</script>


<noscript>{text}</noscript>
<span>{display}</span>
<div class="cursor"></div>
<span class="ghost">{remaining}</span>

<style>
    .ghost {
        visibility: hidden;
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

    @media (max-width: 768px) {
        .cursor { visibility: hidden; }
        .ghost { display: none; }
      }
</style>
