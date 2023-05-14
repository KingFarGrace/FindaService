import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './history_home'
import Detail from './history_detail'
import Comment from './history_comment.js'

export default class history extends Component {
  render() {
    return (
      <Switch>
        <Route path='/history' exact component={Home}></Route>
        <Route path='/history/detail/:id' component={Detail}></Route>
        <Route path='/history/comment/:id' component={Comment}></Route>
      </Switch>
    )
  }
}
