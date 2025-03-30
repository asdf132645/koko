<template>
  <section>
    <p class="welcome-title">{{ t('welcome') }}</p>
    <p class="welcome-title2">{{ t('welcome2') }}</p>

    <button class="width100 mt-2">{{t('welcomeBtnStart')}}</button>
    <button class="width100 mt-1 whiteBtn">{{t('welcomeBtnGuide')}}</button>

  </section>
  <hr class="border-line"/>
  <section>
    <div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLanguageStore } from '~/composables/languageStore';
import { storeToRefs } from 'pinia';

// Pinia store 가져오기
const languageStore = useLanguageStore();

// storeToRefs로는 오직 반응형 상태만 가져오므로, t와 setLocale은 직접 가져와야 함
const { locale } = storeToRefs(languageStore);

// t와 setLocale의 타입을 명확하게 지정
const { t, setLocale } = languageStore as {
  t: (key: string) => string;
  setLocale: (lang: 'en' | 'ko') => void;
};

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

definePageMeta({
  layoutProps: { showHeader: true }
});

</script>
