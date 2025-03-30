<template>
  <div>
    <header v-if="showHeader">
      <div class="flex-row-default">
        <p class="logo">koko</p>
        <div class="header-ico">
          <span @click="setLocaleF"><img src="https://img.icons8.com/?size=100&id=sGAvHbJsMRn2&format=png&color=28CB8B"></span>
          <span><img src="https://img.icons8.com/?size=100&id=86305&format=png&color=28CB8B"></span>
        </div>
      </div>
    </header>

    <main>
      <slot></slot>
    </main>

    <nav class="dock-container">
      <div class="dock">
        <img src="https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=28CB8B">
        <img src="https://img.icons8.com/?size=100&id=Yj5svDsC4jQA&format=png&color=28CB8B">
        <img src="https://img.icons8.com/?size=100&id=4aYYHCbDhuo7&format=png&color=28CB8B">
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {useLanguageStore} from "~/composables/languageStore";

const languageStore = useLanguageStore();
import { ref, computed } from 'vue';
import {storeToRefs} from "pinia";

defineProps<{ showHeader?: boolean }>();
const { locale  } = storeToRefs(languageStore);
const { setLocale } = languageStore as {
  t: (key: string) => string;
  setLocale: (lang: 'en' | 'ko') => void;
};
const langVal = ref<'en' | 'ko'>(locale.value);  // 언어를 컴포넌트에서 반응형으로 관리

const setLocaleF = () => {
  langVal.value = langVal.value === 'en' ? 'ko' : 'en';
  setLocale(langVal.value);
}



</script>
