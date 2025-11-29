<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps({
  base: {
    type: Object as PropType<Record<string, any>>,
    default: () => {},
  },
});

const emit = defineEmits<{
  (e: "back"): void;
  (e: "submit", value: Record<string, any>): void;
}>();

const { $i18n } = useNuxtApp();

const schema = v.object({
  logo: v.undefinedable(
    v.pipe(
      v.file(),
      v.mimeType(
        ["image/jpeg", "image/png"],
        $i18n.t("register.two.logo.errors.type")
      )
    )
  ),
  name: v.pipe(v.string($i18n.t("errors.fieldRequired"))),
  description: v.undefinedable(v.string()),
  website: v.undefinedable(
    v.pipe(
      v.string(),
      v.custom((input) => {
        return typeof input === "string"
          ? /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/i.test(input)
          : false;
      }, $i18n.t("register.two.items.website.errors.type"))
    )
  ),
  address: v.undefinedable(
    v.pipe(v.string(), v.minLength(1, $i18n.t("errors.fieldRequired")))
  ),
  sector: v.undefinedable(v.pipe(v.string())),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<{
  logo?: File;
  name?: string;
  description?: string;
  website?: string;
  address?: string;
  sector?: string;
}>({
  logo: props.base?.logo,
  name: props.base?.name,
  description: props.base?.description,
  website: props.base?.website,
  address: props.base?.addess,
  sector: props.base?.sector,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit("submit", event.data);
}

const sectors = [
  "agriculture",
  "food_industry",
  "construction",
  "manufacturing",
  "energy",
  "it_technology",
  "telecommunications",
  "finance_insurance",
  "real_estate",
  "wholesale_retail",
  "transport_logistics",
  "hospitality_tourism",
  "healthcare",
  "education",
  "public_administration",
  "research_development",
  "arts_entertainment",
  "environment",
  "non_profit",
  "consulting_services",
];

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file);
}

onMounted(mounted);
function mounted() {
  if (!state.name) state.name = GetCompanyNameFromEmail(props.base.email);
  if (!state.website)
    state.website = GetCompanyWebsiteFromEmail(props.base.email);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <h2 class="text-[24px] font-bold">
      {{ $t("register.two.title") }}
    </h2>

    <UFormField :label="$t('register.two.items.logo.label')" name="logo">
      <UFileUpload
        v-slot="{ open, removeFile }"
        v-model="state.logo"
        accept="image/png, image/jpeg"
      >
        <div class="flex items-center gap-8">
          <UAvatar
            class="w-[72px] h-[72px] border-[3px] border-default"
            :src="state.logo ? createObjectUrl(state.logo) : undefined"
          >
            <div v-if="state.name" class="text-[24px] font-bold">
              {{ state.name[0]?.toUpperCase() }}
            </div>
            <UIcon
              v-else
              name="i-lucide-building-2"
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
                    state.logo
                      ? "register.two.items.logo.update"
                      : "register.two.items.logo.add"
                  )
                }}
              </UButton>
              <UButton
                size="lg"
                variant="outline"
                color="neutral"
                class="cursor-pointer"
                :disabled="!state.logo"
                @click="removeFile()"
              >
                {{ $t("register.two.items.logo.remove") }}
              </UButton>
            </div>

            <div class="mt-0.5 opacity-70">
              {{ $t("register.two.items.logo.info") }}
            </div>
          </div>
        </div>
      </UFileUpload>
    </UFormField>

    <UFormField
      :label="$t('register.two.items.name.label')"
      name="name"
      required
    >
      <UInput
        v-model="state.name"
        class="w-full"
        size="xl"
        :placeholder="$t('register.two.items.name.placeholder')"
      />
    </UFormField>

    <UFormField
      :label="$t('register.two.items.description.label')"
      name="description"
    >
      <UTextarea v-model="state.description" class="w-full" :rows="12">
        <template #default>
          <!-- <div class="absolute inset-0 p-3 pointer-events-none opacity-50">
            Décrivez votre entreprise brièvement : <br />
            * Histoire et chiffres clés<br />
            * Produits ou services commercialisés<br />
            * Culture et valeurs
          </div> -->
          <div
            class="absolute inset-0 p-3 pointer-events-none opacity-50"
            v-html="
              $t('register.two.items.description.placeholder').replaceAll(
                '\n',
                '<br />'
              )
            "
          ></div>
        </template>
      </UTextarea>
    </UFormField>

    <UFormField :label="$t('register.two.items.website.label')" name="website">
      <UFieldGroup class="border border-default rounded w-full">
        <p class="text-sm text-muted flex items-center px-3">https://</p>
        <UInput
          v-model="state.website"
          size="xl"
          class="w-full"
          :placeholder="$t('register.two.items.website.placeholder')"
        >
        </UInput>
      </UFieldGroup>
    </UFormField>

    <UFormField :label="$t('register.two.items.address.label')" name="address">
      <UInput
        v-model="state.address"
        class="w-full"
        size="xl"
        :placeholder="$t('register.two.items.address.placeholder')"
      />
    </UFormField>

    <UFormField :label="$t('register.two.items.sector.label')" name="sector">
      <USelect
        v-model="state.sector"
        class="w-full"
        size="xl"
        arrow
        :items="sectors.map((s) => ({ label: $t(`sectors.${s}`), value: s }))"
        :placeholder="$t('register.two.items.sector.placeholder')"
      />
    </UFormField>

    <div class="flex gap-5">
      <UButton
        size="xl"
        class="cursor-pointer"
        color="neutral"
        variant="ghost"
        icon="i-lucide-arrow-left"
        @click="emit('back')"
      >
        {{ $t("register.goback") }}
      </UButton>
      <UButton type="submit" size="xl" class="cursor-pointer" block>
        {{ $t("register.two.submit") }}
      </UButton>
    </div>
  </UForm>
</template>
