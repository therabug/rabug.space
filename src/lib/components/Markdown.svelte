<script lang="ts">
    type Props = {
      html: string
    };

    let { html } = $props();
</script>

<div class="markdown">
    {@html html}
</div>

<style>
    .markdown {
        min-width: 0;

        background-color: #0d0d0d;
        padding: 1rem;
        border-radius: 1rem;
        border: 0.1rem solid #404040;
    }

    .markdown :global(img) {
        display: block;
        object-fit: contain;
        max-width: 100%;
        height: auto;

        overflow: hidden;

        border-radius: 1rem;
    }

    .markdown :global(table) {
        width: 100%;
        border-collapse: collapse;

        border-radius: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.15);

        display: block;
        overflow-x: auto;

        overflow: hidden;
    }

      .markdown :global(th),
      .markdown :global(td) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.5rem 0.75rem;
        text-align: left;
        word-break: normal;
        overflow-wrap: normal;
      }

      .markdown :global(td) {
          background-color: #0a0a0a;
      }

      .markdown :global(th) {
        background-color: #050505;
        font-weight: 600;
      }

      .markdown :global(th:last-child),
      .markdown :global(td:last-child) {
          border-right: none;
      }

      .markdown :global(tr:last-child td) {
          border-bottom: none;
      }

      @media (max-width: 768px) {
          .markdown :global(img) { border-radius: 2rem; }
          .markdown { border-radius: 2rem; }
          .markdown :global(table) { font-size: 1rem; }
      }
</style>
