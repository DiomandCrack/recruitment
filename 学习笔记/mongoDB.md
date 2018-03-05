# mongodb

## mongoose

### 引入mongoose

```js
const mongoose = require('mongoose')
```

### 连接mongodb

```js
//连接mongodb 新建集合
const db = 'mongodb://localhost:27017/chatapp'

mongoose.connect(db)

mongoose.connection.on('connected',()=>{
    console.log('mongodb is connected')
})
```

### 定义文档模型

```js
const User = mongoose.model('user',new mongoose.Schema({
    name:{type:String,require:true},
    age:{type:Number,require:true}
}))
//user 必须是 字符串
```

### 新建数据 create

```js
User.create({name:'lilei',age:18},(err,doc)=>{
    return err?console.log(err):console.log(result)
})
```

### 查询字符串 find/findOne

#### find

数组

```js
User.find({},(err,result)=>{
    return res.json(result)
})
```

#### findOne

对象

```js
User.findOne({},(err,result)=>{
    return res.json(result)
})
```

### 更新数据 update

```js
User.update({name:'lilei'},{'$set':{age:27}},(err,result)=>{
    err?console.log(err):console.log(result)
})
```

### 删除数据 remove

```js
User.remove({age:18},(err,result)=>{
    err?console.log(err):console.log(result)
})
```

