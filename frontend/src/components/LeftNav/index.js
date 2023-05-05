import React, { Component } from 'react'
import { Redirect , Link } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/images/logo192.png';
import { Breadcrumb, Layout, Menu } from 'antd';
import './index.css'


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }


export default class LeftNav extends Component {
//将侧边栏封装到index.js中
  render() {
    const items = [
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
          getItem('Tom', '3'),
          getItem('Bill', '4'),
          getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [
          getItem('Team 1', '6'), 
          getItem('Team 2', '8')
        ]),
        getItem('Files', '9', <FileOutlined />),
      ];
    return (
        <Sider >
        <div className="logo">
          <Link className='left-nav-link' to='/register'>
            <img src={Logo} alt=""/>
            <h1>find a service</h1>
          </Link>
        </div>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      
    )
  }
}
