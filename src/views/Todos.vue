<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/userStore';
import { Todo } from '@/types/types';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import TodoItem from '@/components/TodoItem.vue';
import Filters from '@/components/Filters.vue';
import AddTodo from '@/components/AddTodo.vue';
import { ToastType } from '@/types/enum';
import { useToastStore } from '@/store/toastStore';

const { user } = storeToRefs(useUserStore());
let allTodos = ref<Todo[]>([]);
let favoriteTodos = ref<Todo[]>([]);

const toastStore = useToastStore();

const getTodos = async () => {
  try {
    favoriteTodos.value = JSON.parse(localStorage.getItem('favoriteTodos') || '[]');

    const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

    allTodos.value = response.data.map((todo: Todo) => ({
      ...todo,
      favorite: favoriteTodos.value.some((favoriteTodo: Todo) => favoriteTodo.id === todo.id)
    }));
  } catch {
    toastStore.show(ToastType.ERROR, 'Error on getting Todos');
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
  <h3>
    {{ user?.name }}
    <span>{{ user?.companyName }}</span>
  </h3>
  <div class="todos">
    <main>
      <AddTodo :todos="allTodos" />
      <Filters :todos="allTodos" />
      <TodoItem
        v-for="todo in allTodos"
        :key="todo.id"
        :todo="todo"
        @toggle-favorite="handleToggleFavorite"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
h3 {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 0 20px;
  left: 10px;
  position: absolute;

  span {
    color: #9f9696;
  }
}

.todos {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 700px;
  position: relative;
  margin: 0 auto;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  h3 {
    position: relative;
    justify-content: center;
    flex-direction: row;
    padding-right: 25px;

    span {
      padding-left: 10px;
    }
  }
}
</style>
