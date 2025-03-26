<template>
  <div>
    <!-- 헤더 -->
    <header>
      <nav>
        <ul>
          <li><a href="/">홈</a></li>
          <li><a href="/about">소개</a></li>
          <li><a href="/contact">연락처</a></li>
        </ul>
      </nav>
    </header>

    <!-- 페이지 콘텐츠 -->
    <main>
      <slot />
    </main>

    <!-- 바텀 메뉴 -->
    <footer>
      <ul>
        <li><a href="/terms">이용약관</a></li>
        <li><a href="/privacy">개인정보 보호</a></li>
        <li><a href="/contact">문의하기</a></li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
</script>
