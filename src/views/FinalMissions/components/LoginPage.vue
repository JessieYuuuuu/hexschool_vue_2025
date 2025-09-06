<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <full-screen-loading :isLoading="loading" />
    <div class="container loginPage h-screen">
      <div class="side">
        <RouterLink to="/" title="回到主頁面"><img class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt="">
        </RouterLink>
        <img class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg">
      </div>
      <div>
        <form class="formControls" @submit.prevent="debounceSubmit">
          <h2 class="formControls_txt">{{ isLogin ? '最實用的線上代辦事項服務' : '註冊帳號' }}</h2>
          <template v-for="input in inputList" :key="input.key">
            <text-input :modelValue="userInput[input.key]" v-if="input.show" :label="input.label" :type="input.key"
              :labelKey="input.key" @update:input="val => debounceInput(input.key, val)" required
              :error="errors[input.key]" :errorText="errorTexts[input.key]" @updata:change="debounceCheck" />
          </template>
          <input class="formControls_btnSubmit" type="submit" @click="debounceSubmit" :value="isLogin ? '登入' : '註冊帳號'">
          <p class="formControls_btnLink">{{ isLogin ? '沒' : '已' }}有帳號？
            <a @click="isLogin = !isLogin" class="text-blue-800 hover:text-blue-500 cursor-pointer">點我{{ isLogin ?
              '註冊'
              : '登入' }}</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { regist, login } from '@/api';
import { useRouter } from 'vue-router';
const router = useRouter();
import { successSwal, errorSwal, warningSwal } from '@/utils';
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import TextInput from './TextInput.vue'
import debounce from 'lodash/debounce';
const isLogin = ref(true);// 頁面狀態切換
const loading = ref(false)
const setLoading = (v) => loading.value = v
const inputList = computed(() => [
  { label: 'Email', key: 'email', type: 'email', required: true, show: true },
  { label: '暱稱', key: 'nickname', type: 'text', required: false, show: !isLogin.value },
  { label: '密碼', key: 'password', type: 'password', required: true, show: true },
  { label: '再次輸入密碼', key: 'passwordCheck', type: 'password', required: false, show: !isLogin.value },
])
const userInput = ref({
  email: '',
  nickname: '',
  password: '',
  passwordCheck: ''
});// 使用者資料
const errors = ref({
  email: false,
  nickname: false,
  password: false,
  passwordCheck: false
});// 驗證錯誤狀態
const errorTexts = ref({
  email: '格式錯誤',
  nickname: '格式錯誤',
  password: '格式錯誤',
  passwordCheck: '與密碼不符'
});// 驗證錯誤提示

const inputReset = () => {
  userInput.value = {
    email: userInput.value.email,
    nickname: '',
    password: '',
    passwordCheck: ''
  }
}
const onSubmit = () => {
  setLoading(true)
  if (isLogin.value) {
    // 登入時
    login({
      email: userInput.value.email,
      password: userInput.value.password
    }).then(res => {
      sessionStorage.setItem('token', res.data?.token);
      sessionStorage.setItem('nickname', res.data?.nickname);
      successSwal({ title: '登入成功！' }).then(() => {
        userInput.value = {
          email: '',
          password: '',
          nickname: ''
        }
        router.push('/final-todo-list/to-do-list');
      })
    }).catch(err => {
      errorSwal({
        titel: '登入失敗！', text: err?.response?.data?.message ?? '請稍後再試', confirmButtonText: '前往註冊',
        cancelButtonText: '我再想想',
      }).then((result) => {
        if (result.isConfirmed) {
          isLogin.value = false;
          inputReset();
          return;
        }
      })
    }).finally(() => setLoading(false))
  } else {
    // 註冊時
    regist({
      email: userInput.value.email,
      password: userInput.value.password
      , nickname: userInput.value.nickname,
    }).then(() => {
      successSwal({ title: '註冊成功！', confirmButtonText: '點我登入' }).then(() => {
        isLogin.value = true;
        inputReset()
      })
    }).catch(err => {
      warningSwal({
        title: '註冊失敗！',
        text: err?.response?.data?.message ?? '請稍後再試！',
        confirmButtonText: '重新輸入',
      }).then(() => {
        userInput.value = {
          email: userInput.value.email,
          password: '',
          nickname: userInput.value.nickname
        }
      })
    }).finally(() => setLoading(false))
  }
}// 提交處理

// 輸入框相關
const debounceInput = debounce((type, val) => { inputUpdata(type, val) }, 300); // 防抖更新輸入框
const debounceCheck = debounce((type) => { inputCheck(type) }, 300); // 防抖驗證輸入框
const debounceSubmit = debounce(() => { onSubmit() }, 300); // 防抖驗證輸入框
const inputUpdata = (type, val) => {
  userInput.value[type] = val;
}
const inputCheck = (type) => {
  console.log('type', type)
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  if (type === 'email') {
    errors.value.email = !emailRegex.test(userInput.value.email);
    if (errors.value.email) {
      errorTexts.value.email = '請輸入正確的 Email 格式';
    }
    return
  }
  if (type === 'nickname') {
    errors.value.nickname = userInput.value.nickname.length < 1 || userInput.value.nickname.length > 20;
    if (errors.value.nickname) {
      errorTexts.value.nickname = '暱稱長度需介於1~20字元';
    }
    return
  }
  if (type === 'password') {
    errors.value.password = !passwordRegex.test(userInput.value.password);
    if (errors.value.password) {
      errorTexts.value.password = '密碼需包含英文及數字，長度6~20字元';
    }
    return
  }
  if (type === 'passwordCheck' && !isLogin.value) {
    errors.value.passwordCheck = userInput.value.password !== userInput.value.passwordCheck;
    if (errors.value.passwordCheck) {
      errorTexts.value.passwordCheck = '兩次密碼不相符，請重新確認';
    }
    return
  }
}// 輸入驗證邏輯

watch(isLogin, () => {
  errors.value = {
    nickname: false,
    password: false,
    passwordCheck: false
  };
  inputReset()
  if (userInput.value.email !== '') inputCheck('email')
})// 切換登入註冊時清空暱稱及密碼，並再次觸發email驗證
</script>
<style scoped>
@import "@/assets/normalize.css";
</style>
