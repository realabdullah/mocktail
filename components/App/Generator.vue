<script lang="ts" setup>
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
  <div>
    <div class="max-w-2xl w-full space-y-5">
      <GenerateForm
        v-model="state"
        :is-generating="isGenerating"
        @generate="generateMockData"
        @add-keys="isSetKeysModalOpen = true"
      />

      <template v-if="generatedData">
        <UDivider label="🤝" />

        <AppCardData :entry="generatedData" usage="generated" />
      </template>
    </div>

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
