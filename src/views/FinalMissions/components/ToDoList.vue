<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half flex flex-col">
    <full-screen-loading :isLoading="loading" />
    <nav>
      <h1>
        <RouterLink to="/" title="回到主頁面">ONLINE TODO LIST</RouterLink>
      </h1>
      <ul>
        <li class="todo_sm"><a href="" @click.prevent=""><span>{{ userName }}的代辦</span></a></li>
        <li>
          <a href="" @click.prevent="logOut">登出
          </a>
        </li>
      </ul>
    </nav>
    <div class="container todoListPage flex-1 min-h-0">
      <div class="todoList_Content flex flex-col h-full min-h-0">
        <div class="inputBox shrink-0">
          <input type="text" v-model="todoContent" @keyup.enter="addToDo" placeholder="請輸入待辦事項">
          <a href="" @click.prevent="addToDo" class="flex justify-center items-center">
            <el-icon class="top-[-3px]">
              <Plus />
            </el-icon>
          </a>
        </div>
        <div class="todoList_list flex flex-col flex-1 min-h-0  overflow-hidden">
          <ul class="todoList_tab shrink-0">
            <li v-for="opt in statusOption" :key="opt.state"><a href="" @click.prevent="listStatus = opt.state"
                :class="[{ active: listStatus === opt.state }, opt.textColor]">{{ opt.label }}</a>
            </li>
          </ul>
          <div class="todoList_items overflow-auto flex-1 min-h-0">
            <ul class="todoList_item">
              <li v-for="item in filterList" :key="item.id">
                <label class="todoList_label mr-2">
                  <input class="todoList_input" v-model="item.status" type="checkbox" @keyup.enter="addToDo" @change="
                    setLoading(true); changeTodoListStatus(item.id).then(getData)">
                  <div class="flex-1 items-end justify-between">
                    <input v-if="editingId === item.id" type="text" @keyup.enter="confirmEdit(item)"
                      v-model="item.content" class="border p-1 rounded-md"
                      :class="{ 'line-through text-gray-500': item.status }" />
                    <div v-else class="flex justify-between">
                      <span :class="{ 'line-through text-gray-500': item.status }">
                        {{ item.content }}
                      </span>
                      <span class="text-[12px] text-gray-600 ml-2"
                        :class="{ 'line-through text-gray-500': item.status }">{{ createdTime(item.createTime) }}</span>
                    </div>
                  </div>
                </label>
                <div class="flex gap-2 text-xl mr-3 pb-4" v-if="!item.status">
                  <el-icon v-if="editingId === null" color="#165DFF" class="cursor-pointer" @click="startEdit(item.id)">
                    <Edit />
                  </el-icon>
                  <el-icon @click="confirmEdit(item)" v-if="editingId === item.id" color="#00C851"
                    class="cursor-pointer">
                    <Check />
                  </el-icon>
                  <el-icon color="#FF3B30" class="cursor-pointer"
                    @click="delTodoList(item.id).then(() => { successSwal({ title: '刪除成功！' }).then(() => { getData() }) })">
                    <Delete />
                  </el-icon>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex justify-end p-3 shadow-[0_-4px_15px_0_rgba(0,0,0,0.1)]">
            <p class="my-2">
              共有
              <span class="text-blue-600 cursor-pointer" @click="listStatus = 'all'">
                {{ userTodoList.length }}
              </span>
              項代辦事項，待完成
              <span class="text-red-600 cursor-pointer" @click="listStatus = 'now'">
                {{userTodoList.filter(item => !item.status).length}}
              </span>
              項，已完成
              <span class="text-green-600 cursor-pointer" @click="listStatus = 'done'">
                {{userTodoList.filter(item => item.status).length}}
              </span>
              項代辦事項！
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { Plus, Edit, Delete, Check } from '@element-plus/icons-vue'
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import { errorSwal, successSwal, warningSwal } from '@/utils';
import { getTodoList, postTodoList, updataTodoList, delTodoList, changeTodoListStatus } from '@/api'
const userName = ref(sessionStorage.getItem('nickname') || 'Not User')
const loading = ref(false)
const setLoading = (v) => loading.value = v

const logOut = () => {

}

//代辦頁籤設定相關
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
]// 代辦頁籤列
const listStatus = ref('now') // all, done, now
const filterList = computed(() => {
  userTodoList.value.sort((a, b) => a.status - b.status) // 未完成在前，已完成在後
  return listStatus.value === 'all' ? userTodoList.value : listStatus.value === 'done' ? userTodoList.value.filter(item => item.status) :
    userTodoList.value.filter(item => !item.status)
})// 根據頁籤篩選出對應狀態列表

//編輯相關設定
const editingId = ref(null);
const startEdit = (id) => { editingId.value = id; };
const confirmEdit = (item) => {
  setLoading(true)
  updataTodoList(item.id, { content: item.content })
    .then(() => successSwal({ title: '更新成功！' }))
    .then(() => getData())
    .finally(() => { editingId.value = null; setLoading(false) });
};// 編輯

//新增相關設定
const todoContent = ref('')
const addToDo = () => {
  if (todoContent.value === '') {
    warningSwal({ title: '請填寫內容！' })
    return;
  }//阻擋未填寫未填寫內容送出
  setLoading(true)
  postTodoList({ content: todoContent.value, })
    .then(() => successSwal({ title: '新增成功！' })
      .then(() => {
        todoContent.value = ''
        getData()
      })
    ).catch((err) => errorSwal({ title: '新增失敗', text: err?.response?.data?.message ?? '請稍後再試！', showCancelButton: false }))
    .finally(() => setLoading(false))
}// 新增

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
const createdTime = (time) => {
  if (time == null) return '';
  const inputTimestamp = Number(time);
  if (Number.isNaN(inputTimestamp)) return '';
  const isSecondPrecision = Math.abs(inputTimestamp) < 1e12;
  const timestampMs = isSecondPrecision ? inputTimestamp * 1000 : inputTimestamp;
  const date = new Date(timestampMs);
  const dateTimeFormatter = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const dateTimeString = dateTimeFormatter.format(date).replaceAll('/', '-');
  const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    weekday: 'short',
  });
  const weekdayShort = weekdayFormatter.format(date).toLowerCase()
  return `${dateTimeString} (${weekdayShort})`;
}// 代辦時間處理

onMounted(() => {
  getData()
})
</script>
<style scoped>
@import "@/assets/normalize.css";
</style>
