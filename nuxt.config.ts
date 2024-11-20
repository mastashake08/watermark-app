// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', ['@nuxtjs/google-adsense', {
    id: 'ca-pub-7023023584987784',
    onPageLoad: false,
    pageLevelAds: false,
  }], '@vite-pwa/nuxt'],
  ssr: false,
  app: {
    baseURL: '/watermark-app/', // Replace with your repository name for GitHub Pages
  },
  pwa: {
    registerType: 'autoUpdate', // Automatically update the service worker
    manifest: {
      name: 'Nuxt Watermark Creator',
      short_name: 'Watermark',
      description: 'Create image and text watermarks easily with Nuxt.',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/watermark-app',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
})