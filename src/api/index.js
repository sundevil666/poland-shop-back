import axios from 'axios'
import { getItem } from '/src/helpers/persistanceStorage'

const httpProtocol = process.env.VUE_APP_HTTP_PROTOCOL || 'http';
const httpsProtocol = process.env.VUE_APP_HTTPS_PROTOCOL || 'https';

axios.defaults.baseURL = 'https://shop-api.polandgroups.pl/api'

axios.defaults.http = process.env.NODE_ENV === 'production' ? false : httpProtocol === 'http'
axios.defaultsюhttps = process.env.NODE_ENV === 'production' ? true : httpsProtocol === 'https'


axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = ' application/json'

  const token = getItem('accessToken')
  const authorizationToken = token ? `Bearer ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config

})

export default axios
