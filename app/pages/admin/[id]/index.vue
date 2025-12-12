<script lang="ts" setup>
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { FeedbackData } from "~/tools/interfaces";
import type { Feedback, Model } from "~~/server/database/schema";

const props = defineProps<{ model: Model }>();

const { data: feedbacks, status } = await useFetch<Feedback[]>(
  `/api/admin/${Use.route.params.id}/feedback`,
  { method: "get" },
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
          fb?.data.comment,
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
    <div class="flex items-center gap-3 mb-8">
      <ui-model-options :model :content="{ align: 'start' }">
        <template #activator>
          <u-button
            icon="i-lucide-text"
            color="neutral"
            variant="soft"
            class="cursor-pointer"
          />
        </template>
      </ui-model-options>

      <h1 class="text-2xl">
        {{ model.title || $t("model.no_title") }}
      </h1>

      <div class="mx-auto"></div>

      <UAvatarGroup>
        <UAvatar
          src="https://github.com/benjamincanac.png"
          alt="Benjamin Canac"
        />
        <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
        <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
      </UAvatarGroup>

      <u-button icon="i-lucide-user-round-plus" variant="soft" color="neutral">
      </u-button>
    </div>

    <UTable
      ref="table"
      :columns="columns"
      :data="feedbacks"
      :loading="status === 'pending'"
      class="flex-1 border border-accented rounded-lg"
    >
    </UTable>
  </u-container>
</template>
