<template>
  <section>
    <p class="welcome-title">{{ t('welcome') }}</p>
    <p class="welcome-title2">{{ t('welcome2') }}</p>

    <button class="width100 mt-2">{{ t('welcomeBtnStart') }}</button>
    <button class="width100 mt-1 whiteBtn">{{ t('welcomeBtnGuide') }}</button>
  </section>

  <hr class="border-line"/>
  <section>
    <!-- Swiper 컴포넌트 추가 -->
    <div>
      <swiper-container
          :pagination="true"
          :navigation="true">
        <swiper-slide>
          <div class="slide-div-box">Slide 1</div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-div-box">Slide 2</div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-div-box">Slide 3</div>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
  <section>
    <div class="section-body">
      <ul class="welcome-list">
        <li class="welcome-item">
          <p>
            <img src="https://img.icons8.com/?size=100&id=47789&format=png&color=28CB8B">
          </p>
          <div class="welcome-item-title">{{ t('map') }}</div>
          <div>{{ t('mapDetail') }}</div>
        </li>
        <li class="welcome-item">
          <p>
            <img src="https://img.icons8.com/?size=100&id=20399&format=png&color=28CB8B">
          </p>
          <div class="welcome-item-title">{{ t('guide') }}</div>
          <div>{{ t('guideDetail') }}</div>
        </li>
        <li class="welcome-item">
          <p>
            <img src="https://img.icons8.com/?size=100&id=YwDrzldhsBCu&format=png&color=28CB8B">
          </p>
          <div class="welcome-item-title">{{ t('kit') }}</div>
          <div>{{ t('kitDetail') }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useLanguageStore } from '~/composables/languageStore';
import { storeToRefs } from 'pinia';
import {useBanner} from "~/composables/useBanner";
import {getBannerListFetch} from "~/server/services/banner/serviceBanner";
interface Slide {
  title: string;
  imageUrl: string;
}

// Pinia store 가져오기
const languageStore = useLanguageStore();

// storeToRefs로는 반응형 상태만 가져오므로, t와 setLocale은 직접 가져와야 함
const { t, setLocale, locale } = languageStore;

// 다크 모드 상태
const isDarkMode = ref(false);
const slides = ref<Slide[]>([]); // 슬라이드 데이터 저장할 변수

// 페이지가 로드되면, localStorage에서 다크 모드 상태와 언어 설정을 확인
onMounted(() => {
  // 다크 모드 상태 확인
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  }

  // 로컬 스토리지에서 언어를 가져와서 설정
  const lang = (localStorage.getItem('currentLanguage') as 'en' | 'ko') || 'en';  // 타입 단언 추가
  setLocale(lang);
  // fetchSlides();
  console.log('getBannerListAxios', fetchSlides());
});

// 언어가 변경될 때마다 로컬 스토리지에 저장
watch(() => locale, (newLang) => {
  setLocale(newLang);
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
  layoutProps: { showHeader: true },
});


const fetchSlides = async () => {
  try {
    const response = await useBanner();  // 서버에서 배너 데이터 가져오기
    slides.value = response?.data || [];  // data가 있으면 slides에 저장, 없으면 빈 배열
  } catch (error) {
    console.error('Failed to fetch slides:', error);
  }
};


</script>
