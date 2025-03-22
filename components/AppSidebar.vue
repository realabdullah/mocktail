<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ViewsByDate from "@/components/Views/ByDate.vue";
import ViewsByTags from "@/components/Views/ByTags.vue";
import ViewsByStarred from "@/components/Views/ByStarred.vue";
import { motion } from "motion-v";

const activeTab = ref(0);
const items = [
  { label: "By Date", icon: "i-heroicons-calendar-20-solid", key: "date" },
  { label: "By Tag", icon: "i-heroicons-tag", key: "tag" },
  { label: "Starred", icon: "i-heroicons-star", key: "starred" },
];

const components: any[] = [ViewsByDate, ViewsByTags, ViewsByStarred];

const { showStarredItems, searchQuery, selectedDate, selectedTag } =
  storeToRefs(useStore());
watch(
  () => activeTab.value,
  (val) => {
    items.forEach(({ key }, index) => {
      if (val !== index) {
        if (key === "date") selectedDate.value = "";
        if (key === "tag") selectedTag.value = "";
        if (key === "starred") showStarredItems.value = false;
      }
    });
    if (val === 2) showStarredItems.value = true;
  }
);
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <div
        class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
      >
        <h1 class="text-xl font-bold flex items-center">mockTail 🪄</h1>
      </div>

      <div class="p-3 border-b border-gray-200 dark:border-gray-700">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          color="white"
          :trailing="false"
          placeholder="Search..."
        />
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <div class="p-3 border-b border-gray-200 dark:border-gray-700">
            <ClientOnly>
              <UTabs v-model="activeTab" :items="items">
                <template #item>
                  <component :is="components[activeTab]" />
                  <!-- <AnimatePresence mode="wait" :initial="false">
                    <motion.div
                      v-if="item.key === 'date'"
                      key="dates"
                      :initial="{ opacity: 0, y: -10 }"
                      :animate="{ opacity: 1, y: 0 }"
                      :exit="{ opacity: 0, y: -10 }"
                      :transition="{ duration: 0.2 }"
                      class="p-2"
                    >
                    </motion.div>
                  </AnimatePresence> -->
                </template>
              </UTabs>
            </ClientOnly>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>
