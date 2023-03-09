<template>
  <div>
    <h1>{{productById ? 'Edit' : 'Add'}} Product</h1>
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="col-12">
              <the-input label="Product name" placeholder="Product Name" tyepInput="text" v-model="product.name" />
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
              <the-input label="Promo Code" placeholder="Promo Code" tyepInput="number" v-model.number="product.promoCod" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <the-input label="Photo" typeInput="text" v-model="product.preview" placeholder="src img" />
            </div>
            <div class="col-12">
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
            </div>
          </div>
        </div>
        <div class="col-3">
          <the-input label="Quantity" placeholder="Quantity" tyepInput="text" v-model="product.quantity" />
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="product.status">
            <label class="form-check-label" for="flexCheckDefault">
              Status
            </label>
          </div>

          <the-button label="Add Product" class="mb-4" />
          <img v-if="product.preview.length > 0" :src="product.preview" alt="src is not correct" class="w-100">
        </div>
      </div>
    </form>
  </div>
</template>

<script>2

export default {
  name: "AddProduct",
  data () {
    return {
      product: {
        name: '',
        promoCod: '',
        description: '',
        first_price: null,
        price: null,
        code: null,
        category_id: '',
        preview: '',
        status: false,
        labelMark: '',
        quantity: 1,
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

    if(this.productById){
      this.fetchProductById(this.productById)
    }
  },
  methods: {
    fetchProductById(id) {
      this.$store.dispatch('getProductById', id)
          .then(res => {
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
              this.$router.push({name: 'Home'})
            })
      } else {
        this.$store.dispatch('addProduct', this.product)
            .then((data) => {
              console.log(data);
              this.product = {
                name: '',
                promoCod: '',
                description: '',
                first_price: null,
                price: null,
                code: null,
                category_id: '',
                preview: '',
                status: false,
                labelMark: ''
              }
            })
      }

    }
  }
}
</script>
