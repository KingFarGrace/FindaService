import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'
import Detail from './detail';
import Check from './check';
import Provider from './provider';






export default class providermenu extends Component {
  render() {
    return (
        <Switch>
            <Route path='/manager/providermanage/check/:id' component={Check}></Route>
            <Route path='/manager/providermanage/detail/:id' component={Detail}></Route>
            <Route path='/manager/providermanage/service/:id' component={Home}></Route>
            <Route path='/manager/providermanage' exact component={Provider}></Route>
            
        </Switch>
    )
  }
}
