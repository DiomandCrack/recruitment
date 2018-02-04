# Issues

## 报错:Expected the reducer to be a function.

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