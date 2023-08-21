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
              <the-input label="Product name" name-icon="title" placeholder="Product Name" type-input="text" v-model="product.name" />
            </div>
          </div>
          <div class="row">

            <div class="col-4">
              <the-input label="Code" name-icon="qr_code" placeholder="Code" type-input="text"  v-model="product.code" />
            </div>
            <div class="col-4">
              <the-input label="Price" name-icon="payments" placeholder="Price" type-input="text" v-model="product.price" />
            </div>
            <div class="col-4">
              <the-input label="Discount" name-icon="discount" placeholder="Discount" type-input="text" v-model="product.discount" />
            </div>
            <div class="col-12">
              <the-input label="Discount label" name-icon="label" placeholder="Discount label" type-input="text" v-model="product.discount_label" />
            </div>
              <div class="col-4">
                  <the-input label="Unit of measure" name-icon="scale" type-input="text" placeholder="Unit of measure" v-model="product.unit_of_measure"   />
              </div>


            <div class="col-4">
              <div class="mb-3">
                <i class="material-icons pe-1">local_shipping</i>
                <label for="exampleFormControlInput1" class="form-label">Delivery box</label>
                <select v-model="product.box_id" class="form-select">
                  <option selected disabled value="">Delivery box</option>
                  <option
                      v-for="item in boxesList?.boxes"
                      :key="item.id"
                      :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-4">
              <the-input label="Size for boxes" name-icon="straighten" placeholder="Size for boxes" type-input="text" v-model="product.size" />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="mb-3">
                <i class="material-icons pe-1">category</i>
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
              <the-input label="Label mark" name-icon="check_circle" placeholder="Label mark" type-input="text" v-model="product.labelMark" />
            </div>

            <div class="col-4">
              <the-input label="Promo Code" name-icon="closed_caption" placeholder="Promo Code" type-input="number" v-model.number="product.promoCod" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <the-input label="Photo" name-icon="image" typeInput="text" v-model="product.preview" placeholder="src img" />
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
          <the-input label="Quantity" name-icon="production_quantity_limits" placeholder="Quantity" type-input="text" v-model="product.quantity" />
          <the-input label="Weight" name-icon="fitness_center" placeholder="Weight" type-input="text" v-model="product.weight" />
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
        box_id: 1,
        size: 1,
        weight: 1,
        price: 1,
        code: '',
        category_id: '',
        preview: '',
        status: false,
        labelMark: '',
        quantity: '',
        unit_of_measure: '',
        image: '',
        images: [],
        type: "product-add",
        discount_label: '',
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
      typeProductList: [],
      boxesList: [],
    }
  },
  computed: {
    productById () {
      return this.$route.params.id
    },
  },
  created () {
    this.fetchListCategory()
    this.getDeliveryBoxes()

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
            const data = res.data;
            this.product.name = data.name
            this.product.promoCod = data.promoCod
            this.product.description = data.description
            this.product.discount = data.discount
            this.product.price = data.price
            this.product.code = data.code
            this.product.quantity = data.quantity
            this.product.unit_of_measure = data.unit_of_measure
            this.product.discount_label = data.discount_label
            this.product.category_id = data.category_id
            this.product.preview = data.preview || ''
            this.product.status = data.status
            this.product.images = data.images || []
            this.product.labelMark = data.labelMark
            this.product.feedbacks = data.feedback
          })
    },
    getDeliveryBoxes() {
      this.$store.dispatch('getDeliveryBoxes')
          .then(res => {
            this.boxesList = res.data[0];
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
