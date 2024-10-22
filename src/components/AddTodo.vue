<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { FormField, Todo } from '@/types/types';
import axios from 'axios';

const { todos } = defineProps<{
  todos: Todo[];
}>();

const formFields = ref<FormField[]>([
  {
    id: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Enter title...',
    required: true,
    validation: {
      minLength: 3,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    }
  },
  {
    id: 'userId',
    label: 'User ID',
    type: 'text',
    placeholder: 'Enter User ID...',
    required: true,
    validation: {
      pattern: /^\d+$/
    }
  }
]);

const formData = reactive(Object.fromEntries(formFields.value.map((field) => [field.id, ''])));

const errors = reactive(Object.fromEntries(formFields.value.map((field) => [field.id, ''])));

const validateField = (field: FormField, isBlurEvent?: boolean) => {
  const value = formData[field.id]?.trim();

  if (field.required && !value) {
    errors[field.id] = `${field.label} is required`;
    return;
  }

  if (isBlurEvent && field.validation?.minLength && value.length < field.validation.minLength) {
    errors[field.id] = `Minimum ${field.validation.minLength} characters required`;
    return;
  }

  if (field.validation?.maxLength && value.length > field.validation.maxLength) {
    errors[field.id] = `Maximum ${field.validation.maxLength} characters allowed`;
    return;
  }

  if (field.validation?.pattern && !new RegExp(field.validation.pattern).test(value)) {
    errors[field.id] = 'Invalid format';
    return;
  }

  errors[field.id] = '';
};

const hasErrors = computed(() => {
  return (
    Object.values(errors).some((error) => error !== '') ||
    Object.values(formData).some((value) => value.trim() === '')
  );
});

const addTodo = async () => {
  const newTodo: Todo = {
    title: formData.title,
    userId: +formData.userId,
    completed: false
  };

  try {
    const resp = await axios.post('https://jsonplaceholder.typicode.com/todos');
    console.log(resp);
    if (resp.status === 201) {
      todos.unshift(newTodo);
      alert('New Todo created');
    }
  } catch (e) {
    console.error('Error adding todo:', e);
    alert('Failed to add Todo');
  }
};
</script>

<template>
  <div class="add-todo">
    <form @submit.prevent="addTodo" class="form">
      <div v-for="field in formFields" :key="field.id" class="add-todo__input">
        <input
          :type="field.type"
          :id="field.id"
          v-model="formData[field.id]"
          :placeholder="field.placeholder"
          :required="field.required"
          @input="validateField(field)"
          @blur="validateField(field, true)"
          @paste="validateField(field)"
        />

        <span v-if="errors[field.id]" class="error">{{ errors[field.id] }}</span>
      </div>

      <button type="submit" :disabled="hasErrors">Add Todo</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.add-todo {
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;

  .form {
    display: flex;
    margin-bottom: 20px;
    position: relative;

    button {
      width: 70px;
      line-height: 0;
      background-color: #4caf50;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #45a049;
      }

      &:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
        opacity: 0.6;
      }

      &:active {
        transform: scale(0.97);
      }
    }
  }

  &__input {
    position: relative;

    input {
      margin-right: 10px;
      padding: 5px;
    }

    .error {
      position: absolute;
      color: red;
      font-size: 12px;
      bottom: -15px;
      left: 3px;
      opacity: 0.7;
    }
  }
}
</style>
