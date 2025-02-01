<script setup lang="ts">
const typeDefinition = ref("");
const generatedData = ref("");
</script>

<template>
  <div
    class="relative min-h-screen bg-gray-50 flex items-center justify-center p-4 dark:bg-gray-900"
  >
    <div class="max-w-2xl w-full space-y-5">
      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">
            mockTail 🪄
          </h1>
          <p class="text-sm text-gray-600 mb-2 dark:text-gray-400">
            Paste your data type definition below, and this tool will generate
            mock data for you!
          </p>
        </template>

        <UTextarea
          v-model="typeDefinition"
          color="white"
          variant="outline"
          placeholder="e.g. { name: string; age: number }[]"
          size="xl"
          :rows="10"
          :autoresize="false"
        />

        <template #footer>
          <UButton
            color="black"
            variant="solid"
            size="lg"
            icon="i-heroicons-arrow-path"
            label="Generate Mock Data"
            :disabled="!typeDefinition"
          />
        </template>
      </UCard>

      <GeneratedDataCard v-if="generatedData" :data="generatedData" />
    </div>

    <p
      class="absolute bottom-4 right-4 text-sm text-gray-400 dark:text-gray-600"
    >
      Built by
      <a href="https://abdspace.xyz" target="_blank" class="font-bold">ABD</a>
    </p>
  </div>
</template>
