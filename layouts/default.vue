<template>
  <div>
    <header v-if="showHeader">
      <div class="flex-row-default">
        <p class="logo">
          <img src="~/assets/img/logo2.png" alt="Logo"/> <span>k<span class="green-text">o</span>k<span
            class="green-text">o</span></span>
        </p>
        <div class="header-ico">
          <span @click="setLocaleF"><img src="https://img.icons8.com/?size=100&id=sGAvHbJsMRn2&format=png&color=4CAF4F"></span>
          <span><img src="https://img.icons8.com/?size=100&id=86305&format=png&color=4CAF4F"></span>
        </div>
      </div>
    </header>
    <header v-if="showArrow">
      <div class="flex-row-default">
        <p class="showArrow" @click="goBack">
          <img src="https://img.icons8.com/?size=100&id=39815&format=png&color=000000"/>
        </p>
      </div>
    </header>

    <slot></slot>

    <nav class="dock-container" v-if="showBottom">
      <div class="dock">
        <img src="https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=4CAF4F" @click="goHome">
        <img src="https://img.icons8.com/?size=100&id=Yj5svDsC4jQA&format=png&color=4CAF4F">
        <img src="https://img.icons8.com/?size=100&id=4aYYHCbDhuo7&format=png&color=4CAF4F">
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {useLanguageStore} from "~/composables/languageStore";
defineProps<{ showHeader?: boolean, showBottom?: boolean, showArrow?:boolean }>();

import {ref, computed} from 'vue';
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
const router = useRouter();
const languageStore = useLanguageStore();
const {locale} = storeToRefs(languageStore);
const {setLocale} = languageStore as {
  t: (key: string) => string;
  setLocale: (lang: 'en' | 'ko') => void;
};
const langVal = ref<'en' | 'ko'>(locale.value);  // 언어를 컴포넌트에서 반응형으로 관리

const setLocaleF = () => {
  console.log(langVal.value)
  langVal.value = langVal.value === 'en' ? 'ko' : 'en';
  setLocale(langVal.value);
}

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  window.history.back() // 브라우저의 뒤로가기 기능을 수행
}
</script>
