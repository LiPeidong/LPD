import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {createStore} from 'redux'
import {counter} from './index.redux'
const store = createStore(counter)
function render(){
  ReactDOM.render(<App store={store} />,document.getElementById('root'))
}
render()
//状态改变以后需要重新渲染
store.subscribe(render)