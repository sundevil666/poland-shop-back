<template>
  <div>
    <h1>{{ categoryCreate ? 'Add Category' : 'Edit Category'}}</h1>
    <form @submit.prevent="onSubmit">
      <the-input label="Title category" type="text" placeholder="Title category" v-model="labelCategory" />
      <the-button label="Add Category" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddCategory",
  data() {
    return {
      labelCategory: '',
    }
  },
  computed: {
    stateCategory() {
      return this.$route.params.id
    },
    titleEditCategory() {
      return this.$route.query.title
    },
    categoryCreate () {
      return this.stateCategory === 'new'
    },
  },
  mounted () {
    if(!this.categoryCreate) {
      this.labelCategory = this.titleEditCategory
    }
  },
  methods: {
    onSubmit () {
      if(!this.labelCategory) {
        return
      }
      if(this.categoryCreate) {
        this.$store.dispatch('addCategory', {name: this.labelCategory})
            .then(() => {
              this.labelCategory = ''
            })
      } else {
        const data = {
          name: this.labelCategory,
        }
        this.$store.dispatch('updateByIdCategory', {id: this.stateCategory, data})
            .then(() => {
              this.labelCategory = ''
              this.$router.push({name: 'Category'});
            })
      }

    }
  }
}
</script>
