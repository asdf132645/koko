/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{html,js,ts,vue}", // Nuxt 페이지 파일 경로
    "./components/**/*.{html,js,ts,vue}", // Nuxt 컴포넌트 파일 경로
    "./layouts/**/*.{html,js,ts,vue}", // Nuxt 레이아웃 파일 경로
    "./assets/css/**/*.{css}", // CSS 경로
    "./app.vue", // Nuxt 기본 엔트리 파일
  ],
  plugins: [],
};
