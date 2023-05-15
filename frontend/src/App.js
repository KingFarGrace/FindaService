import React, { Component } from 'react'
import { BrowserRouter  , HashRouter,Switch,Route,Redirect } from 'react-router-dom'
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Manager from './pages/Manager/Manager';
import Register from './pages/Reg/Reg';
import waitProvider from './pages/WaitProvider/waitProvider';
import Provider from './pages/Provider/Provider'
import Update from './pages/WaitProvider/UpdateInformation'




export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/manager' component={Manager} />
          <Route path='/login' component={Login}/>   
          <Route path='/waitProvider' component={waitProvider}/>   
          <Route path='/provider' component={Provider}/>  
          <Route path='/update' component={Update}/>             
          <Route exact path='/register' component={Register} /> 
          <Route path='/' component={Admin}/> 
        </Switch>
      </BrowserRouter>
    )
  }
}
