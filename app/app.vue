<script lang="ts" setup>
const reactions = ["hate", "disappointed", "natural", "good", "excellent"];
const value = ref<number>(2);
const overReact = ref<number>();
</script>

<template>
  <NuxtLayout>
    <nuxt-page />
  </NuxtLayout>
</template>
