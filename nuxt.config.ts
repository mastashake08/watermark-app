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
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxt Watermark Creator',
      short_name: 'Watermark',
      description: 'Easily create image and text watermarks.',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/nuxt-watermark/', // Align with baseURL
      icons: [
        {
          src: '/nuxt-watermark/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/nuxt-watermark/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
})