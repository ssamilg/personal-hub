import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  // {
  //   path: '/finance',
  //   name: 'Finance',
  //   component: () => import('../modules/Finance/index.vue'),
  // },
  // {
  //   path: '/todo',
  //   name: 'Todo',
  //   component: () => import('../modules/Todo/index.vue'),
  // },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../modules/Books/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
