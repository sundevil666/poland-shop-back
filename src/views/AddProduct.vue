<template>
  <div>
    <h1>{{productById ? 'Edit' : 'Add'}} Product</h1>
    <ul v-if="errors" class="text-bg-danger form-control-plaintext">
      <li v-for="err in errors" :key="err">
        {{err}}
      </li>
    </ul>
    <form>
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
                <div v-if="editor" class="btn-editor-wrapper">

                  <input
                    class="p-1"
                    type="color"
                    @input="editor.chain().focus().setColor($event.target.value).run()"
                    :value="editor.getAttributes('textStyle').color"
                  >

                  <button
                      type="button"
                      class="btn btn-outline-info"
                      @click="addImage"
                  >
                    <span class="material-icons pe-1">image</span>
                  </button>

                  <template
                      v-for="item in btnsTipTap"
                      :key="item.title"
                  >
                    <button
                        :title="item.title"
                        type="button"
                        class="btn btn-outline-info"
                        :class="{ 'is-active': item.isActive ? item.isActive(): null  }"
                        @click="item.action()"
                    >
                      <span class="material-icons pe-1">{{item.icon}}</span>
                    </button>
                  </template>
                  <button
                      type="button"
                      class="btn btn-outline-info"
                      @click="setLink"
                      :class="{ 'is-active': editor.isActive('link') }"
                  >
                    <span class="material-icons pe-1">insert_link</span>
                  </button>
                  <button
                      type="button"
                      class="btn btn-outline-info"
                      @click="editor.chain().focus().unsetLink().run()"
                      :disabled="!editor.isActive('link')"
                  >
                    <span class="material-icons pe-1">link_off</span>
                  </button>
                  <button
                      type="button"
                      class="btn btn-outline-info"
                      @click="addVideo">
                    <span class="material-icons pe-1">videocam</span>
                  </button>
                </div>
                <editor-content
                    :editor="editor"
                />
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

          <the-button :label="productById ? 'Edit' : 'Add'" class="mb-4" @click.prevent="onSubmitProduct" />
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
            <the-button :type-input="'button'" label="Add slide" @click="addSlid" :disabled="product.image && product.image.length === 0" class="mb-3" />
        </div>

        <div class="col-2">
            <img v-if="product.image && product.image.length > 0" :src="product.image" alt="src is not correct" class="w-100 mb-3">
        </div>
    </div>
    <p v-if="product.images && !product.images.length > 0">sliders is empty yet</p>
    <div v-else>
        <ul class="row">
            <li v-for="(item, index) in product.images" :key="item" class="col-4 border-bottom mb-2 pb-2">
                <div class="position-relative">
                    <img v-if="item.length && item.length > 0" :src="item" alt="src is not correct" class="w-100 mb-2">
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
            <img v-if="feedback.avatar && feedback.avatar.length > 0" :src="feedback.avatar" alt="url isn't correctly" class="w-100 d-block h-auto">
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
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'

export default {
  name: "AddProduct",
  components: {TheInput, TheButton, EditorContent },
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
      editor: null,
      btnsTipTap: [
        {
          icon: 'format_bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold'),
        },
        {
          icon: 'format_italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic'),
        },
        {
          icon: 'local_parking',
          title: 'Paragraph',
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive('paragraph'),
        },
        {
          icon: 'list',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList'),
        },
        {
          icon: 'format_list_numbered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList'),
        },
        {
          icon: 'code',
          title: 'Code Block',
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive('codeBlock'),
        },
        {
          icon: 'horizontal_rule',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          icon: 'format_clear',
          title: 'Clear Format',
          action: () => this.editor.chain()
              .focus()
              .clearNodes()
              .unsetAllMarks()
              .run(),
        },
        {
          icon: 'undo',
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: 'redo',
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run(),
        },
      ],
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
    } else {
      this.editor = new Editor({
        content: '',
        extensions: [
          StarterKit,
          Color,
          TextStyle,
          Image,
          Link.configure({
            openOnClick: false,
          }),
          Youtube.configure({
            controls: false,
          }),
        ],
        editorProps: {
          attributes: {
            spellcheck: 'false',
          },
        },
      })
    }
  },

  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    addVideo() {
      const url = prompt('Enter YouTube URL')
      this.editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, 720),
        height: Math.max(180, 480),
      })
    },
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
      if (url === null) {
        return
      }
      if (url === '') {
        this.editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }
      this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    },
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
            this.product.box_id = data.box_id
            this.product.size = data.size
            this.product.weight = data.weight
            this.product.price = data.price
            this.product.code = data.code
            this.product.category_id = data.category_id
            this.product.preview = data.preview || ''
            this.product.status = data.status
            this.product.labelMark = data.labelMark
            this.product.quantity = data.quantity
            this.product.unit_of_measure = data.unit_of_measure
            this.product.image = data.image || ''
            this.product.images = data.images || []
            this.product.type = data.type
            this.product.discount_label = data.discount_label
            this.feedbacks = data.feedbacks || []

            this.editor = new Editor({
              content: this.product.description,
              extensions: [
                StarterKit,
                Color,
                TextStyle,
                Image,
                Link.configure({
                  openOnClick: false,
                }),
                Youtube.configure({
                  controls: false,
                }),
              ],
            })
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
        this.product.description = this.editor.getHTML()
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
        this.product.description = this.editor.getHTML()
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

    },
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },

  },
}
</script>
<style>
.feedback-avatar {
    max-width: 100%;
    height: auto;
    max-height: 40px;
}
.btn-editor-wrapper {
  margin-top: 10px;
}
.ProseMirror {
  min-height: 250px;
  margin: 15px 0;
  max-width: 100%;
  border: 1px solid #000;
  padding: 10px;
}
.ProseMirror ul, .ProseMirror ol {
  padding-left: 20px;
}
.ProseMirror ul li {
  list-style-type: disc;
}
.ProseMirror ol li {
  list-style-type: decimal;
}
.ProseMirror img {
  display: block;
  width: 100%;
}
.ProseMirror iframe {
  width: 100% !important;
}
</style>
