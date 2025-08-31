<template>
  <div class="flex flex-col gap-3 w-full justify-center items-cente my-2">
    <p class="text-center text-xl font-bold">
      {{ isLogin ? '登入' : '註冊' }} TodoList
    </p>
    <input v-model="userInput.nickname" v-if="!isLogin" type="text" placeholder="請輸入暱稱"
      class="border-2 border-gray-500 rounded-md p-2 w-full">
    <input v-model="userInput.email" type="email" placeholder="請輸入信箱"
      class="border-2 border-gray-500 rounded-md p-2 w-full">
    <input v-model="userInput.password" type="password" placeholder="請輸入密碼"
      class="border-2 border-gray-500 rounded-md p-2 w-full">
  </div>
  <div>
    <button type="button" @click="sumib" class="border-2 border-orange-400 rounded-md p-2 w-full">
      {{ isLogin ? '登入' : '註冊' }}
    </button>
    <div class="mt-2 flex justify-center">
      {{ isLogin ? '尚未註冊？' : '已有帳號？' }}
      <button class="text-blue-900 font-bold" type="button" @click="isLogin = !isLogin">
        {{ isLogin ? '前往註冊' : '回到登入頁' }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { regist, login } from '@/api';
import { successSwal, errorSwal, warningSwal } from '@/utils';
const emits = defineEmits(['login-success']);
const isLogin = ref(true);
const userInput = ref({
  email: 'demo@gmail.com',
  password: 'asdfghjkl;',
  nickname: ''
})
watch(isLogin, () => {
  userInput.value = {
    email: userInput.value.email,
    password: '',
    nickname: ''
  }
})//切換登入註冊頁時清空密碼及暱稱

const sumib = () => {
  if (isLogin.value) {
    // 登入時
    login({
      email: userInput.value.email,
      password: userInput.value.password
    }).then(res => {
      sessionStorage.setItem('token', res.data?.token);
      sessionStorage.setItem('nickname', res.data?.nickname);
      successSwal({ title: '登入成功！' }).then(() => {
        emits('login-success', { name: res.data.nickname })
        userInput.value = {
          email: '',
          password: '',
          nickname: ''
        }
      })
    }).catch(err => {
      errorSwal({ titel: '登入失敗！', text: err?.response?.data?.message ?? '請稍後再試' }).then((result) => {
        if (result.isConfirmed) {
          isLogin.value = false;
          userInput.value = {
            email: userInput.value.email,
            password: '',
            nickname: ''
          }
          return;
        }
      })
    })
  } else {
    // 註冊時
    regist({
      email: userInput.value.email,
      password: userInput.value.password
      , nickname: userInput.value.nickname,
    }).then(res => {
      successSwal({ title: '註冊成功！', confirmButtonText: '點我登入' }).then(() => {
        isLogin.value = true;
        userInput.value = {
          email: userInput.value.email,
          password: '',
          nickname: ''
        }
      })
    }).catch(err => {
      warningSwal({
        title: '註冊失敗！',
        text: err?.response?.data?.message ?? '請稍後再試',
        confirmButtonText: '重新輸入',
      })
    }).then(() => {
      isLogin.value = false;
      userInput.value = {
        email: userInput.value.email,
        password: '',
        nickname: userInput.value.nickname
      }
    })
  }
}//提交處理
</script>
