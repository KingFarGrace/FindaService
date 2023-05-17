import './provider.css'
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
import Home from '../ProviderHome/ProviderHome'
import LeftNav from '../../components/ProviderLeft/index';
import Servicemenu from '../AdminServiceMenu/AdminServiceMenu'
import providermanager from '../ProviderRequest/providerRequest'
import providermenu from '../ProviderMenu/AdminServiceMenu'
import Userinfo from '../Userinfo/userinfo';
import MHeader from '../../components/ProviderHead/index';
import Message from '../Message/providerMessage';


const { Header, Content, Footer, Sider } = Layout;
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
            <Route path='/provider/providerhome' component={Home}></Route>   
            <Route path='/provider/servicelist' component={providermenu}></Route>  
            <Route path='/provider/servicerequest' component={providermanager}></Route>  
            <Route path='/provider/message' component={Message}></Route>  
            <Redirect to='/provider/providerhome' />
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

