<script setup lang="ts">
import { Todo } from '@/types/types';
import checked from '@/assets/icons/checked.svg';
import unchecked from '@/assets/icons/unchecked.svg';

const { todo } = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(['toggle-favorite']);

const toggleFavorite = () => {
  emit('toggle-favorite', todo);
};
</script>

<template>
  <div :class="['todo-item', { 'todo-item__favorite': todo.favorite }]" v-show="!todo.hidden">
    <img :src="todo.completed ? checked : unchecked" alt="" class="complete" />
    <span>{{ todo.title }}</span>
    <div class="todo-actions">
      <button @click="toggleFavorite" :class="todo.favorite ? 'favorite' : 'unfavorite'"></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 30px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(75, 133, 79, 0.43);
  padding: 5px;
  margin-bottom: 5px;
  background: rgba(72, 133, 168, 0.08);
  cursor: default;
  overflow: hidden;

  &:hover {
    transform: scale(1.01);
  }

  &__favorite {
    background: rgba(72, 133, 168, 0.31);
  }

  .complete {
    width: 25px;
    height: 25px;
    cursor: default;
    margin-right: 10px;
  }

  .todo-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
  }

  button {
    width: 30px;
    height: 30px;
    background-size: contain;
    background: none no-repeat center;
    border: none;
    cursor: pointer;
    transition: background-image 0.3s;

    &.unfavorite {
      background-image: url('@/assets/icons/add-to-favorites.svg');
    }

    &.favorite {
      background-image: url('@/assets/icons/remove-from-favorites.svg');
    }

    &:active {
      transform: scale(0.9);
    }
  }

  &:hover {
    background-color: rgba(58, 158, 161, 0.31);
  }
}
</style>
