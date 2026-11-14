<script lang="ts">
  import Carousel from "./components/Carousel.svelte";

  type Work = {
    title: string;
    description: string;
    images?: string[];
    link?: string;
  };

  const works: Work[] = [
    {
      title: "Instagram",
      description: `
        Created and managed content across multiple niches, producing
        short-form videos, comedy, tech, and storytelling content.

        Produced 3 videos that reached approximately 2 million views,
        alongside numerous other videos surpassing 500K views.
        Built an audience of 1.2K followers through consistent content
        creation and experimentation with different formats.

        Created content in both Turkish and English.
      `,
      images: [
        "/works/instagram/0.jpg",
        "/works/instagram/1.jpg",
        "/works/instagram/2.jpg",
      ],
      link: "https://instagram.com/therabug",
    },
    {
      title: "YouTube",
      description: `
        Created and managed 3 YouTube channels, growing 2 of them to
        over 10K subscribers and another to 2K subscribers globally.

        Produced lots of videos that surpassed 50K-30K views, including a
        17-minute video that reached 620K views and an 18-minute video
        that reached 435K views.

        Experienced in a wide range of content formats and niches,
        including long-form videos, Shorts, comedy, technology, and
        storytelling.

        Created content in both Turkish and English, adapting content
        styles and storytelling approaches for different audiences.
      `,
      images: [
        "/works/youtube/0.png",
        "/works/youtube/1.png",
        "/works/youtube/2.png",
      ],
    },
  ];
</script>

<main class="w-full min-h-screen flex flex-col items-center px-4 py-12">
  <div class="w-full max-w-6xl flex flex-col gap-20">
    {#each works as work (work.title)}
      <section class="w-full flex flex-col gap-6">
        <h1
          class={`text-3xl font-bold text-center ${work.link ? "text-blue-300" : ""}`}
        >
          {#if work.link}
            <a href={work.link}>{work.title}</a>
            <span class="underline">{"↗"}</span>
          {:else}
            {work.title}
          {/if}
        </h1>

        {#if work.images?.length}
          <div class="w-full h-[60vh] min-h-87.5 max-h-187.5">
            <Carousel imageSources={work.images} />
          </div>
        {/if}

        <p
          class="max-w-3xl mx-auto text-base leading-relaxed text-gray-500 whitespace-pre-line text-center"
        >
          {work.description}
        </p>
      </section>
    {/each}
  </div>
</main>
