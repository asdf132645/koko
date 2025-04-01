import 'swiper/swiper-bundle.css';

export default defineNuxtPlugin(async (nuxtApp) => {
    // 기존의 app:mounted 훅을 유지하면서 Swiper 등록 추가
    // Swiper 등록을 추가 (클라이언트 사이드에서만 실행)
    if (process.client) {
        const {register} = await import('swiper/element/bundle'); // 동적 import로 Swiper 등록
        register();
    }
});
