import React, { Component } from 'react'
import storageUtils from '../../utils/storageUtils'
import { reqCommentbyId, reqServicebyId } from '../../api'
import { Card, List, Tooltip, Button } from 'antd'
import { reqAcptServer, reqDecServer} from '../../api';
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { Comment } from '@ant-design/compatible';
import { Comment } from '@ant-design/compatible';

import { Switch , Route} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

export default class Check extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service:
      {
        key: '1',
        service: 'John Brown',
        category: 'cleaning',
        area: 'london',
        description: 'good cleaning services in london, love from UK',
        availability: 'AVAILABLE',

      },
      //经典假数据

    }
  }

  getService = async () => {
    console.log('拿到啦'+memoryUtils.service.service);
    console.log(this.props.match.params.id)
    //获取当前url结尾（service专属id）
    const id = this.props.match.params.id;
    const res = await reqServicebyId(id);
    console.log(res);
    if (res.status === 100) {
      this.setState({ service: res.obj })
    }
  }


  componentDidMount() {
    this.getService();
  }

  render () {
    
    const extra = (
        <div>
      <Button type='primary' 
      style={{
        margin:10
      }}
      onClick={ async () => {
            const user = storageUtils.getUser();
            const adminKey = user.password
            const provider = this.state.service.provider
            const service = this.state.service.service
            const res = await reqAcptServer(adminKey,provider,service);//把用户名密码传过去，用了ES6的async，await
            console.log(res);
            this.props.history.push('/manager/service');
        }}
        >
        Approval
      </Button>
      <Button type='primary' onClick={async () => {
          const user = storageUtils.getUser();
          const adminKey = user.password
          const provider = this.state.service.provider
          const service = this.state.service.service
          const res = await reqDecServer(adminKey,provider,service);//把用户名密码传过去，用了ES6的async，await
          console.log(res);
          this.props.history.push('/manager/service');
        }}
        >
        Refuse
      </Button>
      </div>
    )
    const title = (
      <span>
        <Button
          icon={<ArrowLeftOutlined />}
          type='link'
          onClick={() => {
            this.props.history.goBack();
          }}>
        </Button>
        SERVICE DETAILS
      </span>
    )
    const { service } = this.state;
    return (
      <Card 
      title={title}
      extra={extra}
      >
        <List
          bordered
          itemLayout="horizontal"
          size='small' >
          <List.Item>
            <List.Item.Meta
              title="service name"

            />
            {service.service}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="service name"

            />
            {service.category}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="service name"
            />
            {service.area}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="service name"

            />
            {service.description}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="service name"

            />
            {service.availability}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="service name"
            />
            {service.price}
          </List.Item>
        </List>
       
      </Card>
      
    )

  }
}
