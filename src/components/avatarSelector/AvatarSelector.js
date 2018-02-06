import React, { Component } from 'react';
import {Grid} from 'antd-mobile'

export default class AvatarSelector extends Component {

    render(){
        const avatarList = [];
        for(let i=1;i<=12;i++){
            avatarList.push(`avatar${i}`)
        }
        const data = avatarList.map((avatar)=>({
            icon:require(`../files/images/${avatar}.png`),
        }))
        console.log(avatarList)
        return(
            <div>
               <Grid data={data} activeStyle={true}/>
            </div>
        )
    }
}