<template>
  <div class="flex flex-col items-center justify-center h-full">
    <p class="align mb-5 text-xl font-bold">第二周 - 註冊、登入、驗證token，含todolist</p>
    <div class="flex flex-col justify-between min-w-[450px] min-h-[300px] bg-amber-200 p-10 rounded-4xl">
      <login-box />
    </div>
  </div>
</template>

<script setup>
import LoginBox from "@/components/LoginBox.vue";</script>
