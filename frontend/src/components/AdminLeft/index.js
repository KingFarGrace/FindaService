import React, { Component } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom';
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
import menuConfig from '../../config/menuConfig'


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
// const mainMenu = [
//     {
//         label: 'Home',
//         path: '/home',
//     },
//     {
//         label: 'Blogs',
//         path: '/blogs',
//     },
// ];
// const items = [
//     getItem('Home', '/home', <PieChartOutlined />),
//     getItem('Service menu', '/menu', <DesktopOutlined />),
//     getItem('User information', '/user', <UserOutlined />),
//     getItem('My service', '/record', <TeamOutlined />),

// ];
// const items = mainMenu.map((item, index) => ({
//     key: item.path,
//     label: item.label,

// }));


class LeftNav extends Component {
    // getMenuNodes = (menuList) => {
    //     const path = this.props.location.pathname;
    //     return menuList.map(item => {
    //         if (!item.children) {
    //             // 生成<Menu.Item>
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         }

    //     })
    // }
    // UNSAFE_componentWillMount() {
    //     // 会被加载一次，在render之前
    //     this.menuNodes = this.getMenuNodes(menuConfig)
    //   }

    //将侧边栏封装到index.js中
    render() {
        console.log(this.props);
        let defaultkey = this.props.location.pathname;
        console.log(defaultkey);

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo">
                    <Link className='left-nav-link' to='/managerhome'>
                        <img src={Logo} alt="" />
                        <h1>find a service</h1>
                    </Link>
                </div>

                <Menu
                    theme="dark"
                    defaultSelectedKeys={defaultkey}
                    mode="inline" 
                >
                    <Menu.Item key="/manager/managerhome">
                        <DesktopOutlined />
                        <Link to='/manager/managerhome'></Link>
                        HOME
                    </Menu.Item>
                    <Menu.Item key="/manager/service">
                    <FileOutlined/>
                        Service menu
                        <Link to='/manager/service'></Link>
                    </Menu.Item>
                    <Menu.Item key="/manager/provider">
                    <TeamOutlined />
                        New Service Provider
                        <Link to='/manager/provider'></Link>
                    </Menu.Item>
                    <Menu.Item key="/manager/providermanage">
                    <TeamOutlined />
                        Provider Management
                        <Link to='/manager/providermanage'></Link>
                    </Menu.Item>
                </Menu>
            </Sider>

        )
    }
}
export default withRouter(LeftNav);