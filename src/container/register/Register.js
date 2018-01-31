import React, { Component } from 'react'
import Logo from '../../components/logo/Logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'

export default class Register extends Component{
    state={
        type:'seeker'
    }
    register =()=>{
        this.props.history.push('/register')
    }
    render(){
        const {RadioItem} = Radio;
        return (
            <div>
                <Logo/>
                <h2>注册新用户</h2>
                <WhiteSpace/>
                <List>
                    <InputItem>用户名</InputItem>
                    <InputItem>邮箱</InputItem>
                    <InputItem>密码</InputItem>
                    <InputItem>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type==='seeker'}>
                        求职者
                    </RadioItem>
                    <RadioItem checked={this.state.type==='boss'}>
                        BOSS
                    </RadioItem>
                    <Button type='primary'>注册</Button>
                </List>
            </div>
        )
    }
}