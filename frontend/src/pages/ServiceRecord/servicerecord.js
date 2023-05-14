import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './record_home'
import Detail from './record_detail'

export default class servicerecord extends Component {
  render() {
    return (
      <Switch>
            <Route path='/record' exact component={Home}></Route>
            <Route path='/record/detail/:id' component={Detail}></Route>
       </Switch>
    )
  }
}
