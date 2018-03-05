import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

//redux
import {store} from './redux/store'
//component
import App from './App'
import './index.css'

ReactDom.hydrate(
    (<Provider store={store}>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)