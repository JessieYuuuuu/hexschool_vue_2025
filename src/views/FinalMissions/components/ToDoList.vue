<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half flex flex-col">
    <full-screen-loading :isLoading="loading" />
    <nav>
      <h1>
        <RouterLink to="/" title="回到主頁面">ONLINE TODO LIST</RouterLink>
      </h1>
      <ul>
        <li class="todo_sm"><a href="" @click.prevent=""><span>{{ userName }}的待辦</span></a></li>
        <li>
          <a href="" @click.prevent="signOut">登出
          </a>
        </li>
      </ul>
    </nav>
    <div class="container todoListPage flex-1 min-h-0">
      <div class="todoList_Content flex flex-col h-full min-h-0">
        <todo-input @update:refresh="getData" />
        <div class="todoList_list flex flex-col flex-1 min-h-0  overflow-hidden">
          <ul class="todoList_tab shrink-0">
            <li v-for="opt in statusOption" :key="opt.state"><a href="" @click.prevent="listStatus = opt.state"
                :class="[{ active: listStatus === opt.state }, opt.textColor]">{{ opt.label }}</a>
            </li>
          </ul>
          <div class="todoList_items overflow-auto flex-1 min-h-0">
            <one-list :data="userTodoList" @update:refresh="getData" :listStatus="listStatus"
              v-model:loading="loading" />
          </div>
          <div class="flex justify-end p-3 shadow-[0_-4px_15px_0_rgba(0,0,0,0.1)]">
            <p class="my-2">
              共有
              <span class="text-blue-600 cursor-pointer" @click="listStatus = 'all'">
                {{ userTodoList.length }}
              </span>
              項待辦事項，待完成
              <span class="text-red-600 cursor-pointer" @click="listStatus = 'now'">
                {{userTodoList.filter(item => !item.status).length}}
              </span>
              項，已完成
              <span class="text-green-600 cursor-pointer" @click="listStatus = 'done'">
                {{userTodoList.filter(item => item.status).length}}
              </span>
              項待辦事項，加油！
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import OneList from './OneList.vue';
import TodoInput from './TodoInput.vue';
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import { warningSwal } from '@/utils';
import { getTodoList, logOut } from '@/api'
import router from '@/router';
const userName = ref(sessionStorage.getItem('nickname') || 'Not User')
const loading = ref(false)
const setLoading = (v) => loading.value = v

const signOut = () => {
  warningSwal({ title: '真的要離開嗎？' }).then((result) => {
    if (result.isConfirmed) {
      setLoading(true)
      logOut().then(() => {
        sessionStorage.removeItem('nickname');
        sessionStorage.removeItem('token');
        router.push('/final-todo-list/login-page')
      }).finally(() => setLoading(false))
    } else {
      return
    }
  })
}// 登出

//待辦頁籤設定相關
const statusOption = [
  {
    label: '全部',
    state: 'all',
    textColor: 'text-blue-600'
  },
  {
    label: '待完成',
    state: 'now',
    textColor: 'text-red-600'
  },
  {
    label: '已完成',
    state: 'done',
    textColor: 'text-green-600'
  },
]// 待辦頁籤列
const listStatus = ref('all') // all, done, now

// get userTodo相關
const userTodoList = ref([])
const getData = () => {
  setLoading(true)
  getTodoList().then(res => {
    userTodoList.value = res.data.data
  }).finally(() => {
    setLoading(false)
  })
}// 抓資料

onMounted(() => {
  getData()
})
</script>
<style scoped>
@import "@/assets/normalize.css";
</style>
