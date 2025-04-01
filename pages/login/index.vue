<template>
  <div class="login-page">
    <button @click="loginWithGoogle">Google로 로그인하기</button>
  </div>
</template>

<script setup lang="ts">
const loginWithGoogle = () => {
  window.location.href = '/api/auth/signin/google';
}
</script>
