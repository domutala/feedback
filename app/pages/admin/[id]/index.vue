<script lang="ts" setup>
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { FeedbackData } from "~/tools/interfaces";
import type { Feedback, Model } from "~~/server/database/schema";

const props = defineProps<{ model: Model }>();

const { data: feedbacks, status } = await useFetch<Feedback[]>(
  `/api/admin/${Use.route.params.id}/feedback`,
  { method: "get" }
);

const { $i18n } = useNuxtApp();

const columns = computed(() => {
  if (!props.model) return [];

  const columns: TableColumn<Feedback>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => `#${row.getValue("id")}`,
    },
  ];

  if (props.model.data.name) {
    columns.push({
      accessorKey: "name",
      header: "name",

      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        const fb = feedbacks.value?.find((f) => f.id === id);
        return fb?.data.name;
      },
    });
  }

  columns.push({
    accessorKey: "rate",
    header: () => h("div", { class: "text-center" }, "Notes"),

    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      const fb = feedbacks.value?.find((f) => f.id === id);
      return h("div", { class: "text-center" }, fb?.data.rate);
    },
  });

  if (props.model.data.email) {
    columns.push({
      accessorKey: "email",
      header: "email",

      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        const fb = feedbacks.value?.find((f) => f.id === id);
        return fb?.data.email;
      },
    });
  }

  if (props.model.data.comment !== "no") {
    columns.push({
      accessorKey: "comment",
      header: "comment",

      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        const fb = feedbacks.value?.find((f) => f.id === id);

        if (!fb?.data.comment) return;

        return h(
          "div",
          {
            class: "max-w-[250px] whitespace-normal",
            style: {
              display: "-webkit-box",
              lineClamp: 2,
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
          fb?.data.comment
        );
      },
    });
  }

  if (props.model.data.phone) {
    columns.push({
      accessorKey: "phone",
      header: "phone",
    });
  }

  if (props.model.data.address) {
    columns.push({
      accessorKey: "address",
      header: "address",

      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        const fb = feedbacks.value?.find((f) => f.id === id);
        return fb?.data.address;
      },
    });
  }

  return columns;
});
</script>

<template>
  <u-container class="my-16">
    <UTable
      ref="table"
      :columns="columns"
      :data="feedbacks"
      :loading="status === 'pending'"
      class="flex-1 border border-accented rounded-2xl"
    >
    </UTable>
  </u-container>
</template>
