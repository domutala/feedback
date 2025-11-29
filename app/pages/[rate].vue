<script lang="ts" setup>
import type { FeedbackModel } from "~/tools/interfaces";

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

const value = ref<{ [key: string]: any }>({ rate: 2 });
const step = ref(1);

const toast = useToast();
async function onSubmit() {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  // console.log(event.data);
}
</script>

<template>
  <ui-rate-one v-if="step === 1" :model v-model="value" @submit="step = 2" />
  <ui-rate-two
    v-else
    :model
    v-model="value"
    @submit="onSubmit"
    @prevent="step = 1"
  />
</template>
