<template>
  <nav-bar :list="navLinks" />
  <div class="h-[calc(100vh-80px)] flex items-center justify-center overflow-y-auto py-10">
    <RouterView />
  </div>
</template>
<script setup>
import NavBar from './components/NavBar.vue';
const navLinks = [
  { name: '首頁', path: '/' },
  { name: '第一周作業', path: '/week-one' },
  { name: '第二周作業', path: '/week-two' },
  { name: '第三周作業', path: '/week-three' },
  { name: '進階作業', path: '/advanced-missions' },
  { name: '最終任務', path: '/final-missions' },
];
</script>
