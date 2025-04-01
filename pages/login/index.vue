<template>
  <div class="login-page">
    <button @click="loginWithGoogle">Google</button>
  </div>
</template>

<script setup lang="ts">
const loginWithGoogle = () => {
  window.location.href = '/api/auth/signin/google';
}
</script>
