<template>
  <div class="flex flex-col items-center justify-center h-full">
    <full-screen-loading :isLoading="loading" />
    <p class="align mb-5 text-xl font-bold">第三周 - 點餐系統</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import FullScreenLoading from "@/components/FullScreenLoading.vue"

const loading = ref(true);
const setLoading = (status) => { loading.value = status; };

onMounted(() => {
  setLoading(false);
})
</script>
