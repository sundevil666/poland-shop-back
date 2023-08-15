<template>
  <div class="DeliveryPage">
    <h1 class="mb-4">Delivery info</h1>
    <form>
      <TheInput
          v-model="labelCategory"
          label="Title Delivery"
          placeholder="Title Delivery"
          @input="updateDeliveryTitle(1, {title: labelCategory})"
      />
      <div
          v-for="box in boxesList.boxes"
          :key="box.id"
      >
        <ul class="row">
          <li class="col-auto">{{ box.id }}</li>
          <li class="col">
            <TheInput
                label="Title"
                v-model="box.title"
                placeholder="Title"
                @input="updateDeliveryById(box.id, box)"
            />
          </li>
          <li class="col">
            <TheInput
                label="Size"
                v-model="box.size"
                placeholder="Size"
                @input="updateDeliveryById(box.id, box)"
            />
          </li>
          <li class="col">
            <TheInput
                label="Price"
                v-model="box.price"
                placeholder="Price"
                @input="updateDeliveryById(box.id, box)"
            />
          </li>
        </ul>
        <hr>
      </div>
    </form>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import TheInput from '@/components/form/TheInput.vue';

export default defineComponent({
  name: 'DeliveryPage',
  components: {TheInput},
  data() {
    return {
      labelCategory: '',
      boxesList: [],
    }
  },
  created () {
    this.getDeliveryBoxes()
  },
  methods: {
    getDeliveryBoxes() {
      this.$store.dispatch('getDeliveryBoxes')
          .then(res => {
            this.boxesList = res.data[0];
            this.labelCategory = this.boxesList.title
          })
    },
    updateDeliveryTitle(id, data) {
     this.$store.dispatch('updateDeliveryTitle', {id, data})
    },
    updateDeliveryById(id, box) {
      const data = {
        delivery_id: 1,
        ...box
      }
      data.size = Number(data.size)
      this.$store.dispatch('updateDeliveryBoxById', {id, data})
    },
  }
})
</script>
<style scoped>

</style>
