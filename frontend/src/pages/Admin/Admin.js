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
import MHeader from '../../components/HeadNav/index';
import LeftNav from './../../components/LeftNav/index';
import Home from '../Home/home';
import Servicemenu from '../ServiceMenu/servicemenu';
import Servicerecord from '../ServiceRecord/servicerecord';
import Userinfo from '../Userinfo/userinfo';
import ServiceHistory from '../ServiceRecord/history';
import Message from '../Message/message';


const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = storageUtils.getUser();
  console.log('芝士user'+user.username)
  //若内存中存了用户名，则已登录，否则跳转至登录界面
  // // 前后跑通再取消注释是

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
            <Route path='/history' component={ServiceHistory}></Route>
            <Route path='/user' component={Userinfo}></Route>
            <Route path='/message' component={Message}></Route>
            
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

