import React, { Component } from 'react'
import {List,InputItem} from 'antd-mobile'
import Realtime from '../../utils/realtime'

const realtime = new Realtime();

export default class Chat extends Component {
    state = {
        text:'',
        msg:[]
    }

    componentDidMount(){
        const that = this;
        realtime.receMsg(
            (data)=>{
                that.setState({
                    msg:[...this.state.msg,data.text]
                })
            }
        );
    }
    
    handleSubmit=()=>{
        realtime.sendMsg(this.state.text)
        this.setState({text:''})
        console.log(this.state)
    }

    render() {
        console.log(this.props)
        return (
        <div>
            {this.state.msg.map((item,i)=>{
                return <p key={i}>{item}</p>
            })}
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={val=>{
                            this.setState({text:val})
                        }}
                        extra={<span onClick={this.handleSubmit}>发送</span>}
                    >
                        信息
                    </InputItem>
                </List>
            </div>
            <h2>chat with user:{this.props.match.params.user}</h2>
        </div>
        )
    }
}
