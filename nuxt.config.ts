
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    runtimeConfig: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authSecret: process.env.AUTH_SECRET,
        public: {
            apiBaseUrl: process.env.NODE_ENV === 'production'
                ? 'https://jsonplaceholder.typicode.com'
                : 'http://localhost:3002',
        },
    },

    plugins: ['~/plugins/loading.client.ts'],
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/scripts',
        '@nuxt/ui',
        '@pinia/nuxt',
    ],
    typescript: {
        strict: true,
        shim: false // 또는 true로 설정해도 괜찮음
    },
    build: {
        transpile: [ 'swiper']
    },
    css: [
        // 전역 스타일시트 추가
        '~/assets/css/global.css',
        '~/assets/css/darkMode.css',
        '~/assets/css/default.css',
        '~/assets/css/media-queries.css',
        '~/assets/css/common.css',
        'swiper/swiper-bundle.css'
    ],

})
