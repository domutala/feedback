<script lang="ts" setup>
import { en, fr } from "@nuxt/ui/locale";
const { locale, setLocale } = useI18n();

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const appConfig = useAppConfig();
const title = appConfig.site.name;
const description = appConfig.site.description;

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
});

onMounted(() => {
  // useCookieConsent().init();
});
</script>

<template>
  <NuxtLoadingIndicator color="var(--ui-primary)" :height="5" />

  <NuxtLayout>
    <nuxt-page />
  </NuxtLayout>
</template>
