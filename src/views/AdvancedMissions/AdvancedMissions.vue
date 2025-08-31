<template>
  <div class="flex flex-col items-center justify-center h-full">
    <full-screen-loading :isLoading="loading" />
    <p class="align mb-5 text-xl font-bold">進階作業</p>
    <div>
      <div id="app" class="container py-4">
        <div class="row">
          <!-- 商品列表區 -->
          <product-list />
          <!-- 購物車區 -->
          <div class="col-md-4">
            <shopping-cart />
          </div>
        </div>
        <!-- 通知元件 -->
        <notify />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import ProductList from "@/views/AdvancedMissions/components/ProductList.vue"
import ShoppingCart from "@/views/AdvancedMissions/components/ShoppingCart.vue"
import Notify from "@/views/AdvancedMissions/components/Notify.vue"

const loading = ref(true);
const setLoading = (status) => { loading.value = status; };

onMounted(() => {
  setLoading(false);
})
</script>
<style scoped>
body {
  background: #f2f2f2f2;
}

.card-img-top {
  height: 150px;
  object-fit: cover;
}
</style>
