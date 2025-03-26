<template>
  <div>
    <!-- 커스텀 레이아웃의 헤더 -->
    <header>
      <h1>커스텀 레이아웃 헤더</h1>
    </header>

    <!-- 페이지 콘텐츠는 여기에 삽입 -->
    <main>
      <slot></slot>
    </main>

    <!-- 커스텀 레이아웃의 푸터 -->
    <footer>
      <p>커스텀 레이아웃 푸터</p>
    </footer>
  </div>
</template>

