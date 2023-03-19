/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
*/

import axios from '@/api/index';

export const getFeedbackById = (id) => axios.get(`/feedback/${id}`)
export const updateFeedbackById = ({id, data}) => axios.post(`/feedback/${id}`, data)

export const addFeedback = (data) => axios.post('/feedback', data)

export const deleteFeedback = (id) => axios.delete(`/feedback/${id}`)
