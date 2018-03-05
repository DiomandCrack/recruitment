# react

## setState

更新数据

setState不是同步的

setState通过队列实现state的更新,防止多次render

`setState`将数据放入队列中,更新数据时更高效

`setState`会执行render 不能将setState放入render中 将循环调用setState,除非有定制的shouldComponentUpdate

## 无状态组件

`function component`

## PureComponent

没有自己的状态,由父组件传递组件可以用`PureComponent`,实际上就是修改了`shouldComponentUpdate`

## context

多层嵌套 数据通过`props`一层一层传递

```js
getChildContext(){
    return this.state
}
```

接受数据用`this.context`

## children

获取子组件 `this.props.children`

## 高阶组件

## shouldComponentUpdate

使用`shouldComponentUpdate`定制组件

```js
shouldComponentUpdate(nextProps,nextState){
    return false
    //阻止组件渲染
}
```

## immutable

对象都是引用类型,比较对象是否相等是一个比较困难的事情
递归调用复杂度太高,
react推荐只做浅层对比
immutable进行对比复杂度底

优点: 减少内存,并发安全降低项目复杂度,便于比较,时间旅行(每次都生成一个新的数据)
缺点: 学习成本大,对现有项目入侵大

轻量级immutable:seamless-immutable
redux运用immutable: redux-immutable

```js
function compareObject(obj1,obj2){
    if(obj1===obj2){
        return ture
    }
    if(obj1.length!==obj2.length){
        return false
    }

    for(key in obj1){
        if(typeof obj1[key]==='object'){
            return compareObject(obj1[key],obj2[key])
        }else if(obj1[key]!==obj2[key]){
            return false
        }
    }
    return true
}
```

### Map

Map(obj)
键值对,创建immutable对象

```js
const obj1 = Map({
    name:'obj1',
    date:Map({react:'react'})
})

const obj2 = obj1.set('name','obj2')
const obj3 = obj2.get('name')
console.log(obj2===obj1)
console.log(obj1===obj3)
```

### is

比较两个对象是否相等

```js
is(obj1,obj2)
```

### SSR

server site rending

服务器 提供静态资源和借口

前端模板,渲染

SPA,体验好，页面跳转不刷新,首屏慢,不利于SEO

#### React同构SSR

RenderToNodeStream

hydrate(注水只添加事件)

#### 异步加载

1. 回调函数

回调地狱

2. promise - axios

回调扁平化

3. generator

function*

4. async/await

generator的语法糖

### 动画

1. ReactCSSTransitionGroup

2. montion antd
