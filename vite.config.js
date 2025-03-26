import path from 'path';
import ViteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';

export default {
    build: {
        transpile: ['@nuxtjs/tailwindcss'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'), // Nuxt 3에서 `@`는 프로젝트 루트 디렉토리
            '~': path.resolve(__dirname, './'),
        },
    },
    plugins: [ViteTsconfigPaths()],
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
};
