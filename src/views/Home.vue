<template>
  <div class="home-page">
    <h1>list products</h1>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="me-3">Filter</div>
      <select v-model="categoryCurrent" class="form-select">
        <option selected value="0">All</option>
        <template
          v-for="cat in listCategory"
          :key="cat.id"
        >
          <option :value="cat.id">
            {{ cat.name }}
          </option>
        </template>
      </select>
    </div>
    <div v-if="isLoad">Load...</div>
    <ul class="list-group" v-else-if="listProductsFiltered.length > 0">
      <li class="list-group-item active">An active item</li>
      <li class="list-group-item d-flex align-items-center">
        <div class="me-4">id</div>
        <div class="me-4">category</div>
        <div>Product</div>
        <div class="ms-auto me-4">Status</div>
        <div class="ms-5">Edit</div>
      </li>
      <li v-for="item in listProductsFiltered" :key="item.id" class="list-group-item">
        <div class="d-flex align-items-center">
          <div class="me-4">{{ item.id }}</div>
          <div class="me-2">{{ item.category?.name }}</div>
          <router-link :to="{name: 'AddProduct', params: {id:  item.id}}" class="ms-4">
            <span>{{ item.name }}</span>
          </router-link>
          <div class="ms-auto">
            <input class="form-check-input" type="checkbox" :checked="item.status" disabled>
          </div>
          <button @click="deleteProduct(item.id, item.name)" class="btn btn-danger ms-5">Delete</button>
        </div>
      </li>
    </ul>
    <div v-else>List is empty</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      listProducts: [],
      isLoad: false,
      categoryCurrent: 0,
      listCategory: [],
    }
  },
  computed: {
    listProductsFiltered() {
      if(this.categoryCurrent > 0) {
        return this.listProducts.filter(item => Number(item.category.id) === Number(this.categoryCurrent))
      }

      return this.listProducts
    }
  },
  mounted () {
    this.fetchListCategory()
    this.fetchListProduct()
  },
  methods: {
    fetchListProduct () {
      this.isLoad = true
      this.$store.dispatch('listProducts')
          .then((data) => {
            this.listProducts = data.data
            this.isLoad = false
          })
    },
    deleteProduct (id, name) {
      const confirmation = confirm(`Delete product ${name}?`)
      if(confirmation) {
        this.$store.dispatch('deleteByIdProduct', id)
        this.listProducts = []
        this.fetchListProduct();
      }
    },
    fetchListCategory () {
      this.$store.dispatch('listCategory')
          .then((data) => {
            this.listCategory = data.data
          })
    },
  }
}
</script>
