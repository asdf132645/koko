<template>
    <div class="intro">
      <p>Settle Smart,</p>
      <p>Live Local,</p>
      <p>With koko.</p>
      <button class="buttonDefaultGreen introBtn" type="button" @click="start">Get Start</button>
    </div>
</template>
<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute} from "vue-router";
const route = useRoute();

onMounted(() => {
  route.meta.layoutProps = {
    showHeader: false,
    showBottom: false
  };
});
const emits = defineEmits();

const start = () => {
  emits('introValChange')
}

</script>