<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const layoutProps = computed(() => route.meta.layoutProps || {});
</script>

<template>
  <div class="wrapper">
    <NuxtLayout v-bind="layoutProps">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
