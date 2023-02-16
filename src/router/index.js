import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Auth from '@/views/Auth.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      layout: 'default',
      auth: false,
    },
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: () => import( '../views/AddProduct.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import( '../views/Category.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/add-category',
    name: 'AddCategory',
    component: () => import( '../views/AddCategory.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if(requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/shop-adminka/auth')
  } else {
    next()
  }
})

export default router
