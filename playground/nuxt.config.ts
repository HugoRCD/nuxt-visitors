export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/ui',
    '@nuxthub/core',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-28',

  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    experimental: {
      websocket: true
    }
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons'
      },
      {
        prefix: 'nucleo',
        dir: './app/assets/icons/nucleo'
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    },
    provider: 'iconify'
  },
})