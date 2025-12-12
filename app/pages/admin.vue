<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { getLangItems } from "~/tools/lang";
import { getThemeItems } from "~/tools/theme";

definePageMeta({ layout: "admin" });
const openSidebar = ref(false);

const items: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-lucide-house",
      active: true,
    },
    {
      label: "Inbox",
      icon: "i-lucide-inbox",
      badge: "4",
    },
    {
      label: "Contacts",
      icon: "i-lucide-users",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      defaultOpen: true,
      children: [
        {
          label: "General",
        },
        {
          label: "Members",
        },
        {
          label: "Notifications",
        },
      ],
    },
  ],
  [
    {
      label: "Feedback",
      icon: "i-lucide-message-circle",
      to: "https://github.com/nuxt-ui-templates/dashboard",
      target: "_blank",
    },
    {
      label: "Help & Support",
      icon: "i-lucide-info",
      to: "https://github.com/nuxt/ui",
      target: "_blank",
    },
  ],
];
</script>

<template>
  <u-app>
    <UDashboardGroup>
      <div
        class="lg:hidden absolute left-3 flex items-center h-(--ui-header-height) pointer-events-none"
      >
        <u-button
          color="neutral"
          variant="ghost"
          size="xl"
          icon="i-tabler-menu"
          class="pointer-events-auto"
          @click="openSidebar = true"
        />
      </div>
      <UDashboardSidebar
        collapsible
        v-model:open="openSidebar"
        :default-size="18"
        :min-size="18"
        :ui="{ footer: 'border-t border-default' }"
      >
        <template #header="{ collapsed }">
          <UiLogo v-if="!collapsed" class="size-10 mr-auto" />

          <UDashboardSidebarCollapse />
        </template>

        <template #default="{ collapsed }">
          <UButton
            :label="collapsed ? undefined : 'Search...'"
            icon="i-lucide-search"
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
          >
            <template v-if="!collapsed" #trailing>
              <div class="flex items-center gap-0.5 ms-auto">
                <UKbd value="meta" variant="subtle" />
                <UKbd value="K" variant="subtle" />
              </div>
            </template>
          </UButton>

          <!-- <UNavigationMenu
            :collapsed="collapsed"
            :items="items[0]"
            orientation="vertical"
          /> -->

          <UiModelSidebarContent :collapsed />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="items[1]"
            orientation="vertical"
            class="mt-auto"
          />
        </template>

        <template #footer="{ collapsed }">
          <UDropdownMenu
            :items="[
              [...getThemeItems(), getLangItems()],
              [
                {
                  label: 'Logout',
                  icon: 'i-lucide-log-out',
                  class: 'cursor-pointer',
                  color: 'error',
                  loading: Store.auth.logouting,
                  onSelect: (e) => {
                    e.preventDefault();
                    Store.auth.logout();
                  },
                },
              ],
            ]"
            :content="{ align: 'start', collisionPadding: 12 }"
          >
            <UButton
              :avatar="{
                src: 'https://github.com/benjamincanac.png',
              }"
              :label="collapsed ? undefined : Store.auth.auth?.user.email"
              color="neutral"
              variant="ghost"
              class="w-full"
              :block="collapsed"
            />
          </UDropdownMenu>
        </template>
      </UDashboardSidebar>

      <nuxt-page />
    </UDashboardGroup>
  </u-app>
</template>
