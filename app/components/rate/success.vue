<script lang="ts" setup>
const props = defineProps<{ model: typeof tables.model.$inferSelect }>();
</script>

<template>
  <div>
    <div class="text-center my-auto py-10 w-[90%] mx-auto max-w-md space-y-4">
      <p class="text-xl mb-5 text-center">
        {{ $t("rate.success.message") }}
      </p>

      <u-icon
        name="i-material-symbols-check-circle-rounded"
        size="36"
        class="text-success"
      />
    </div>
  </div>
</template>
