<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/userStore';
import { Todo } from '@/types/types';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import TodoItem from '@/components/TodoItem.vue';

const { user } = storeToRefs(useUserStore());
let allTodos = ref<Todo[]>([]);
let favoriteTodos = ref<Todo[]>([]);

const getTodos = async () => {
  try {
    favoriteTodos.value = JSON.parse(localStorage.getItem('favoriteTodos') || '[]');

    const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

    allTodos.value = response.data.map((todo: Todo) => ({
      ...todo,
      favorite: favoriteTodos.value.some((favoriteTodo: Todo) => favoriteTodo.id === todo.id)
    }));
  } catch (e) {
    console.error(e);
  }
};

const handleToggleFavorite = (selectedTodo: Todo) => {
  const existTodo = allTodos.value.find((todo) => todo.id === selectedTodo.id);
  if (existTodo) {
    existTodo.favorite = !existTodo.favorite;
  }

  const isInLocalStorage = favoriteTodos.value.find((todo: Todo) => todo.id === selectedTodo.id);
  if (isInLocalStorage) {
    favoriteTodos.value.splice(favoriteTodos.value.indexOf(isInLocalStorage), 1);
  } else {
    favoriteTodos.value.push(selectedTodo);
  }
  localStorage.setItem('favoriteTodos', JSON.stringify(favoriteTodos.value));
};

onMounted(() => {
  getTodos();
});
</script>

<template>
  <div class="header">
    <h1>Todos</h1>
    <h2>
      {{ user?.name }}
      <span>{{ user?.companyName }}</span>
    </h2>
  </div>
  <main>
    <h2>{{ allTodos.length }}</h2>
    <TodoItem
      v-for="todo in allTodos"
      :key="todo.id"
      :todo="todo"
      @toggle-favorite="handleToggleFavorite"
    />
  </main>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-around;
  align-items: baseline;

  h2 {
    span {
      color: #9f9696;
      margin-left: 50px;
    }
  }
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
