<script lang="ts" setup>
import * as z from "zod";
import type { RadioGroupItem } from "@nuxt/ui";
import type { FeedbackModel } from "~/tools/interfaces";

const { t: $t } = useI18n();
const itemKeys = ["name", "email", "phone", "address"];
const toast = useToast();
const runtime = useRuntimeConfig();

const model = ref<FeedbackModel>({
  name: true,
  name_required: true,

  email: true,
  email_required: false,

  phone: false,
  phone_required: false,

  address: false,
  address_required: false,

  comment: "notRequired",

  count: null,
});
const email = ref([""]);
const title = ref<string>();

const commentItems = ref<RadioGroupItem[]>([
  {
    label: $t("editor.comment.items.notRequired"),
    value: "notRequired",
    class: "cursor-pointer",
  },
  {
    label: $t("editor.comment.items.required"),
    value: "required",
    class: "cursor-pointer",
  },
  {
    label: $t("editor.comment.items.no"),
    value: "no",
    class: "cursor-pointer",
  },
]);

const countItems = ref<RadioGroupItem[]>([
  {
    label: $t("editor.count.items.one"),
    value: 1,
    class: "cursor-pointer",
  },
  {
    label: $t("editor.count.items.multiple"),
    value: null,
    class: "cursor-pointer",
  },
]);

const submiting = ref(false);
async function submit() {
  submiting.value = true;

  try {
    await $fetch("/api/create", {
      method: "post",
      body: { data: model.value, emails: email.value, title: title.value },
    });
    console.log("55555");
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
  <u-container class="py-36">
    <div class="max-w-xl mx-auto space-y-16">
      <div>
        <p class="text-4xl mb-5">
          {{ $t("editor.titleField.title") }}
        </p>

        <u-textarea
          v-model="title"
          class="w-full text-2xl"
          :placeholder="$t('editor.titleField.placeholder')"
          :ui="{ base: 'text-2xl' }"
        />
      </div>
      <div>
        <p class="text-4xl mb-5">
          {{ $t("editor.count.title") }}
        </p>

        <URadioGroup
          v-model="model.count"
          :items="countItems"
          color="neutral"
          variant="card"
        />
      </div>

      <div>
        <p class="text-4xl mb-5">
          {{ $t("editor.comment.title") }}
        </p>

        <URadioGroup
          v-model="model.comment"
          :items="commentItems"
          color="neutral"
          variant="card"
        />
      </div>

      <div>
        <p class="text-4xl mb-5">
          {{ $t("editor.addtionalInformations.title") }}
        </p>

        <div class="flex items-center gap-2 mb-2">
          <div class="mx-auto"></div>
          <div class="text-sm">
            {{ $t("editor.addtionalInformations.required") }}
          </div>
        </div>

        <div
          v-for="key in itemKeys"
          :key="key"
          class="border border-default p-3 rounded-xl flex items-center gap-2 mb-2"
        >
          <u-switch
            v-model="model[key as 'name']"
            :label="$t(`editor.addtionalInformations.items.${key}`)"
            class="cursor-pointer"
            color="neutral"
            :ui="{ base: 'cursor-pointer', label: 'cursor-pointer' }"
          >
          </u-switch>

          <div class="mx-auto"></div>

          <u-checkbox
            v-if="model[key as 'name']"
            v-model="model[`${key}_required` as 'name']"
            color="neutral"
          />
        </div>
      </div>

      <div>
        <p class="text-4xl mb-5">
          {{ $t("editor.user.title") }}
        </p>

        <UFormField name="name" required>
          <UInput class="w-full" size="xl" type="email" v-model="email[0]" />
        </UFormField>
      </div>

      <u-button
        size="xl"
        color="neutral"
        class="cursor-pointer"
        :disabled="!email"
        :loading="submiting"
        @click="submit"
      >
        {{ $t("editor.submit") }}
      </u-button>
    </div>
  </u-container>
</template>
