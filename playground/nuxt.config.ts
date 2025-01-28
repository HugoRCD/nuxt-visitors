export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-28',
  nitro: {
    experimental: {
      websocket: true
    }
  }
})
