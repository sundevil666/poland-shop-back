<template>
  <div>
    <h1>{{productById ? 'Edit' : 'Add'}} Product</h1>
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-10">
          <the-input label="Product name" placeholder="Product Name" tyepInput="text" v-model="product.name" />
        </div>
        <div class="col-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="product.status">
            <label class="form-check-label" for="flexCheckDefault">
              Status
            </label>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-4">
          <the-input label="Code" placeholder="Code" tyepInput="number" v-model.number="product.code" />
        </div>
        <div class="col-4">
          <the-input label="Price" placeholder="Price" tyepInput="text" v-model="product.price" />
        </div>
        <div class="col-4">
          <the-input label="First Price" placeholder="First Price" tyepInput="text" v-model="product.first_price" />
        </div>

      </div>
      <div class="row">
        <div class="col-4">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Category</label>
            <select v-model="product.category_id" class="form-select">
              <option selected disabled value="">Category</option>
              <option
                  v-for="cat in listCategory"
                  :key="cat.id"
                  :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <the-input label="Label mark" placeholder="Label mark" tyepInput="text" v-model="product.labelMark" />
        </div>
        <div class="col-4">
          <the-input label="Photo" typeInput="text" v-model="product.preview" />
        </div>
      </div>

      <div class="form-floating mb-3">
        <textarea
            v-model="product.description"
            class="form-control"
            placeholder="Description"
            id="floatingTextarea2"
            style="height: 100px"
        ></textarea>
        <label for="floatingTextarea2">Description</label>
      </div>
      <the-button label="Add Product" />
    </form>
  </div>
</template>

<script>2

export default {
  name: "AddProduct",
  data () {
    return {
      product: {
        name: 'Profil aluminiowy uniwersalny bezuszczelkowy',
        promoCod: 'ad12DK',
        description: 'description',
        first_price: 95,
        price: 75,
        code: 1723314791448,
        category_id: '',
        preview: '',
        status: true,
        labelMark: 'Są dostępne'
      },
      listCategory: []
    }
  },
  computed: {
    productById () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.fetchListCategory()
    this.fetchProductById(this.productById)
  },
  methods: {
    fetchProductById(id) {
      this.$store.dispatch('getProductById', id)
          .then(res => {
            console.log(res.data);
            this.product.name = res.data.name
            this.product.promoCod = res.data.promoCod
            this.product.description = res.data.description
            this.product.first_price = res.data.first_price
            this.product.price = res.data.price
            this.product.code = res.data.code
            this.product.category_id = res.data.category_id
            this.product.preview = res.data.preview
            this.product.status = res.data.status
            this.product.labelMark = res.data.labelMark
          })
    },
    fetchListCategory () {
      this.$store.dispatch('listCategory')
          .then((data) => {
            this.listCategory = data.data
          })
    },
    onSubmit () {
      if(this.productById) {
        this.$store.dispatch('updateProductById', {id: this.productById, data: this.product})
            .then((data) => {
              console.log(data);
            })
      } else {
        this.$store.dispatch('addProduct', this.product)
            .then((data) => {
              console.log(data);
            })
      }

    }
  }
}
</script>
