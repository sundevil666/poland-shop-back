/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
*/

import axios from '@/api/index';

export const updateFeedbacksById = ({id, data}) => axios.post(`/feedback/${id}`, data)

export const addFeedbacks = (data) => axios.post('/feedback', data)

export const deleteCategory = (id) => axios.delete(`/feedback/${id}`)
