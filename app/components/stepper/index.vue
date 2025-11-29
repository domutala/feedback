<script lang="ts" setup>
defineProps({
  active: { type: Number, default: 0 },
  steps: {
    type: Array as PropType<{ title: string }[]>,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-center">
    <template v-for="(step, s) in steps" :key="s">
      <div class="relative">
        <div
          class="rounded-full w-6 h-6 flex items-center justify-center text-sm"
          :class="{ 'bg-primary': active >= s }"
        >
          {{ s + 1 }}
        </div>

        <div
          class="absolute text-xs mt-2 top-full right-[50%] translate-x-1/2 w-max hidden md:flex"
        >
          {{ step.title }}
        </div>
      </div>

      <div
        v-if="s !== steps.length - 1"
        class="w-full max-w-[216px] h-0.5 mx-3 bg-accented"
        :class="{ 'bg-primary': active > s }"
      ></div>
    </template>
  </div>
</template>
