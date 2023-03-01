import {listCategory, addCategory, updateCategoryById, deleteCategory, getCategoryById} from '@/api/category';

const state = {}

const mutations = {}

const actions = {
  listCategory() {
    return new Promise((resolve, reject) => {
      listCategory()
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err listCategory', err);
          reject(err)
        })
    })
  },
  addCategory(_, credentials) {
    return new Promise((resolve, reject) => {
      addCategory(credentials)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err addCategory', err);
          reject(err)
        })
    })
  },
  getCategoryById(_, id) {
    return new Promise((resolve, reject) => {
      getCategoryById(id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err getCategoryById', err);
          reject(err)
        })
    })
  },
  updateCategoryById(_, data) {
    return new Promise((resolve, reject) => {
      updateCategoryById(data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err updateCategoryById', err);
          reject(err)
        })
    })
  },
  deleteCategory(_, id) {
    return new Promise((resolve, reject) => {
      deleteCategory(id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err deleteCategory', err);
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
