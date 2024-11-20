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
      scope:'/watermark-app',
      start_url: '/watermark-app/', // Align with baseURL
      icons: [
        {
          src: '/watermark-app/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/watermark-app/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
})