import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'
import Detail from './detail';
import newService from './newService';







export default class providermenu extends Component {
  render() {
    return (
        <Switch>
            <Route path='/provider/servicelist/detail/:id' component={Detail}></Route>
            <Route path='/provider/servicelist/newService' component={newService}></Route>
            <Route path='/provider/servicelist' exact component={Home}></Route>     
        </Switch>
    )
  }
}
