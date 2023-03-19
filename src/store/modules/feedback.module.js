import {updateFeedbackById, addFeedback, deleteFeedback, getFeedbackById } from '@/api/feedbacks';

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
  getFeedbackById(_, credentials) {
    return new Promise((resolve, reject) => {
      getFeedbackById(credentials)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log('err getFeedbackById', err);
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
