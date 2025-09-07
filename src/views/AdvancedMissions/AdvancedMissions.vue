<template>
  <div class=" max-h-screen mt-[1000px] flex flex-col items-center justify-center bg-gray-50">
    <full-screen-loading :isLoading="loading" />
    <div id="app" class="w-full max-w-7xl px-4 py-6">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- 商品列表區 -->
        <div class="w-full md:w-8/12">
          <product-list />
        </div>

        <!-- 購物車區 -->
        <div class="w-full md:w-4/12">
          <div class="mb-4 flex flex-wrap gap-2">
            <button @click="triggerToast('success', '成功加入購物車！')"
              class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition">
              觸發成功提示
            </button>
            <button @click="triggerToast('error', '新增失敗！請稍後再試')"
              class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition">
              觸發錯誤提示
            </button>
          </div>
          <shopping-cart />
        </div>
      </div>

      <!-- 通知元件 -->
      <notify v-if="showToast" :type="toast.Type" :message="toast.Message" @close="showToast = false" :key="showType" />
    </div>
  </div>
</template>
<script setup>
import { provide, readonly, ref } from "vue";
import FullScreenLoading from "@/components/FullScreenLoading.vue"
import ProductList from "@/views/AdvancedMissions/components/ProductList.vue"
import ShoppingCart from "@/views/AdvancedMissions/components/ShoppingCart.vue"
import Notify from "@/views/AdvancedMissions/components/Toast.vue"
const loading = ref(false);
const setLoading = (status) => { loading.value = status; };
const showToast = ref(false)
const showType = ref(0)
const toast = ref({ Type: 'success', Message: '操作成功！' })
const triggerToast = (type, product = null) => {
  toast.value.Type = type
  if (type === 'error') {
    if (product) toast.value.Message = '已將 ' + product + ' 移除！'
    else toast.value.Message = '操作失敗！'
  } else if (type === 'success') {
    if (product) toast.value.Message = '已將 ' + product + ' 加入購物車！'
    else toast.value.Message = '操作成功！'
  } else if (type === 'warning') {
    if (product) toast.value.Message = '已修改 ' + product + ' 的數量！'
    else toast.value.Message = '操作變更！'
  }
  showType.value++
  showToast.value = true
}// 通知設定

const cartItems = ref([])
const addToCart = (item) => {
  const hasProduct = cartItems.value.find((p) => p.id === item.id)
  if (hasProduct) {
    hasProduct.quantity += 1
  } else {
    const product = {
      id: item.id,
      title: item.title,
      quantity: 1,
      price: item.price
    }
    cartItems.value.push(product)
  }
  triggerToast('success', item.title)
  setLoading(false)
}// 加入購物車

const delProduct = (item) => {
  cartItems.value = cartItems.value.filter((p) => p.id !== item.id)
  triggerToast('error', item.title)
  setLoading(false)
}// 移除商品

const formatPrice = (value) => {
  if (typeof value !== 'number') return value
  return value.toLocaleString()
}// 金額格式化

provide('cartItems', readonly(cartItems))
provide('setLoading', setLoading)
provide('addToCart', addToCart)
provide('delProduct', delProduct)
provide('formatPrice', formatPrice)
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
