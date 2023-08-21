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
      <div class="row mb-4">
        <div class="col-6">
          <TheInput
              v-model="delivery.time"
              label="Time Delivery"
              placeholder="Time Delivery"
              @input="updateDeliveryDelivery(1, {time: delivery.time})"
          />
        </div>
        <div class="col-6">
          <TheInput
              v-model="delivery.payment"
              label="Payment Delivery"
              placeholder="Payment Delivery"
              @input="updateDeliveryDelivery(1, {payment: delivery.payment})"
          />
        </div>
        <div class="col-6">
          <TheInput
              v-model="delivery.protected"
              label="Protected Delivery"
              placeholder="Protected Delivery"
              @input="updateDeliveryDelivery(1, {protected: delivery.protected})"
          />
        </div>
        <div class="col-6">
          <TheInput
              v-model="delivery.methodPayment"
              label="Method payment Delivery"
              placeholder="Method payment Delivery"
              @input="updateDeliveryDelivery(1, {methodPayment: delivery.methodPayment})"
          />
        </div>
      </div>
      <div
          v-for="box in boxesListBoxes"
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
      delivery: {
        time: 'Przewidywana dostawa: w poniedziałek u Ciebie',
        payment: 'Dostawa za darmo',
        protected: 'Bezpieczeństwo pozakupowe',
        methodPayment: 'Metody płatności',
      },
      labelCategory: '',
      boxesListBoxes: [],
    }
  },
  created () {
    this.getDeliveryBoxes()
  },
  methods: {
    getDeliveryBoxes() {
      this.$store.dispatch('getDeliveryBoxes')
          .then(res => {
            this.boxesListBoxes = res.data[0].boxes;
            this.labelCategory = res.data[0].title
            this.delivery.time = res.data[0].time
            this.delivery.payment = res.data[0].payment
            this.delivery.protected = res.data[0].protected
            this.delivery.methodPayment = res.data[0].methodPayment
          })
    },
    updateDeliveryTitle(id, data) {
     this.$store.dispatch('updateDeliveryTitle', {id, data})
    },
    updateDeliveryDelivery(id, val) {
      const data = {
        ...val,
        title: this.labelCategory
      }
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
