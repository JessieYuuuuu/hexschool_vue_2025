<template>
  <div class="flex flex-col items-center justify-center h-full">
    <full-screen-loading :isLoading="loading" />
    <p class="align mb-5 text-xl font-bold">第二周 - 註冊、登入、驗證token，含todolist</p>
    <div class="flex flex-col min-w-[450px] min-h-[300px] bg-amber-200 px-10 py-5 rounded-4xl">
      <template v-if="hasLogin">
        <to-do-list :userInfo="userInfo" v-model:loading="loading" />
        <button type="button" class="mt-auto self-end px-2 py-1 rounded-md bg-orange-600 text-white"
          @click="logOut().then(() => { loading = true; chackLogin() })">
          登出
        </button>
      </template>
      <login-box v-else @login-success="changeUserInfor" />
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { logOut } from "@/api";
import LoginBox from "@/components/LoginBox.vue"
import ToDoList from "@/components/ToDoList.vue"
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import { getAccessToken } from "@/api";
const hasLogin = ref(false);
const loading = ref(true);
const userInfo = ref({ name: 'demo default' })
const token = ref(sessionStorage.getItem('token'));
const changeUserInfor = (data) => {
  if (token) {
    userInfo.value = { name: data.name }
    hasLogin.value = true;
  }
}
const chackLogin = () => {
  getAccessToken().then(res => {
    hasLogin.value = true;
    userInfo.value = { name: localStorage.getItem('nickname') || 'demo default' }
  }).catch(err => {
    console.error('err', err);
    sessionStorage.removeItem('nickname');
    sessionStorage.removeItem('token');
    hasLogin.value = false;
    loading.value = false;
  })
}
onMounted(() => {
  chackLogin();
})
</script>
