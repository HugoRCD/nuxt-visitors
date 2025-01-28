import { defineNuxtModule, createResolver, addServerHandler, addImportsDir } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@shelve/visitors',
    configKey: 'visitors'
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('runtime/composables'))

    addServerHandler({
      route: '/api/_visitors_/ws',
      handler: resolver.resolve('./runtime/server/api/visitors.ts')
    })
  }
})
