<template>
  <div class="main-layout container">
      <div class="fixed-top">
          <div class="container">
              <NavBar :nav-list="navList"></NavBar>
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
      {id: 5, label: 'Delivery', url: {name: 'Delivery'}},
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
*, body ul {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
}
</style>
