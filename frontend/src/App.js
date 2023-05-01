import React, { Component } from 'react'
import { BrowserRouter  , HashRouter,Switch,Route,Redirect } from 'react-router-dom'
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Register from './pages/Reg/Reg';



export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>        
          <Route path='/register' component={Register} /> 
        </Switch>
      </BrowserRouter>
    )
  }
}
