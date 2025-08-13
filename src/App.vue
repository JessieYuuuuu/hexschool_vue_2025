<template>
  <nav-bar />
  <div class="pt-[80px]">
    <div class="h-[calc(100vh-80px)] flex items-center justify-center">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import NavBar from './components/NavBar.vue';
</script>
