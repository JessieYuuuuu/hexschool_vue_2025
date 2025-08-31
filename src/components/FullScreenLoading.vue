<template>
  <teleport to="body">
    <div v-show="isLoading" class="fs-loading" role="alert" aria-busy="true" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p class="sr-only">資料載入中…</p>
    </div>
  </teleport>
</template>
<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>
<style scoped>
.fs-loading {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .35);
  backdrop-filter: blur(2px);
  z-index: 9999;
  pointer-events: all;
  user-select: none;
}

.spinner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-right-color: transparent;
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
