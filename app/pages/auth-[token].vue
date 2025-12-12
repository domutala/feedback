<script lang="ts" setup>
const loading = ref(false);
const $i18n = useI18n();

onMounted(async () => {
  try {
    await Store.auth.getAuth(Use.route.params.token as string);
    Use.router.replace(Use.localePath({ name: "admin" }));
  } catch (e: any) {
    throw createError({
      statusCode: 503,
      statusMessage: $i18n.t("auth.errors.all"),
      fatal: true,
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <u-icon name="i-eos-icons-three-dots-loading" size="64" />
  </div>
</template>
