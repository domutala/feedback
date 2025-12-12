<script lang="ts" setup>
import type { Model } from "~~/server/database/schema";
import { useClipboard } from "@vueuse/core";
import type { DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";

const props = defineProps<{ collapsed?: boolean }>();

const page = ref(1);
const i18n = useI18n();

const {
  data: models,
  status,
  refresh,
} = await useFetch(`/api/admin/model`, {
  method: "get",
  query: { page },
  watch: [page],
});

const items = computed(() => {
  const items = models.value?.items.map((model) => {
    return {
      label: model.title || model.clientKey,
      to: Use.localePath({
        name: "admin-id",
        params: { id: model.id },
      }),
    };
  });

  // const items: NavigationMenuItem[] = [];

  return items;
});
</script>

<template>
  <UNavigationMenu :items="items" v-if="!collapsed" orientation="vertical" />
</template>
