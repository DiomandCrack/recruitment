import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch,link} from 'react-router-dom'

import store from './redux/store'

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)