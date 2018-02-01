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