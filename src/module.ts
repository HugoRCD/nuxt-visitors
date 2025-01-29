import { defineNuxtModule, createResolver, addServerHandler, addImportsDir, addPlugin } from '@nuxt/kit'

export type ModuleOptions = {
  /**
   * Allows for the anonymous tracking of current visitors' locations.
   * The composable `useVisitors` will provide the visitor count along with an additional `locations` array and a `myLocation` object that contains the visitors' locations.
   * @default false
   */
  locations?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-visitors',
    configKey: 'visitors'
  },
  defaults: {
    locations: false
  },
  setup(options: ModuleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/app/composables'))

    if (options.locations) {
      addPlugin(resolver.resolve('./runtime/app/plugins/location.server'))

      addServerHandler({
        route: '/.nuxt-visitors/ws',
        handler: resolver.resolve('./runtime/server/routes/locations'),
      })
    } else {
      addServerHandler({
        route: '/.nuxt-visitors/ws',
        handler: resolver.resolve('./runtime/server/routes/visitors'),
      })
    }
  }
})
