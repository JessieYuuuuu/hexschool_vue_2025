<template>
  <div class="inputBox shrink-0">
    <input type="text" v-model="todoContent" @keyup.enter="addToDo" :placeholder="placeholder">
    <a href="" title="新增待辦" @click.prevent="addToDo" class="flex justify-center items-center">
      <el-icon class="top-[-3px]">
        <Plus />
      </el-icon>
    </a>
  </div>
</template>
<script setup>import { onMounted, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { errorSwal, successSwal, warningSwal } from '@/utils';
import { postTodoList } from '@/api'
const emit = defineEmits(['update:refresh', 'update:loading'])
const setLoading = (v) => emit('update:loading', v)
//新增相關設定
const todoContent = ref('')
const todoRandomPlaceholders = [
  '今天要完成的第一件事是…',
  '把腦中的待辦寫下來：',
  '先做最重要的一件事',
  '下一步行動是什麼？（用動詞開頭）',
  '5 分鐘內能完成的小任務',
  '明天的你會感謝現在的什麼？',
  '來一個 25 分鐘番茄鐘任務',
  '先處理正在阻塞你的那一步',
  '讓生活前進 1% 的動作',
  '寫下你一直想做但沒做的事',
  '今天想學的一個小技能',
  '先拿掉一件不必要的事',
  '完成一件讓你有成就感的小事',
  '大腦應該用來創造',
  '要寄出的那封信，先寫標題',
  '清單不求多，先寫一件就好',
  '把大任務切成更小步驟',
  '下一個會議前要完成的事',
  '需要查的資料是…',
  '今天要回覆的訊息是…',
  '先整理桌面 3 分鐘',
  '為今天設定一個小里程碑',
  '列出一個阻礙與第一個解法',
  '這件事需要跟誰確認？',
  '交付前的最後檢查是…',
  '留點時間給自己：寫下放鬆任務',
  '把「也許有一天」改成今天',
  '把重複工作自動化的第一步',
  '今天要勇敢拒絕的一件事',
  '完成後你要怎麼慶祝？'
];

const placeholder = ref('')
const randomizePlaceholder = () => {
  placeholder.value = todoRandomPlaceholders[Math.floor(Math.random() * todoRandomPlaceholders.length)]
}

const addToDo = () => {
  if (todoContent.value.trim() === '') {
    warningSwal({ title: '請填寫內容！', showConfirmButton: false })
    todoContent.value = ''
    return;
  }//阻擋未填寫未填寫內容送出
  setLoading(true)
  postTodoList({
    content: todoContent.value
  }).then(() => {
    todoContent.value = ''
    randomizePlaceholder()
    emit('update:refresh')
    successSwal({ title: '新增成功！' }).then(() => {
    }).finally(() => setLoading(false))
  }).catch((err) => {
    errorSwal({
      title: '新增失敗',
      text: err?.response?.data?.message ?? '請稍後再試！',
      showCancelButton: false
    })
  }).finally(() => setLoading(false))
}// 新增

onMounted(() => {
  randomizePlaceholder()
})
</script>
<style scoped>
@import "@/assets/normalize.css";
</style>
