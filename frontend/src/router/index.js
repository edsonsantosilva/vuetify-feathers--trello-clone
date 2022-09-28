import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/boards',
    name: 'boards',
    component: () => import(/* webpackChunkName: "boards" */ '../views/Boards.vue'),
  },
  {
    path: '/board/:id',
    name: 'board-page',
    props: true,
    component: () => import(/* webpackChunkName: "boards" */ '../views/BoardPage.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "boards" */ '../views/Signup.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "boards" */ '../views/Login.vue'),
  },
  {
    path: '/settings',
    name: 'setting',
    component: () => import(/* webpackChunkName: "settings" */ '../views/SettingsPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
