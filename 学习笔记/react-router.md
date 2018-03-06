# react-router 4

开发单页应用

## BrowserRouetr

包裹于顶级组件 在Provider里面

## Link

跳转路由

```js
<Link to='/data'>data</Link>
```

## Route

不同的路由渲染不同的组件

路由不完全匹配

exact完全匹配

```js
<Route path='/data' component={App} exact ></Route>
```

### 动态路由

```js
<Route path='/：location'></Route>
```

## Redirect

重定向

```js
<Redirect to='/'></Redirect>
```

## Switch

```js
<Switch>
    <Route to='/' exact></Route>
    <Route to='/data'></Route>
    <Route to='/:location' component={NotFound}></Route>
</Switch>
```

## WithRouter

## 路由组件属性:history,location,match

### match

- params:对象 key是动态路由的`/:location` value是路由

- path: 定义地址

- url: 访问域名后面实际的地址

### history

历史对象

```js
this.props.history.push('/')
//js跳转路由
```

返回上一级

```js
this.props.history.goback()
```

### location

路由信息

- pathname 当前路由