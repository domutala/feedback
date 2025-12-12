<script lang="ts" setup>
import { splitText, animate, stagger } from "animejs";
const char = ref();

onMounted(() => {
  const { words } = splitText(char.value, { words: { wrap: "clip" } });

  animate(words, {
    y: [{ to: ["100%", "0%"] }, { to: "0", delay: 750, ease: "in(3)" }],
    duration: 700,
    ease: "out(3)",
    delay: stagger(100),
  });
});
</script>

<template>
  <header class="pb-16 px-6 border-b border-white/5 pt-40 min-h-screen">
    <div class="max-w-4xl mx-auto text-center">
      <h1
        ref="char"
        class="char text-5xl md:text-7xl font-medium tracking-tighter mb-6 leading-[1.1] text-highlighted"
      >
        La façon moderne de
        <br class="hidden md:block" />
        <span class="bg-clip-text bg-linear-to-b text-muted">
          collecter, analyser et afficher
        </span>
        <span class="bg-clip-text text-muted"> vos avis clients. </span>
      </h1>

      <p
        class="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10"
      >
        Automatisez la collecte d’avis, identifiez les insights qui comptent
        vraiment et mettez en valeur vos meilleures preuves sociales sur vos
        pages de vente.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <u-button size="xl" color="neutral" to="/create">
          <span class="p-2 px-4 flex items-center gap-2">
            Collecter mes premiers avis

            <u-icon name="i-lucide-arrow-right" size="24" />
          </span>
        </u-button>
      </div>
    </div>
  </header>
</template>
