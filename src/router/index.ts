import Login from "@/views/Login.vue";
import Todos from "@/views/Todos.vue";
import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
    { path: '', component: Login},
    { path: '/todos', component: Todos}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;



































// const routes = [
//     { path: '', component: Login},
//     { path: '/todos', component: Todos}
// ]
//
// const router = createRouter({
//     history: createMemoryHistory(),
//     routes
// })
//
// export default router;