<template>
  <nav-bar v-if="!isInFinalMission" :list="navLinks" />
  <div :class="!isInFinalMission ? 'h-[calc(100vh-80px)] flex items-center justify-center overflow-y-auto py-10' : ''">
    <RouterView />
  </div>
</template>
<script setup>
import NavBar from './components/NavBar.vue';
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// 根據路由決定是否顯示navBar
const isInFinalMission = computed(() => { return route.matched[0]?.name === '最終任務' });

const navLinks = [
  { name: '首頁', path: '/' },
  { name: '第一周作業', path: '/week-one' },
  { name: '第二周作業', path: '/week-two' },
  { name: '第三周作業', path: '/week-three' },
  { name: '進階作業', path: '/advanced-missions' },
  { name: '最終任務', path: '/final-todo-list' },
];
</script>
