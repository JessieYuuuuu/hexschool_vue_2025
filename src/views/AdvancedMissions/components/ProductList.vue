<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div v-for="product in products" :key="product.id"
      class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover" />
      <div class="p-4 flex flex-col flex-grow">
        <h5 class="text-lg font-semibold mb-1">{{ product.title }}</h5>
        <p class="text-gray-600 text-sm mb-2 flex-grow">{{ product.description }}</p>
        <p class="text-blue-600 font-bold mb-4">${{ formatPrice(product.price) }}</p>
        <button type="button" @click="addCart(product)"
          class="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded w-full cursor-pointer transition duration-200">
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue';
const setLoading = inject('setLoading', () => { })
const addToCart = inject('addToCart', () => { })
const formatPrice = inject('formatPrice', () => { })
const products = [
  {
    id: 1,
    title: '耳罩式藍牙耳機',
    description: '舒適配戴，支援降噪技術',
    price: 2490,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop'
  },
  {
    id: 2,
    title: '機械式鍵盤',
    description: 'RGB 背光，青軸手感極佳',
    price: 1990,
    image: 'https://i2.momoshop.com.tw/1749742381/goodsimg/0010/415/042/10415042_OR.webp'
  },
  {
    id: 3,
    title: '人體工學滑鼠',
    description: '舒適握感，支援多種 DPI 調整',
    price: 1290,
    image: 'https://i2.momoshop.com.tw/1702053770/goodsimg/0011/769/383/11769383_R.webp'
  },
  {
    id: 4,
    title: '無線喇叭',
    description: '重低音震撼，藍牙 5.0',
    price: 11900,
    image: 'https://i2.momoshop.com.tw/1746779780/goodsimg/0013/997/912/13997912_R.webp'
  },
  {
    id: 5,
    title: '行動電源 20000mAh',
    description: '大容量，支援快充 PD 3.0',
    price: 1780,
    image: 'https://www.moztech.cc/cdn/shop/files/grey.png?v=1715232257&width=1800'
  },
  {
    id: 6,
    title: '智慧手環',
    description: '健康追蹤、運動紀錄全掌握',
    price: 990,
    image: 'https://i3.momoshop.com.tw/1746167121/goodsimg/0012/901/802/12901802_R.webp'
  },
  {
    id: 7,
    title: '無線降噪耳罩耳機',
    description: '自動連線、高清通話品質',
    price: 3190,
    image: 'https://www.leapfrog.com.tw/upload/product_b/ALL_product_25E06_JEOqzXTelW.jpeg'
  },
  {
    id: 8,
    title: '多功能筆電支架',
    description: '可調角度，鋁合金材質',
    price: 544,
    image: 'https://i1.momoshop.com.tw/1703149578/goodsimg/0012/244/423/12244423_R.webp'
  },
  {
    id: 9,
    title: '雙螢幕支架',
    description: '桌面空間最佳化，承重穩固',
    price: 2599,
    image: 'https://img.pchome.com.tw/cs/items/DCAGRJA900IDD1T/000001_1739937941.jpg'
  },
  {
    id: 10,
    title: '靜音無線滑鼠',
    description: '安靜點擊，適合辦公使用',
    price: 1590,
    image: 'https://i1.momoshop.com.tw/1745452802/goodsimg/0013/941/779/13941779_R.webp'
  }
];
const addCart = (item) => {
  setLoading(true)
  addToCart(item)
}
</script>
