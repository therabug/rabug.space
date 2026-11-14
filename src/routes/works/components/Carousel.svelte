<script lang="ts">
  import { cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  type Props = {
    imageSources: string[];
  };

  let { imageSources }: Props = $props();

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  let currentIndex = $state(0);
  let rotationFactor = $state(1);

  let isViewerOpen = $state(false);
  let scale = $state(1);
  let panX = $state(0);
  let panY = $state(0);
  let isDragging = $state(false);
  let isSmoothZoom = $state(false);

  let viewportEl = $state<HTMLDivElement | null>(null);
  let imageEl = $state<HTMLImageElement | null>(null);

  const activePointers = new Map<number, { x: number; y: number }>();
  let pointerStartX = 0;
  let pointerStartY = 0;
  let startPanX = 0;
  let startPanY = 0;
  let hasDragged = false;
  let pinchStartDist = 0;
  let pinchStartScale = 1;

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const clampPan = (x: number, y: number, targetScale: number) => {
    if (!viewportEl || targetScale <= 1) return { x: 0, y: 0 };
    const rect = viewportEl.getBoundingClientRect();
    const maxPanX = (rect.width * (targetScale - 1)) / 2;
    const maxPanY = (rect.height * (targetScale - 1)) / 2;
    return {
      x: clamp(x, -maxPanX, maxPanX),
      y: clamp(y, -maxPanY, maxPanY),
    };
  };

  const resetZoom = (smooth = false) => {
    isSmoothZoom = smooth;
    scale = 1;
    panX = 0;
    panY = 0;
  };

  const zoomAtPoint = (
    targetScale: number,
    clientX?: number,
    clientY?: number,
    smooth = false,
  ) => {
    const nextScale = clamp(targetScale, MIN_SCALE, MAX_SCALE);
    isSmoothZoom = smooth;

    if (nextScale <= 1) {
      resetZoom(smooth);
      return;
    }

    if (viewportEl && clientX !== undefined && clientY !== undefined) {
      const rect = viewportEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = clientX - cx;
      const my = clientY - cy;

      const ratio = nextScale / scale;
      const nextPanX = mx - ratio * (mx - panX);
      const nextPanY = my - ratio * (my - panY);
      const clamped = clampPan(nextPanX, nextPanY, nextScale);

      scale = nextScale;
      panX = clamped.x;
      panY = clamped.y;
    } else {
      const ratio = nextScale / scale;
      const clamped = clampPan(panX * ratio, panY * ratio, nextScale);
      scale = nextScale;
      panX = clamped.x;
      panY = clamped.y;
    }
  };

  const move = (next: boolean = true) => {
    if (imageSources.length === 0) return;
    rotationFactor = next ? 1 : -1;

    currentIndex = next
      ? (currentIndex + 1) % imageSources.length
      : (currentIndex - 1 + imageSources.length) % imageSources.length;

    if (isViewerOpen) {
      resetZoom(false);
    }
  };

  const openViewer = () => {
    if (imageSources.length === 0) return;
    resetZoom(false);
    isViewerOpen = true;
  };

  const closeViewer = () => {
    isViewerOpen = false;
    activePointers.clear();
    isDragging = false;
    resetZoom(false);
  };

  const handleWheel = (e: WheelEvent) => {
    if (e.cancelable) e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
    zoomAtPoint(scale * zoomFactor, e.clientX, e.clientY, true);
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    viewportEl?.setPointerCapture(e.pointerId);
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.size === 1) {
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      startPanX = panX;
      startPanY = panY;
      hasDragged = false;
      isDragging = scale > 1;
      if (isDragging) isSmoothZoom = false;
    } else if (activePointers.size === 2) {
      isDragging = false;
      isSmoothZoom = false;
      hasDragged = true;
      const pts = [...activePointers.values()];
      pinchStartDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      pinchStartScale = scale;
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!activePointers.has(e.pointerId)) return;
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.size === 2) {
      const pts = [...activePointers.values()];
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      if (pinchStartDist > 0) {
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        zoomAtPoint(
          pinchStartScale * (dist / pinchStartDist),
          midX,
          midY,
          false,
        );
      }
      return;
    }

    if (activePointers.size === 1 && isDragging) {
      const dx = e.clientX - pointerStartX;
      const dy = e.clientY - pointerStartY;
      if (Math.hypot(dx, dy) > 4) {
        hasDragged = true;
      }
      const clamped = clampPan(startPanX + dx, startPanY + dy, scale);
      panX = clamped.x;
      panY = clamped.y;
    }
  };

  const handlePointerUp = (e: PointerEvent) => {
    const wasSinglePointer = activePointers.size === 1;
    activePointers.delete(e.pointerId);

    if (viewportEl?.hasPointerCapture(e.pointerId)) {
      viewportEl.releasePointerCapture(e.pointerId);
    }

    if (activePointers.size === 1) {
      const [remaining] = activePointers.values();
      pointerStartX = remaining.x;
      pointerStartY = remaining.y;
      startPanX = panX;
      startPanY = panY;
      isDragging = scale > 1;
      return;
    }

    isDragging = false;

    if (
      e.type === "pointerup" &&
      wasSinglePointer &&
      !hasDragged &&
      (e.pointerType !== "mouse" || e.button === 0)
    ) {
      const rect = imageEl?.getBoundingClientRect();
      const clickedOnImage =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (clickedOnImage) {
        if (scale > 1) {
          resetZoom(true);
        } else {
          zoomAtPoint(2.5, e.clientX, e.clientY, true);
        }
      } else {
        closeViewer();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isViewerOpen) return;

    switch (e.key) {
      case "Escape":
        closeViewer();
        break;
      case "ArrowLeft":
        move(false);
        break;
      case "ArrowRight":
        move(true);
        break;
      case "+":
      case "=":
        zoomAtPoint(scale + 0.5, undefined, undefined, true);
        break;
      case "-":
        zoomAtPoint(scale - 0.5, undefined, undefined, true);
        break;
      case "0":
        resetZoom(true);
        break;
    }
  };
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="gallery">
  <button
    type="button"
    class="nav-button left"
    aria-label="Previous image"
    onclick={() => move(false)}
  >
    <span>‹</span>
  </button>

  <div class="image-container">
    {#key currentIndex}
      <button
        type="button"
        class="image-trigger"
        aria-label="View and zoom image"
        onclick={openViewer}
        transition:fly={{
          x: 100 * rotationFactor,
          duration: 400,
          easing: cubicOut,
        }}
      >
        <img
          src={imageSources[currentIndex]}
          alt=""
          class="gallery-image"
          draggable="false"
        />
      </button>
    {/key}
  </div>

  <button
    type="button"
    class="nav-button right"
    aria-label="Next image"
    onclick={() => move()}
  >
    <span>›</span>
  </button>
</div>

{#if isViewerOpen}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="Image viewer"
    transition:fade={{ duration: 150 }}
  >
    <div class="lightbox-toolbar">
      <span class="counter">
        {currentIndex + 1} / {imageSources.length}
      </span>

      <div class="toolbar-actions">
        <button
          type="button"
          class="toolbar-btn"
          aria-label="Zoom out"
          disabled={scale <= MIN_SCALE}
          onclick={() => zoomAtPoint(scale - 0.5, undefined, undefined, true)}
        >
          −
        </button>

        <button
          type="button"
          class="toolbar-btn zoom-label"
          aria-label="Reset zoom"
          onclick={() => resetZoom(true)}
        >
          {Math.round(scale * 100)}%
        </button>

        <button
          type="button"
          class="toolbar-btn"
          aria-label="Zoom in"
          disabled={scale >= MAX_SCALE}
          onclick={() => zoomAtPoint(scale + 0.5, undefined, undefined, true)}
        >
          +
        </button>

        <button
          type="button"
          class="toolbar-btn close-btn"
          aria-label="Close viewer"
          onclick={closeViewer}
        >
          ×
        </button>
      </div>
    </div>

    {#if imageSources.length > 1}
      <button
        type="button"
        class="nav-button left"
        aria-label="Previous image"
        onclick={() => move(false)}
      >
        <span>‹</span>
      </button>
    {/if}

    <div
      bind:this={viewportEl}
      class="lightbox-viewport"
      class:is-zoomed={scale > 1}
      class:is-dragging={isDragging}
      onwheel={handleWheel}
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      onpointercancel={handlePointerUp}
    >
      {#key currentIndex}
        <img
          bind:this={imageEl}
          src={imageSources[currentIndex]}
          alt=""
          class="lightbox-image"
          class:smooth-zoom={isSmoothZoom}
          draggable="false"
          style:transform="translate({panX}px, {panY}px) scale({scale})"
          in:fly={{
            x: 100 * rotationFactor,
            duration: 400,
            easing: cubicOut,
          }}
        />
      {/key}
    </div>

    {#if imageSources.length > 1}
      <button
        type="button"
        class="nav-button right"
        aria-label="Next image"
        onclick={() => move()}
      >
        <span>›</span>
      </button>
    {/if}
  </div>
{/if}

<style>
  @import "tailwindcss";

  .gallery {
    @apply relative flex items-center w-full h-full overflow-hidden;
  }

  .image-container {
    @apply relative w-full h-full overflow-hidden;
  }

  .image-trigger {
    @apply absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-zoom-in;
  }

  .gallery-image {
    @apply w-full h-full object-contain select-none;
  }

  .nav-button {
    @apply absolute z-10 flex items-center justify-center
      w-10 h-10 rounded-full bg-black/50 text-white
      hover:bg-black/75 transition-colors cursor-pointer;
  }

  .nav-button span {
    @apply text-3xl leading-none;
  }

  .left {
    @apply left-3;
  }

  .right {
    @apply right-3;
  }

  .lightbox {
    @apply fixed inset-0 z-50 flex items-center justify-center bg-black/90 select-none;
  }

  .lightbox-toolbar {
    @apply absolute top-0 left-0 right-0 z-20 flex items-center justify-between
      px-4 py-3 text-white pointer-events-none;
  }

  .counter {
    @apply text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full pointer-events-auto;
  }

  .toolbar-actions {
    @apply flex items-center gap-1.5 bg-black/50 p-1 rounded-full pointer-events-auto;
  }

  .toolbar-btn {
    @apply flex items-center justify-center min-w-8 h-8 px-2 rounded-full
      text-white text-lg leading-none hover:bg-white/20
      disabled:opacity-40 disabled:pointer-events-none
      transition-colors cursor-pointer;
  }

  .zoom-label {
    @apply text-xs font-medium min-w-12;
  }

  .close-btn {
    @apply text-2xl ml-1;
  }

  .lightbox-viewport {
    @apply relative flex items-center justify-center w-full h-full overflow-hidden touch-none;
  }

  .lightbox-image {
    @apply max-w-full max-h-full object-contain select-none cursor-zoom-in;
    transform-origin: center center;
  }

  .lightbox-viewport.is-zoomed .lightbox-image {
    @apply cursor-grab;
  }

  .lightbox-viewport.is-dragging .lightbox-image {
    @apply cursor-grabbing;
  }

  .lightbox-image.smooth-zoom {
    transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }
</style>
