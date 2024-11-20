// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', ['@nuxtjs/google-adsense', {
    id: 'ca-pub-7023023584987784',
    onPageLoad: true,
    pageLevelAds: true,
  }]],
  ssr: false,
  app: {
    baseURL: '/watermark-app/', // Replace with your repository name for GitHub Pages
  },
})