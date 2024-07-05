<template>
  <div>
    <h1>Category</h1>
    <div v-if="isLoad">Load...</div>
    <ul class="list-group" v-else-if="listCategory.length > 0">
      <li class="list-group-item active">An active item</li>
      <li v-for="item in filterListCategory" :key="item.id" class="list-group-item">
        <div v-if="item.parent === null" class="d-flex align-items-center">
          <router-link :to="{name: 'AddCategory', params: {id:  item.id}}">
            <div>{{ item.name }}</div>
          </router-link>
          <button @click="deleteCategory(item.id, item.name)" class="btn btn-danger ms-auto">Delete</button>
        </div>
        <ul v-if="item.children.length > 0" class="mt-3">
          <li v-for="subItem in item.children" :key="subItem.id" class="list-group-item">
            <div class="d-flex align-items-center">
              <router-link :to="{name: 'AddCategory', params: {id:  subItem.id}}">
                - {{ subItem.name }}
              </router-link>
              <button @click="deleteCategory(subItem.id, subItem.name)" class="btn btn-danger ms-auto">Delete</button>
            </div>
            <ul v-if="subItem.children.length > 0">
              <li v-for="subSubItem in subItem.children" :key="subSubItem.id" class="list-group-item">
                <div class="d-flex align-items-center">
                  <router-link :to="{name: 'AddCategory', params: {id:  subSubItem.id}}">
                    -- {{ subSubItem.name }}
                  </router-link>
                  <button @click="deleteCategory(subSubItem.id, subSubItem.name)" class="btn btn-danger ms-auto">Delete</button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <div v-else>List is empty</div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      listCategory: [],
      isLoad: false,
    }
  },
  computed: {
    filterListCategory () {
      return this.listCategory.filter(item => item.parent === null)
    }
  },
  mounted () {
    this.fetchListCategory()
  },
  methods: {
    fetchListCategory () {
      this.isLoad = true
      this.$store.dispatch('listCategory')
          .then((data) => {
            this.listCategory = data.data
            this.isLoad = false
          })
    },
    deleteCategory (idCat, nameCat) {
      const confirmation = confirm(`Delete category ${nameCat}?`)
      if(confirmation) {
        this.$store.dispatch('deleteCategory', idCat)
        this.listCategory = ''
        this.fetchListCategory();
      }
    },
  }
}
</script>
