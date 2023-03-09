import { createRouter, createWebHistory } from 'vue-router'
import { getItem } from '/src/helpers/persistanceStorage'
import Home from '../views/Home.vue'
import Auth from '@/views/Auth.vue';

const routes = [
  {
    path: '/poland-shop-back/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      layout: 'main',
      auth: false,
    },
  },
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
    path: '/add-product/:id?',
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
    path: '/add-category/:id?',
    name: 'AddCategory',
    component: () => import( '../views/AddCategory.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if(requireAuth && getItem('accessToken')) {
    next()
  } else if (requireAuth && !getItem('accessToken')) {
    next('/auth')
  } else {
    next()
  }
})

export default router
