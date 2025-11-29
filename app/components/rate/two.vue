<script lang="ts" setup>
import * as z from "zod";
import type { FeedbackModel } from "~/tools/interfaces";
import { stepTwoValidator } from "~/tools/modelValidation";

const props = defineProps<{ model: FeedbackModel }>();
const emit = defineEmits<{ (e: "submit"): void; (e: "prevent"): void }>();
const { $i18n } = useNuxtApp();

const schema = computed(() => {
  const obj = stepTwoValidator(props.model, $i18n.t);
  console.log(z.toJSONSchema(z.object(obj)));

  return z.object(obj);
});

type Schema = z.output<typeof schema.value>;
const state = defineModel<{ [key: string]: any }>({ default: {} });
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="() => emit('submit')">
    <div class="w-screen h-screen flex items-center justify-center relative">
      <div class="w-[90%] mx-auto max-w-md space-y-4">
        <UFormField
          v-if="model.name"
          label="Name"
          name="name"
          :required="model.name_required"
        >
          <UInput v-model="state.name" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" size="xl" class="w-full" />
        </UFormField>

        <UFormField
          v-if="model.phone"
          label="phone"
          name="phone"
          :required="model.phone_required"
        >
          <UInput v-model="state.phone" type="phone" size="xl" class="w-full" />
        </UFormField>

        <UFormField
          v-if="model.address"
          label="address"
          name="address"
          :required="model.address_required"
        >
          <UInput
            v-model="state.address"
            type="text"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <UFormField
          v-if="model.comment !== 'no'"
          label="comment"
          name="comment"
          :required="model.comment === 'required'"
        >
          <u-textarea
            v-model="state.comment"
            size="xl"
            class="w-full"
            :rows="6"
          />
        </UFormField>
      </div>

      <div class="absolute bottom-[50px] flex flex-col items-center gap-2">
        <u-button
          size="xl"
          class="cursor-pointer"
          color="neutral"
          variant="ghost"
          icon="i-lucide-move-left"
          @click="emit('prevent')"
        >
          {{ $t("rate.prevent") }}
        </u-button>

        <u-button
          type="submit"
          size="xl"
          class="cursor-pointer"
          :color="$colorMode.value === 'light' ? 'primary' : 'primary'"
        >
          {{ $t("rate.submit") }}
        </u-button>
      </div>
    </div>
  </UForm>
</template>
