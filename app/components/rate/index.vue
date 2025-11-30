<script lang="ts" setup>
import type { FeedbackModel } from "~/tools/interfaces";

const props = defineProps<{ model: typeof tables.model.$inferSelect }>();
const reactions = ["hate", "disappointed", "natural", "good", "excellent"];
const value = defineModel<{ [key: string]: any }>({ default: {} });
const overReact = ref<number>();
const emit = defineEmits<{ (e: "submit"): void }>();
</script>

<template>
  <!-- class="w-screen h-screen flex items-center justify-center relative" -->
  <div>
    <div v-if="model.title" class="text- w-full text-2xl text-center mt-10">
      {{ model.title }}
    </div>

    <div
      :class="[reactions[value.rate]]"
      class="flex items-center flex-col justify-center my-auto"
    >
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
    </div>

    <slot name="submit" :onClick="() => emit('submit')" />
  </div>
</template>
