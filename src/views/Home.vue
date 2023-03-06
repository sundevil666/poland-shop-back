<template>
  <div class="home-page">
    <h1>list products</h1>
    <div v-if="isLoad">Load...</div>
    <ul class="list-group" v-else-if="listProducts.length > 0">
      <li class="list-group-item active">An active item</li>
      <li v-for="item in listProducts" :key="item.id" class="list-group-item">
        <div class="d-flex align-items-center">
          <div class="me-2">#-{{ item.id }}</div>
          <div class="me-2">#cat-{{ item.category_id }}</div>
          <router-link :to="{name: 'AddProduct', params: {id:  item.id}}">
            <span>{{ item.name }}</span>
          </router-link>
          <button @click="deleteProduct(item.id, item.name)" class="btn btn-danger ms-auto">Delete</button>
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
    }
  },
  mounted () {
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
    }
  }
}
</script>
