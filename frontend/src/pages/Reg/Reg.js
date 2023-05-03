import React, { Component } from 'react'
import logo from '../../assets/images/logo192.png'
import './register.css'
import { useHistory } from 'react-router-dom';
import { reqLogin, reqRegister } from '../../api';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Radio,
  message
} from 'antd';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const App = () => {
  const history = useHistory()
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    history.replace('/login')
    const {email, password,username,role} = values;
    const res = await reqRegister(email, password,username,role);
    console.log(res);
    if (res.code === 110){
      const user = res.userInfo;
      //storageUtils.saveUser(user);
      // 跳转到导航页面
      history.replace('/login')
      // 本来想用this.props.history.replace('/admin')的，但是antd这里form有点怪props我没搞明白，直接用文档里的例子了。
      message.success('register successfully')

    }else{
      message.error(res.msg);
    }
  };

  return (
    <div className='register'> 
        <div className="login-header">
          <img src={logo} alt="" />
          <h1>find a service system</h1>
        </div>
        <div className='login-content'>
          <h1>Register</h1>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      // initialValues={{
      //   residence: ['zhejiang', 'hangzhou', 'xihu'],
      //   prefix: '86',
      // }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          { 
            min: 6, 
            message: 'the password must be longer than 6 characters' 
          },
          { 
            max: 16, 
            message: 'the password be shorter than 16 characters' 
          },
          { 
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,16}/, 
            message: 'Must contain uppercase letters, lowercase letters, numbers and special characters' 
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Please choose your role!',
          },
        ]}
      >
        <Radio.Group
          options={[
            { label: "Customer", value: "customer"},
            { label:"Provider", value: "provider"}
          ]}
          onChange={v=>{
            console.log(v.target.value);
          }}
          />
      </Form.Item>
      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        Or <a href="/login">Login now!</a>
      </Form.Item>
    </Form>
    </div>
      </div>
  );
};
export default App;
