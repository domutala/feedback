<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Model } from "~~/server/database/schema";
import type { Column, Row } from "@tanstack/vue-table";
import { useClipboard } from "@vueuse/core";

const sortBy = ref("createdAt");
const sortOrder = ref("desc");
const page = ref(1);

const {
  data: models,
  status,
  refresh,
} = await useFetch(`/api/admin/model`, {
  method: "get",
  query: { sortBy, sortOrder, page },
  watch: [sortBy, sortOrder, page],
});

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const NuxtLink = resolveComponent("NuxtLink");

const i18n = useI18n();
const dayjs = useDayjs();
const toast = useToast();
const { copy } = useClipboard();

const columns: TableColumn<Model>[] = [
  {
    accessorKey: "clientKey",
    id: "clientKey",

    header: ({ column }) => sortButton(column),
    // header: "#",
    cell: ({ row }) => {
      const value = row.getValue("clientKey") as string;
      const chunks: string[] = [];

      for (let i = 0; i < value.length; i += 3) {
        chunks.push(value.slice(i, i + 3));
      }

      return h("div", { class: "flex items-center gap-3" }, [
        h(
          NuxtLink,
          {
            class: "text-primary",
            to: Use.localePath({
              name: "admin-id",
              params: { id: row.original.id },
            }),
          },
          chunks.join(" "),
        ),

        h(UButton, {
          color: "neutral",
          variant: "ghost",
          icon: "i-lucide-copy",
          class: "cursor-pointer",
          size: "sm",
          onClick: () => {
            copy(row.original.clientKey);

            toast.add({
              title: i18n.t("words.copied"),
              color: "success",
              icon: "i-lucide-circle-check",
            });
          },
        }),
      ]);
    },
  },

  {
    accessorKey: "title",
    id: "title",
    cell: ({ row }) => row.getValue("title") || i18n.t("model.no_title"),
    header: ({ column }) => sortButton(column),
  },

  {
    accessorKey: "createdAt",
    id: "createdAt",
    header: ({ column }) => sortButton(column),
    cell: ({ row }) =>
      dayjs(row.getValue("createdAt")).format("DD MMM YYYY HH:mm"),
  },

  {
    accessorKey: "feedbacks",
    header: "Feedbacks",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto cursor-pointer",
              "aria-label": "Actions dropdown",
            }),
        ),
      );
    },
  },
];

function sortButton(column: Column<Model>) {
  return h(UButton, {
    color: "neutral",
    variant: "ghost",
    label: i18n.t(`model.table.items.${column.id}`),
    icon:
      sortBy.value !== column.id
        ? null
        : sortOrder.value === "desc"
          ? "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-narrow-wide",

    class: "-mx-2.5 cursor-pointer",
    onClick: () => {
      if (sortBy.value === column.id) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortBy.value = column.id;
        sortOrder.value = "desc";
      }

      refresh();
    },
  });
}

function getRowItems(row: Row<Model>) {
  return [
    {
      icon: "i-lucide-message-square-reply",
      label: i18n.t("model.table.options.view_rates"),
      to: Use.localePath({
        name: "admin-id",
        params: { id: row.original.id },
      }),
    },

    {
      icon: "i-lucide-copy",
      label: i18n.t("model.table.options.copy_public_link"),
      class: "cursor-pointer",
      onSelect() {
        copy(row.original.id);

        toast.add({
          title: i18n.t("words.copied"),
          color: "success",
          icon: "i-lucide-circle-check",
        });
      },
    },

    {
      type: "separator",
    },

    {
      label: "Supprimer",
      color: "error",
      icon: "i-lucide-trash-2",
    },
  ];
}
</script>

<template>
  <div
    v-if="status === 'pending' && !models"
    class="w-screen h-screen flex items-center justify-center"
  >
    <u-icon name="i-eos-icons-three-dots-loading" size="64" />
  </div>

  <u-container v-else class="py-10">
    <UTable
      :data="models?.items"
      :columns="columns"
      :loading="status === 'pending'"
      :column-pinning="{ left: ['clientKey'], right: ['actions'] }"
      class="flex-1 border border-accented rounded-lg"
    >
      <template #feedbacks-cell="{ row }">
        <ui-feedback-count :model="row.original" />
      </template>
    </UTable>

    <div
      v-if="models"
      class="flex justify-center border-t border-default pt-4 px-4"
    >
      <UPagination
        :page="models.page"
        :items-per-page="models.pageSize"
        :total="models.total"
        @update:page="
          (p) => {
            page = p;
            refresh();
          }
        "
      />
    </div>
  </u-container>
</template>
