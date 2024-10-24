import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ToastType } from '@/types/enum';

export const useToastStore = defineStore('toastStore', () => {
  const showToast = ref(false);
  const type = ref<ToastType>(ToastType.SUCCESS);
  const msg = ref('');

  const show = (toastType: ToastType, toastMsg: string) => {
    type.value = toastType;
    msg.value = toastMsg;
    showToast.value = true;
    console.log(msg.value);
    console.log(type.value);

    setTimeout(() => {
      hide();
    }, 3000);
  };

  const hide = () => {
    showToast.value = false;
  };

  return {
    showToast,
    type,
    msg,
    show,
    hide
  };
});
