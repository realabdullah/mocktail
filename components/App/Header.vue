<script lang="ts" setup>
import { AppModal } from "#components";

const {
  selectedDate,
  showStarredItems,
  selectedTag,
  searchQuery,
  selectedHistory,
} = storeToRefs(useStore());

const backToGenerator = () => {
  selectedDate.value = "";
  showStarredItems.value = false;
  selectedTag.value = "";
  selectedHistory.value = undefined;
};

const isTrashPage = computed(() => useRoute().name === "trash");
const { clearTrash } = useHistory();
const modal = useModal();

const emptyTrash = () => {
  modal.open(AppModal, {
    title: "Empty Trash",
    desc: "This will permanently delete all items in your trash. This action cannot be undone.",
    primary: "Empty Trash",
    secondary: "Cancel",
    primaryColor: "red",
    onPrimary: () => {
      clearTrash();
      modal.close();
    },
    onSecondary: () => modal.close(),
  });
};
</script>

<template>
  <div
    class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 z-10 bg-gray-50 dark:bg-gray-900"
  >
    <div class="flex items-center gap-4">
      <div :class="{ 'flex items-center gap-2': isTrashPage }">
        <UButton
          v-if="isTrashPage"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          color="gray"
          @click="$router.go(-1)"
        />
        <SidebarTrigger v-else />
      </div>

      <h2 class="text-lg font-medium">
        <template v-if="isTrashPage">Trash</template>
        <template v-else-if="searchQuery"> Search: {{ searchQuery }} </template>
        <template v-else-if="selectedHistory">
          {{ selectedHistory.title || "View Item" }}
        </template>
        <template v-else-if="selectedDate">
          {{ selectedDate }}
        </template>
        <template v-else-if="selectedTag"> Tagged: {{ selectedTag }} </template>
        <template v-else-if="showStarredItems">Starred Items</template>
        <template v-else>Generator</template>
      </h2>
    </div>

    <div class="flex items-center space-x-2">
      <UButton
        v-if="isTrashPage"
        variant="ghost"
        label="Empty Trash"
        color="red"
        @click="emptyTrash"
      />

      <UButton
        v-else-if="
          selectedDate ||
          selectedTag ||
          showStarredItems ||
          selectedHistory ||
          searchQuery
        "
        variant="outline"
        label="Back to Generator"
        color="gray"
        @click="backToGenerator"
      />
    </div>
  </div>
</template>
