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