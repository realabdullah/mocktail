<script lang="ts" setup>
const { starredItems, showStarredItems, selectedItem } = storeToRefs(
  useStore()
);

onUnmounted(() => (showStarredItems.value = false));
</script>

<template>
  <div class="space-y-1">
    <button
      v-for="(starred, index) in starredItems"
      :key="index"
      class="w-full flex flex-col items-start p-2 rounded-md text-base text-gray-300 hover:bg-white dark:hover:bg-gray-800"
      :class="[
        selectedItem?.id === starred.id
          ? 'bg-white dark:bg-gray-800 shadow-sm'
          : '',
      ]"
      @click="selectedItem = starred"
    >
      <div class="flex items-center">
        <div
          class="w-2 h-2 rounded-full mr-2"
          :style="`background-color: ${starred.color}`"
        ></div>
        <span class="text-gray-700 dark:text-white">{{ starred.title }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-star text-yellow-400 ml-1"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          ></polygon>
        </svg>
      </div>

      <p class="text-xs text-gray-800 dark:text-gray-400 mt-1 truncate">
        {{ formatDate(new Date(starred.timestamp)) }}
      </p>
    </button>
  </div>
</template>
