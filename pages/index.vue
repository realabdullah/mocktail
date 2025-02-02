<script setup lang="ts">
const typeDefinition = ref("");
const generatedData = ref("");

const isGenerating = ref(false);
const errorMsg = ref("");
const generateMockData = async () => {
  try {
    isGenerating.value = true;
    generatedData.value = "";
    errorMsg.value = "";
    const data = await $fetch<{ response?: string; error?: string }>(
      "/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeDefinition: typeDefinition.value,
          agent: "gemini",
        }),
      }
    );

    if (data?.response) {
      generatedData.value = data.response;
    } else {
      errorMsg.value = data?.error ?? "An error occurred!";
    }
  } catch (error: unknown) {
    errorMsg.value = (error as any)?.message ?? "An error occurred!";
    generatedData.value = "";
  } finally {
    isGenerating.value = false;
  }
};
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

        <!-- <MonacoEditor
          v-model="value"
          lang="typescript"
          :style="{ width: '100%', height: '200px' }"
          :options="{ theme: 'vs-dark' }"
        /> -->
        <UTextarea
          v-model="typeDefinition"
          color="white"
          variant="outline"
          placeholder="e.g. { name: string; age: number }[]"
          size="xl"
          :rows="10"
          :autoresize="false"
          :disabled="isGenerating"
        />

        <template #footer>
          <div class="flex items-center gap-3">
            <UButton
              color="black"
              variant="solid"
              size="lg"
              icon="i-heroicons-arrow-path"
              label="Generate Mock Data"
              :disabled="!typeDefinition || isGenerating"
              :loading="isGenerating"
              @click="generateMockData"
            />

            <span v-if="errorMsg" class="text-red-500 text-xs">
              {{ errorMsg }}
            </span>
          </div>
        </template>
      </UCard>

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
  </div>
</template>

<style>
textarea {
  font-family: "Menlo", "Monaco", "Courier New", monospace;
}
</style>
