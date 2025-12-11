<script lang="ts" setup>
import type { FeedbackModel } from "~/interfaces";

const itemKeys = ["name", "email", "phone", "address", "comment"];
const items = defineModel<FeedbackModel>({ default: {} });
</script>

<template>
  <p class="text-4xl">
    {{ $t("editor.two.title") }}
  </p>

  <div class="flex items-center gap-2 mb-2 mt-10">
    <div class="mx-auto"></div>
    <div class="text-sm">
      {{ $t("editor.two.required") }}
    </div>
  </div>

  <div
    v-for="key in itemKeys"
    :key="key"
    class="border border-default p-3 rounded-xl flex items-center gap-2 mb-2"
  >
    <u-switch
      v-model="items[key as 'name']"
      :label="$t(`editor.two.items.${key}`)"
      class="cursor-pointer"
      color="neutral"
      :ui="{ base: 'cursor-pointer', label: 'cursor-pointer' }"
    >
    </u-switch>

    <div class="mx-auto"></div>

    <u-checkbox
      v-if="items[key  as 'name']"
      v-model="items[`${key}_required`  as 'name']"
      color="neutral"
    />
  </div>
</template>
