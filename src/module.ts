import { defineNuxtModule, createResolver, addServerHandler, addImportsDir, addPlugin } from '@nuxt/kit'

export type ModuleOptions = {
  location?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-visitors',
    configKey: 'visitors'
  },
  defaults: {
    location: false
  },
  setup(options: ModuleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/app/composables'))

    addPlugin(resolver.resolve('./runtime/app/plugins/location.server'))

    addServerHandler({
      route: '/.nuxt-visitors/ws',
      handler: resolver.resolve('./runtime/server/routes/visitors'),
    })
  }
})
