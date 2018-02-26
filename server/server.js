const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
//socket.io work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Model = require('./models');
const Database = require('./database');

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

server.listen(3001, () => {
    console.log('app start at port 3001');
});