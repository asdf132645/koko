<template>
  <div class="wrapper">
    <CustomLoading v-if="isLoading"/>
    <NuxtLayout v-bind="layoutProps" v-if="!isLoading" >
      <Intro  @introValChange="introValChange" v-if="introShow"/>
      <NuxtPage v-if="mainPageShow"/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import Intro from "~/pages/intro/intro.vue";


const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const introShow = ref(false);
const mainPageShow = ref(false);

const layoutProps = computed(() => route.meta.layoutProps || {});
onMounted(() => {
  isLoading.value = true
  introShow.value = false

  router.isReady().then(() => {
    setTimeout(() => {
      isLoading.value = false;
      introShow.value = true;  // 로딩이 끝난 후에 Intro를 보여주도록 설정
    }, 1500);
  })
})

const introValChange = () => {
  introShow.value = false;
  mainPageShow.value = true;
  router.push('/intro/currently');
  route.meta.layoutProps = {
    showHeader: false,
    showBottom: false
  };
}
</script>
