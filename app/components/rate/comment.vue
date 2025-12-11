<script lang="ts" setup>
import * as z from "zod";
import { commentValidator } from "~/tools/modelValidation";

const props = defineProps<{ model: typeof tables.model.$inferSelect }>();
const emit = defineEmits<{ (e: "submit"): void; (e: "prevent"): void }>();
const { $i18n } = useNuxtApp();

const schema = computed(() => {
  const obj = commentValidator(props.model.data, $i18n.t);
  return z.object(obj);
});

type Schema = z.output<typeof schema.value>;
const state = defineModel<{ [key: string]: any }>({ default: {} });
const form = ref<any>();
</script>

<template>
  <u-form
    ref="form"
    :schema="schema"
    :state="state"
    @submit="() => emit('submit')"
  >
    <slot name="header" />

    <div class="my-auto py-10 w-[90%] mx-auto max-w-md space-y-4">
      <UFormField
        v-if="model.data.comment !== 'no'"
        :label="$t('rate.labels.comment')"
        name="comment"
        :required="model.data.comment === 'required'"
      >
        <u-textarea
          v-model="state.comment"
          size="xl"
          class="w-full"
          :rows="6"
        />
      </UFormField>
    </div>

    <slot name="submit" type="submit" />
  </u-form>
</template>
