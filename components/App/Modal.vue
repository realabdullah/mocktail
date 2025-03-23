<script lang="ts" setup>
defineProps<{
  title: string;
  desc: string;
  primary: string;
  primaryColor: "black" | "red";
  secondary: string;
}>();

const emit = defineEmits(["primary", "secondary"]);

const onPrimary = () => emit("primary");
const onSecondary = () => emit("secondary");
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <h3 class="text-base sm:text-lg font-semibold">{{ title }}</h3>
      </template>

      <p class="text-sm sm:text-base">{{ desc }}</p>

      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton variant="outline" color="gray" @click="onSecondary"
            >{{ secondary }}
          </UButton>
          <UButton :color="primaryColor" @click="onPrimary">
            {{ primary }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
