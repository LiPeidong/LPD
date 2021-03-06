import React from 'react'
import {HashRouter , Route ,Switch} from 'react-router-dom' 
import App from './App'
import Login from './pages/login'
import Admin from './Admin'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import FormRegister from './pages/form/register'
export default class IRouter extends React.Component{
  render(){
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={()=>
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                <Route path="/admin/ui/modals" component={Modals}></Route>
                <Route path="/admin/ui/loadings" component={Loadings}></Route>
                <Route path="/admin/form/reg" component={FormRegister}></Route>
                <Route component={NoMatch}></Route>
              </Switch>
            </Admin>
            } />
          <Route path="/order/detail" component={Login} />
        </App>
      </HashRouter>
    );
  }
}