import {addProduct, listProducts, deleteByIdProduct} from '@/api/product';

const state = {}

const mutations = {}

const actions = {
  addProduct(_, credentials) {
    return new Promise((resolve, reject) => {
      addProduct(credentials)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err addProduct', err);
          reject(err)
        })
    })
  },
  listProducts() {
    return new Promise((resolve, reject) => {
      listProducts()
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err listProducts', err);
          reject(err)
        })
    })
  },
  deleteByIdProduct(_, id) {
    return new Promise((resolve, reject) => {
      deleteByIdProduct(id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err deleteByIdProduct', err);
          reject(err)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations,
}
