import React, { Component } from 'react'
import _ from 'lodash'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
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
            this.props.receMsg()
        }
        const to = this.props.match.params.user
        console.log(to);
        this.props.readMsg()
    }

    componentDidUpdate(){
        this.scrollMsgCon()
    }
    
    handleSubmit=()=>{
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg})
        this.setState({text:''})
    }

    showEmoji=()=>{
        this.setState({
            showEmoji:!this.state.showEmoji
        })
        fixCarousel()
        this.scrollMsgCon()
    }

    scrollMsgCon=()=>{
        console.log(this)
        console.log(_.get(this,'messagesRef'))
        if(this.messagesRef){
        this.messagesRef.scrollTop = this.messagesRef.scrollHeight
        }
    }
    render() {
        console.log(this.props)
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
                console.log(ref)
                this.messagesRef = ref
                console.log(this.messagesRef)
                }}>
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
                        console.log(el)
                    }}
                />):null}
               
            </div>
        </div>
        )
    }
}
