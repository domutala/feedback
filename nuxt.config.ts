// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    databaseUrl: "",
    passwordPepper: "",

    cloudflareAccountId: "",
    cloudflareBucketName: "",
    cloudflareSecretAccessKey: "",
    cloudflareAccessKeyId: "",
    cloudflareEndpoint: "",

    public: {},
  },

  components: [{ path: "~/components", global: true, prefix: "ui" }],
  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  icon: {
    customCollections: [
      {
        prefix: "wink",
        dir: "./app/assets/icons",
      },
    ],
  },

  i18n: {
    defaultLocale: "fr",
    // customRoutes: 'page',
    strategy: "no_prefix",

    locales: [
      { code: "en", name: "English", file: "en.json", dir: "ltr" },
      { code: "fr", name: "Français", file: "fr.json", dir: "ltr" },
      { code: "ar", name: "العربية", file: "ar.json", dir: "rtl" },
      { code: "es", name: "Español", file: "es.json", dir: "ltr" },
    ],
  },
});
