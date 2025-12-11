<script lang="ts" setup>
import type { Model } from "~~/server/database/schema";

const props = defineProps<{ model: Model }>();

const { data: count, status } = await useFetch(
  `/api/admin/${props.model.id}/feedback/count`,
  { method: "get" },
);
</script>

<template>
  <template v-if="status === 'pending'">
    <USkeleton v-if="!$slots.pending" class="h-4 w-[50px]" />
    <slot name="pending" />
  </template>
  <template v-if="count">
    <span v-if="!$slots.default">{{ count.count }}</span>
    <slot :count />
  </template>
</template>
