# redux

## action

事件
```js
const plus = {type:'plus'}
```

## reducer

纯函数

```js
function reduecer(state=0,action){
    switch(action.type){
        case 'PLUS':
            return state+1
        case 'MINUS':
            return state-1
        default
            return state
    }
}
```

## store

```js
import {createStore} from 'redux'

const store = createStore(reducer)
```

派发事件

```js
store.dispatch(plus)
```

## react-redux

### Provider

Provider,把store放到context里,所有的子元素可以直接取到store

### connect

负责链接组件,给到redux里的数据放到组件的属性里

```js
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class App extends Component {

}
export default connect(
    mapStateToProps,
)(App);
```

## reselect库

缓存处理

```js
import {createSelector} from 'reselect'

const numSelector = createSelector(
    state=>state,
    //第二个函数的参数,第一个的返回值
    state=>{num:state*2}
)

@connect(
    state=>numSelector(state),
)
```

## 新的特性

### 新的核心算法Fiber

基于执行单元,多个fiber渲染一个组件

### render 可以返回数组，字符串

### 错误处理机制

### Portals组件

### 服务端渲染

### 体积更小,MIT