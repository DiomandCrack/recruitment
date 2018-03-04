# react

## setState

更新数据

setState不是同步的

setState通过队列实现state的更新,防止多次render

`setState`将数据放入队列中,更新数据时更高效

`setState`会执行render 不能将setState放入render中 将循环调用setState,除非有定制的shouldComponentUpdate

## 无状态组件

`function component`

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