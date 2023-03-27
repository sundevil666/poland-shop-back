<template>
  <div>
    <h1>{{ !idCategory ? 'Add Category' : 'Edit Category'}}</h1>
    <div v-if="isLoad">Load...</div>
    <form v-else @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-8">
          <the-input label="Title category" type="text" placeholder="Title category" v-model="labelCategory" />
          <the-input label="Photo" typeInput="text" v-model="previewCategory" placeholder="src img" />
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Category</label>
            <select v-model="currentCategory" class="form-select">
              <option selected disabled value="null">Category</option>
              <option
                  v-for="cat in filterCategory"
                  :key="cat.id"
                  :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <the-button :label="!idCategory ? 'Add Category' : 'Edit Category'" class="mb-3" />
          <img v-if="previewCategory.length > 0" :src="previewCategory" alt="src is not correct" class="w-100">
        </div>

      </div>

    </form>
  </div>
</template>

<script>

export default {
  name: "AddCategory",
  data() {
    return {
      labelCategory: '',
      listCategory: [],
      previewCategory: '',
      category: {},
      currentCategory: null,
      isLoad: false,
    }
  },
  computed: {
    idCategory() {
      return this.$route.params.id
    },
    filterCategory () {
      return this.idCategory ? this.listCategory.filter(item => item.id !== this.category.id) : this.listCategory
    },
  },
  mounted () {
    this.fetchListCategory()
    if(this.idCategory) {
      this.fetchCategoryById(this.idCategory)
    }
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
    fetchCategoryById (id) {
      this.isLoad = true
      this.$store.dispatch('getCategoryById', id)
          .then((data) => {
            this.category = data.data
            this.labelCategory = this.category.name
            this.previewCategory = this.category.preview || ''
            if(this.category.parent_id) {
              this.currentCategory = this.category.parent.id
            }
            this.isLoad =false
          })
    },
    onSubmit () {
      if(!this.labelCategory) {
        return
      }
      const data = {
        name: this.labelCategory,
        parent_id: this.currentCategory,
        preview: this.previewCategory,
      }
      if(!this.idCategory) {
        this.$store.dispatch('addCategory', data)
            .then(() => {
              this.labelCategory = ''
            })
      } else {
        this.$store.dispatch('updateCategoryById', {id: this.idCategory, data})
            .then(() => {
              this.labelCategory = ''
              this.$router.push({name: 'Category'});
            })
      }

    }
  }
}
</script>
