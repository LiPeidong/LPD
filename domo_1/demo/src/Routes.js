import React from 'react';
import {
    BrowserRouter,Route,Router,hashRouter
  } from 'react-router-dom';
import Cities from './cities/App';
import Market from './market/App';
import Header from './components/header/App'
class Routes extends React.Component {
    render() {
      return (    //当匹配到对应的路径时，这一段代码就会去渲染对应component内容
        <BrowserRouter>
          <div>
            <Header></Header>
            <Route path='/cities' component={Cities}/>   
            <Route path='/market' component={Market}/>
          </div>
        </BrowserRouter>
      );
    }
  }
export default Routes;