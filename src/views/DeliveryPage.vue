<template>
  <div class="DeliveryPage">
    <h1 class="mb-4">Delivery info</h1>
    <form>
      <TheInput v-model="labelCategory" label="Title Delivery" placeholder="Title Delivery" />
      <div
          v-for="box in boxes"
          :key="box.id"
      >
        <ul class="row">
          <li class="col-auto">{{ box.id }}</li>
          <li class="col">
            <TheInput :label="box.label" v-model="box.label" :placeholder="box.label" />
          </li>
          <li class="col">
            <TheInput :label="box.labelSize" v-model="box.size" :placeholder="box.labelSize" />
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
import { boxes } from '@/moc/delivery-box'

export default defineComponent({
  name: 'DeliveryPage',
  components: {TheInput},
  data() {
    return {
      labelCategory: 'Name delivery',
      boxes
    }
  }
})
</script>
<style scoped>

</style>
