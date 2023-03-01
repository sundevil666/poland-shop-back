/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
 */

import axios from '@/api/index';

// {
//   "name": "product",
//   "label" : "product",
//   "description" : "product",
//   "first_price : "4",
//   "price" : "5.0",
//   "code" : "1234",
//   "category_id" : "4",
//   "preview" : file,
// }
export const addProduct = (data) => axios.post('/products', data)
export const updateByIdProduct = (id, data) => axios.post(`/products/${id}`, data)

export const getByIdProduct = (id) => axios.get(`/products/${id}`)
export const listProductsByIdCategory = (id) => axios.get(`/categories/${id}`)
export const deleteByIdProduct = (id) => axios.delete(`/products/${id}`)
