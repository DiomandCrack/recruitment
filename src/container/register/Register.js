import React, { Component } from 'react'
import Logo from '../../components/logo/Logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/reducers/user'
import form from '../../components/form/form'
import './Register.css'

@connect(
    state=>{
        console.log(state);
        return state.user
    },
    {register}
)
@form
export default class Register extends Component{
    componentDidMount(){
        this.props.handleChange('type','seeker')
    }
    handleRegister=()=>{
        this.props.register(this.props.state);
    }

    render(){
        const {RadioItem} = Radio;
        return (
            <div>
                <WingBlank>
                    {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                    <Logo/>
                    <h2>注册新用户</h2>
                    <WhiteSpace/>
                    <List>
                        {this.props.msg?<p className='alert'>{this.props.msg}</p>:null}
                        <InputItem
                            onChange={(value)=>this.props.handleChange('user',value)}
                        >用户名</InputItem>
                        <InputItem
                            type='email'
                            onChange={(value)=>this.props.handleChange('email',value)}
                        >邮箱</InputItem>
                        <InputItem
                            type='password'
                            onChange={(value)=>this.props.handleChange('pwd',value)}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={(value)=>this.props.handleChange('rpwd',value)}
                        >确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem 
                            checked={this.props.state.type==='seeker'}
                            onChange={()=>this.props.handleChange('type','seeker')}
                        >
                            求职者
                        </RadioItem>
                        <RadioItem 
                            checked={this.props.state.type==='boss'}
                            onChange={()=>this.props.handleChange('type','boss')}    
                        >
                            BOSS
                        </RadioItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}