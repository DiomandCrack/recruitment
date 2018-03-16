import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import {receMsg} from '../../redux/reducers/chat'
@connect(
    state=>state,
    {receMsg}
)
export default class Message extends Component {
    getLast(arr=[]){
        return arr[arr.length-1]
    }
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.receMsg()
        }
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
        console.log(Object.getOwnPropertyNames(this.props.chat.users).length)
        // if(this.props.chat.users&&Object.getOwnPropertyNames(this.props.chat.users).length!==0){
        //     this.forceUpdate()
        // }
        const {Item} = List
        const {Brief} = Item
        const userId = this.props.user._id
        return (
            <div>
                <List>
                    {this.props.chat.users&&Object.getOwnPropertyNames(this.props.chat.users).length!==0?chatList.map((item)=>{
                        const lastMsg = this.getLast(item)
                        //判断from或to是不是自己发的
                        const targetId = item[0].from===userId?item[0].to:item[0].from
                        let name=''
                        let avatar = 'avatar1'
                        if(this.props.chat.users[targetId]){
                             name = this.props.chat.users[targetId].name
                            avatar = this.props.chat.users[targetId].avatar
                        }
                        const unreadNum = item.filter(item=>!item.read&&item.to===userId).length
                        console.log(lastMsg)
                        return(
                            targetId?
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
                            </Item>:null)
                    }):null}
                </List>
            </div>
        )
    }
}
