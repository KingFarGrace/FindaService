import React, { useState } from 'react'
import logo from '../../assets/images/logo192.png'
import './register.css'
import { useHistory } from 'react-router-dom';
import { reqServiceRegister, reqRegister } from '../../api';
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
  const [showDescription, setShowDescription] = useState(false);
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const {email, username, role, password, confirm, description, address, postcode} = values;
    history.replace('/login')
    if(role=="customer"){
      const res = await reqRegister(email, username, role, password, confirm);
      console.log(res); 
      if (res.code === 100){
        // const user = res.userInfo;
        // storageUtils.saveUser(user);
        // 跳转到导航页面
        // 本来想用this.props.history.replace('/admin')的，但是antd这里form有点怪props我没搞明白，直接用文档里的例子了。
        message.success('register successfully')
        history.replace('/login')
      }else{
        message.error(res.msg);
      }
    }
    else{
      const res = await reqRegister(email, username, role, password, confirm, description, address, postcode);
      console.log(res);
      if (res.code === 100){
        // const user = res.userInfo;
        // storageUtils.saveUser(user);
        // 跳转到导航页面
        // 本来想用this.props.history.replace('/admin')的，但是antd这里form有点怪props我没搞明白，直接用文档里的例子了。
        message.success('Your registration request is pending approval from the administrator. Please wait for email confirmation')
        history.replace('/login')
      }else{
        message.error(res.msg);
      }
    }
  };

  const handleRoleChange = (e) => {
    const roleValue = e.target.value;
    setShowDescription(roleValue === 'serviceProvider');
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
            { label:"Service Provider", value: "serviceProvider"}
          ]}
          onChange={handleRoleChange}
          />
      </Form.Item>
      
      {showDescription && (
      <Form.Item
        name="description"
        label="Service Introduction"
        tooltip="Please introduce your company"
        rules={[
          {
            required: true,
            message: 'Please describe your company',
            whitespace: true,
          },
        ]}
      >      
        <Input />
      </Form.Item>
      )}

      {showDescription && (
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please input your address',
            whitespace: true,
          },
        ]}
      >      
        <Input />
      </Form.Item>
      )}

      {showDescription && (
      <Form.Item
        name="postcode"
        label="Postcode"
        rules={[
          {
            required: true,
            message: 'Please input your postcode',
            whitespace: true,
          },
        ]}
      >      
        <Input />
      </Form.Item>
      )}

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
