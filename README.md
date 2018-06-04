俩API：

1、connect
2、Provider

```
ReactDom.render(
  <Provider store={store}>
  .....
  </Provider>,
  document.querySelector('#root')
)
```

```
@connect(
  state=>state,
  {yourMethod}
)
class MyComp extends Component{
  componentDidMount(){
    this.props.yourMethod()
  }
  render(){
    return <div>hello redux</div>
  }
}
```
