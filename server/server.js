import reducers from '../src/redux/reducer'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import http from 'http'
import path from 'path'
import io from 'socket.io'

import Model from './models'
import Database from './database'


import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import React from 'react'
import {renderToString,renderToNodeStream} from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import  thunk from 'redux-thunk'

import App from '../src/App'
import staticPath from '../build/asset-manifest.json'

const app = express();
const server = http.Server(app);
const wss = io(server);

assethook({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit:8000
})

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

app.use((req,res,next)=>{
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next()
    }
    const store = createStore(reducers, compose(
        applyMiddleware(thunk),
    ))
    // const htmlRes = renderToString(<App/>)
    // res.send(htmlRes);
    let context = {}
 
    res.write(`    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" href="${staticPath['main.css']}">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <title>React App</title>
    </head>
    <body>
        <div id="root">`)
    const markupStream = renderToNodeStream(
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>
        )

    markupStream.pipe(res,{end:false})
    markupStream.on('end',()=>{
        res.write(`<script src="${staticPath['main.js']}"></script>
        </body>
        </html>`)
        res.end()
    })
    // const markup = renderToString(
    // <Provider store={store}>
    //     <StaticRouter
    //         location={req.url}
    //         context={context}
    //     >
    //        <App></App>
    //     </StaticRouter>
    // </Provider>
    // )
    // const pageHtml=`
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="utf-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    //     <meta name="theme-color" content="#000000">
    //     <link rel="stylesheet" href="${staticPath['main.css']}">
    //     <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    //     <title>React App</title>
    // </head>
    // <body>
    //     <div id="root">${markup}</div>
    //     <script src="${staticPath['main.js']}"></script>
    // </body>
    // </html>
    // `
    // res.send(pageHtml)
    // return res.sendFile(path.resolve('build/index.html'))
})

app.use('/',express.static(path.resolve('build')))
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