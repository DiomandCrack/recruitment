import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch,link} from 'react-router-dom'

import {store} from './redux/store'
import AuthRoute from './components/authroute/AuthRoute'
import {AxiosInterceptors} from './utils/config'
import Login from './container/login/Login'
import Register from './container/register/Register'
import BossInfo from './container/bossInfo/BossInfo'

new AxiosInterceptors();


ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)