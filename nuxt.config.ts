// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "mockTail 🪄 - typescript mock data generator",
      meta: [
        {
          name: "description",
          content:
            "Generate mock data instantly with Mocktail! Paste your TypeScript types and get mock arrays, objects, and more in seconds. Perfect for frontend developers and rapid prototyping.",
        },
        { name: "author", content: "ABD" },
        {
          name: "keywords",
          content:
            "mock data generator, mocktail tool, TypeScript mock data, frontend workflows, data generation tool, fake data for developers, schema-based mock data, developer productivity tool, TypeScript workflows",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "motion-v/nuxt",
    "@pinia/nuxt",
  ],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  fonts: { families: [{ name: "Inter", provider: "google", global: true }] },
  shadcn: { prefix: "", componentDir: "./components/ui" },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
  },
  colorMode: { classSuffix: "" },
});