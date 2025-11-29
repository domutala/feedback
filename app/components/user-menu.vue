<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { getLangItems } from "~/tools/lang";
import { getThemeItems } from "~/tools/theme";

defineProps<{
  collapsed?: boolean;
}>();

const user = ref({
  name: `${Store.auth.auth?.user.firstName} ${Store.auth.auth?.user.lastName}`,
  avatar: {
    src: Store.auth.auth?.user.avatar,
    alt: `${Store.auth.auth?.user.firstName} ${Store.auth.auth?.user.lastName}`,
  },
});

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: "label",
      label: user.value.name,
      avatar: user.value.avatar,
    },
  ],
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
    },
    {
      label: "Billing",
      icon: "i-lucide-credit-card",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
    },
  ],
  [...getThemeItems(), getLangItems()],
  [
    {
      label: "GitHub repository",
      icon: "i-simple-icons-github",
      to: "https://github.com/domutala/wink-bnj",
      target: "_blank",
    },
    {
      label: "Log out",
      icon: "i-lucide-log-out",
      onSelect: (e) => {
        Store.auth.logout();
      },
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
    }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />

    <template #chip-leading="{ item }">
      <div class="inline-flex items-center justify-center shrink-0 size-5">
        <span
          class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2"
          :style="{
            '--chip-light': `var(--color-${(item as any).chip}-500)`,
            '--chip-dark': `var(--color-${(item as any).chip}-400)`
          }"
        />
      </div>
    </template>
  </UDropdownMenu>
</template>
