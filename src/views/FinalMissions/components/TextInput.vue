<template>
  <label class="formControls_label" :for="labelKey">{{ label }}</label>
  <input class="formControls_input" :value="modelValue" :type="type" :id="labelKey" :name="labelKey"
    :placeholder="'請輸入' + label" @input="$emit('update:input', $event.target.value)" :required="required"
    @change="$emit('updata:change', labelKey)" />
  <span class="text-red-500" v-if="error">{{ errorText }}</span>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: '姓名'
  },
  labelKey: {
    type: String,
    default: 'key'
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorText: {
    type: String,
    default: '格式錯誤'
  }
});
const emits = defineEmits(['update:input', 'update:change']);
</script>
<style scoped>
@import "@/assets/normalize.css";
</style>
