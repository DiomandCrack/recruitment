import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router'
import _ from 'lodash'

import QueueAnim from 'rc-queue-anim'

import NavLinkBar from '../navLink/NavLinkBar'
import Boss from '../boss/Boss'
import Seeker from '../seeker/Seeker'
import User from '../user/User'
import Message from '../msg/Message'

import {getMsgList,receMsg} from '../../redux/reducers/chat'

import '../files/icon.css'

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
    {getMsgList,receMsg}
)
export default class Dashboard extends Component {
    
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList();
            this.props.receMsg();
        }
    }
    
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
        const page = navList.find((item)=>{
            return _.get(item,'path')===_.get(this,'props.location.pathname')
        })

        //要让动画生效只能设置一个路由
        return (
        <div>
            <NavBar className='fixed-header' mode='dark'>{
                _.get(page,'title','首页')
            }
            </NavBar>
            <div style={{marginTo:50}}>
                <QueueAnim duration={300} type='top' delay={200}>
                    <Route 
                        key={_.get(page,'path')} 
                        path={_.get(page,'path')} 
                        component={_.get(page,'component')}
                    ></Route>
                </QueueAnim>
            </div>
            <NavLinkBar data={navList}/>
        </div>
        )
    }
}
