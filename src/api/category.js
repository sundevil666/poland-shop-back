/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
*/

import axios from '@/api/index';

// Создание категории post /api/categories
export const addCategory = (data) => axios.post('/categories', data)
// {
//   "name": "test_update11",
// }

// Обнавление категории post /api/categories/8
export const updateCategory = (data, id) => axios.post(`/categories/${id}`, data)
// {
//   "name": "product",
// }


// Получение продукта по ID GET /api/categories/4
export const fetchProductByIdCategory = (id) => axios.get(`/categories/${id}`)

// Удаление продукта по ID DELETE /api/categories/5
export const deleteCategory = (id) => axios.delete(`/categories/${id}`)
