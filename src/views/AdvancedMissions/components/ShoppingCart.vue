<template>
  <div class="min-w-[380px] bg-amber-200 p-3 border-radius rounded-4xl">
    <h2 class="text-2xl font-semibold py-4 px-2">購物車</h2>
    <div class="max-h-[500px] overflow-hidden flex flex-col">
      <div v-if="cartItems.length === 0" class="p-4 bg-white rounded shadow flex flex-col items-center">
        <p>購物車是空的！</p>
        <img class="w-40" src="../../../assets/shopping.png" alt="購物車是空的！">
      </div>
      <ul v-else class="space-y-3 mb-4 overflow-auto flex-1 px-3">
        <li v-for="item in cartItems" :key="item.id"
          class="flex justify-between items-center p-4 bg-white rounded shadow">
          <div>
            <h6 class="text-base font-medium">{{ item.title }}</h6>
            <div class="flex gap-2 items-center text-gray-500 text-sm">
              <p>數量：</p>
              <button type="button" @click="cartItems.find((p) => p.id === item.id).quantity--"
                class="font-bold text-xl cursor-pointer">-</button>
              <p>
                {{ item.quantity }}
              </p>
              <button type="button" @click="cartItems.find((p) => p.id === item.id).quantity++"
                class="font-bold text-xl cursor-pointer">+</button>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-gray-700 font-semibold">${{ item.price }}</span>
            <button @click="setLoading(true); delProduct(item)"
              class="ml-4 px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-100 transition cursor-pointer">
              移除
            </button>
          </div>
        </li>
      </ul>
      <div class="flex justify-end py-4 px-2 border-t border-amber-700">
        <p class="font-bold">總金額： $<span class="text-red-700">{{ totalPrice }}</span>元</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, ref } from 'vue';
const cartItems = inject('cartItems', ref([]))
const setLoading = inject('setLoading', () => { })
const delProduct = inject('delProduct', () => { })
const formatPrice = inject('formatPrice', () => { })
const totalPrice = computed(() => {
  let total = 0
  cartItems.value.forEach((i) => {
    total += i.quantity * i.price
  })
  return formatPrice(total)
})
</script>
