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
    server: {
        hmr: {
            clientPort: 443, // 서버 포트 설정 (필요시 변경)
            overlay: false,  // 에러 오버레이 비활성화
            logLevel: 'warn', // HMR 관련 로그의 레벨을 warn으로 설정
        },
    },
    logLevel: 'warn',  // 전체 로그 레벨을 warn으로 설정
    vue: {
        config: {
            productionTip: false,  // Vue의 productionTip 메시지를 비활성화
            devtools: false,       // 개발자 도구 관련 메시지를 비활성화
        },
    },
};
