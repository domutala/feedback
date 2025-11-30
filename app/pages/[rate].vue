<script lang="ts" setup>
import * as z from "zod";
import * as _ from "lodash";
import { additionalValidator, commentValidator } from "~/tools/modelValidation";

const { data: model, status } = await useFetch(
  `/api/rate/${Use.route.params.rate}`,
  {
    method: "get",
  }
);

const { $i18n } = useNuxtApp();

if (!model.value) {
  throw createError({
    statusCode: 404,
    statusMessage: $i18n.t("rate.errors.modelNotFound"),
    message: "",
    // message: $i18n.t("rate.errors.modelNotFound"),
  });
}

const value = ref<{ [key: string]: any }>({ rate: 2 });
const step = computed(() => (Use.route.query.step as string) || "rate");
const lastStep = ref("additional");
const nexter = ref<{ [step: string]: () => void }>({});

const success = ref(false);
const toast = useToast();
const submiting = ref(false);

onMounted(mounted);
function mounted() {
  if (!model.value) return;

  const vAdditional = additionalValidator(model.value.data, $i18n.t);
  const vComment = commentValidator(model.value.data, $i18n.t);
  lastStep.value = Object.keys(vAdditional).length
    ? "additional"
    : Object.keys(vComment).length
    ? "comment"
    : "rate";

  nexter.value.rate = () => {
    if (Object.keys(vComment).length) {
      Use.router.push({ query: { step: "comment" } });
    } else if (Object.keys(vAdditional).length) {
      Use.router.push({ query: { step: "additional" } });
    } else onSubmit();
  };

  nexter.value.comment = () => {
    if (Object.keys(vAdditional).length) {
      Use.router.push({ query: { step: "additional" } });
    } else onSubmit();
  };

  nexter.value.additional = () => {
    onSubmit();
  };
}

async function onSubmit() {
  submiting.value = true;

  try {
    const body = _.cloneDeep(value.value);
    body.rate++;

    await $fetch(`/api/rate/${Use.route.params.rate}`, {
      method: "post",
      body,
    });

    success.value = true;
  } catch (e: any) {
    const zodMessage = e.data?.data?.zod as string;
    if (zodMessage) {
      const issues = JSON.parse(zodMessage) as z.core.$ZodIssue[];
      for (const issue of issues) {
        toast.add({
          description: $t(issue.message),
          color: "error",
        });
      }
    }
  } finally {
    submiting.value = false;
  }
}
</script>

<template>
  <div
    v-if="status === 'pending'"
    class="w-screen h-screen flex items-center justify-center"
  >
    <u-icon name="i-line-md-loading-twotone-loop" size="42" />
  </div>
  <template v-else-if="model">
    <component
      :is="
        success
          ? 'ui-rate-success'
          : step === 'rate'
          ? 'ui-rate'
          : step === 'comment'
          ? 'ui-rate-comment'
          : 'ui-rate-additional'
      "
      v-model="value"
      class="min-h-screen max-w-lg w-full mx-auto flex flex-col items-center justify-center relative"
      :model="model"
      @submit="nexter[step]"
    >
      <template #header="props">
        <ui-rate-header v-bind="props" :loading="submiting" :step :last-step />
      </template>

      <template #submit="props">
        <ui-rate-submit v-bind="props" :loading="submiting" :step :last-step />
      </template>
    </component>
  </template>
</template>
