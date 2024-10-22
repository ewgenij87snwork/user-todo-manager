<script setup lang="ts">
import { Todo } from '@/types/types';
import { computed, ref } from 'vue';

const { todos } = defineProps<{
  todos: Todo[];
}>();

const selectedStatus = ref('');
const selectedUser = ref('');
const searchQuery = ref('');

const uniqueUserIds = computed(() => Array.from(new Set(todos.map((todo: any) => todo.userId))));

const applyFilters = () => {
  todos.forEach((todo: Todo) => {
    const statusMatch =
      (selectedStatus.value === 'uncompleted' && !todo.completed) ||
      (selectedStatus.value === 'completed' && todo.completed) ||
      (selectedStatus.value === 'favorite' && todo.favorite) ||
      selectedStatus.value === '';

    const userMatch = selectedUser.value.length === 0 || todo.userId === +selectedUser.value;

    const searchMatch = todo.title.toLowerCase().includes(searchQuery.value.toLowerCase());

    todo.hidden = !(statusMatch && userMatch && searchMatch);
  });
};
</script>

<template>
  <div class="todo-filters">
    <input
      type="text"
      class="todo-filters__search"
      v-model="searchQuery"
      @input="applyFilters"
      placeholder="Search by title..."
    />
    <select v-model="selectedStatus" @change="applyFilters">
      <option value="">All</option>
      <option value="uncompleted">Uncompleted</option>
      <option value="completed">Completed</option>
      <option value="favorite">Favorite</option>
    </select>

    <select v-model="selectedUser" @change="applyFilters">
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
