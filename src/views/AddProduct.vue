<template>
  <div>
    <h1>{{productById ? 'Edit' : 'Add'}} Product</h1>
    <ul v-if="errors" class="text-bg-danger form-control-plaintext">
      <li v-for="err in errors" :key="err">
        {{err}}
      </li>
    </ul>
    <form @submit.prevent="onSubmitProduct">
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="col-12">
              <the-input label="Product name" placeholder="Product Name" type-input="text" v-model="product.name" />
            </div>
          </div>
          <div class="row">
              <div class="col-4">
                  <the-input label="Unit of measure" type-input="text" placeholder="Unit of measure" v-model="product.unit_of_measure"   />
              </div>
            <div class="col-4">
              <the-input label="Code" placeholder="Code" type-input="text"  v-model="product.code" />
            </div>
            <div class="col-4">
              <the-input label="Price" placeholder="Price" type-input="text" v-model="product.price" />
            </div>
            <div class="col-4">
              <the-input label="Discount" placeholder="Discount" type-input="text" v-model="product.discount" />
            </div>
            <div class="col-4">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Type product</label>
                <select v-model="product.typeProduct" class="form-select">
                  <option selected disabled value="">Type product</option>
                  <option
                      v-for="cat in typeProductList"
                      :key="cat.id"
                      :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-4">
              <the-input label="Weight product" placeholder="Wight product" type-input="text" v-model="product.weightProduct" />
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
              <the-input label="Label mark" placeholder="Label mark" type-input="text" v-model="product.labelMark" />
            </div>

            <div class="col-4">
              <the-input label="Promo Code" placeholder="Promo Code" type-input="number" v-model.number="product.promoCod" />
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
          <the-input label="Quantity" placeholder="Quantity" type-input="text" v-model="product.quantity" />
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="product.status">
            <label class="form-check-label" for="flexCheckDefault">
              Status
            </label>
          </div>

          <the-button :label="productById ? 'Edit' : 'Add'" class="mb-4" />
          <img v-if="product.preview.length > 0" :src="product.preview" alt="src is not correct" class="w-100">
        </div>
      </div>
    </form>
    <hr>
      <h2>Slides</h2>
      <div class="row align-items-end">
          <div class="col">
              <the-input label="Slide" placeholder="Add slide" type-input="text" v-model="product.image" />
          </div>
          <div class="col-auto">
              <the-button :type-input="'button'" label="Add slide" @click="addSlid" :disabled="product.image.length === 0" class="mb-3" />
          </div>

          <div class="col-2">
              <img v-if="product.preview.length !== 0" :src="product.image" alt="src is not correct" class="w-100 mb-3">
          </div>
      </div>
      <p v-if="!product.images.length > 0">sliders is empty yet</p>
      <div v-else>
          <ul class="row">
              <li v-for="(item, index) in product.images" :key="item" class="col-4 border-bottom mb-2 pb-2">
                  <div class="position-relative">
                      <img :src="item" alt="src is not correct" class="w-100 mb-2">
                      <the-button :type-input="'button'" :type-btn="'btn-danger'" label="Delete" @click="deleteSlid(index)" class="position-absolute top-0 start-0" />
                  </div>
              </li>
          </ul>
      </div>
    <hr>
    <h2>Feedbacks</h2>
    <form>
      <div class="row">
        <div class="col-8">
          <the-input label="Feedback name" placeholder="Feedback Name" type-input="text" v-model="feedback.name" />
          <the-input label="Feedback avatar" placeholder="Feedback file" type-input="text" v-model="feedback.avatar" />
          <div class="form-floating mb-3">
            <textarea
                v-model="feedback.message"
                class="form-control"
                style="height: 100px"
                placeholder="Feedback message"
            ></textarea>
            <label for="floatingTextarea2">Feedback message</label>
          </div>
        </div>
        <div class="col-4">
          <div v-if="!isEdit"><the-button label="Add feedback" class="mb-4" @click.prevent="onSubmitFeedback" /></div>
          <div class="d-flex gap-3" v-else>
            <the-button @click.prevent="editFeedback" label="Edit feedback" class="mb-4" />
            <the-button @click.prevent="cancelEditFeedback" label="Cancel" class="mb-4 btn-light" />
          </div>
          <div>
            <img v-if="feedback.avatar.length > 0" :src="feedback.avatar" alt="url isn't correctly" class="w-100 d-block h-auto">
          </div>
        </div>
      </div>
    </form>
    <div v-if="feedbacks.length === 0" class="my-5">Feedbacks list is empty</div>
    <ul v-else class="my-5">
      <li
          v-for="feedback in feedbacks"
          :key="feedback.id"
          class="row mb-2 border-bottom pb-2 align-items-center"
      >
        <div class="col-1">#{{ feedback.id }}</div>
        <div class="col-1">
          <div><img :src="feedback.avatar" :alt="feedback.name" class="d-block feedback-avatar"></div>
        </div>
        <div class="col">
          <button class="btn btn-info text-truncate" title="Edit" @click="preparationEditFeedback(feedback.id)">
            {{ feedback.name }}
          </button>
        </div>
        <div class="col-5 text-truncate">{{ feedback.message }}</div>
        <div class="col-1">
          <button class="btn btn-danger" @click="deleteFeedback(feedback.id)">Deleted</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import TheButton from '@/components/form/TheButton.vue';
