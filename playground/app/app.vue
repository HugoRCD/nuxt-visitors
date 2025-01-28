<script setup lang="ts">
useHead({
  title: 'Nuxt Visitors',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'charset', content: 'utf-8' },
    { name: 'robots', content: 'index, follow' },
    { name: 'color-scheme', content: 'light dark' }
  ]
})

const { visitors, myLocation, locations } = useVisitors()
</script>

<template>
  <Html lang="en">
    <Body class="relative overflow-hidden">
      <UApp>
        <div class="absolute top-4 right-4">
          <ColorModeButton />
        </div>
        <div class="overflow-hidden flex size-full flex-col items-center sm:justify-center px-4 py-8 lg:py-16">
          <div class="font-mono italic text-gradient sm:text-center sm:items-center font-semibold flex flex-col gap-2">
            <UIcon name="i-simple-icons-nuxtdotjs" class="size-14 text-white" />
            <h1 class="sm:text-7xl text-5xl">
              Nuxt Visitors
            </h1>
            <p class="text-neutral-500 text-2xl">
              Current visitors: {{ visitors }}
            </p>
          </div>
          <Globe
            :my-location
            :locations
            class="mx-auto aspect-[1/1] w-[600px] sm:w-full sm:max-w-[1000px]"
          />
          <div
            class="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"
          />
        </div>
      </UApp>
    </Body>
  </Html>
</template>
