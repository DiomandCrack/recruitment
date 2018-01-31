import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch,link} from 'react-router-dom'

import store from './redux/store'
import AxiosInterceptors from './utils/config'

new AxiosInterceptors();

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
        <div></div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)