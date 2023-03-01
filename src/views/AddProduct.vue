<template>
  <div>
    <h1>Add Product</h1>
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-10">
          <the-input label="Product name" placeholder="Product Name" tyepInput="text" v-model="product.name" />
        </div>
        <div class="col-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Status
            </label>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-4">
          <the-input label="Code" placeholder="Code" tyepInput="text" v-model="product.code" />
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
              <option selected disabled value="0">Category</option>
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
          <the-input label="Photo" typeInput="file" />
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

<script>
export default {
  name: "AddProduct",
  data () {
    return {
      product: {
        name: 'Profil aluminiowy uniwersalny bezuszczelkowy',
        promoCod: 'ad12DK',
        description: 'description',
        first_price: '95',
        price: '75',
        code: '0723314791448',
        category_id: '2',
        preview: 'file',
        status: null,
        labelMark: 'Są dostępne'
      },
      listCategory: []
    }
  },
  mounted () {
    this.fetchListCategory()
  },
  methods: {
    fetchListCategory () {
      this.$store.dispatch('listCategory')
          .then((data) => {
            this.listCategory = data.data
          })
    },
    onSubmit () {
      console.log(this.product);
    }
  }
}
</script>
