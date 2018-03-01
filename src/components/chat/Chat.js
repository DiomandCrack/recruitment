import React, { Component } from 'react'
import _ from 'lodash'
import {List,InputItem,NavBar,Icon} from 'antd-mobile'
import Realtime from '../../utils/realtime'

import {connect} from 'react-redux'
import {getMsgList,sendMsg,receMsg} from '../../redux/reducers/chat'
import {getChatId} from '../../utils/support'
const realtime = new Realtime();

@connect(
    state=>state,
    {getMsgList,sendMsg,receMsg}
)

export default class Chat extends Component {

    state = {
        text:'',
        msg:[]
    }

    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList();
            this.props.receMsg();
        }
    }
    
    handleSubmit=()=>{
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg})
        this.setState({text:''})
    }

    render() {
        console.log(this.props)
        const targetId = _.get(this,'props.match.params.user');
        const Item = List.Item
        const users = this.props.chat.users
        const chatId = getChatId(targetId,this.props.user._id)
        const chatMsgs = this.props.chat.chatMsg.filter(item=>item.chat_id===chatId)
        if(!users[targetId]){
            return null
        }

        return (
        <div className='chat-page'>
            <NavBar 
                mode="dark" 
                className='fix-header'
                icon={<Icon type='left'/>}
                onLeftClick={()=>{
                    this.props.history.goBack();
                }}>
                {users[targetId].name}
            </NavBar>
            {chatMsgs.map((item)=>{
                const avatar = require(`../files/images/${users[item.from].avatar}.png`)
                return item.from === targetId?(
                    <List key={item._id}>
                        <Item
                            thumb={avatar}
                        >{item.content}</Item>
                    </List>
                    ):(
                    <List key={item._id} className='chat-me'>
                        <Item
                            extra={<img src={avatar} alt={item._id}/>}
                        >{item.content}</Item>
                    </List>
                    )}
                )}
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder='输入聊天信息'
                        value={this.state.text}
                        onChange={val=>{
                            this.setState({text:val})
                        }}
                        extra={<span onClick={this.handleSubmit}>发送</span>}
                    >
                    </InputItem>
                </List>
            </div>
        </div>
        )
    }
}
