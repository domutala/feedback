<script lang="ts" setup>
import type { FeedbackModel } from "~/interfaces";
import { flags } from "~/tools/lang";

const { locales } = useI18n();
const value = defineModel<FeedbackModel>({ default: {} });
const icon = computed(() => flags[value.value.language as "fr"]);
</script>

<template>
  <div>
    <p class="text-4xl mb-5">
      {{ $t("editor.three.title") }}
    </p>

    <USelect
      v-model="value.language"
      :items="[
        { label: 'Automatique', value: 'auto' },
        ...locales.map((l) => ({
          label: l.name,
          icon: flags[l.code],
          value: l.code,
        })),
      ]"
      :icon
      class="w-full"
      size="xl"
      color="neutral"
    />
  </div>
</template>
