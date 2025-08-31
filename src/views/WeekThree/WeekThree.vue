<template>
  <div class="flex flex-col items-center justify-center h-full">
    <full-screen-loading :isLoading="loading" />
    <p class="align mb-5 text-xl font-bold">第三周 - 點餐系統</p>
    <div>
      <div id="root">
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-4">
              <product-List />
            </div>
            <div class="col-md-8">
              <shopping-cart />
            </div>
            <hr />
            <div class="row justify-content-center">
              <order-details />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import ProductList from "@/views/WeekThree/components/ProductList.vue"
import ShoppingCart from "@/views/WeekThree/components/ShoppingCart.vue"
import OrderDetails from "@/views/WeekThree/components/OrderDetails.vue"

const loading = ref(true);
const setLoading = (status) => { loading.value = status; };


onMounted(() => {
  setLoading(false);
})
</script>
