import React, { Component } from 'react'
import { Card, Button, Select, Input, Table, Badge, Descriptions } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom'
import Detail from './userinfo_detail'
import Edit from './userinfo_edit'
import Password from './userinfo_password';
export default class Userinfo extends Component {
  
  render() {
    return (
      <Switch>
        <Route path='/user' exact component={Detail}></Route>
        <Route path='/user/edit'  component={Edit}></Route>
        <Route path='/user/password'  component={Password}></Route>
      </Switch>
    )
  }
}
