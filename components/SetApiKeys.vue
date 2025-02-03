<script lang="ts" setup>
import { z } from "zod";

const props = defineProps<{
  apiKeys: { gemini: string; openai: string };
}>();

const isOpen = defineModel<boolean>({ default: false });

const state = reactive({
  gemini: props.apiKeys.gemini,
  openai: props.apiKeys.openai,
});

const emits = defineEmits<{
  (event: "set-keys", keys: typeof state): void;
}>();

const schema = {
  gemini: z.object({
    gemini: z.string().nonempty("Gemini API key is required"),
  }),
  openai: z.object({
    openai: z.string().nonempty("OpenAI API key is required"),
  }),
};

const items = [
  {
    label: "Gemini",
    icon: "i-simple-icons-googlegemini",
    form_label: "Gemini API Key",
    model: "gemini",
    placeholder: "Enter your Gemini API key",
  },
  {
    label: "OpenAI",
    icon: "i-simple-icons-openai",
    form_label: "OpenAI API Key",
    model: "openai",
    placeholder: "Enter your OpenAI API key",
  },
];

const setKeys = () => emits("set-keys", state);
</script>

<template>
  <UModal v-model="isOpen" prevent-close>
    <div
      class="rounded-md p-6 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700 space-y-6"
    >
      <div class="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2
          class="text-lg font-semibold leading-none tracking-tight text-gray-800 mb-2 dark:text-gray-200"
        >
          Set API Key
        </h2>
        <p class="text-sm text-gray-600 mb-2 dark:text-gray-400">
          Enter your Gemini or OpenAI API key. These will be used to make
          direct API calls from your browser.
        </p>
      </div>

      <div class="w-full">
        <UTabs :items="items">
          <template #item="{ item }">
            <UForm
              :state="state"
              :schema="schema[item.model as keyof typeof schema]"
              class="mt-4"
              @submit="setKeys"
            >
              <UFormGroup
                :label="item.form_label"
                :name="item.model"
                eager-validation
              >
                <UInput
                  v-model="state[item.model as keyof typeof state]"
                  :placeholder="item.placeholder"
                  size="lg"
                  icon="i-heroicons-lock-closed"
                  trailing
                  type="password"
                />
              </UFormGroup>

              <div
                class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6"
              >
                <UButton
                  label="Set API Key"
                  type="submit"
                  color="black"
                  size="lg"
                  block
                />
              </div>
            </UForm>
          </template>
        </UTabs>
      </div>

      <div class="absolute right-4 -top-1">
        <UButton
          variant="ghost"
          color="black"
          icon="i-heroicons-x-mark"
          @click="isOpen = false"
        />
      </div>
    </div>
  </UModal>
</template>
