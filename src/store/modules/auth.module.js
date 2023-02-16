import {auth} from '@/api/auth'
import { setItem } from '/src/helpers/persistanceStorage'

const state = {
  user: null,
  errors: null,
  message: null,
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}

const actions = {
  auth({commit}, credentials) {
    return new Promise((resolve, reject) => {
      auth(credentials)
        .then(response => {
          const  token = response.data.auth_token
          setItem('accessToken', token)
          resolve(response.data)
        })
        .catch(err => {
          commit('setErrors', err.response.data.base[0])
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
