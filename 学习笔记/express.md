# express

## 暴露express借口

```js
const express = requrie('express')
const app = express()
```

## 监听端口号

```js
app.listen(3000,()=>{
    console.log('server at port 3000')
})
```

### 设置根路径

```js
app.get('/',(req,res)=>{
    //req请求,res响应
    res.send('<h1>hello world</h1>')
})
```

### 设置GET请求的API

```js
app.get('/data',(req,res)=>{
    res.json({code:0,data:{name:'hello'}})
})
```

## Router挂载API

约定俗成 成功 code:0

不成功 code:1

```js
//user.js
const Router = express.Router()

Router.get('/info',(req,res)=>{
    //校验cookie信息
    res.json({code:1})
})

module.exports = Router
```

```js
//server.js
const  userRouter = require('./user')
//开启中间件将userRouter挂载到'/user'路由上
app.use('/user',userRouter)

```

## body-parser

```js

const bodyParser = require('bodyParser')

//解析POST的json数据
app.use(bodyParser.json())
```

## cookie-parser

```js
const cookieParser = require('cookie-parser')
//解析cookie
app.user(cookieParser)
```



## req,res

req.body 前端传过来的所有数据

res.data 是后端传过来的数据

res.status 是状态码

登陆成功之后 设置cookie给前端
响应头:set-cookie

```js
res.cookie('userid',result._id)
```

后端读取cookie

在信息页面中,校验req.cookies

```js
const {userid} = req.cookies
```

## cors

后端跨域


## nodemon 自动重启