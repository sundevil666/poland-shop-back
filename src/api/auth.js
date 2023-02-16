import axios from '@/api/index';

export const auth = (data) => axios.post('/admin/login', data)
