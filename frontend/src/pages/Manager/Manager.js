import './manager.css'
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
import ManagerHome from '../AdminHome/AdminHome'
import LeftNav from '../../components/AdminLeft/index';
import Servicemenu from '../AdminServiceMenu/AdminServiceMenu'
import providermanager from '../ProviderManager/providermanager'
import providermenu from '../pm/AdminServiceMenu'
import Userinfo from '../Userinfo/userinfo';
import MHeader from '../../components/AdminHead/index';

const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = storageUtils.getUser();
  //若内存中存了用户名，则已登录，否则跳转至登录界面
  if (!((!user.username)^(!user.email))) {
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
            <Route path='/manager/managerhome' component={ManagerHome}></Route>   
            <Route path='/manager/service' component={Servicemenu}></Route>
            <Route path='/manager/provider' component={providermanager}></Route>  
            <Route path='/manager/providermanage' component={providermenu}></Route>  
            <Redirect to='/manager/managerhome' />
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

