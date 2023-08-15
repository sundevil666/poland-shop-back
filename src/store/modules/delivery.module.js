import { getDeliveryBoxes, updateDeliveryTitle, updateDeliveryBoxById } from '@/api/delivery';

const state = {}

const mutations = {}

const actions = {
  getDeliveryBoxes() {
    return new Promise((resolve, reject) => {
      getDeliveryBoxes()
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err getDeliveryBoxes', err);
          reject(err)
        })
    })
  },
  updateDeliveryTitle(_, data) {
    return new Promise((resolve, reject) => {
      updateDeliveryTitle(data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err updateDeliveryTitle', err);
          reject(err)
        })
    })
  },
  updateDeliveryBoxById(_, data) {
    return new Promise((resolve, reject) => {
      updateDeliveryBoxById(data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err updateDeliveryBoxById', err);
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
