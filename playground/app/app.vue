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

watch(visitors, () => {
  useHead({
    title: `Nuxt Visitors | ${visitors.value}`
  })
})
</script>

<template>
  <Html lang="en">
    <Body class="relative overflow-hidden">
      <UApp>
        <div class="absolute top-4 right-4 sm:left-4">
          <ColorModeButton />
        </div>
        <div class="overflow-hidden flex size-full max-md:flex-col items-center px-4 py-8 lg:py-16">
          <div class="font-mono italic text-black dark:text-white font-semibold flex flex-col gap-2">
            <UIcon name="i-simple-icons-nuxtdotjs" class="size-14 text-black dark:text-white" />
            <h1 class="sm:text-7xl text-5xl max-w-md">
              Nuxt Visitors
            </h1>
            <p class="text-neutral-500 text-2xl">
              Current visitors: {{ visitors }}
            </p>
            <div class="mt-4">
              <UButton
                icon="i-simple-icons-github"
                label="GitHub"
                to="https://github.com/HugoRCD/nuxt-visitors"
                target="_blank"
                color="neutral"
                variant="ghost"
              />
            </div>
          </div>
          <Globe
            :my-location
            :locations
            class="sm:absolute mx-auto aspect-[1/1] w-[600px] sm:w-full lg:max-w-[1200px] sm:right-0 sm:translate-x-1/3"
          />
          <div
            class="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"
          />
        </div>
        <span class="text-neutral-500 dark:text-neutral-400 text-xs absolute bottom-4 left-4 italic font-mono">
          Made by <ULink to="https://x.com/hugorcd__">@HugoRCD__</ULink> and <ULink to="https://x.com/atinux">@Atinux</ULink>
        </span>
      </UApp>
    </Body>
  </Html>
</template>
