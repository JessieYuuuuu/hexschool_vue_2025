<template>
  <nav class=" top-0 z-50 w-full h-[80px] bg-amber-500 flex items-center px-6">
    <ul class="flex gap-6 justify-between w-full">
      <li v-for="item in list" :key="item.path">
        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: [],
  }
});
console.log(props.list);
</script>
