<script setup lang="ts">
const isTrashPage = computed(() => useRoute().name === "trash");
</script>

<template>
  <SidebarProvider>
    <AppSidebar v-if="!isTrashPage" />
    <main class="w-full bg-gray-50 dark:bg-gray-900">
      <AppHeader />
      <NuxtPage />

      <p
        class="fixed bottom-4 right-4 text-sm text-gray-400 dark:text-gray-600"
      >
        Built by
        <a href="https://abdspace.xyz" target="_blank" class="font-bold">ABD</a>
      </p>
    </main>

    <UModals />
    <UNotifications />
  </SidebarProvider>
</template>
