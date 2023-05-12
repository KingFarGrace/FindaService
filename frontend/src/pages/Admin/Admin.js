import './admin.css'
import storageUtils from '../../utils/storageUtils'
import { Redirect, Link, Switch, Route , withRouter} from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, useLocation } from 'antd';
import React, { useState } from 'react';
import Logo from '../../assets/images/logo192.png';

import LeftNav from './../../components/LeftNav/index';
import Home from '../Home/home';
import Servicemenu from '../ServiceMenu/servicemenu';
import Servicerecord from '../ServiceRecord/servicerecord';
import Userinfo from '../Userinfo/userinfo';
import MHeader from '../../components/HeadNav/index';

const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//     getItem('Home', '/home', <PieChartOutlined />),
//     getItem('Service menu', '/menu', <DesktopOutlined />),
//     getItem('User information', '/user', <UserOutlined />),
//     getItem('My service', '/record', <TeamOutlined />),
// ];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = storageUtils.getUser();
  //若内存中存了用户名，则已登录，否则跳转至登录界面
  if (!user.username) {
    return <Redirect to='/login' />
  }
  
  return (

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
     <LeftNav></LeftNav>
      <Layout className="site-layout">
        {/* <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        /> */}
        <MHeader></MHeader>

        <Content
          style={{
            margin: '0 0px',
          }}
        >
          <Switch>
            <Route path='/menu' component={Servicemenu}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/record' component={Servicerecord}></Route>
            <Route path='/user' component={Userinfo}></Route>
            <Redirect to='/home' />
          </Switch>

        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          ZHW designed ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;

