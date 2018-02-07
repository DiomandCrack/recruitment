import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch,link} from 'react-router-dom'

//redux
import {store} from './redux/store'
import {AxiosInterceptors} from './utils/config'
//component
import AuthRoute from './components/authroute/AuthRoute'
import Dashboard from './components/dashboard/Dashboard'
//container component
import Login from './container/login/Login'
import Register from './container/register/Register'
import BossInfo from './container/bossInfo/BossInfo'
import SeekerInfo from './container/seekerInfo/SeekerInfo'


new AxiosInterceptors();

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/seekerinfo' component={SeekerInfo}></Route>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)