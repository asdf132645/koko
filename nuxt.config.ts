export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.APP_API_BASE_URL || 'http://localhost:3002',
            mainApiIp: process.env.MAIN_API_IP || 'http://localhost:4000',
        }
    },
    plugins: ['~/plugins/loading.client.ts'],
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/scripts',
        '@nuxt/ui',
        '@nuxtjs/tailwindcss', // Tailwind CSS 모듈 추가
        '@pinia/nuxt',
    ],
    css: [
        // 전역 스타일시트 추가
        '~/assets/css/global.css',
        '~/assets/css/darkMode.css',
        '~/assets/css/default.css',
        '~/assets/css/media-queries.css',
        '~/assets/css/common.css',
    ],
})
