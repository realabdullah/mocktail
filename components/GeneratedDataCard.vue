<script lang="ts" setup>
const isCopied = ref(false);
const copyGeneratedData = () => {
  navigator.clipboard.writeText(generatedData.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
};

const isDownloading = ref(false);
const downloadGeneratedData = () => {
  isDownloading.value = true;
  setTimeout(() => {
    isDownloading.value = false;
  }, 1000);
};
</script>

<template>
  <UCard>
    <h1 class="text-2xl font-bold text-gray-800 mb-2">
      Generated Mock Data 🎉
    </h1>

    <UTextarea
      color="gray"
      variant="outline"
      size="xl"
      :rows="10"
      :autoresize="false"
      disabled
      class="cursor-text"
    />

    <div class="flex items-center w-fit gap-2 mt-3">
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
