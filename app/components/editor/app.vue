<script lang="ts" setup>
import type { FeedbackModel } from "~/tools/interfaces";

const { locales, locale, setLocale, t: $t } = useI18n();

const value = ref<FeedbackModel>({
  name: true,
  name_required: true,
  email: true,
  email_required: true,

  phone: false,
  phone_required: false,

  address: false,
  address_required: false,

  comment: true,
  comment_required: false,

  language: "auto",
});
</script>

<template>
  <NuxtLayout>
    <u-container class="py-36">
      <div class="w-lg mx-auto">
        <ui-editor-two v-model="value" />

        <ui-editor-three class="mt-16" v-model="value" />
      </div>
    </u-container>
  </NuxtLayout>
</template>
