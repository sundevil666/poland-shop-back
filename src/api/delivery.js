/**
 * https://github.com/MySolobchuk/shop-api/blob/master/README.md
 */

import axios from '@/api/index';

export const getDeliveryBoxes = () => axios.get('/deliveries')
export const updateDeliveryTitle = ({id, data}) => axios.post(`/deliveries/${id}`, data)
export const updateDeliveryBoxById = ({id, data}) => axios.post(`/boxes/${id}`, data)
