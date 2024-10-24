<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/userStore';
import { onMounted } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
import Filters from '@/components/Filters.vue';
import { useTodosStore } from '@/store/todosStore';
import AddTodo from '@/components/AddTodo.vue';

const { user } = storeToRefs(useUserStore());

const todosStore = useTodosStore();

onMounted(() => {
  todosStore.getTodos();
});
</script>

<template>
  <h3>
    {{ user?.name }}
    <span>{{ user?.companyName }}</span>
  </h3>
  <div class="todos">
    <main>
      <AddTodo />
      <Filters />
      <TodoItem
        v-for="todo in todosStore.todos"
        :key="todo.id"
        :todo="todo"
        @toggle-favorite="todosStore.handleToggleFavorite"
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
