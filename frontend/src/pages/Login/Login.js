import React, { Component } from 'react'
import logo from '../../assets/images/logo192.png'
import './login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';//从antd上直接拿组件，注意看依赖v4和之前的极其不兼容，网上教程都是v3
import { reqLogin } from '../../api';
import storageUtils from '../../utils/storageUtils';
import { useHistory } from 'react-router-dom';

const App = () => {
  const history = useHistory()
  const onFinish = async (values) => {
    
    storageUtils.saveUser(values)
    history.push('/admin')
    //跳转测试,实际用的应该replace好一些，因为replace没有后退，push有。
    console.log('Received values of form: ', values);
    
    const {username, password} = values;
    const res = await reqLogin(username, password);//把用户名密码传过去，用了ES6的async，await
    console.log(res);
    //登录成功传回来的code是100时，把用户信息存到本地。
    if (res.code === 100){
      const user = res.userInfo;
      storageUtils.saveUser(user);
      // 跳转到导航页面
      history.replace('/admin')
      // 本来想用this.props.history.replace('/admin')的，但是antd这里form有点怪props我没搞明白，直接用文档里的例子了。
      
    }
  };

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
      onFinish={onFinish}
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

export default App;


