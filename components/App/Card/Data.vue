<script lang="ts" setup>
import { formatDate, refineResponse } from "@/utils";
import type { IHistory } from "~/types";

const props = defineProps<{
  entry: IHistory;
  usage: "saved" | "generated";
}>();

const isDownloading = ref(false);
const activeTab = ref(0);
const isCopied = ref(false);
const editingId = ref("");
const editingTitle = ref("");

const data = computed(() => refineResponse(props.entry.data) as IHistory);

const tabs = [
  { label: "Tree View", slot: "tree-view" },
  { label: "Raw JSON", slot: "raw-json" },
];

const copyGeneratedData = () => {
  navigator.clipboard.writeText(JSON.stringify(data.value, null, 2));
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
};

const downloadGeneratedData = () => {
  try {
    isDownloading.value = true;
    const blob = new Blob([JSON.stringify(data.value, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.entry.title}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
  } finally {
    isDownloading.value = false;
  }
};

const { updateTitle, toggleStar, moveHistoryToTrash } = useHistory();

const setEditing = () => {
  editingId.value = props.entry.id;
  editingTitle.value = props.entry.title;
};

const onUpdateTitle = () => {
  updateTitle(props.entry.id, editingTitle.value);
  editingId.value = "";
  editingTitle.value = "";
};
</script>

<template>
  <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }" class="overflow-hidden">
    <div class="p-2 sm:p-4">
      <div
        v-if="editingId === entry.id"
        class="flex items-center space-x-2 mb-4"
      >
        <UInput v-model="editingTitle" class="flex-1 h-9" />
        <UButton
          variant="ghost"
          color="gray"
          icon="i-heroicons-server"
          size="xs"
          @click="onUpdateTitle"
        />
        <UButton
          variant="ghost"
          color="gray"
          icon="i-heroicons-x-mark"
          size="xs"
          @click="editingId = ''"
        />
      </div>

      <div
        v-else
        class="flex items-center flex-wrap gap-y-2 justify-between mb-4"
      >
        <div>
          <div class="flex items-center">
            <div
              class="w-3 h-3 rounded-full mr-2"
              :style="`background-color: ${entry.color}`"
            ></div>
            <h3 class="text-xl font-semibold truncate">{{ entry.title }}</h3>
            <svg
              v-if="usage === 'saved' && entry?.starred"
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

          <div class="flex items-center mt-1 flex-wrap gap-x-3 gap-y-2">
            <p class="text-sm text-gray-400">
              {{ formatDate(new Date(entry.timestamp)) }}
            </p>
            <div
              v-if="entry.tags.length > 0"
              class="flex items-center gap-1 flex-wrap"
            >
              <UBadge
                v-for="(tag, index) in entry.tags"
                :key="index"
                color="gray"
                variant="solid"
                class="whitespace-nowrap"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </div>

        <div v-if="usage === 'saved'" class="flex space-x-2">
          <UButton
            variant="ghost"
            color="gray"
            icon="i-heroicons-pencil"
            size="xs"
            @click="setEditing"
          />
          <UButton
            variant="ghost"
            color="gray"
            icon="i-heroicons-star"
            size="xs"
            @click="toggleStar(entry.id)"
          />
          <UButton
            variant="ghost"
            color="gray"
            icon="i-heroicons-trash"
            size="xs"
            @click="moveHistoryToTrash(entry.id)"
          />
        </div>
      </div>

      <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }" class="overflow-hidden">
        <template #header>
          <UTabs v-model="activeTab" :items="tabs" />
        </template>

        <div class="overflow-hidden">
          <div class="px-4 py-5 sm:px-6 overflow-auto max-h-[600px]">
            <AppJsonRenderer v-if="activeTab === 0" :data="data" />
            <pre
              v-else-if="activeTab === 1"
              class="text-sm overflow-auto p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
            >
            {{ JSON.stringify(data, null, 2) }}
          </pre
            >
          </div>
        </div>
      </UCard>

      <div class="flex justify-end mt-4 space-x-2">
        <UButton
          color="black"
          size="lg"
          :variant="isCopied ? 'outline' : 'solid'"
          :icon="
            isCopied
              ? 'i-heroicons-clipboard-document-check'
              : 'i-heroicons-clipboard-document'
          "
          :label="isCopied ? 'Copied!' : 'Copy'"
          @click="copyGeneratedData"
        />

        <UButton
          color="black"
          size="lg"
          icon="i-heroicons-arrow-path"
          :label="isDownloading ? 'Downloading...' : 'Download'"
          :loading="isDownloading"
          :disabled="isDownloading"
          @click="downloadGeneratedData"
        />
      </div>
    </div>
  </UCard>
</template>
