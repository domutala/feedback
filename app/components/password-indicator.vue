<script setup lang="ts">
const show = ref(false);
const password = defineModel({ default: "" });

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: "Minimum 8 caractères" },
    { regex: /\d/, text: "Au moins un chiffre" },
    { regex: /[a-z]/, text: "Au moins une lettre minuscule" },
    { regex: /[A-Z]/, text: "Au moins une lettre majuscule" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

const strength = computed(() => checkStrength(password.value));
const score = computed(() => strength.value.filter((req) => req.met).length);

const color = computed(() => {
  if (score.value === 0) return "neutral";
  if (score.value <= 1) return "error";
  if (score.value <= 2) return "warning";
  if (score.value === 3) return "warning";
  return "success";
});

const text = computed(() => {
  if (score.value === 0) return "Enter a password";
  if (score.value <= 2) return "Weak password";
  if (score.value === 3) return "Medium password";
  return "Strong password";
});
</script>

<template>
  <div class="space-y-2">
    <UProgress
      :color="color"
      :indicator="text"
      :model-value="score"
      :max="4"
      size="sm"
    />

    <ul class="space-y-1" aria-label="Password requirements">
      <li
        v-for="(req, index) in strength"
        :key="index"
        class="flex items-center gap-0.5"
        :class="req.met ? 'text-success' : 'text-muted'"
      >
        <UIcon
          :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
          class="size-4 shrink-0"
        />

        <span class="text-xs font-light">
          {{ req.text }}
          <span class="sr-only">
            {{ req.met ? " - Requirement met" : " - Requirement not met" }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>
