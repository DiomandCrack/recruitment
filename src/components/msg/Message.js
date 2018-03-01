import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'

@connect(
    state=>state
)
export default class Message extends Component {
    getLast(arr=[]){
        return arr[arr.length-1]
    }
    render() {
        console.log(this.props);
        const msgGroup = {}
        this.props.chat.chatMsg.forEach((item)=>{
            msgGroup[item.chat_id] = msgGroup[item.chat_id] || []
            msgGroup[item.chat_id].push(item) 
        })
        console.log(msgGroup)
        const chatList = Object.values(msgGroup)
        console.log('chatList',chatList)

        const {Item} = List
        const {Brief} = Item
        const userId = this.props.user._id
        return (
            <div>
                <List>
                    {chatList.map((item)=>{
                        const lastMsg = this.getLast(item)
                        //判断from或to是不是自己发的
                        const targetId = item[0].from===userId?item[0].to:item[0].from
                        const {name,avatar} = this.props.chat.users[targetId]
                        console.log(lastMsg)
                        return(
                            <Item
                                key={lastMsg._id}
                                style={{padding:'0.5em'}}
                                thumb={require(`../files/images/${avatar}.png`)}
                            >
                                {name}
                                <Brief>{lastMsg.content}</Brief>
                            </Item>)
                    })}
                </List>
            </div>
        )
    }
}
