<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUser('Leanne Graham', '1-770-736-8031 x56442');
});

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <h1>Login</h1>
  <div v-if="user">
    <h2>{{ user.name }}</h2>
    <h2>{{ user.companyName }}</h2>
  </div>
</template>

<style scoped lang="scss"></style>
