import { createStore } from 'vuex'
import authModule from '@/store/modules/auth.module'
import categoryModule from '@/store/modules/category.module'
import productModule from '@/store/modules/product.module';

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
  }
})
