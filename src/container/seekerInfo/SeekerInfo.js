import React, { Component } from 'react'
import {NavBar,InputItem,TextareaItem,WingBlank,Button} from 'antd-mobile'
import {connect} from 'react-redux'

import AvatarSelector from '../../components/avatarSelector/AvatarSelector'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/reducers/user'

@connect(
    state=>state.user,
    {update},
)
export default class SeekerInfo extends Component {

    state = {
        title:'',
        desc:''
    }
    handleChange = (key,value) =>{
        this.setState({
            [key]:value
        })
    }
    selectAvatar=(imgName)=>{
        this.setState({
            avatar:imgName,
        })
    }
    render(){
        const {pathname} = this.props.location
        const redirect = this.props.redirectTo
        return(
            <div>
                {redirect&&redirect!==pathname?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar
                    mode='dark'
                    style={{height:'50px'}}
                >
                完善信息
                </NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}/>
                <WingBlank>
                    <InputItem onChange={(value)=>{this.handleChange('title',value)}}>
                        招聘职位
                    </InputItem>
                    <TextareaItem 
                        onChange={(value)=>{this.handleChange('desc',value)}}
                        rows={3}
                        autoHeight
                        title='个人简介'
                        >
                        个人简介
                    </TextareaItem>
                    <Button 
                        type='primary'
                        onClick={
                            ()=>{
                                this.props.update(this.state)
                            }
                        }
                    >保存</Button>
                </WingBlank>
            </div>
        )
    }
}
