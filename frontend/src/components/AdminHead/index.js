import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Layout, Button, Modal, Badge } from "antd";
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import {
  NotificationOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import './index.css'
// 通过connect高级组件 对普通组件进行包装
import { connect } from "react-redux";

const { Header } = Layout;
const { confirm } = Modal;


class MHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num:5
    }
  }
  message = () => {
    this.setState({ num : 0})
    this.props.history.replace('/manager/message');
  }
  logout = () => {
    confirm({
      title: '确定要退出登录吗？',
      onOk: () => {
        storageUtils.removeUser();
        // memoryUtils.user = {};
        // this.props.removeUser();
        this.props.history.replace('/manager');
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
    console.log(path);
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } 
    })
    return title;

  }
  load = () => {
    this.state.num = 5
  }
  componentDidMount(){
    this.load()
  }

  render() {
    const user = memoryUtils.user;
    const { num } = this.state;
    // const user = this.props.user;
    console.log(user.username + '123');
    console.log(this.props);
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="header">
          <h2 className='header-title'>{this.getTitle()}</h2>
          <div className="header-user">

            <div className='userInfo'>
              wellcome，{user.username}
              <Button onClick={this.logout}>log out</Button>

            </div>
            <div className='infoButton'>
              <Badge
                count={num}
                size="small">
                <Button
                  icon={<NotificationOutlined />}
                  type='default'
                  size='medium'
                  onClick={this.message}
                >
                {/* <Link to='/message'></Link> */}
                </Button>
              </Badge>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}
export default withRouter(MHeader);
