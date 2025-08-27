<template>
  <div class="flex flex-col gap-3 w-full justify-center items-cente my-2">
    <p class="text-center text-xl font-bold">
      {{ isLogin ? '登入' : '註冊' }} TodoList
    </p>
    <input v-model="userInput.email" type="email" placeholder="請輸入信箱"
      class="border-2 border-gray-500 rounded-md p-2 w-full">
    <input v-model="userInput.password" type="password" placeholder="請輸入密碼"
      class="border-2 border-gray-500 rounded-md p-2 w-full">
    <input v-model="userInput.nickname" v-if="!isLogin" type="text" placeholder="請輸入暱稱"
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
import Swal from "sweetalert2";
const isLogin = ref(true);
const userInput = ref({
  email: '',
  password: '',
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
      console.log(res);
      localStorage.setItem('token', res.data.token);
      window.location.reload();
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: '登入失敗！',
        text: err.response.data.message,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: '前往註冊',
        cancelButtonText: '我再想想',
        iconColor: '#ff0000',
        buttonsStyling: false,
        customClass: {
          cancelButton: 'btn btn-danger',
          confirmButton: 'btn btn-success',
          popup: 'swal-popup',
          icon: 'swal-error-icon'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          isLogin.value = false;
          userInput.value = {
            email: userInput.value.email,
            password: '',
            nickname: ''
          }
          return;
        }
        console.log(err);
      })
    })
  } else {
    // 註冊時
    regist({
      email: userInput.value.email,
      password: userInput.value.password
      , nickname: userInput.value.nickname,
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}//提交處理
</script>
<style lang="css" scoped>
/* swal樣式處理 */
/* 按鈕共用 */
:global(.btn) {
  width: 120px;
  height: 50px;
  border-radius: 30px;
  margin: 0 15px;
}

/* 正向按鈕 */
:global(.btn-success) {
  background: #165DFF;
  color: #fff;
}

/* 負向按鈕 */
:global(.btn-danger) {
  background: #dc2626;
  color: #fff;
}

/* 按鈕外框 */
:global(.swal-popup) {
  padding: 15px 30px;
  border-radius: 30px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  height: 380px;
}

/* 負向icon */
:global(.swal-error-icon) {
  border-color: #ff0000 !important;
}

:global(.swal-error-icon .swal2-x-mark-line-left),
:global(.swal-error-icon .swal2-x-mark-line-right) {
  background-color: #ff0000 !important;
}
</style>
