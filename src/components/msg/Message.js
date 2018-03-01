import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

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
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const aLast = this.getLast(a)
            const bLast = this.getLast(b)
            return bLast.create_time-aLast.create_time
        })
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
                        const unreadNum = item.filter(item=>!item.read&&item.to===userId).length
                        console.log(lastMsg)
                        return(
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                key={lastMsg._id}
                                style={{padding:'0.5em'}}
                                thumb={require(`../files/images/${avatar}.png`)}
                                arrow='horizontal'
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
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
