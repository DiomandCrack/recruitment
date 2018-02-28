import React, { Component } from 'react'
import _ from 'lodash'
import {List,InputItem,NavBar} from 'antd-mobile'
import Realtime from '../../utils/realtime'

import {connect} from 'react-redux'
import {getMsgList,sendMsg,receMsg} from '../../redux/reducers/chat'

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
        this.props.getMsgList();
        this.props.receMsg();
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

        return (
        <div className='chat-page'>
            <NavBar mode="dark">
                {this.props.match.params.user}
            </NavBar>
            {this.props.chat.chatMsg.map((item)=>{
                console.log(item.from,targetId)
                return item.from === targetId?(
                    <List key={item._id}>
                        <Item>对方:{item.content}</Item>
                    </List>
                    ):(
                    <List key={item._id} className='chat-me'>
                        <Item>我:{item.content}</Item>
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
