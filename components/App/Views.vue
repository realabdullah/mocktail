<script lang="ts" setup>
const {
  formattedSelectedDate,
  selectedDate,
  showStarredItems,
  starredItems,
  selectedTag,
  selectedItem,
  searchQuery,
  filteredItems,
} = storeToRefs(useStore());

const items = computed(() =>
  showStarredItems.value ? starredItems.value : filteredItems.value
);
</script>

<template>
  <div class="p-6">
    <div v-if="selectedItem" class="max-w-3xl mx-auto">
      <AppCardData :selectedItem="selectedItem" />
    </div>

    <div
      v-else-if="
        searchQuery ||
        selectedDate ||
        selectedTag ||
        (showStarredItems && !selectedItem)
      "
    >
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-xl font-semibold">
          <template v-if="searchQuery"> Search: {{ searchQuery }} </template>
          <template v-else-if="selectedDate">
            {{ formattedSelectedDate }}
          </template>
          <template v-else-if="selectedTag">
            Tagged: {{ selectedTag }}
          </template>
          <template v-else-if="showStarredItems">Starred Items</template>
        </h3>

        <UBadge color="gray" variant="solid">
          {{ items.length }}
          {{ items.length === 1 ? "item" : "items" }}
        </UBadge>
      </div>

      <AppCardEmpty v-if="items.length <= 0" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <template v-for="(item, index) in items" :key="index">
          <AppCardOverview v-model="selectedItem" :item />
        </template>
      </div>
    </div>
  </div>
</template>
