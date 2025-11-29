<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps({
  base: {
    type: Object as PropType<Record<string, any>>,
    default: () => {},
  },
});

const emit = defineEmits<{ (e: "submit", value: Record<string, any>): void }>();

const { $i18n } = useNuxtApp();
const showPassword = ref(false);
const schema = v.object({
  avatar: v.undefinedable(
    v.pipe(
      v.file(),
      v.mimeType(
        ["image/jpeg", "image/png"],
        $i18n.t("register.one.avatar.errors.type")
      ),
      v.maxSize(5 * 1024 * 1024, $i18n.t("register.one.avatar.errors.size"))
    )
  ),
  email: v.pipe(
    v.string($i18n.t("errors.fieldRequired")),
    v.email($i18n.t("errors.invalidEmail"))
  ),
  firstName: v.pipe(
    v.string($i18n.t("errors.fieldRequired")),
    v.minLength(1, $i18n.t("errors.fieldRequired"))
  ),
  lastName: v.pipe(
    v.string($i18n.t("errors.fieldRequired")),
    v.minLength(1, $i18n.t("errors.fieldRequired"))
  ),
  password: v.pipe(
    v.string($i18n.t("errors.fieldRequired")),
    v.custom((input) => {
      return typeof input === "string"
        ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%.#*?&]{8,}$/.test(input)
        : false;
    }, $i18n.t("register.one.items.password.errors.type"))
  ),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<{
  avatar?: File;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}>({
  avatar: props.base?.avatar,
  email: props.base?.email,
  firstName: props.base?.firstName,
  lastName: props.base?.lastName,
  password: props.base?.password,
});

const nickName = computed(() => {
  if (!state.firstName && !state.lastName) return;

  const fullname = `${state.firstName} ${state.lastName}`;

  const parts = fullname.trim().split(/\s+/);

  // Si un seul mot, on retourne seulement son initiale
  if (parts.length === 1) {
    const p1 = parts[0] as string;
    return p1[0]?.toUpperCase();
  }

  // Sinon, on retourne l'initiale du premier et du dernier mot
  const p1 = parts[0] as string;
  const p2 = parts.at(-1) as string;

  const firstInitial = p1[0]?.toUpperCase();
  const lastInitial = p2[0]?.toUpperCase();

  return `${firstInitial}${lastInitial}`;
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit("submit", event.data);
}

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file);
}

function getName() {
  if (!state.email) return;

  const names = GetNameFromEmail(state.email);

  if (!state.firstName) state.firstName = names.firstName;
  if (!state.lastName) state.lastName = names.lastName;
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <h2 class="text-[24px] font-bold">
      {{ $t("register.one.title") }}
    </h2>

    <UFormField :label="$t('register.one.items.avatar.label')" name="avatar">
      <UFileUpload
        v-slot="{ open, removeFile }"
        v-model="state.avatar"
        accept="image/png, image/jpeg"
      >
        <div class="flex items-center gap-8">
          <UAvatar
            class="w-[72px] h-[72px] border-[3px] border-default"
            :src="state.avatar ? createObjectUrl(state.avatar) : undefined"
          >
            <div v-if="nickName" class="text-[24px] font-bold">
              {{ nickName }}
            </div>
            <UIcon
              v-else
              name="i-lucide-user-round"
              size="36"
              class="opacity-50"
            />
          </UAvatar>

          <div>
            <div class="flex gap-1.5">
              <UButton
                size="lg"
                variant="outline"
                color="neutral"
                class="cursor-pointer"
                icon="i-lucide-upload"
                @click="open()"
              >
                {{
                  $t(
                    state.avatar
                      ? "register.one.items.avatar.update"
                      : "register.one.items.avatar.add"
                  )
                }}
              </UButton>
              <UButton
                size="lg"
                variant="outline"
                color="neutral"
                class="cursor-pointer"
                :disabled="!state.avatar"
                @click="removeFile()"
              >
                {{ $t("register.one.items.avatar.remove") }}
              </UButton>
            </div>

            <div class="mt-0.5 opacity-70">
              {{ $t("register.one.items.avatar.info") }}
            </div>
          </div>
        </div>
      </UFileUpload>
    </UFormField>

    <UFormField :label="$t('register.one.items.email')" name="email">
      <UInput v-model="state.email" class="w-full" size="xl" @blur="getName" />
    </UFormField>

    <UFormField :label="$t('register.one.items.firstName')" name="firstName">
      <UInput v-model="state.firstName" class="w-full" size="xl" />
    </UFormField>

    <UFormField :label="$t('register.one.items.lastName')" name="lastName">
      <UInput v-model="state.lastName" class="w-full" size="xl" />
    </UFormField>

    <UFormField
      :label="$t('register.one.items.password.label')"
      name="password"
    >
      <UInput
        v-model="state.password"
        :type="showPassword ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
        class="w-full"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            aria-controls="password"
            @click="showPassword = !showPassword"
          />
        </template>
      </UInput>

      <WkPasswordIndicator v-model="state.password" class="mt-2" />
    </UFormField>

    <UButton type="submit" size="xl" class="cursor-pointer" block>
      {{ $t("register.one.submit") }}
    </UButton>
  </UForm>
</template>
