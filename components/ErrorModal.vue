<script lang="ts" setup>
import { formatString } from "@/utils";

defineProps<{
  error: {
    title: string;
    desc: string;
  };
}>();

const isOpen = defineModel<boolean>({ default: true });
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-4">
      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">
            {{ error.title }}
          </h1>
        </template>
        <div class="space-y-3">
          <p class="text-sm text-gray-600 mb-2 dark:text-gray-400">
            {{ error.desc }}
          </p>
          <UButton color="black" @click="isOpen = false">Close</UButton>
        </div>
      </UCard>
    </div>
  </UModal>
</template>
