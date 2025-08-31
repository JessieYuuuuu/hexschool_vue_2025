<template>
  <div class="flex flex-col gap-2 max-h-[calc(100vh-160px)]">
    <p class="text-center text-xl font-bold mb-5">第一周作業 - 飲料清單管理系統</p>
    <div class="overflow-y-auto">
      <table class="border-collapse border border-gray-400 leading-relaxed">
        <thead class="bg-amber-300">
          <tr>
            <th class="w-[200px] border border-gray-400 p-2">品項</th>
            <th class="w-[200px] border border-gray-400 p-2">描述</th>
            <th class="w-[200px] border border-gray-400 p-2">價格</th>
            <th class="w-[150px] border border-gray-400 p-2">庫存</th>
            <th class="w-[100px] border border-gray-400 p-2">
              <span>
                操作
              </span>
              <button class="px-2 bg-green-200 rounded" @click="addDrink">+</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(drink, idx) in drinks" :key="idx" class="hover:bg-amber-50">
            <td class="border py-5 border-gray-400 px-2 py-1 text-center">
              <p v-if="!drink.edit">
                {{ drink.name }}
              </p>
              <input @keydown.enter="drink.edit = !drink.edit" v-else class="border-2 border-amber-700"
                v-model="drink.name" />
            </td>
            <td class="border border-gray-400 px-2 py-1">
              <p v-if="!drink.edit">
                {{ drink.description }}
              </p>
              <input @keydown.enter="drink.edit = !drink.edit" v-else class="border-2 border-amber-700"
                v-model="drink.description" />
            </td>
            <td class="border border-gray-400 px-2 py-1 text-center">
              <p v-if="!drink.edit">
                {{ drink.price }}
              </p>
              <input @keydown.enter="drink.edit = !drink.edit" v-else class="border-2 border-amber-700"
                v-model="drink.price" />
            </td>
            <td class="border border-gray-400 px-2 py-1 text-center">
              <button class="px-2 bg-red-200 rounded" @click="drink.quantity--">-</button>
              <span class="mx-2">
                {{ drink.quantity }}
              </span>
              <button class="px-2 bg-green-200 rounded" @click="drink.quantity++">+</button>
            </td>
            <td class="border border-gray-400 px-2 py-1 text-center">
              <button class="px-2  rounded" @click="drink.edit = !drink.edit">
                <img src="../assets/edit-text.png" alt="編輯" class="h-6 w-6 cursor-pointer" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const drinks = ref([
  { name: "珍珠奶茶", description: "香濃奶茶搭配QQ珍珠", price: 50, quantity: 20, edit: false },
  { name: "綠茶拿鐵", description: "清新綠茶與香濃鮮奶的完美結合", price: 55, quantity: 15, edit: false },
  { name: "紅茶拿鐵", description: "紅茶與鮮奶的經典搭配", price: 50, quantity: 30, edit: false },
  { name: "檸檬紅茶", description: "清新檸檬與紅茶的絕妙組合", price: 45, quantity: 25, edit: false },
  { name: "冬瓜檸檬", description: "清新冬瓜配上新鮮檸檬", price: 45, quantity: 18, edit: false },
  { name: "翡翠檸檬", description: "綠茶與檸檬的完美結合", price: 55, quantity: 34, edit: false },
  { name: "四季春茶", description: "香醇四季春茶，回甘無比", price: 45, quantity: 10, edit: false },
  { name: "阿薩姆奶茶", description: "阿薩姆紅茶搭配香醇鮮奶", price: 50, quantity: 25, edit: false },
  { name: "檸檬冰茶", description: "檸檬與冰茶的清新組合", price: 45, quantity: 20, edit: false },
  { name: "芒果綠茶", description: "芒果與綠茶的獨特風味", price: 55, quantity: 18, edit: false },
  { name: "抹茶拿鐵", description: "抹茶與鮮奶的絕配", price: 60, quantity: 20, edit: false }
])
const addDrink = () => {
  drinks.value.push({
    name: "新飲品",
    description: "新飲品描述",
    price: 0,
    quantity: 0,
    edit: true
  });
}
</script>
