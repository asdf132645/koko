<template>
    <div class="intro">
      <p>Settle Smart,</p>
      <p>Live Local,</p>
      <p>With koko.</p>
      <button class="buttonDefaultGreen introBtn" type="button" @click="start">Get Start</button>
    </div>
</template>
<script setup lang="ts">
const emits = defineEmits();

const start = () => {
  emits('introValChange')
}

</script>