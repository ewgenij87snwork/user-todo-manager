<script setup lang="ts">
import { ref, watch } from 'vue';
import { Toast } from '@/types/types';

const props = defineProps<Toast>();

const isVisible = ref(false);
const type = ref('');
const msg = ref('');

watch(
  () => props,
  () => {
    isVisible.value = true;
    type.value = props.type;
    msg.value = props.msg;
    setTimeout(() => {
      hideToast();
    }, 3000);
  },
  { immediate: true }
);

const hideToast = () => {
  isVisible.value = false;
};
</script>

<template>
  <div v-if="isVisible" class="toast" :class="props.type">
    <span>{{ msg }}</span>
    <button @click="hideToast" :class="props.type">✖</button>
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
