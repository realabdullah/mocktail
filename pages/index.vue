<script setup lang="ts">
const {
  searchQuery,
  selectedDate,
  showStarredItems,
  selectedTag,
  selectedHistory,
} = storeToRefs(useStore());
const { fetchHistories, fetchTrash } = useHistory();

const isAppGeneratorVisible = computed(
  () =>
    !searchQuery.value &&
    !selectedDate.value &&
    !showStarredItems.value &&
    !selectedTag.value &&
    !selectedHistory.value
);

onMounted(() => {
  fetchHistories();
  fetchTrash();
});
</script>

<template>
  <div
    class="relative min-h-screen bg-gray-50 p-4 dark:bg-gray-900"
    :class="[isAppGeneratorVisible ? 'flex items-center justify-center' : '']"
  >
    <AppViews v-if="!isAppGeneratorVisible" />
    <AppGenerator v-show="isAppGeneratorVisible" />

    <p class="fixed bottom-4 right-4 text-sm text-gray-400 dark:text-gray-600">
      <!--  bottom-9 sm: max-sm:rotate-90 -right-4 sm: -->
      Built by
      <a href="https://abdspace.xyz" target="_blank" class="font-bold">ABD</a>
    </p>
  </div>
</template>
