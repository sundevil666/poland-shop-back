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
      {id: 1, label: 'Products', url: {name: 'Home'}},
      {id: 2, label: 'Add Product', url: {name: 'AddProduct'}},
      {id: 3, label: 'Category', url: {name: 'Category'}},
      {id: 4, label: 'Add Category', url: {name: 'AddCategory', params: {id: 'new'}}},
    ]
    return {
      navList
    }
  }
}
</script>
