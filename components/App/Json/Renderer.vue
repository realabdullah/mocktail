<script lang="ts" setup>
import { getTypeColor, getType } from "@/utils";

const props = withDefaults(
  defineProps<{
    fullPath?: string;
    isArrayItem?: boolean;
    data: any;
    rootLabel?: string;
    level?: number;
    expandAll?: boolean;
  }>(),
  { fullPath: "", rootLabel: "root", level: 0, expandAll: false }
);

const copied = ref<Record<string, boolean>>({});
const expanded = ref<Record<string, boolean>>({});

const localExpandAll = ref(false);
const effectiveExpandAll = computed(() =>
  props.level === 0 ? localExpandAll.value : props.expandAll
);
const type = computed(() => getType(props.data));
const isExpandable = computed(
  () => type.value === "object" || type.value === "array"
);
const displayKey = computed(() =>
  props.isArrayItem ? `${props.rootLabel}:` : `${props.rootLabel}:`
);
const uniqueKey = computed(() => `${props.fullPath}-${props.rootLabel}`);
const isExpanded = computed(
  () => expanded.value[uniqueKey.value] || effectiveExpandAll.value
);

const displayValue = computed(() => {
  switch (type.value) {
    case "string":
      return `"${props.data}"`;
    case "null":
      return "null";
    case "object":
    case "array":
      return isExpanded.value
        ? ""
        : type.value === "array"
        ? `[${props.data.length} items]`
        : `{${Object.keys(props.data).length} properties}`;
    default:
      return String(props.data);
  }
});

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(JSON.stringify(value, null, 2));
  copied.value[uniqueKey.value] = true;
  setTimeout(() => {
    copied.value[uniqueKey.value] = false;
  }, 1000);
};
</script>

<template>
  <div class="font-mono text-sm py-1" :class="[{ 'ml-4': level > 0 }]">
    <div class="flex items-center flex-nowrap whitespace-nowrap">
      <button
        v-if="isExpandable"
        class="mr-1 h-4 w-4 text-gray-500 focus:outline-none"
        @click="expanded[uniqueKey] = !expanded[uniqueKey]"
      >
        <UIcon
          :name="
            isExpanded
              ? 'i-heroicons-chevron-down'
              : 'i-heroicons-chevron-right'
          "
        />
      </button>

      <p class="font-semibold ml-2 mr-1" :class="{ 'ml-5': !isExpandable }">
        {{ displayKey }}
      </p>
      <p :class="[getTypeColor(type)]">{{ displayValue }}</p>
      <UBadge
        color="gray"
        variant="outline"
        class="ml-2 text-xs"
        :class="[getTypeColor(type)]"
        :ui="{ rounded: 'rounded-full' }"
      >
        {{ type }}
      </UBadge>

      <UTooltip
        :text="copied[uniqueKey] ? 'Copied!' : 'Copy value'"
        :popper="{ arrow: true }"
      >
        <button class="ml-1 -mt-1 h-3 w-3" @click="copyToClipboard(props.data)">
          <UIcon name="i-heroicons-document-duplicate" />
        </button>
      </UTooltip>
    </div>

    <div
      v-if="isExpandable && isExpanded"
      class="pl-4 border-l border-gray-200 dark:border-gray-700 ml-2 mt-1"
    >
      <template v-if="type === 'array'">
        <template v-for="(value, index) in data" :key="index">
          <Renderer
            :fullPath="props.fullPath"
            :isArrayItem="true"
            :data="value"
            :rootLabel="`${index}`"
            :effectiveExpandAll="effectiveExpandAll"
          />
        </template>
      </template>
      <template v-else>
        <template v-for="key in Object.keys(data)" :key="key">
          <Renderer
            :fullPath="`${props.fullPath}.${key}`"
            :data="data[key]"
            :rootLabel="key"
            :effectiveExpandAll="effectiveExpandAll"
          />
        </template>
      </template>
    </div>
  </div>
</template>
