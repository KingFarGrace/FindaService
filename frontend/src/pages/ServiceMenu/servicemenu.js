import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'
import Detail from './detail';





export default class servicemenu extends Component {
  render() {
    return (
        <Switch>
            <Route path='/menu' exact component={Home}></Route>
            <Route path='/menu/detail/:id' component={Detail}></Route>
        </Switch>
    )
  }
}
