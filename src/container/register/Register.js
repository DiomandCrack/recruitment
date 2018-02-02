import React, { Component } from 'react'
import Logo from '../../components/logo/Logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'

import {register} from '../../redux/reducers/user'
import './Register.css'

@connect(
    state=>{
        console.log(state);
        return state.user
    },
    {register}
)
export default class Register extends Component{
    state={
        user:'',
        email:'',
        pwd:'',
        rpwd:'',
        msg:'',
        type:'seeker',
    }
    handleChange=(key,val)=>{
        this.setState({
            [key]:val
        })
    }
    handleRegister=()=>{
        console.log(this.props)
        this.props.register(this.state);
    }

    render(){
        const {RadioItem} = Radio;
        return (
            <div>
                <Logo/>
                <h2>注册新用户</h2>
                <WhiteSpace/>
                <List>
                    {this.props.msg?<p className='alert'>{this.props.msg}</p>:null}
                    <InputItem
                        onChange={(value)=>this.handleChange('user',value)}
                    >用户名</InputItem>
                    <InputItem
                        type='email'
                        onChange={(value)=>this.handleChange('email',value)}
                    >邮箱</InputItem>
                    <InputItem
                        type='password'
                        onChange={(value)=>this.handleChange('pwd',value)}
                    >密码</InputItem>
                    <InputItem
                        type='password'
                        onChange={(value)=>this.handleChange('rpwd',value)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem 
                        checked={this.state.type==='seeker'}
                        onChange={()=>this.handleChange('type','seeker')}
                    >
                        求职者
                    </RadioItem>
                    <RadioItem 
                        checked={this.state.type==='boss'}
                        onChange={()=>this.handleChange('type','boss')}    
                    >
                        BOSS
                    </RadioItem>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}