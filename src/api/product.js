/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
 */

import axios from '@/api/index';

export const addProduct = (data) => axios.post('/products', data)

export const listProducts = ({perPage = 10, categoryId = null, page = 1}) => {
  const data = categoryId ?  `&category_ids[]=${categoryId}` : ''
  return axios.get(`/products/admin/all?&sort[column]=id&sort[type]=desc&perPage=${perPage}${data}&page=${page}`)
}

export const deleteByIdProduct = (id) => axios.delete(`/products/${id}`)

export const getProductById = (id) => axios.get(`/products/${id}`)

export const updateProductById = ({id, data}) => axios.post(`/products/${id}`, data)
