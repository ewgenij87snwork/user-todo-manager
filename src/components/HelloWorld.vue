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
  <button class="btn" @click="btnClick(1)"><span class="btn-span">btn</span> </button>
  <h2>{{ someNum.num }}</h2>
</template>

<style lang="scss" scoped>
.btn {
    &-span {
      color: red;
    }
}
</style>