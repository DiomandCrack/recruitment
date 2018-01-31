import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch,link} from 'react-router-dom'

// import store from './redux/store'
import AuthRoute from './components/authroute/AuthRoute'
import {AxiosInterceptors} from './utils/config'
import Service from './utils/service'
import Login from './container/login/Login'
import Register from './container/register/Register'

const service = new Service();
// new AxiosInterceptors();

service.get('data').then(
    (response)=>{
        console.log(response.data);
    }
)

function Boss (){
    return (
        <h1>Boss</h1>
    )
}

ReactDom.render(
    (<Provider>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Route path='/boss' componnet={Boss}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)