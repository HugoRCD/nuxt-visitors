import { defineNuxtModule, createResolver, addServerHandler, addImportsDir } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-visitors',
    configKey: 'visitors'
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Enable WebSocket support
    nuxt.options = nuxt.options || {}
    nuxt.options.nitro = nuxt.options.nitro || {}
    nuxt.options.nitro.experimental = nuxt.options.nitro.experimental || {}
    nuxt.options.nitro.experimental.websocket = true

    addImportsDir(resolver.resolve('runtime/composables'))

    addServerHandler({
      route: '/api/_visitors_/ws',
      handler: resolver.resolve('./runtime/server/api/visitors.ts')
    })
  }
})
