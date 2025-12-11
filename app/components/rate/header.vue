<template>
  <div class="p-3 bg-default sticky top-0 w-full z-30">
    <u-button
      icon="i-lucide-chevron-left"
      color="neutral"
      variant="ghost"
      class="cursor-pointer rounded-full"
      @click="$router.back()"
    >
      {{ $t("rate.prevent") }}
    </u-button>
  </div>
</template>
