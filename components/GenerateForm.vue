<script lang="ts" setup>
import { z } from "zod";
import type { FormState } from "@/types";
import { AI_AGENTS, ICONS_MAP } from "@/utils";

const schema = z.object({
  typeDefinition: z.string(),
  agent: z.union([z.literal("openai"), z.literal("gemini")]),
  count: z.number(),
});

defineProps<{
  isGenerating: boolean;
}>();

defineEmits<{
  (event: "generate"): void;
  (event: "add-keys"): void;
}>();

const state = defineModel<FormState>({ default: {} });

const isStateValid = computed(() => {
  if (!state.value) return true;

  const { typeDefinition, agent, count } = state.value;

  const isValidTypeDefinition =
    typeof typeDefinition === "string" && typeDefinition.trim().length > 0;
  const isValidAgent = agent === "openai" || agent === "gemini";
  const isValidCount = typeof count === "number" && count >= 1;

  return isValidTypeDefinition && isValidAgent && isValidCount;
});
</script>

<template>
  <UForm :state="state" :schema="schema" @submit="$emit('generate')">
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

      <div class="space-y-3">
        <div class="flex items gap-3 justify-between">
          <div class="flex items-center gap-4 w-full max-w-56">
            <UFormGroup name="agent">
              <USelectMenu
                v-model="state.agent"
                :options="AI_AGENTS"
                size="lg"
                value-attribute="value"
              >
                <template #leading>
                  <UIcon :name="ICONS_MAP[state.agent]" class="w-5 h-5" />
                </template>

                <template #option="{ option }">
                  <UIcon :name="option.icon" class="w-5 h-5" />
                  <span class="ml-2">{{ option.label }}</span>
                </template>
              </USelectMenu>
            </UFormGroup>

            <UFormGroup name="count">
              <UInput
                v-model="state.count"
                variant="outline"
                placeholder="e.g. 10"
                size="lg"
                type="number"
              />
            </UFormGroup>
          </div>

          <UButton
            icon="i-heroicons-plus"
            size="sm"
            variant="ghost"
            color="black"
            label="Add API keys"
            :trailing="false"
            @click="$emit('add-keys')"
          />
        </div>

        <UFormGroup name="typeDefinition">
          <UTextarea
            v-model="state.typeDefinition"
            color="white"
            variant="outline"
            placeholder="e.g. { name: string; age: number }[]"
            size="xl"
            :rows="10"
            :autoresize="false"
            :disabled="isGenerating"
          />
        </UFormGroup>
      </div>

      <template #footer>
        <UButton
          type="submit"
          color="black"
          variant="solid"
          size="lg"
          icon="i-heroicons-arrow-path"
          label="Generate Mock Data"
          :disabled="isGenerating || !isStateValid"
          :loading="isGenerating"
        />
      </template>
    </UCard>
  </UForm>
</template>
