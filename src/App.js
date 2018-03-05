import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'

import AuthRoute from './components/authroute/AuthRoute'
import Dashboard from './components/dashboard/Dashboard'
import Chat from './components/chat/Chat'
//container component
import Login from './container/login/Login'
import Register from './container/register/Register'
import BossInfo from './container/bossInfo/BossInfo'
import SeekerInfo from './container/seekerInfo/SeekerInfo'

export default class App extends Component{
    render(){
        return(
            <div style={{height:'100%'}}>
            <AuthRoute/>
            <Switch>
                <Route path='/seekerinfo' component={SeekerInfo}></Route>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/chat/:user' component={Chat}></Route>
                <Route component={Dashboard}></Route>
            </Switch>
        </div>
        )
    }
}