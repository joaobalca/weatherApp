import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  plugins: ['~/plugins/userId.js'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
});
