<script lang="ts" setup>
const reactions = ["hate", "disappointed", "natural", "good", "excellent"];
const value = ref<number>(2);
const overReact = ref<number>();
</script>

<template>
  <NuxtLoadingIndicator color="var(--ui-primary)" :height="5" />

  <NuxtLayout>
    <nuxt-page />
  </NuxtLayout>
</template>
