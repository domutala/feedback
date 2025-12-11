<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const appConfig = useAppConfig();
</script>

<template>
  <USeparator class="h-px" />

  <UFooter>
    <template #left>
      <p class="text-muted text-sm">© {{ new Date().getFullYear() }}</p>
    </template>

    <template #right>
      <UColorModeSelect class="ml-3" />
      <!-- <u-button
        v-for="(social, s) in appConfig.socials"
        :key="s"
        :href="social"
        :aria-label="social"
        :icon="`i-simple-icons-${s.split('.')[1]}`"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="md"
      >
      </u-button> -->
    </template>
  </UFooter>
</template>
