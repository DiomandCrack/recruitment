import axios from 'axios'
import { Toast } from 'antd-mobile'







export class AxiosInterceptors {
    constructor() {
        this.interceptRequest();
        this.interceptRsponse();
    }
    interceptRequest() {
        //intercept requset
        axios.interceptors.request.use((config) => {
            Toast.loading('LOADING', 0)
            return config
        })
    }
    interceptRsponse() {
        //intercept response
        axios.interceptors.response.use((config) => {
            Toast.hide()
            return config
        })
    }
}