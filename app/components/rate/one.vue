<script lang="ts" setup>
const reactions = ["hate", "disappointed", "natural", "good", "excellent"];
const value = defineModel<{ [key: string]: any }>({ default: {} });
const overReact = ref<number>();
const emit = defineEmits<{ (e: "submit"): void }>();
</script>

<template>
  <div
    class="w-screen h-screen flex items-center justify-center relative"
    :class="[reactions[value.rate]]"
  >
    <div class="absolute top-[30px] text- w-full text-2xl">
      <u-container>
        <div class="max-w-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
      </u-container>
    </div>

    <div>
      <div class="flex items-center gap-2 justify-center">
        <div
          v-for="(reaction, r) in reactions"
          :key="r"
          class="w-[]"
          @mouseenter="overReact = r"
          @mouseleave="overReact = undefined"
          @click="value.rate = r"
        >
          <div class="size-[54px] sm:size-16 relative cursor-pointer mx-auto">
            <img
              v-if="overReact === r"
              :key="`reaction-animation-${r}`"
              :src="`/images/reactions/${reaction}.gif`"
              class="absolute w-full"
            />
            <img
              v-else-if="value.rate === r"
              :key="`reaction-active-${r}`"
              :src="`/images/reactions/${reaction}_active.png`"
              class="absolute w-full"
            />
            <img
              v-else
              :key="`reaction-inactive-${r}`"
              :src="`/images/reactions/${reaction}_inactive.png`"
              class="absolute w-full"
            />
          </div>
          <!-- <div class="text-center text-xs mt-3">
            {{ reaction }}
          </div> -->
        </div>
      </div>

      <div v-if="value.rate !== undefined" class="mt-5 w-xs">
        <!-- <div class="text-center text-2xl">
            {{ $t(`reactions.${value}.title`) }}
          </div> -->

        <p class="mt- text-center">
          {{ $t(`reactions.${value.rate}.description`) }}
        </p>
      </div>
    </div>

    <div class="absolute bottom-[50px]">
      <u-button
        size="xl"
        :color="$colorMode.value === 'light' ? 'primary' : 'primary'"
        class="cursor-pointer"
        @click="emit('submit')"
      >
        {{ $t("rate.next") }}
      </u-button>
    </div>
  </div>
</template>
