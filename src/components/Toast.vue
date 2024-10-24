<script setup lang="ts">
import { useToastStore } from '@/store/toastStore';

const toastStore = useToastStore();
</script>

<template>
  <div v-if="toastStore.showToast" class="toast" :class="toastStore.type">
    <span>{{ toastStore.msg }}</span>
    <button @click="toastStore.hide" :class="toastStore.type">✖</button>
  </div>
</template>

<style scoped lang="scss">
.toast {
  width: 200px;
  position: fixed;
  z-index: 1000;
  top: 10px;
  right: 10px;
  padding: 10px 40px 10px 10px;
  color: #fff;
  border-radius: 5px;
  transition: opacity 1.3s ease;

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    border: none;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    padding: 0;
    cursor: pointer;

    &.success {
      background: #318335;
    }

    &.error {
      background: #bd352a;
    }
  }
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}
</style>
