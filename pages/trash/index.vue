<script lang="ts" setup>
import { AppModal } from "#components";
import { timeAgo } from "@/utils";

definePageMeta({
  name: "trash",
  title: "Trash",
  description: "Trash page description",
});

const selectSort = (key: string) => (selectedSort.value = key);

const items = [
  [
    {
      label: "Most recently trashed",
      key: "recent",
      click: () => selectSort("recent"),
    },
    {
      label: "Oldest trashed",
      key: "oldest",
      click: () => selectSort("oldest"),
    },
    {
      label: "Alphabetically",
      key: "alphabetically",
      click: () => selectSort("alphabetically"),
    },
  ],
];

const { trash } = storeToRefs(useStore());
const {
  fetchTrash,
  restoreFromTrash,
  batchRestoreFromTrash,
  permanentlyDeleteHistory,
  batchPermanentlyDeleteHistory,
} = useHistory();
const { open, close } = useModal();

const selectedIds = ref<string[]>([]);
const selectedSort = ref("recent");
const searchQuery = ref("");

const filteredTrash = computed(() => {
  return trash.value
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedSort.value === "recent") {
        return (b.deletedAt ?? 0) - (a.deletedAt ?? 0);
      } else if (selectedSort.value === "oldest") {
        return (a.deletedAt ?? 0) - (b.deletedAt ?? 0);
      } else if (selectedSort.value === "alphabetically") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
});

const selectAll = () => {
  if (selectedIds.value.length === filteredTrash.value.length) {
    selectedIds.value.length = 0;
  } else {
    selectedIds.value = filteredTrash.value.map((item) => item.id);
  }
};

const selectHistory = (id: string) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id);
  } else {
    selectedIds.value = [...selectedIds.value, id];
  }
};

const trashOrRestore = (
  id: string | string[],
  action: "restore" | "delete"
) => {
  open(AppModal, {
    title:
      action === "delete"
        ? typeof id === "string"
          ? "Permanently Delete Item"
          : "Permanently Delete Selected Items"
        : typeof id === "string"
        ? "Restore Item"
        : "Restore Selected Items",
    desc:
      action === "delete"
        ? typeof id === "string"
          ? "This action cannot be undone. This item will be permanently deleted from your account."
          : "This action cannot be undone. These items will be permanently deleted from your account."
        : typeof id === "string"
        ? "This item will be restored to your history"
        : "These items will be restored to your history.",
    primary: action === "delete" ? "Delete Forever" : "Restore",
    secondary: "Cancel",
    primaryColor: action === "delete" ? "red" : "black",
    onPrimary: () => {
      if (action === "delete") {
        if (typeof id === "string") permanentlyDeleteHistory(id);
        else batchRestoreFromTrash(id);
      } else {
        if (typeof id === "string") restoreFromTrash(id);
        else batchRestoreFromTrash(id);
      }
      close();
    },
    onSecondary: () => close(),
  });
};

onMounted(() => fetchTrash());
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="lg"
          color="white"
          :trailing="false"
          placeholder="Search..."
          class="w-full"
        />

        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" trailing-icon="i-heroicons-clock" size="lg" />
        </UDropdown>
      </div>

      <div class="mt-6 flex items-center justify-between gap-3">
        <UCheckbox
          :model-value="
            filteredTrash.length
              ? selectedIds.length === filteredTrash.length
              : false
          "
          :label="`${selectedIds.length} histor${
            selectedIds.length > 1 ? 'ies' : 'y'
          } selected`"
          @update:model-value="selectAll"
        />

        <div v-if="selectedIds.length > 0" class="flex items-center gap-2">
          <UButton
            label="Restore Selected"
            icon="i-heroicons-arrow-path"
            color="gray"
            variant="outline"
            :trailing="false"
            @click="trashOrRestore(selectedIds, 'restore')"
          />
          <UButton
            label="Delete Selected"
            icon="i-heroicons-trash"
            color="red"
            variant="outline"
            :trailing="false"
            @click="trashOrRestore(selectedIds, 'delete')"
          />
        </div>
      </div>
    </div>

    <UContainer class="mx-0">
      <div
        v-if="filteredTrash.length > 0"
        class="mt-6 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,45%))] gap-3"
      >
        <UCard
          v-for="(history, index) in filteredTrash"
          :key="history.id"
          class="overflow-hidden"
        >
          <div class="flex flex-col items-start gap-3 overflow-hidden">
            <div class="flex items-center justify-between gap-2 w-full">
              <div class="flex items-center gap-2">
                <UCheckbox
                  :model-value="selectedIds.includes(history.id)"
                  @update:model-value="selectHistory(history.id)"
                />
                <div>
                  <div class="flex items-center gap-1">
                    <div
                      class="w-2 h-2 rounded-full"
                      :style="`background-color: ${history.color}`"
                    ></div>
                    <h3 class="text-base sm:text-lg font-semibold truncate">
                      {{ history.title }}
                    </h3>
                  </div>

                  <div class="flex items-center gap-1">
                    <UIcon name="i-heroicons-clock" class="h-3 w-3" />
                    <p class="text-sm text-gray-400">
                      Deleted
                      {{
                        history.deletedAt
                          ? timeAgo(history.deletedAt)
                          : "time unknown"
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-1">
                <UButton
                  variant="ghost"
                  icon="i-heroicons-arrow-path"
                  color="white"
                  @click="trashOrRestore(history.id, 'restore')"
                />
                <UButton
                  variant="ghost"
                  icon="i-heroicons-trash"
                  color="red"
                  @click="trashOrRestore(history.id, 'delete')"
                />
              </div>
            </div>

            <pre
              class="p-3 text-xs font-mono overflow-hidden max-h-20 truncate bg-gray-100 dark:bg-gray-800"
            >
              {{ history.data }}
            </pre>

            <div class="flex flex-wrap gap-1 mt-3">
              <UBadge
                v-for="(tag, index) in history.tags"
                :key="index"
                color="gray"
                variant="solid"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>

      <AppCardEmpty v-else class="mt-6" />
    </UContainer>
  </div>
</template>
