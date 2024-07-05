/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
*/

import axios from '@/api/index';

// Получение списка категорий /api/categories
export const listCategory = () => axios.get('/categories/tree')
export const getCategoryById = (id) => axios.get(`/categories/${id}`)

// Обнавление категории post /api/categories/8
export const updateCategoryById = ({id, data}) => axios.post(`/categories/${id}`, data)
// {
//   name: "name",
//   parent_i: 4
// }

// Создание категории post /api/categories
export const addCategory = (data) => axios.post('/categories', data)
// {
//   "name": "test_update11",
// }

// Удаление продукта по ID DELETE /api/categories/5
export const deleteCategory = (id) => axios.delete(`/categories/${id}`)
