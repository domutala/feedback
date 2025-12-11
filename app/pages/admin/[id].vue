<script lang="ts" setup>
import type { Model } from "~~/server/database/schema";

const { data: model, status } = await useFetch<Model>(
  `/api/admin/${Use.route.params.id}`,
  { method: "get" }
);

const { $i18n } = useNuxtApp();

if (!model.value) {
  throw createError({
    statusCode: 404,
    statusMessage: $i18n.t("admin.model.errors.notFound"),
    message: "",
  });
}
</script>

<template>
  <div
    v-if="status === 'pending'"
    class="w-screen h-screen flex items-center justify-center"
  >
    <u-icon name="i-eos-icons-three-dots-loading" size="64" />
  </div>
  <nuxt-page v-else-if="model" :model />
</template>
