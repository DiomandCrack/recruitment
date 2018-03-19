import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import _ from 'lodash'
import browserCookies from 'browser-cookies'
import {Redirect} from 'react-router-dom'

import {logout} from '../../redux/reducers/user'
@connect(
    state=>state.user,
    {logout}
)
export default class User extends Component {
    
    logout=()=>{
       const alert = Modal.alert
        alert('注销','确认退出登录？',[
            {text:'取消',onPress:()=>console.log('cancel')},
            {text:'确认',onPress:()=>{
                browserCookies.erase('userId')
                // window.location.href = window.location.href
                this.props.logout()
                window.location.reload()
            }}
        ])
    }

    render() {
        const {avatar,type,company,title,desc,payroll} = _.get(this,'props')
        const Item= List.Item
        const {Brief} = Item
        
        return this.props.user?(
        <div>
            {avatar?<Result
                img={<img src={require(`../files/images/${avatar}.png`)} alt={`${avatar}`}/>}
                title={_.get(this,'props.user')}
                message={type === 'boss'?company:null}
            />:null}
            <List renderHeader={()=>type === 'boss'?'招聘信息':'求职信息'}>
                <Item
                    wrap
                >
                    {title}
                    <Brief>
                        <pre>
                            {desc}
                        </pre>
                        {payroll?payroll:null}
                    </Brief>
                </Item>
            </List>
            <WhiteSpace/>
            <List>
                <Item onClick={this.logout}>
                    退出登录
                </Item>
            </List>
        </div>
        ):<Redirect to={this.props.redirectTo}/>
    }
}
