<script lang="ts" setup>
const { selectedHistory, selectedTag, tags } = storeToRefs(useStore());

const selectTag = (tag: string) => {
  selectedHistory.value = undefined;
  selectedTag.value = tag;
};
</script>

<template>
  <div class="space-y-1">
    <button
      v-for="(tag, index) in tags"
      :key="index"
      class="w-full flex items-center justify-between p-2 rounded-md dark:text-white text-gray-800"
      :class="[
        selectedTag === tag.tag
          ? 'bg-white dark:bg-gray-800 shadow-sm'
          : 'hover:bg-white dark:hover:bg-gray-800',
      ]"
      @click="selectTag(tag.tag)"
    >
      <div class="flex items-center">
        <UIcon
          name="i-heroicons-tag"
          class="w-3 h-3 mr-2 dark:text-white text-gray-800"
        />
        <span>{{ tag.tag }}</span>
      </div>

      <div
        class="flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-foreground mr-2 bg-white dark:bg-gray-800 text-xs"
      >
        {{ tag.count }}
      </div>
    </button>
  </div>
</template>
