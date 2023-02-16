import axios from 'axios'
import { getItem } from '/src/helpers/persistanceStorage'

axios.defaults.baseURL = 'https://polandgroups.pl/shop-adminka/api'

axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = ' application/json'

  const token = getItem('accessToken')
  const authorizationToken = token ? `Bearer ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config

})

export default axios
