import React, { Component } from 'react'
import {NavBar,InputItem,TextareaItem} from 'antd-mobile'
import AvatarSelector from '../../components/avatarSelector/AvatarSelector'

export default class BossInfo extends Component {
    state = {
        title:''
    }
    handleChange = (key,value) =>{
        this.setState({
            [key]:value
        })
    }
    render(){
        return(
            <div>
                <NavBar
                    mode='dark'
                    style={{height:'50px'}}
                >
                BOSS完善信息页面
                </NavBar>
                <AvatarSelector/>
                <InputItem onChange={(value)=>{this.handlChange('title',value)}}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(value)=>{this.handlChange('company',value)}}>
                    公司名称
                </InputItem>
                <InputItem onChange={(value)=>{this.handlChange('payroll',value)}}>
                    职位薪资
                </InputItem>
                <TextareaItem 
                    onChange={(value)=>{this.handlChange('desc',value)}}
                    rows={3}
                    autoHeight
                    title='职位要求'
                    >
                    职位要求
                </TextareaItem>
            </div>
        )
    }
}
