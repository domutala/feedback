// Detect based on query, cookie, header
export default defineI18nLocaleDetector((event, config) => {
  const cookie = tryCookieLocale(event, { lang: "", name: "i18n_locale" });
  const header = tryHeaderLocale(event, { lang: "" });
  const query = tryQueryLocale(event, { lang: "" });

  const locale =
    (cookie?.toString() || header?.toString() || query?.toString())?.split(
      "-",
    )[0] || config.defaultLocale;

  return locale;
});
