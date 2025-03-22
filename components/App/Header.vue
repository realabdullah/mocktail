<script lang="ts" setup>
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
</script>

<template>
  <div
    class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 z-10 bg-gray-50 dark:bg-gray-900"
  >
    <div class="flex items-center gap-4">
      <SidebarTrigger />
      <h2 class="text-lg font-medium">
        <template v-if="searchQuery"> Search: {{ searchQuery }} </template>
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
        v-if="selectedDate || selectedTag || showStarredItems || selectedHistory || searchQuery"
        variant="outline"
        label="Back to Generator"
        color="gray"
        @click="backToGenerator"
      />
    </div>
  </div>
</template>
