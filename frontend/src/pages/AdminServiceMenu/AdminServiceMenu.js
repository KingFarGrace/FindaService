import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'
import Detail from './detail';
import Check from './check';






export default class servicemenu extends Component {
  render() {
    return (
        <Switch>
            <Route path='/manager/service/check/:id' component={Check}></Route>
            <Route path='/manager/service/detail/:id' component={Detail}></Route>
            <Route path='/manager/service' exact component={Home}></Route>
            
        </Switch>
    )
  }
}
