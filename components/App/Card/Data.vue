<script lang="ts" setup>
import type { IHistory } from "~/types";

const props = defineProps<{
  selectedItem: IHistory;
}>();

const editingId = ref("");
const editingTitle = ref(props.selectedItem?.title || "");
</script>

<template>
  <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }" class="overflow-hidden">
    <div class="p-4">
      <div
        v-if="editingId === `${selectedItem.id}`"
        class="flex items-center space-x-2 mb-4"
      >
        <UInput v-model="editingTitle" class="flex-1 h-9" />
        <UButton
          variant="ghost"
          color="gray"
          icon="i-heroicons-server"
          size="xs"
        />
        <UButton
          variant="ghost"
          color="gray"
          icon="i-heroicons-x-mark"
          size="xs"
          @click="editingId = ''"
        />
      </div>

      <div v-else class="flex items-center justify-between mb-4">
        <div>
          <div class="flex items-center">
            <div
              class="w-3 h-3 rounded-full mr-2"
              :style="`background-color: ${selectedItem.color}`"
            ></div>
            <h3 class="text-xl font-semibold">{{ selectedItem.title }}</h3>
            <svg
              v-if="selectedItem?.starred"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-star text-yellow-400 ml-2"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
          </div>

          <div class="flex items-center mt-1">
            <p class="text-sm text-gray-400">
              {{ formatDate(new Date(selectedItem.timestamp)) }}
            </p>
            <div
              v-if="selectedItem.tags.length > 0"
              class="flex items-center ml-3 space-x-1"
            >
              <UBadge
                v-for="(tag, index) in selectedItem.tags"
                :key="index"
                color="gray"
                variant="solid"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </div>

        <div class="flex space-x-2">
          <UButton
            variant="ghost"
            color="gray"
            icon="i-heroicons-pencil"
            size="xs"
            @click="editingId = `${selectedItem.id}`"
          />
          <UButton
            variant="ghost"
            color="gray"
            icon="i-heroicons-star"
            size="xs"
          />
          <UButton
            variant="ghost"
            color="gray"
            icon="i-heroicons-trash"
            size="xs"
          />
        </div>
      </div>

      <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }" class="overflow-hidden">
        <div
          class="flex items-center justify-between bg-white dark:bg-gray-900 px-3 py-2 text-xs border-b border-gray-200 dark:border-gray-700"
        >
          <span :style="`color: ${selectedItem.color}`">JSON</span>
        </div>

        <code>
          <pre class="p-4 text-sm font-mono overflow-auto max-h-[500px]">
            {{ selectedItem.data }}
          </pre>
        </code>
      </UCard>

      <div class="flex justify-end mt-4 space-x-2">
        <UButton
          color="black"
          size="lg"
          :variant="false ? 'outline' : 'solid'"
          :icon="
            false
              ? 'i-heroicons-clipboard-document-check'
              : 'i-heroicons-clipboard-document'
          "
          :label="false ? 'Copied!' : 'Copy'"
        />
        <UButton
          color="black"
          size="lg"
          icon="i-heroicons-arrow-path"
          :label="false ? 'Downloading...' : 'Download'"
          :loading="false"
          :disabled="false"
        />
      </div>
    </div>
  </UCard>
</template>
