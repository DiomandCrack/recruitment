const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const io = require('socket.io');

const Model = require('./models');
const Database = require('./database');

const app = express();
const server = http.Server(app);
const wss = io(server);

app.use(cors({
    exposedHeaders: "*",
    credentials:true,
    origin: 'http://localhost:3000'
    //if origin:* throw error
}));

app.use(cookieParser());

app.use(bodyParser.json({
    limit: '50mb'
}));

app.db = new Database();
app.db.connect();

app.models = new Model(app);

wss.on('connection',(socket)=>{
    console.log('user login');
    socket.on('sendMsg',(data)=>{
        //广播到全局
        // console.log(data)
        // wss.emit('receMsg',data)
        const {from,to,msg}=data;
        const chat_id = [from,to].sort().join('_');
        const Message = app.db.getModel('message');
        Message.create({chat_id,from,to,content:msg},(err,result)=>{
            wss.emit('receMsg',Object.assign({},result._doc))
        });
    })
})

server.listen(3001, () => {
    console.log('app start at port 3001');
});