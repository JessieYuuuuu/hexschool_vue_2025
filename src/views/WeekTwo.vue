<template>
  <div class="flex flex-col items-center justify-center h-full">
    <p class="align mb-5 text-xl font-bold">第二周 - 註冊、登入、驗證token，含todolist</p>
    <div class="flex flex-col justify-between min-w-[450px] min-h-[300px] bg-amber-200 p-10 rounded-4xl">
      <div v-if='hasLogin'>
        <p>登入成功顯示</p>
        <p>{{ userInfo.name }}，歡迎回來！</p>
      </div>
      <login-box v-else @login-success="changeUserInfor" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginBox from "@/components/LoginBox.vue"
const hasLogin = ref(false);
const userInfo = ref({ name: '', email: '' })
const changeUserInfor = (data) => {
  console.log('changeUserInfor', data);
  const token = localStorage.getItem('token');
  if (token) {
    console.log('有token');
    userInfo.value = { name: data.name, email: data.email }
    hasLogin.value = true;
  }
}
</script>
