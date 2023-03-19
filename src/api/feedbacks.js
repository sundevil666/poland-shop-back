/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
*/

import axios from '@/api/index';

export const updateFeedbackById = ({product_id, data}) => axios.post(`/feedback/${product_id}`, data)

export const addFeedback = (data) => axios.post('/feedback', data)

export const deleteFeedback = (id) => axios.delete(`/feedback/${id}`)
