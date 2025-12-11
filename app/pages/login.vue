<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

const toast = useToast();
const initing = ref(true);
const submiting = ref(false);
const { $i18n } = useNuxtApp();

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    size: "xl",
    label: $i18n.t("login.items.email"),
    required: true,
  },
];

const schema = v.object({
  email: v.pipe(
    v.string($i18n.t("login.errors.fieldRequired")),
    v.email($i18n.t("login.errors.invalidEmail"))
  ),
});

type Schema = v.InferOutput<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  submiting.value = true;
  try {
    const res = await $fetch("/api/login", {
      method: "POST",
      body: { email: payload.data.email },
    });
    console.log(res);

    // await Store.auth.login(payload.data.email);
    // Use.router.push(Use.localePath({ name: "index" }));
    // sdfsd@sdfsdf.com
  } finally {
    submiting.value = false;
  }
}

onMounted(() => {
  if (Store.auth.auth) Use.router.replace({ name: "admin" });
  else initing.value = false;
});
</script>

<template>
  <div
    v-if="initing"
    class="w-screen h-screen flex items-center justify-center"
  >
    <u-icon name="i-eos-icons-three-dots-loading" size="64" />
  </div>

  <div v-else class="w-screen h-screen flex items-center justify-center">
    <UAuthForm
      :schema="schema"
      :title="$t('login.title')"
      :description="$t('login.description')"
      :fields="fields"
      :loading="submiting"
      class="w-[90%] max-w-md"
      @submit="onSubmit"
    >
    </UAuthForm>
  </div>
</template>
