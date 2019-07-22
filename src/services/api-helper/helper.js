import axios from 'axios';

export default class ApiHelper {

    static genericGet(url) {
        return axios.get(url)
        .then(this.handleError)
        .then(data => { return data })
        .catch((e) => {
          return e.response; 
        });
    }

    static genericPost(url, data, header) {
        return axios.post(url, { data }, { headers: header })
        .then(this.handleError)
        .then(data => { return data })
        .catch((e) => {
          return e.response; 
        });
    }

    handleError(response) {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return response;
    }
}