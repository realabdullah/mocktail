<script setup lang="ts"></script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full bg-gray-50 dark:bg-gray-900">
      <AppHeader />
      <NuxtPage />
    </main>

    <UNotifications />
  </SidebarProvider>
</template>
