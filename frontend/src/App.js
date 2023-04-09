import React, { Component } from 'react'
import { BrowserRouter  , HashRouter,Switch,Route,Redirect } from 'react-router-dom'
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';



export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/admin' component={Admin}/>          
        </Switch>
      </BrowserRouter>
    )
  }
}
