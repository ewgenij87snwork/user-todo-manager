<script setup lang="ts">
import { PropType } from 'vue';
import { Todo } from '@/types/types';
import checked from '@/assets/icons/checked.svg';
import unchecked from '@/assets/icons/unchecked.svg';

defineProps({
  todo: {
    type: Object as PropType<Todo>,
    required: true
  }
});
</script>

<template>
  <div class="todo-item">
    <img :src="todo.completed ? checked : unchecked" alt="" />
    {{ todo.title }}
  </div>
</template>

<style scoped lang="scss"></style>
