<script setup lang="ts">
const { $i18n } = useNuxtApp();
const toast = useToast();

const step = ref(0);
const data = ref<Record<string, any>>({});
const submiting = ref(false);

async function submit() {
  submiting.value = true;

  try {
    const formData = new FormData();

    for (const key of Object.keys(data.value)) {
      const value = data.value[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    await $fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    toast.add({
      title: $i18n.t("register.success.title"),
      description: $i18n.t("register.success.description"),
      icon: "i-lucide-user-round-check",
      color: "success",
    });

    Use.router.replace(Use.localePath({ name: "index" }));
  } catch (error: any) {
    let message = "register.errors.global";
    console.log(error.data);

    if (error.data?.statusMessage) {
      message = error.data.statusMessage;
    }

    toast.add({
      description: $i18n.t(message),
      icon: "i-lucide-bug",
      color: "error",
    });
  } finally {
    submiting.value = false;
  }
}
</script>

<template>
  <UDashboardGroup>
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #leading>
            <div class="flex lg:hidden">
              <wk-logo class="h-6" />
            </div>
          </template>

          <template #default>
            <wk-logo class="h-10" />
          </template>

          <template #right>
            <ULink
              :to="$localePath({ name: 'auth-login' })"
              class="text-primary font-medium"
            >
              {{ $t("register.login.btn") }}
            </ULink>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <UContainer class="my-">
          <UPageCard class="col-span-12" variant="subtle">
            <WkStepper
              class="my-5"
              :active="step"
              :steps="[
                { title: $t('register.one.title') },
                { title: $t('register.two.title') },
                { title: $t('register.three.title') },
              ]"
            />

            <UPageGrid class="lg:grid-cols-2">
              <UPageCard
                class="col-span-3 md:col-span-2 lg:col-span-1"
                variant="ghost"
                :ui="{ container: 'gap-y-0' }"
              >
                <div v-if="step > 0">
                  <UButton
                    size="sm"
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide-chevron-left"
                    class="cursor-pointer px-0"
                    @click="step--"
                  >
                    {{ $t("register.goback") }}
                  </UButton>
                </div>

                <WkRegisterOne
                  v-if="step === 0"
                  :base="data"
                  @submit="
                    (v) => {
                      data = { ...data, ...v };
                      step = 1;
                    }
                  "
                />
                <WkRegisterTwo
                  v-else
                  :base="data"
                  @back="step = 0"
                  @submit="
                    (v) => {
                      data = { ...data, ...v };
                      submit();
                    }
                  "
                />
              </UPageCard>
            </UPageGrid>
          </UPageCard>
        </UContainer>

        <div
          v-if="submiting"
          class="fixed inset-0 bg-default/50 flex items-center justify-center"
        >
          <UProgress class="w-[120px]" />
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
