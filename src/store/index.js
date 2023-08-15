import { createStore } from 'vuex'
import authModule from '@/store/modules/auth.module'
import categoryModule from '@/store/modules/category.module'
import productModule from '@/store/modules/product.module';
import feedbackModule from '@/store/modules/feedback.module';
import deliveryModule from '@/store/modules/delivery.module';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authModule,
    categoryModule,
    productModule,
    feedbackModule,
    deliveryModule,
  }
})
