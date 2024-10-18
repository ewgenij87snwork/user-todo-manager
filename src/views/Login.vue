<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { computed, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { FormField } from '@/types/types';

const userStore = useUserStore();
const { user } = storeToRefs(useUserStore());
const router = useRouter();

const formFields = ref<FormField[]>([
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
    example: 'Leanne Graham',
    required: true,
    validation: {
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z\s]+$/,
      errorMessage: 'Only letters and spaces.'
    }
  },
  {
    id: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: 'Enter your phone number',
    example: '1-770-736-8031 x56442',
    required: true,
    validation: {
      pattern: /^[0-9a-zA-Z\s\-()]{1,25}$/,
      errorMessage: 'Only numbers, letters, spaces'
    }
  }
]);

const formData = reactive(Object.fromEntries(formFields.value.map((field) => [field.id, ''])));

const errors = reactive(Object.fromEntries(formFields.value.map((field) => [field.id, ''])));

const validateField = (field: FormField, isBlurEvent?: boolean) => {
  const value = formData[field.id]?.trim();

  if (field.required && !value) {
    errors[field.id] = `${field.label} is required.`;
    return;
  }

  if (isBlurEvent && field.validation?.minLength && value.length < field.validation.minLength) {
    errors[field.id] = `Minimum ${field.validation.minLength} characters required.`;
    return;
  }

  if (field.validation?.maxLength && value.length > field.validation.maxLength) {
    errors[field.id] = `Maximum ${field.validation.maxLength} characters allowed.`;
    return;
  }

  if (field.validation?.pattern && !new RegExp(field.validation.pattern).test(value)) {
    errors[field.id] = 'Invalid format.';
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

const login = async () => {
  const { name, phone } = formData;
  await userStore.fetchUser(name, phone);
  if (user.value && user.value.id) {
    await router.push('/todos');
  } else {
    alert('Invalid credentials. Please try again.');
  }
};
</script>

<template>
  <div class="container">
    <h1>Login</h1>

    <form @submit.prevent="login" class="form">
      <div v-for="field in formFields" :key="field.id" class="form__group">
        <input
          :type="field.type"
          :id="field.id"
          v-model="formData[field.id]"
          :placeholder="field.placeholder"
          @input="validateField(field)"
          @paste="validateField(field)"
          @blur="validateField(field, true)"
        />
        <span class="example">{{ field.example }}</span>
        <span v-if="errors[field.id]" class="error">{{ errors[field.id] }}</span>
      </div>

      <button type="submit" :disabled="hasErrors">Submit</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 100px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 300px;

    span {
      position: absolute;
      top: -20px;
      opacity: 0.5;
      align-self: end;
      right: 2px;
    }

    input {
      margin-bottom: 60px;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 5px;
      font-size: 18px;
    }
  }

  button {
    margin-top: 30px;
    padding: 15px 20px;
    width: 200px;
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
  }

  .error {
    position: absolute;
    top: 45px;
    left: 0;
    color: red;
    font-size: 14px;
    margin-top: 4px;
  }
}
</style>
