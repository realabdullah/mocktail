<script setup lang="ts">
const {
  state,
  apiKeys,
  error,
  generatedData,
  isGenerating,
  isErrorModalOpen,
  isSetKeysModalOpen,
  generateMockData,
  setApiKeys,
} = useGenerate();
</script>

<template>
  <div
    class="relative min-h-screen bg-gray-50 flex items-center justify-center p-4 dark:bg-gray-900"
  >
    <div class="max-w-2xl w-full space-y-5">
      <GenerateForm
        v-model="state"
        :is-generating="isGenerating"
        @generate="generateMockData"
        @add-keys="isSetKeysModalOpen = true"
      />

      <template v-if="generatedData">
        <UDivider label="🤝" />

        <GeneratedDataCard :data="generatedData" />
      </template>
    </div>

    <p
      class="absolute bottom-4 right-4 text-sm text-gray-400 dark:text-gray-600"
    >
      Built by
      <a href="https://abdspace.xyz" target="_blank" class="font-bold">ABD</a>
    </p>

    <!-- MODALS -->
    <SetApiKeys
      v-model="isSetKeysModalOpen"
      :api-keys="apiKeys"
      @set-keys="setApiKeys"
    />
    <ErrorModal v-model="isErrorModalOpen" :error="error" />
  </div>
</template>

<style>
textarea {
  font-family: "Menlo", "Monaco", "Courier New", monospace;
}
</style>
