<script setup lang="ts"></script>

<template>
  <UHeader class="bg-transparent" :ui="{ container: 'max-w-full' }">
    <template #title>
      <div class="flex items-center gap-2">
        <div>Sya</div>
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
      <u-button :to="$localePath({ name: 'create' })" icon="i-lucide-plus"
        >Créer</u-button
      >
    </template>
  </UHeader>
</template>
