<template>
  <div>
    <header v-if="showHeader">
      <h1>커스텀 레이아웃 헤더</h1>
    </header>

    <main>
      <slot></slot>
    </main>

    <nav class="dock-container">
      <div class="dock">
        <img src="https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=28CB8B">
        <img src="https://img.icons8.com/?size=100&id=Yj5svDsC4jQA&format=png&color=28CB8B">
        <img src="https://img.icons8.com/?size=100&id=4aYYHCbDhuo7&format=png&color=28CB8B">
        <img src="https://img.icons8.com/?size=100&id=86305&format=png&color=28CB8B">
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps<{ showHeader?: boolean }>();
</script>
