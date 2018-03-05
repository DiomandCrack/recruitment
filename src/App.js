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
import {AxiosInterceptors} from './utils/config'

new AxiosInterceptors();

export default class App extends Component{
    state={
        hasError:false
    }
    componentDidCatch(err,info){
        console.log(err,info)
        this.setState({
            hasError:true
        })
    }
    render(){
        return this.state.hasError?(<h2>页面出错了</h2>)
        :
        (
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