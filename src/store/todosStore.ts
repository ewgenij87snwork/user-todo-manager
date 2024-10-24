import { defineStore } from 'pinia';
import { Todo } from '@/types/types';
import { ref } from 'vue';
import axios from 'axios';
import { ToastType } from '@/types/enum';
import { useToastStore } from '@/store/toastStore';

export const useTodosStore = defineStore('todosStore', () => {
  const toastStore = useToastStore();
  const todos = ref<Todo[]>([]);
  const favoriteTodos = ref<Todo[]>([]);
  const selectedStatus = ref('');
  const selectedUser = ref('');
  const searchQuery = ref('');

  const applyFilters = () => {
    todos.value.forEach((todo: Todo) => {
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

  const getTodos = async () => {
    try {
      favoriteTodos.value = JSON.parse(localStorage.getItem('favoriteTodos') || '[]');

      const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

      todos.value = response.data.map((todo: Todo) => ({
        ...todo,
        favorite: favoriteTodos.value.some((favoriteTodo: Todo) => favoriteTodo.id === todo.id)
      }));
    } catch {
      toastStore.show(ToastType.ERROR, 'Error on getting Todos');
    }
  };

  const handleToggleFavorite = (selectedTodo: Todo) => {
    const existTodo = todos.value.find((todo) => todo.id === selectedTodo.id);
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

  const addTodo = async (newTitle: string, newUserId: string) => {
    const newTodo: Todo = {
      title: newTitle,
      userId: +newUserId,
      completed: false
    };

    try {
      const resp = await axios.post('https://jsonplaceholder.typicode.com/todos');
      if (resp.status === 201) {
        todos.value.unshift(newTodo);

        toastStore.show(ToastType.SUCCESS, 'Todo added successfully');
      }
    } catch {
      toastStore.show(ToastType.ERROR, 'Todo NOT added');
    }
  };

  return {
    todos,
    searchQuery,
    selectedStatus,
    selectedUser,
    toastStore,
    favoriteTodos,
    applyFilters,
    getTodos,
    handleToggleFavorite,
    addTodo
  };
});
