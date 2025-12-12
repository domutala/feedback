<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <UHeader
    class="bg-transparent"
    :ui="{ container: 'max-w-full' }"
    :class="{ 'border-b-0': $route.path === '/' }"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <div>
          {{ appConfig.site.name }}
        </div>
      </div>
    </template>

    <template #right>
      <u-button
        :to="$localePath({ name: 'admin' })"
        color="neutral"
        variant="ghost"
      >
        Mes feedbacks
      </u-button>
      <u-button
        :to="$localePath({ name: 'create' })"
        icon="i-lucide-plus"
        color="neutral"
        >Créer</u-button
      >
    </template>
  </UHeader>
</template>
