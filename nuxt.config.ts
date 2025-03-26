// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.APP_API_BASE_URL || 'http://localhost:3002',
      mainApiIp: process.env.MAIN_API_IP || 'http://localhost:4000',
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/ui'
  ],
  css: [
    // 전역 스타일시트 추가
    '~/assets/css/global.css',
  ],
})