<template>
  <div class="main-layout container">
      <div class="fixed-top">
          <div class="container">
              <nav-bar :nav-list="navList"></nav-bar>
          </div>
      </div>
      <div class="container"><router-view /></div>
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
      {id: 4, label: 'Add Category', url: {name: 'AddCategory'}},
    ]
    return {
      navList
    }
  }
}
</script>

<style>
.main-layout {
    padding-top: 57px;
}
</style>
