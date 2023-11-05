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
    <table  class="table w-100" v-else-if="listProducts.length > 0">
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
      perPage: 100,
      categoryId: '',
    }
  },
  mounted () {
    this.fetchListCategory()
    this.fetchListProduct({perPage: this.perPage})
  },
  methods: {
    changeCategory() {
      const data = {
        perPage: this.perPage,
        categoryId: Number(this.categoryCurrent),
      }
      this.fetchListProduct(data)
    },
    fetchListProduct (perPage, categoryId) {
      this.isLoad = true
      this.$store.dispatch('listProducts', perPage, categoryId)
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
