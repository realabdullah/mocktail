<script lang="ts" setup>
const props = defineProps<{
  data: any;
}>();

const formattedJson = computed(() => {
  try {
    const jsonString = String(props.data).replace(/```json\n|\n```/g, "");
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData, null, 2);
  } catch (error) {
    return String(props.data).replace(/```json\n|\n```/g, "");
  }
});

const isCopied = ref(false);
const copyGeneratedData = () => {
  navigator.clipboard.writeText(formattedJson.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
};

const isDownloading = ref(false);
const downloadGeneratedData = () => {
  try {
    isDownloading.value = true;
    const blob = new Blob([formattedJson.value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mock-data.json";
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
  } finally {
    isDownloading.value = false;
  }
};
</script>

<template>
  <UCard>
    <h1 class="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">
      Generated Mock Data 🎉
    </h1>

    <pre
      class="h-96 bg-gray-50 dark:bg-gray-800 opacity-75 px-3.5 py-2.5 shadow-sm rounded-md overflow-x-auto ring-1 ring-inset ring-gray-300 dark:ring-gray-700"
    >
      <code class="text-sm font-mono text-gray-900 dark:text-white whitespace-pre">
        {{ formattedJson }}
      </code>
    </pre>

    <div v-if="formattedJson" class="flex items-center w-fit gap-2 mt-3">
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
  </UCard>
</template>
