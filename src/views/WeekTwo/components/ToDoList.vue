<template>
  <p>{{ userInfo.name }}，歡迎回來！</p>
  <p class="my-2">
    共有
    <span class="text-blue-600 cursor-pointer" @click="listStatus = 'all'">
      {{ userTodoList.length }}
    </span>
    項待辦事項，已完成
    <span class="text-green-600 cursor-pointer" @click="listStatus = 'done'">
      {{userTodoList.filter(item => item.status).length}}
    </span>
    項，剩餘
    <span class="text-red-600 cursor-pointer" @click="listStatus = 'now'">
      {{userTodoList.filter(item => !item.status).length}}
    </span>
    項待辦事項，加油！
  </p>
  <div>
    <div class="flex items-center gap-4 w-full mt-2">
      <input type="text" v-model="todoContent" @keyup.enter="addToDo" placeholder="請輸入待辦事項"
        class="border p-2 rounded-md flex-1">
      <button class="flex  h-full" type="button" @click="addToDo">
        <el-icon size="20" color="#374151">
          <Plus />
        </el-icon>
      </button>
    </div>
    <ul class="list-disc list-inside my-4 max-h-[300px] overflow-y-auto">
      <li v-for="item in nowList" :key="item.id" class="mb-2 gap-2 list-none flex justify-between">
        <label class="flex items-center gap-2 flex-1">
          <input type="checkbox" v-model="item.status" @keyup.enter="addToDo" @change="
            setLoading(true); changeTodoListStatus(item.id).then(getData)" class="mr-2" />
          <div class="w-full flex items-end justify-between">
            <input v-if="editingId === item.id" type="text" @keyup.enter="confirmEdit(item)" v-model="item.content"
              class="border p-1 rounded-md w-full" :class="{ 'line-through text-gray-500': item.status }" />
            <div v-else>
              <span :class="{ 'line-through text-gray-500': item.status }">
                {{ item.content }}
              </span>
              <span class="text-[12px] text-gray-600 ml-2"
                :class="{ 'line-through text-gray-500': item.status }">{{ createdTime(item.createTime) }}</span>
            </div>
          </div>
        </label>
        <div class="flex gap-2 text-xl mr-3" v-if="!item.status">
          <el-icon v-if="editingId === null" color="#165DFF" class="cursor-pointer" @click="startEdit(item.id)">
            <Edit />
          </el-icon>
          <el-icon @click="confirmEdit(item)" v-if="editingId === item.id" color="#00C851" class="cursor-pointer">
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
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { Plus, Edit, Delete, Check } from '@element-plus/icons-vue'
import { successSwal } from '@/utils';
import { getTodoList, postTodoList, updataTodoList, delTodoList, changeTodoListStatus } from '@/api'
const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
});
const editingId = ref(null);
const startEdit = (id) => { editingId.value = id; };
const confirmEdit = (item) => {
  updataTodoList(item.id, { content: item.content })
    .then(() => successSwal({ title: '更新成功！' }))
    .then(() => getData())
    .finally(() => { editingId.value = null; });
};
const emit = defineEmits(['update:loading'])
const setLoading = (v) => emit('update:loading', v)
const todoContent = ref('')
const addToDo = () => {
  const data = {
    content: todoContent.value,
  }
  postTodoList(data).then(res => {
    successSwal({ title: '新增成功！' }).then(() => {
      todoContent.value = ''
      getData()
    })
  })
}
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
}
const listStatus = ref('now') // all, done, now
const nowList = computed(() => {
  userTodoList.value.sort((a, b) => a.status - b.status) // 未完成在前，已完成在後
  return listStatus.value === 'all' ? userTodoList.value : listStatus.value === 'done' ? userTodoList.value.filter(item => item.status) :
    userTodoList.value.filter(item => !item.status)
})
const userTodoList = ref([])
const getData = () => {
  setLoading(true)
  getTodoList().then(res => {
    userTodoList.value = res.data.data
  }).finally(() => {
    setLoading(false)
  })
}
onMounted(() => {
  getData()
})
</script>
