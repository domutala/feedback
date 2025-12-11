<script lang="ts" setup>
defineProps<{ step: string; lastStep: string }>();
</script>

<template>
  <div
    class="sticky bottom-0 bg-default w-full p-3 pt-5 pb-10 flex justify-center items-center"
  >
    <u-button
      v-bind="$attrs"
      size="xl"
      :color="$colorMode.value === 'light' ? 'primary' : 'primary'"
      class="cursor-pointer"
    >
      {{ $t(step === lastStep ? "rate.submit" : "rate.next") }}
    </u-button>
  </div>
</template>
