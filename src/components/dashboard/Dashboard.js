import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import '../files/icon.css'

const Boss= ()=>{
    return (<h2>Boss首页</h2>)
}

const Seeker = () => {
    return (<h2>求职首页</h2>)
}

const Message = () => {
    return (<h2>消息列表</h2>)
}

const User = () => {
    return (<h2>个人中心</h2>)
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
                icon:'boss',
                title:'求职者列表',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'seeker',
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

        return (
        <div>
            <NavBar>
                <i class='icon-user'></i>
            </NavBar>
            <div>footer</div>
        </div>
        )
    }
}
