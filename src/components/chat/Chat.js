import React, { Component } from 'react'
import io from 'socket.io-client'

export default class Chat extends Component {
    componentDidMount(){
        const socket = io('ws://localhost:3001')
    }
    render() {
        console.log(this.props)
        return (
        <div>
            <h2>chat with user:{this.props.match.params.user}</h2>
        </div>
        )
    }
}
