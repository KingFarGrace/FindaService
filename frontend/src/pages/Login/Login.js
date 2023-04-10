import React, { Component } from 'react'
import logo from '../../assets/images/logo192.png'
import './login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';//从antd上直接拿组件，注意看依赖v4和之前的极其不兼容，网上教程都是v3

export default class Login extends Component {
  handleSubmit = e => {
    // 捕捉输入
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    //嘎嘎偷
    return (
      <div className='login'> 
        <div className="login-header">
          <img src={logo} alt="" />
    {/* 模块化输出搞个图 */}
          <h1>find a service system</h1>
        </div>
        <div className='login-content'>
          <h1>Login</h1>
          <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      handleSubmit={this.handleSubmit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
      {/* 输入为空时弹行字 */}
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
      </div>
      </div>
    )
  }
}

