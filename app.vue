<template>
  <div class="wrapper">
    <CustomLoading v-if="isLoading"/>
    <NuxtLayout v-bind="layoutProps">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import {computed, ref, onMounted} from "vue";
import {useRoute} from "vue-router";

const isLoading = ref(true);
const route = useRoute();
const router = useRouter();


const layoutProps = computed(() => route.meta.layoutProps || {});
onMounted(() => {
  isLoading.value = true
  router.isReady().then(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 2500)
  })
})



</script>