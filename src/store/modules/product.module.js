import {addProduct, listProducts, deleteByIdProduct, getProductById, updateProductById} from '@/api/product';

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
  },
  getProductById(_, id) {
    return new Promise((resolve, reject) => {
      getProductById(id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err getByIdProduct', err);
          reject(err)
        })
    })
  },
  updateProductById(_, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      updateProductById(data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err updateProductById', err);
          reject(err)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
