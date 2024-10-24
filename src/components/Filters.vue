<script setup lang="ts">
import { computed } from 'vue';
import { useTodosStore } from '@/store/todosStore';

const todosStore = useTodosStore();
const uniqueUserIds = computed(() =>
  Array.from(new Set(todosStore.todos.map((todo: any) => todo.userId)))
);
</script>

<template>
  <div class="todo-filters">
    <input
      type="text"
      class="todo-filters__search"
      v-model="todosStore.searchQuery"
      @input="todosStore.applyFilters"
      placeholder="Search by title..."
    />
    <select v-model="todosStore.selectedStatus" @change="todosStore.applyFilters">
      <option value="">All</option>
      <option value="uncompleted">Uncompleted</option>
      <option value="completed">Completed</option>
      <option value="favorite">Favorite</option>
    </select>

    <select v-model="todosStore.selectedUser" @change="todosStore.applyFilters">
      <option value="">All Users</option>
      <option v-for="userId in uniqueUserIds" :key="userId" :value="userId">
        {{ userId }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.todo-filters {
  margin-bottom: 15px;

  input,
  select {
    margin-right: 10px;
    padding: 2px;
  }

  select:last-child {
    margin-right: 0;
  }
}
</style>
