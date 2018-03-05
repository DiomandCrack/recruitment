import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

//redux
import {store} from './redux/store'
import {AxiosInterceptors} from './utils/config'
//component
import App from './App'
import './index.css'

new AxiosInterceptors();

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)