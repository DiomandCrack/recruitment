import React, { Component } from 'react'
import {NavBar,InputItem,TextareaItem,WingBlank,Button} from 'antd-mobile'
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
    selectAvatar=(imgName)=>{
        this.setState({
            avatar:imgName,
        })
    }
    render(){
        return(
            <div>
                <NavBar
                    mode='dark'
                    style={{height:'50px'}}
                >
                请BOSS完善信息
                </NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}/>
                <WingBlank>
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
                    <Button type='primary'>保存</Button>
                </WingBlank>
            </div>
        )
    }
}
