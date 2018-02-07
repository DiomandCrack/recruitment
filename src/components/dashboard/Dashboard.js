import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router'
import _ from 'lodash'

import NavLinkBar from '../navLink/NavLinkBar'
import Boss from '../../components/boss/Boss'

import '../files/icon.css'


const Seeker = () => {
    return (<h2>求职首页</h2>)
}

const Message = () => {
    return (<h2>消息列表</h2>)
}

const User = () => {
    return (<h2>个人中心</h2>)
}

const routers = (navList)=>{
    const routes = navList.map(item=>{
        return (<Route 
                    key={_.get(item,'path')} 
                    path={_.get(item,'path')} 
                    component={_.get(item,'component')}
                ></Route>)
    })
    return routes
}

@connect(
    state=>state,
)
export default class Dashboard extends Component {

    
    render() {
        const user = this.props.user
        const navList = [
            {
                path:'/boss',
                text:'求职者',
                icon:'seeker',
                title:'求职者列表',
                component:Boss,
                hide:user.type==='seeker'
            },
            {
                path:'/seeker',
                text:'BOSS',
                icon:'boss',
                title:'BOSS列表',
                component:Seeker,
                hide:user.type==='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Message,
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
            },
        ];
        const showTitle = navList.find((item)=>{
            return _.get(item,'path')===_.get(this,'props.location.pathname')
        })
        return (
        <div>
            <NavBar className='fixed-header' mode='dark'>{
                _.get(showTitle,'title','首页')
            }
            </NavBar>
            <div style={{marginTo:50}}>
                <Switch>
                    {routers(navList)}
                </Switch>
            </div>
            <NavLinkBar data={navList}/>
        </div>
        )
    }
}
