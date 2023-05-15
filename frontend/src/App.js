import React, { Component } from 'react'
import { BrowserRouter  , HashRouter,Switch,Route,Redirect } from 'react-router-dom'
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Manager from './pages/Manager/Manager';
import Register from './pages/Reg/Reg';




export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/manager' component={Manager} />
          <Route path='/login' component={Login}/>          
          <Route exact path='/register' component={Register} /> 
          <Route path='/' component={Admin}/> 
        </Switch>
      </BrowserRouter>
    )
  }
}
