import React, { Component } from 'react';
import {Grid,List} from 'antd-mobile'

import './AvatarSelector.css'

export default class AvatarSelector extends Component {
    state={

    }

    render(){
        const avatarList = [];
        for(let i=1;i<=12;i++){
            avatarList.push(`avatar${i}`)
        }
        const data = avatarList.map((avatar)=>({
            icon:require(`../files/images/${avatar}.png`),
            text:avatar,
        }))
        const gridHeader = this.state.text?(<div><span>已选头像</span><img style={{width:20}} src={this.state.icon} alt={this.state.text}/></div>):<div>请选择头像</div>
        return(
            <div>
                <List renderHeader={()=>gridHeader} className='avatar-title'>
                    <Grid 
                        data={data} 
                        activeStyle={true}
                        onClick={(el)=>{
                            this.setState(el)
                            this.props.selectAvatar(el.text)}}
                        renderItem={dataItem => (
                            <div style={{
                                height:'100%',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                }}>
                                <img src={dataItem.icon} style={{ width: '40%',}} alt="" />
                        </div>)}
                    />
                </List>

            </div>
        )
    }
}