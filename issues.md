# Issues

## 报错:Expected the reducer to be a function

报错原因`devToolsExtension`没有执行

```js
window.devToolsExtension ? window.devToolsExtension : compose
```

修正之后

```js
window.devToolsExtension ? window.devToolsExtension() : compose
```

## 注册：怎么提交都显示：邮箱不能为空

### 1.antd的onChange事件

antd的事件没有event 直接value

### 2.actionCreator传参错误

在reducer的user中 actionCreator:`regiser`的参数是user的一系列参数 而在`Register`的组件调用的时候传入的是user对象
所以所有信息都以一个对象的形式存放在了`state`的`user`的属性中

声明时:

```js
export const register = (user,email,pwd,rpwd,type)=>{

    return dispatch => {
        service.post('user/register',registerUser).then(
            res=>{
                res.status ===200&&res.data.code===0?dispatch(registerSuccess(registerUser)):dispatch(errMsg(res.data.msg))
            }
        );
    }
}
```

调用的时候:

```js
handleRegister=()=>{
    this.props.register(this.state);
}
```

#### 修正结果

将一系列的参数，变成一个参数

```js
export const register = (userObj)=>{
    return dispatch => {
        service.post('user/register',userObj).then(
            res=>{
                if(res.status ===200&&res.data.code===0){
                    dispatch(registerSuccess(userObj))
                }else{
                    dispatch(errMsg(res.data.msg))
                }
            }
        ).catch((err)=>console.log(err));
    }
```

## 登陆时 无法删除`res.date`中的密码

原因:不知道,可能是异步操作的结果???

用lodash或delete都不好使

```js
_.unset(result,'pwd')
```

```js
delete result.pwd
```

解决方法

先将`result`中的属性分别存到变量中,再将变量存到一个新的对象中就好使了....

这是为啥啊....

```js
const {_id,user,email,type}=result;
const resultUser = {_id,user,email,type};
return res.status(200).json(sucAuth(resultUser));
```

## cookie不能跨域

cookie遵循同源策略 不允许跨域

解决办法

后端server:设置响应头`Access-Control-Allow-Credentials:true`

```js
app.use(cors({
    exposedHeaders: "*",
    credentials:true,
    origin: 'http://localhost:3000'
}));
```

cors中间件 默认`origin:*`,如果设置`credentials:ture`会报错 必须指定前端地址

前端`ajax`:`xhr.withCredentials=true`指定请求发送凭据

```js
const ins = axios.create({
    withCredentials: true
})

```

创建一个axios实例,设置`withCredentials: true`

## 报错:TypeError: Cannot read property 'findOne' of undefined

原因: 刷新`/info` 操作数据库没有进行异步操作

解决方法:

封装了一个方法使用`promise`通过`_id`来读取数据

```js
findUserById(id){
    const User = this.User;
    return new Promise((resolve,reject)=>{
        User.findOne({_id:new ObjectID(id)},_filter,(err,result)=>{
            return err?reject(err):resolve(result)
        });
    })
}
```

## SRP(Single Responsibility Principle) 单一责任原则

> A class should have only one reason to change.

## 无法获取redux更新的state

由于 actionCreator `loadUser` 是异步的 在`AutoRouter`这个组件中无法获取更新后的`this.props.state`

解决方法:在`loadUser`中传入`callback`函数

```js
componentDidMount(){
    const props = _.get(this,'props')
    props.loadUser(()=>{
        const history = _.get(props,'history')
        history.push('login')
    })
}
```

## 高阶组件

函数可以当参数，函数可以当返回值

```js

class Hello extends Component{
    render(){
        return (
            <div>
                <h1>Hello,I'm Hello Component</h1>
            </div>
        )
    }
}
//属性代理
function WrapperHello(Comp){
    class WrapComp extends Component{
        render(){
            return(<div>
                <p>最基本的高阶组件</p>
                <Comp {...this.props}></Comp>
                {/*装饰器*/}
            </div>)
        }
    }
    return WrapComp
}

const hello = WrapperHello(Hello)


//反向继承
function WrapperHello(Comp){
    class WrapComp extends Comp{
        componentDidMount(){
            console.log('hello')
        }
        render(){
            return (
            <Comp>
            </Comp>)
        }
    }

    return WrapComp
}

//react-redux中的@connect就是一个高阶组件
//HOC high ordered component
//有两个作用 属性代理 和 反向继承
```

## 绑定express和socket.io

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

## 返回上一页

```js
this.props.history.goBack()
```

## Message中chat_id的作用

将from和to的校验合成一个chatId

## 来回切换dashbord和chat之后,再发送消息会一次发送很多条

由于`dashboard`组件每次接环的时候,生命周期函数`componentDidMount`中的`receMsg()`都会执行一次,每执行一次`socket`都会绑定一次事件

解决方法:

```js
if(this.props.chat.chatMsg.length){
    this.props.receMsg();
}
```

## antd-mobile grid跑马灯一开始没有高度

antd的bug

解决方法:

```js
componentDidMount(){
    setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))
    },0);
}
```

## emoji包裹在`<span>`下的警告

emoji单独存在于标签的时候 应该带有 `role='img'`和`aria-label=''`

## win下 'NODE_ENV' 不是内部或外部命令，也不是可运行的程序

安装`cross-env`

package.json中设置

```js
"dev": "cross-env NODE_ENV=test nodemon --exec babel-node server/server"
```

## 报错:normalize.css SyntaxError Unexpected Token

node环境不识别css和图片 需要用hook进行处理

### css钩子

安装`css-modules-require-hook`

```js
yarn add css-modules-require-hook
```

配置`css-modules-require-hook`

```js
//server.js
const hook = require('css-modules-require-hook');
//cmrh.conf.js
module.exports = {
  generateScopedName: '[name]__[local]___[hash:base64:5]',
};
```

### 图片等静态资源钩子

安装`asset-require-hook`

```js
yarn add asset-require-hook
```

```js
const assethook = require('asset-require-hook')

assethook({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit:8000
})
```

还是报错是因为图片是`import`导入的,需要改成`require`

## 改用 babel-node之后 后端require前端依赖 不能正常工作

需要改成import

## mongodb error：Network is unreachable

首先启动mongodb

```shell
mongod --dbpath D:\MongoDB\data
```

开机自启

```shell
mongod.exe --logpath D:\mongodb\data\log\mongodb.log --logappend --dbpath D:\mongodb\data --directoryperdb --serviceName MongoDB --install
```

管理员模式下启动powershell

开启服务:

```shell
net start mongodb 
```

## Type Script

### 类型注解

```js
function greeter(person:string){

}
```

### 借口

```js
function greeter(person:Person){

}

interface Person {
    firstName:string,
    lastName:string,
}
```

## 类

在构造函数的参数上使用`public`等同于创建了同名的成员变量

```ts
class Student {
    fullName:string;
    constructor(public firstName, public middleInitial, public lastName){
        this.fullName = firstName+""+middleInital+""+lastName;
    }
}
```