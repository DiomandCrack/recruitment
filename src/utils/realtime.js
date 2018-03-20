import io from 'socket.io-client'

export default class Realtime {
    constructor(){
        this.socket = null;
        this.connect();
    }

    connect(){
        const socket = io('ws://localhost:3001')
        this.socket = socket
    }

    sendMsg(obj){
        this.socket.emit('sendMsg',obj) 
    }

    receMsg(cb=()=>{}){
        this.socket.on('receMsg',cb)
    }
}