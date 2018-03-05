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


### nodemon 自动重启