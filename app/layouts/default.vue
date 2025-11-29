<script setup>
import { getLangItems } from "~/tools/lang";
import { getThemeItems } from "~/tools/theme";

// useHead({
//   titleTemplate: (title) => {
//     const e = [];
//     const { $i18n } = useNuxtApp();

//     if ($i18n.te("site.name")) e.push($i18n.t("site.name"));
//     else e.push("TARCIO");

//     if ($i18n.te("site.description")) e.push($i18n.t("site.description"));

//     if (title) e.unshift(title);

//     return e.join(" · ");
//   },
// });

const route = useRoute();
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ route.meta.title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>

      <slot name="header" />
    </Head>

    <Body>
      <UApp>
        <!-- <wk-header /> -->
        <UMain>
          <slot />
        </UMain>

        <div v-if="!Store.auth.auth" class="fixed top-[30px] right-5 z-50">
          <UDropdownMenu
            :items="[
              [...getThemeItems(), getLangItems()],
              [
                {
                  label: 'GitHub repository',
                  icon: 'i-simple-icons-github',
                  to: 'https://github.com/domutala/wink-bnj',
                  target: '_blank',
                },
              ],
            ]"
            :content="{ align: 'start', collisionPadding: 12 }"
          >
            <UButton
              icon="i-lucide-swatch-book"
              color="primary"
              variant="soft"
              size="xl"
              square
              aria-label="Color picker"
              class="cursor-pointer"
            />

            <template #chip-leading="{ item }">
              <div
                class="inline-flex items-center justify-center shrink-0 size-5"
              >
                <span
                  class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2"
                  :style="{
                    '--chip-light': `var(--color-${item.chip}-500)`,
                    '--chip-dark': `var(--color-${item.chip}-400)`,
                  }"
                />
              </div>
            </template>
          </UDropdownMenu>
        </div>
      </UApp>
    </Body>
  </Html>
</template>
