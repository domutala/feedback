// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // extends: ["docus"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "dayjs-nuxt",
  ],

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    databaseUrl: "",
    jwtPrivateKey: "",
    resendApiKey: "",
    resendDomain: "",

    public: {
      baseUrl: "",
    },
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
    strategy: "prefix_and_default",

    locales: [
      { code: "en", name: "English", file: "en.json", dir: "ltr" },
      { code: "fr", name: "Français", file: "fr.json", dir: "ltr" },
      { code: "ar", name: "العربية", file: "ar.json", dir: "rtl" },
      { code: "es", name: "Español", file: "es.json", dir: "ltr" },
    ],

    experimental: {
      localeDetector: "localeDetector.ts",
    },
  },
});
