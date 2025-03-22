<script lang="ts" setup>
import { formatDate } from "@/utils";
import type { IHistory } from "@/types";

defineProps<{ item: IHistory }>();
const selectedItem = defineModel<IHistory>();
</script>

<template>
  <UCard
    class="relative cursor-pointer"
    :ui="{ body: { padding: 'p-0 sm:p-0' } }"
    @click="selectedItem = item"
  >
    <div
      class="absolute top-0 left-0 w-full h-1 rounded-t-lg"
      :style="`background-color: ${item.color}`"
    ></div>

    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <div
            class="w-2 h-2 rounded-full mr-2"
            :style="`background-color: ${item.color}`"
          ></div>
          <h3 class="font-medium truncate">{{ item.title }}</h3>
        </div>
        <svg
          v-if="item.starred"
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

      <div class="flex items-center text-xs text-gray-400 mb-3">
        <UIcon name="i-heroicons-clock" class="w-3 h-3 mr-1" />
        <span>{{ formatDate(new Date(item.timestamp)) }}</span>
      </div>

      <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
        <div
          class="flex items-center justify-between px-3 py-1.5 text-xs border-b border-gray-200 dark:border-gray-700"
        >
          <span :style="`backgroundColor: ${item.color}`">JSON</span>
        </div>
        <pre class="p-3 text-xs font-mono overflow-hidden max-h-20 truncate">
                {{ item.data }}
                </pre
        >
      </UCard>

      <div class="flex flex-wrap gap-1 mt-3">
        <UBadge
          v-for="(tag, index) in item.tags"
          :key="index"
          color="gray"
          variant="solid"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
