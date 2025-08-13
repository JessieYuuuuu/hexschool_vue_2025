<template>
  <div class="flex flex-col gap-3 w-full justify-center items-cente my-2">
    <p class="text-center text-xl font-bold">{{ isLogin ? '登入' : '註冊' }} TodoList </p>
    <input type="email" placeholder="請輸入信箱" class="border-2 border-gray-500 rounded-md p-2 w-full">
    <input type="password" placeholder="請輸入密碼" class="border-2 border-gray-500 rounded-md p-2 w-full">
    <input v-if="!isLogin" type="text" placeholder="請輸入暱稱" class="border-2 border-gray-500 rounded-md p-2 w-full">
  </div>
  <div>
    <button type="button" class="border-2 border-orange-400 rounded-md p-2 w-full">{{ isLogin ? '登入' : '註冊' }}</button>
    <div class="mt-2 flex justify-center">
      {{ isLogin ? '尚未註冊？' : '已有帳號？' }}<button class="text-blue-900 font-bold" type="button"
        @click="isLogin = !isLogin">{{ isLogin ? '前往註冊' : '回到登入頁' }}</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const isLogin = ref(true);
const userInfo =ref(null)
</script>
