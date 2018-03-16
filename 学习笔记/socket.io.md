# socket.io

## express连接socket.io

```js
const express = require('express');
const http = require('http');
const io = require('socket.io');

const app = express();
const server = http.Server(app);
//websocket server
const wss = io(server);

server.listen(3001, () => {
    console.log('app start at port 3001');
});
```

## socket.io连接前端

前端

```js
//websocket协议 后端地址
const socket = io('ws://localhost:3001');
//定义一个请求叫sendMsg 向后端发送数据data
socket.emit('sendMsg',data)
sockt.on('receMsg',(data)=>{
    //接受data
})

```

后端:

```js
//wss 是全局的请求 ws是当前这次连接的请求
//on 监听请求
wss.on('connection',(ws)=>{
    ws.on('sendMsg',(data)=>{
        console.log(data)
        //收到sendMsg请求后向全局广播receMsg请求
        wss.emit('receMsg',(data)=>{
            console.log(data)
        })
    })
})
```