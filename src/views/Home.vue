<template>
  <div class="home-page">
    <h1>list products</h1>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="me-3">Filter</div>
      <select v-model="categoryCurrent" class="form-select" @change="changeCategory">
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
    <div v-else-if="listProducts.length > 0">
      <div class="flex">
        <button
         v-for="n in metaData.last_page"
         :key="n"
         class=" btn mx-2"
         :class="n === currentPage ? 'btn-info' : 'btn-light'"
         type="button"
         @click="goToPage(n)"
        >
          {{ n }}
        </button>
      </div>
      <table  class="table w-100">
        <tr class="text-center">
          <th>id</th>
          <th>category</th>
          <th>Product</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
        <tbody>
        <tr v-for="item in listProducts" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.category?.name }}</td>
          <td>
            <router-link :to="{name: 'AddProduct', params: {id:  item.id}}">
              <span>{{ item.name }}</span>
            </router-link>
          </td>
          <td>
            <input class="form-check-input" type="checkbox" :checked="item.status" disabled>
          </td>
          <td>
            <button @click="deleteProduct(item.id, item.name)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>List is empty</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      listProducts: [],
      isLoad: false,
      categoryCurrent: 0,
      listCategory: [],
      perPage: 50,
      categoryId: '',
      currentPage : 1,
      metaData: '',
    }
  },
  mounted () {
    this.fetchListCategory()
    this.fetchListProduct()
  },
  methods: {
    changeCategory() {
      this.fetchListProduct()
    },
    fetchListProduct () {
      const data = {
        perPage: this.perPage,
        page: this.currentPage,
        categoryId: Number(this.categoryCurrent)
      }
      this.isLoad = true
      this.$store.dispatch('listProducts', data)
          .then((data) => {
            this.listProducts = data.data
            this.metaData = data.meta
            this.isLoad = false
          })
    },
    goToPage (n) {
      this.currentPage = n
      this.fetchListProduct()
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
