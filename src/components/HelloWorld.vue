<script lang="ts" setup>

import { Ref, ref } from "vue";

interface Some {
  str: string,
  num: number
}

const btnClick = (a: number) => {
  someNum.value.num = a;
}

let someNum: Ref<Some> = ref({
  str: '',
  num: 0
});
const someStr: string = 'dddd';

</script>

<template>
  <h1>Hello World!</h1>
  <button @click="btnClick(someStr)">btn</button>
  <h2>{{ someNum.num }}</h2>
</template>

<style scoped>

</style>