import TheInput from '@/components/form/TheInput.vue';

export default {
  name: "AddProduct",
  components: {TheInput, TheButton},
  data () {
    return {
      product: {
        name: '',
        promoCod: '',
        description: '',
        discount: null,
        typeProduct: 1,
        weightProduct: null,
        price: null,
        code: null,
        category_id: '',
        preview: '',
        status: false,
        labelMark: '',
        quantity: 1,
        unit_of_measure: null,
        image: '',
        images: [],
      },
      listCategory: [],
      feedbacks: [],
      feedback: {
        name: '',
        avatar: '',
        message: '',
      },
      isEdit: false,
      errors: null,
      typeProductList: [
        {id: 1, name: 'sm'},
        {id: 2, name: 'md'},
        {id: 3, name: 'lg'},
      ]
    }
  },
  computed: {
    productById () {
      return this.$route.params.id
    },
  },
  mounted () {
    this.fetchListCategory()

    if(this.productById){
      this.fetchProductById(this.productById)
    }
  },
  methods: {
    addSlid() {
      this.product.images.push(this.product.image)
      this.product.image = ''
    },
    deleteSlid(index) {
      const confirmation = confirm(`Delete slide  #-${index}?`)
      if(confirmation) {
        this.product.images.splice(index, 1);
      }
    },
    fetchProductById(id) {
      this.$store.dispatch('getProductById', id)
          .then(res => {
            this.product.name = res.data.name
            this.product.promoCod = res.data.promoCod
            this.product.description = res.data.description
            this.product.discount = res.data.discount
            this.product.price = res.data.price
            this.product.code = res.data.code
            this.product.quantity = res.data.quantity
            this.product.unit_of_measure = res.data.unit_of_measure
            this.product.category_id = res.data.category_id
            this.product.preview = res.data.preview || ''
            this.product.status = res.data.status
            this.product.images = res.data.images || []
            this.product.labelMark = res.data.labelMark
            this.feedbacks = res.data.feedbacks
          })
    },
    fetchListCategory () {
      this.$store.dispatch('listCategory')
          .then((data) => {
            this.listCategory = data.data
          })
    },
    deleteFeedback (id) {
      const confirmation = confirm(`Delete feedback ${id}?`)
      if(confirmation) {
        this.$store.dispatch('deleteFeedback', id)
            .then(() => {
              this.fetchProductById(this.productById)
            })

      }
    },
    preparationEditFeedback (id) {
      this.isEdit = true
      this.$store.dispatch('getFeedbackById', id)
          .then(res => {
            const { data } = res
            this.feedback.id = data.id
            this.feedback.name = data.name
            this.feedback.message = data.message
            this.feedback.product_id = Number(data.product_id)
          })
    },
    editFeedback () {
      const id = this.feedback.id
      const data = this.feedback
      this.$store.dispatch('updateFeedbackById', { id, data })
          .then(() => {
            this.fetchProductById(this.productById)
            this.cancelEditFeedback()
          })
    },
    cancelEditFeedback () {
      this.isEdit = false
      this.feedback.id = null
      this.feedback.name = ''
      this.feedback.message = ''
      this.feedback.avatar = ''
      this.feedback.product_id = ''
    },
    onSubmitFeedback () {
      this.feedback.product_id = Number(this.productById)
      this.$store.dispatch('addFeedback', this.feedback )
          .then(() => {
            this.fetchProductById(this.productById)
            this.cancelEditFeedback()
          })
    },
    onSubmitProduct () {
      if(this.productById) {
        this.$store.dispatch('updateProductById', {id: this.productById, data: this.product})
            .then((data) => {
              console.log(data);
              this.$router.push({name: 'Home'})
            })
            .catch(err => {
              const {errors} = err.response.data
              this.errors = errors
            })
      } else {
        this.$store.dispatch('addProduct', this.product)
            .then((data) => {
              console.log(data);
              this.product = {
                name: '',
                promoCod: '',
                description: '',
                discount: null,
                price: null,
                code: null,
                category_id: '',
                preview: '',
                status: false,
                labelMark: '',
                unit_of_measure: null,
              }
            })
            .catch(err => {
              const {errors} = err.response.data
              this.errors = errors
            })
      }

    }
  }
}
</script>
<style>
.feedback-avatar {
    max-width: 100%;
    height: auto;
    max-height: 40px;
}
</style>
