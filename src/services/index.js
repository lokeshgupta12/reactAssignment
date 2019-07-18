import axios from 'axios';
import { MOCK_API_URL } from '../constant'
const HEADER = {
    'Content-Type': "application/json"
}

export const fetchPostApi = (input) => {
    return axios.post(MOCK_API_URL, { input }, { headers: HEADER })
}

export const fetchGetApi = (token) => {
    return axios.get(MOCK_API_URL + '/' + token)
}

export default {
    fetchPostApi,
    fetchGetApi
}