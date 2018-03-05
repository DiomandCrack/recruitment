# redux

## Provider

Provider,把store放到context里,所有的子元素可以直接取到store

## connect

负责链接组件,给到redux里的数据放到组件的属性里

## react-redux

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