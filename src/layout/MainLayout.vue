<template>
  <div class="MainLayout container">
    <nav-bar :nav-list="navList"></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: "MainLayout",
  components: {
    NavBar,
  },
  setup() {
    const navList = [
      {id: 1, label: 'Products', url: '/'},
      {id: 2, label: 'Add Product', url: '/add-product'},
      {id: 3, label: 'Category', url: '/category'},
      {id: 4, label: 'Add Category', url: '/add-category'},
    ]
    return {
      navList
    }
  }
}
</script>
