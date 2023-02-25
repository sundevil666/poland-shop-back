import {listCategory, addCategory, updateByIdCategory, deleteCategory} from '@/api/category';

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
  updateByIdCategory(_, data) {
    return new Promise((resolve, reject) => {
      updateByIdCategory(data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err updateByIdCategory', err);
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
