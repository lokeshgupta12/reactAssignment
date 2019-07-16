import axios from 'axios';
import { MOCK_API_URL } from '../constant'
const HEADER = {
    'Content-Type': "application/json"
}

export const fetchPostApi = (input) => {
    return axios.post(MOCK_API_URL, { headers: HEADER }, { input })
}

export const fetchGetApi = (token) => {
    return axios.post(MOCK_API_URL + '/' + token)
}

export default {
    fetchPostApi,
    fetchGetApi
}