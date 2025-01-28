import { defineNuxtModule, createResolver, addServerHandler, addImportsDir } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-visitors',
    configKey: 'visitors'
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/app/composables'))

    addServerHandler({
      route: '/.nuxt-visitors/ws',
      handler: resolver.resolve('./runtime/server/routes/visitors.ts')
    })
  }
})
