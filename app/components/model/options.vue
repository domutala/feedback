<script lang="ts" setup>
import type { Model } from "~~/server/database/schema";
import { useClipboard } from "@vueuse/core";
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{ model: Model }>();
const runtimeConfig = useRuntimeConfig();
const i18n = useI18n();
const toast = useToast();
const { copy } = useClipboard();

const options = computed(() => {
  const items: DropdownMenuItem[] = [
    {
      icon: "i-lucide-message-square-reply",
      label: i18n.t("model.table.options.view_rates"),
      to: Use.localePath({
        name: "admin-id",
        params: { id: props.model.id },
      }),
    },

    {
      icon: "i-lucide-link-2",
      label: i18n.t("model.table.options.copy_public_link"),
      class: "cursor-pointer",
      onSelect() {
        copy(`${runtimeConfig.public.baseUrl}/${props.model.clientKey}`);

        toast.add({
          title: i18n.t("words.copied"),
          color: "success",
          icon: "i-lucide-circle-check",
        });
      },
    },

    {
      type: "separator",
    },

    {
      label: "Supprimer",
      color: "error",
      icon: "i-lucide-trash-2",
    },
  ];

  return items;
});
</script>

<template>
  <UDropdownMenu :items="options">
    <UButton
      v-if="!$slots.activator"
      icon="i-lucide-ellipsis-vertical"
      color="neutral"
      variant="ghost"
      class="cursor-pointer"
      aria-label="Actions dropdown"
    />

    <slot name="activator" />
  </UDropdownMenu>
</template>
