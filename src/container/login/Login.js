import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'

import Logo from '../../components/logo/Logo'
import form from '../../components/form/form'
import {login} from '../../redux/reducers/user'

@connect(
    state=>state.user,
    {login}
)
@form
export default class Login extends Component {
    register =()=>{
        this.props.history.push('/register')
    }
    handleLogin=()=>{
        this.props.login(this.props.state);
    }
    render(){
        return(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <h2>登陆页面</h2>
                <WingBlank>
                    <List>
                    {this.props.msg?<p className='alert'>{this.props.msg}</p>:null}
                        <InputItem
                            type='email'
                            onChange={(value)=>this.props.handleChange('email',value)}
                        >
                            邮箱
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={(value)=>this.props.handleChange('pwd',value)}
                            type='password'
                        >
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登陆</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
