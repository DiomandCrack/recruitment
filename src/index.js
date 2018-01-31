import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch,link} from 'react-router-dom'

// import store from './redux/store'
import {AxiosInterceptors} from './utils/config'
import Service from './utils/service'
import Login from './container/login/Login'
import Register from './container/register/Register'

const service = new Service();
new AxiosInterceptors();

service.get('data').then(
    (response)=>{
        console.log(response.data);
    }
)

ReactDom.render(
    (<Provider>
        <BrowserRouter>
            <div>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)