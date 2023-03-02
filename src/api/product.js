/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
 */

import axios from '@/api/index';

export const addProduct = (data) => axios.post('/products', data)

export const listProducts = () => axios.get('/products')

export const deleteByIdProduct = (id) => axios.delete(`/products/${id}`)

export const getProductById = (id) => axios.get(`/products/${id}`)

export const updateProductById = ({id, data}) => axios.post(`/products/${id}`, data)
