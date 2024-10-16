import Todos from '@/views/Todos.vue';
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import { useUserStore } from '@/store/userStore';

const checkLogin = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  if (!userStore.user?.id) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
    beforeEnter: checkLogin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
