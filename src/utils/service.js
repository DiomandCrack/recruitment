import axios from 'axios';

const apiURL = `http://localhost:3001`
const ins = axios.create({
    withCredentials: true
})
export default class Service {
    get(endpoint, options = null) {
        const url = `${apiURL}/${endpoint}`;
        return ins.get(url, options)
    }
    post(endpoint = '', data = {}, options = { headers: { 'Content-Type': 'application/json' } }) {
        const url = `${apiURL}/${endpoint}`;
        return ins.post(url, data, options);
    }
}