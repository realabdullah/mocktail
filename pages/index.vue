<script setup lang="ts">
definePageMeta({
  name: "home",
  title: "Home - mockTail 🪄",
  description: "mockTail ",
});

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

onMounted(() => fetchHistories());
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 p-4 dark:bg-gray-900"
    :class="[isAppGeneratorVisible ? 'flex items-center justify-center' : '']"
  >
    <AppViews v-if="!isAppGeneratorVisible" />
    <AppGenerator v-show="isAppGeneratorVisible" />
  </div>
</template>
