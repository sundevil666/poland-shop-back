import {auth} from '@/api/auth'
import { setItem } from '/src/helpers/persistanceStorage'

const state = {}

const mutations = {}

const actions = {
  auth(_, credentials) {
    return new Promise((resolve, reject) => {
      auth(credentials)
        .then(response => {
          const  token = response.data.token
          setItem('accessToken', token)
          resolve(response.data)
        })
        .catch(err => {
          console.log('err auth', err);
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
