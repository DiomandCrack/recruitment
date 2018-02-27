import io from 'socket.io-client'

export default class Realtime {
    constructor(){
        this.socket = null;
        this.connect();
        console.log(this)
    }

    connect(){
        const socket = io('ws://localhost:3001')
        this.socket = socket
    }

    sendMsg(msg){
        console.log(msg,this)
        this.socket.emit('sendMsg',{msg}) 
    }

    receMsg(cb=()=>{}){
        this.socket.on('receMsg',cb)
    }
}