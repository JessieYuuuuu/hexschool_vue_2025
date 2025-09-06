<template>
  <div v-if="filterList.length === 0" class="flex flex-col justify-between items-center gap-5">
    <p class="text-xl font-bold flex-1">目前尚無{{ listStatus === 'done' ? '完成' : '待辦' }}事項</p>
    <img class="d-m-n max-h-80"
      src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
  </div>
  <ul v-else class="todoList_item">
    <li v-for="item in filterList" :key="item.id">
      <label class="todoList_label mr-2 cursor-pointer">
        <input class="todoList_input cursor-pointer" v-model="item.status" type="checkbox" @change="
          setLoading(true); changeTodoListStatus(item.id).then(() => $emit('update:refresh'))">
        <div class="flex-1 items-end justify-between">
          <input v-if="editingId === item.id" type="text" @keyup.enter="confirmEdit(item)" v-model="item.content"
            class="border p-1 rounded-md w-full" :class="{ 'line-through text-gray-500': item.status }" />
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
        <el-icon title="編輯" v-if="editingId === null" color="#165DFF" class="cursor-pointer" @click="startEdit(item)">
          <Edit />
        </el-icon>

        <el-icon title="確認" v-if="editingId === item.id" color="#00C851" class="cursor-pointer"
          @click="confirmEdit(item)">
          <Check />
        </el-icon>

        <el-icon title="刪除" color="#FF3B30" class="cursor-pointer"
          @click="delTodoList(item.id).then(() => { successSwal({ title: '刪除成功！' }).then(() => $emit('update:refresh')) })">
          <Delete />
        </el-icon>

      </div>
    </li>
  </ul>
</template>
<script setup>
import { computed, ref } from 'vue';
import { Edit, Delete, Check } from '@element-plus/icons-vue'
import { successSwal, warningSwal } from '@/utils';
import { updataTodoList, delTodoList, changeTodoListStatus } from '@/api'
const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  listStatus: {
    type: String,
    default: 'all'
  }
})
const emit = defineEmits(['update:refresh', 'update:loading'])
const setLoading = (v) => emit('update:loading', v)

const filterList = computed(() => {
  const sorted = [...props.data].sort((a, b) => Number(a.status) - Number(b.status));
  if (props.listStatus === 'done') return sorted.filter(item => item.status);
  if (props.listStatus === 'now') return sorted.filter(item => !item.status);
  return sorted;
});// 根據頁籤篩選出對應狀態列表

//編輯相關設定
const editingId = ref(null);
const originContent = ref('')
const startEdit = (item) => {
  editingId.value = item.id
  originContent.value = item.content.trim()
}
const confirmEdit = (item) => {
  const newContent = (item.content ?? '').trim()
  if (newContent === originContent.value) {
    originContent.value = ''
    editingId.value = null
    return
  }
  if (!newContent) {
    warningSwal({ title: '請填寫內容！', showConfirmButton: false })
    item.content = ''
    return
  }

  setLoading(true)
  updataTodoList(item.id, { content: newContent })
    .then(() => { successSwal({ title: '更新成功！' }); emit('update:refresh') })
    .finally(() => { editingId.value = null; setLoading(false) });
};// 編輯

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
}// 待辦時間處理
</script>
<style scoped>
@import "@/assets/normalize.css";
</style>
