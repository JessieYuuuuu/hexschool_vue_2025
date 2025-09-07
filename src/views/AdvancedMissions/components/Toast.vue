<template>
  <div v-if="visible" class="fixed top-4 right-4 z-[1050] w-80 p-4 rounded shadow-lg text-white animate-slide-in"
    :class="toastClasses">
    <div class="flex items-start justify-between">
      <p class="text-sm">{{ message }}</p>
      <button class="ml-4 cursor-pointer font-bold" @click="close">✕</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  message: { type: String, required: true },
  type: {
    type: String,
    default: 'success', // success, error, warning, info
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})
const visible = ref(true)
const toastClasses = {
  'bg-green-600': props.type === 'success',
  'bg-red-600': props.type === 'error',
  'bg-yellow-500': props.type === 'warning',
  'bg-blue-600': props.type === 'info'
}
const close = () => {
  visible.value = false
}
onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})
</script>
<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
