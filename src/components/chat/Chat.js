import React, { Component } from 'react'
import _ from 'lodash'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import Realtime from '../../utils/realtime'

import {connect} from 'react-redux'
import {getMsgList,sendMsg,receMsg,readMsg} from '../../redux/reducers/chat'
import {getChatId,fixCarousel} from '../../utils/support'

const realtime = new Realtime();

@connect(
    state=>state,
    {getMsgList,sendMsg,receMsg,readMsg}
)

export default class Chat extends Component {

    state = {
        text:'',
        msg:[],
        showEmoji:false
    }

    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList()
        }
    }
    
    componentWillUnmount(){
        //console.log('chat unmount')
        //组件将要被销毁时设置消息为已读 可以修正未读消息数
        const to = this.props.match.params.user
        console.log(to);
        this.props.readMsg(to)
    }

    componentDidUpdate(){
        this.scrollMsgCon()
    }
    
    handleSubmit=()=>{
        console.log(this.props.user)
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg})
        this.setState({text:'',showEmoji:false})
        this.scrollMsgCon()
    }

    showEmoji=()=>{
        this.setState({
            showEmoji:!this.state.showEmoji
        })
        fixCarousel()
        this.scrollMsgCon()
    }

    scrollMsgCon=()=>{
        if(this.messagesRef){
        this.messagesRef.scrollTop = this.messagesRef.scrollHeight
        }
    }
    render() {
        const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
        const emojiData = emoji.split(' ').filter(item=>item).map(item=>({text:item}))
        //split将字符串按空格切割成数组 filter过滤防止有2个空格 map转成antd中grid要用到的数据
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
            <div className='msg-content' ref={(ref)=>{
                return this.messagesRef = ref
                }}>
                <QueueAnim delay={100} type='top' leaveReverse={false} >
                    {chatMsgs.map((item,i)=>{
                        const avatar = require(`../files/images/${users[item.from]?users[item.from].avatar:'avatar1'}.png`)
                        return item.from === targetId?(
                            <List key={i}>
                                <Item
                                    thumb={avatar}
                                >{item.content}</Item>
                            </List>
                            ):(
                            <List key={i} className='chat-me'>
                                <Item
                                    extra={<img src={avatar} alt={item._id}/>}
                                >{item.content}</Item>
                            </List>
                            )}
                    )}
                </QueueAnim>
                
            </div>
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder='输入聊天信息'
                        value={this.state.text}
                        onChange={val=>{
                            this.setState({text:val})
                        }}
                        extra={
                            <div>
                                <span
                                    style={{marginRight:15}}
                                    role='img'
                                    aria-label='emoji'
                                    onClick={this.showEmoji}
                                >☺️</span>
                                <span onClick={this.handleSubmit}>发送</span>
                            </div>
                        }
                    >
                    </InputItem>
                </List>
                {this.state.showEmoji?( <Grid
                    data={emojiData}
                    columnNum={9}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={el=>{
                        this.setState({
                            text:this.state.text+el.text
                        })
                    }}
                />):null}
               
            </div>
        </div>
        )
    }
}
