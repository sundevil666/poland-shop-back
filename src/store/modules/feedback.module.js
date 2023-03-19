import {updateFeedbackById, addFeedback, deleteFeedback } from '@/api/feedbacks';

const state = {}

const mutations = {}

const actions = {
  addFeedback(_, credentials) {
    return new Promise((resolve, reject) => {
      addFeedback(credentials)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err addFeedback', err);
          reject(err)
        })
    })
  },
  updateFeedbackById(_, data) {
    return new Promise((resolve, reject) => {
      updateFeedbackById(data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err updateFeedbackById', err);
          reject(err)
        })
    })
  },
  deleteFeedback(_, id) {
    return new Promise((resolve, reject) => {
      deleteFeedback(id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err deleteFeedback', err);
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
