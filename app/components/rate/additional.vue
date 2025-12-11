<script lang="ts" setup>
import * as z from "zod";
import { additionalValidator } from "~/tools/modelValidation";

const props = defineProps<{ model: typeof tables.model.$inferSelect }>();
const emit = defineEmits<{ (e: "submit"): void; (e: "prevent"): void }>();
const { $i18n } = useNuxtApp();

const schema = computed(() => {
  const obj = additionalValidator(props.model.data, $i18n.t);
  return z.object(obj);
});

type Schema = z.output<typeof schema.value>;
const state = defineModel<{ [key: string]: any }>({ default: {} });
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="() => emit('submit')">
    <slot name="header" />

    <div class="my-auto py-10 w-[90%] mx-auto max-w-md space-y-4">
      <UFormField
        v-if="model.data.name"
        :label="$t('rate.labels.name')"
        name="name"
        :required="model.data.name_required"
      >
        <UInput v-model="state.name" size="xl" class="w-full" />
      </UFormField>

      <UFormField :label="$t('rate.labels.email')" name="email">
        <UInput v-model="state.email" size="xl" class="w-full" />
      </UFormField>

      <UFormField
        v-if="model.data.phone"
        :label="$t('rate.labels.phone')"
        name="phone"
        :required="model.data.phone_required"
      >
        <UInput v-model="state.phone" type="phone" size="xl" class="w-full" />
      </UFormField>

      <UFormField
        v-if="model.data.address"
        :label="$t('rate.labels.address')"
        name="address"
        :required="model.data.address_required"
      >
        <UInput v-model="state.address" type="text" size="xl" class="w-full" />
      </UFormField>
    </div>

    <slot name="submit" type="submit" />
  </UForm>
</template>
