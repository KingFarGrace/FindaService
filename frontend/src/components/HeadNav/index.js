import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Layout, Button, Modal } from "antd";
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import './index.css'
// 通过connect高级组件 对普通组件进行包装
import { connect } from "react-redux";

const { Header } = Layout;
const { confirm } = Modal;


class MHeader extends Component {

  logout = () => {
    confirm({
      title: '确定要退出登录吗？',
      onOk: () => {
        storageUtils.removeUser();
        // memoryUtils.user = {};
        // this.props.removeUser();
        this.props.history.replace('/home');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  getTitle = () => {
    // 获取动态的标题
    let title = '';
    // 根据当前请求的path得到对应的title
    const path = this.props.location.pathname;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title;

  }

  render() {
    const user = memoryUtils.user;
    // const user = this.props.user;
    console.log(user.username + '123');  
    console.log(this.props);
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="header">
          <h2 className='header-title'>{this.getTitle()}</h2>
          <div className="header-user">
            <div className='userInfo'>
               wellcome，{user.username} {"   "}
              <Button onClick={this.logout}>log out</Button>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}
export default withRouter(MHeader);
