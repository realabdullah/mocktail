<script setup lang="ts">
const { dateViewItems, selectedDate, selectedItem } = storeToRefs(useStore());

const selectDate = (date: string) => {
  selectedItem.value = undefined;
  selectedDate.value = date;
};
</script>

<template>
  <UAccordion :items="dateViewItems" :ui="{ wrapper: 'flex flex-col w-full' }">
    <template #default="{ item, open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :class="[
          selectedDate === item.value
            ? 'bg-white dark:bg-gray-800 shadow-sm'
            : 'hover:bg-white dark:hover:bg-gray-800',
        ]"
      >
        <template #leading>
          <UIcon name="i-heroicons-calendar-20-solid" class="w-3 h-3" />
        </template>

        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ item.label }}
        </span>

        <template #trailing>
          <div class="ml-auto flex items-center gap-0.5">
            <div
              class="flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-foreground mr-2 bg-white dark:bg-gray-800 text-xs"
            >
              {{ item.count }}
            </div>
            <div class="flex items-center">
              <UButton
                variant="ghost"
                color="gray"
                icon="i-heroicons-arrow-right"
                size="xs"
                @click.stop="selectDate(item.value)"
              />
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </div>
          </div>
        </template>
      </UButton>
    </template>

    <template #item="{ item }">
      <ul class="ml-4">
        <button
          v-for="(cell, index) in item.item"
          :key="index"
          class="w-full text-left p-2 rounded-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
          @click="selectedItem = cell"
        >
          <div
            class="w-2 h-2 rounded-full mr-2"
            :style="`background-color: ${cell.color}`"
          ></div>
          <div class="flex-1 truncate">{{ cell.title }}</div>
          <svg
            v-if="cell.starred"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-star text-yellow-400 ml-1"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </button>
      </ul>
    </template>
  </UAccordion>
</template>
