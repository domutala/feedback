import type { DropdownMenuItem } from "@nuxt/ui";

export const flags = {
  fr: "i-flag-bl-4x3",
  en: "i-flag-sh-4x3",
  es: "i-flag-es-4x3",
  ar: "i-flag-sa-1x1",
};

export function getLangItems() {
  const { locales, locale, setLocale, t: $t } = useI18n();

  const current = computed(() => {
    return locales.value.find((l) => l.code === locale.value);
  });

  const items: DropdownMenuItem = {
    label: current.value?.name,
    icon: "i-lucide-languages",
    children: [
      ...locales.value.map((l) => ({
        label: l.name,
        icon: flags[l.code],
        checked: locale.value === l.code,
        onSelect(e: Event) {
          e.preventDefault();
          setLocale(l.code);
        },
      })),
    ],
  };

  return items;
}
