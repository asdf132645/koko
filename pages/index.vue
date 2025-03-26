<template>
  <div>
    <h2>홈페이지</h2>
    <!-- 동적으로 번역된 메시지 출력 -->
    <p>{{ t('welcome') }}</p>

    <!-- 다크 모드 토글 버튼 -->
    <button @click="toggleDarkMode" class="p-2 bg-red-950 dark:bg-gray-700 rounded">
      Toggle Dark Mode
    </button>

    <!-- 언어 선택 버튼 -->
    <button @click="setLocale('ko')">한국어</button>
    <button @click="setLocale('en')">English</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { languageStore } from '~/composables/languageStore'; // languageStore 불러오기

const { t, setLocale } = languageStore(); // t와 setLocale 가져오기
definePageMeta({
  layoutProps: { showHeader: false }
});
// 다크 모드 상태
const isDarkMode = ref(false);

// 페이지가 로드되면, localStorage에서 다크 모드 상태를 확인
onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  }
});

// 다크 모드 토글 함수
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  // localStorage에 상태 저장
  localStorage.setItem('darkMode', isDarkMode.value.toString());
};
</script>
