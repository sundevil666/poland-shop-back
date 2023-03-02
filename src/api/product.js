/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
 */

import axios from '@/api/index';

export const addProduct = (data) => axios.post('/products', data)

export const listProducts = () => axios.get('/products')

export const deleteByIdProduct = (id) => axios.delete(`/products/${id}`)

export const listProductsByIdCategory = (id) => axios.get(`/categories/${id}`)
export const updateByIdProduct = (id, data) => axios.post(`/products/${id}`, data)

export const getByIdProduct = (id) => axios.get(`/products/${id}`)

