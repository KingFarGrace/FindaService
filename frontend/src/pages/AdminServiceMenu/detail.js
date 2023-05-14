import React, { Component } from 'react'
import { reqCommentbyId, reqServicebyId, reqDelComment } from '../../api'
import storageUtils from '../../utils/storageUtils'
import { Card, List, Tooltip, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { Comment } from '@ant-design/compatible';
import { Comment } from '@ant-design/compatible';

import { Switch, Route } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

export default class Detail extends Component {
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
      comment: [
        {
          username: 'asjflsafjl',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          ,
          ctime: '2016-11-22 11:22:33',
        },
        {
          username: 'ieauflva',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          ,
          ctime: '2016-11-22 11:22:33',
        },
        {
          username: 'asfwefd',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          ,
          ctime: '2016-11-22 11:22:33',
        },
        {//留一个老样式的假数据
          username: 'asfweasfaw',
          content: (
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure), to help people create their product prototypes beautifully and
              efficiently.
            </p>
          ),
          ctime: (
            <Tooltip title="2016-11-22 10:22:33">
              <span>9 hours ago</span>
            </Tooltip>
          ),


        },
      ]

    }
  }

  getService = async () => {
    console.log('拿到啦' + memoryUtils.service.service);
    console.log(this.props.match.params.id)
    //获取当前url结尾（service专属id）
    const id = this.props.match.params.id;
    const res = await reqServicebyId(id);
    console.log(res);
    if (res.status === 100) {
      this.setState({ service: res.obj })
    }
  }

  getCommand = async () => {
    console.log(this.props.match.params.id)
    //获取当前url结尾（service专属id）
    const id = this.props.match.params.id;
    const res = await reqCommentbyId(id);
    console.log(res);
    if (res.status === 100) {
      this.setState({ comment: res.review })
    }

  }
  componentDidMount() {


    this.getService();
    this.getCommand();
  }

  render() {

    const extra = (
      <Button type='primary' onClick={() => {

        this.props.history.push('/manager/service');
      }}
      >

        Back
      </Button>
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
    const { service, comment } = this.state;
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
        <h1> </h1>
        <h1> </h1>
        <h1> </h1>
        <h1> </h1>
        <List

          bordered
          className="comment-list"
          header={`${comment.length} comments`}
          size='large'
          dataSource={comment}
          renderItem={(item) => (
            <li>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Comment
                  actions={item.actions}
                  author={item.username}
                  avatar={"https://robohash.org/" + item.username}
                  content={
                    <p>{item.content}</p>
                  }

                  datetime={
                    <Tooltip title='8 hours ago'>
                      <span>{item.ctime}</span>
                    </Tooltip>}
                />
                <Button type='primary' 
                style={{
                  backgroundColor:'white',
                  color : 'black',
                  margin : 5,
                  border: '1px solid red',
                  borderColor: 'black',
                }}
                onClick={async () => {
                  const user = storageUtils.getUser();
                  const adminKey = user.password
                  const provider = this.state.service.provider
                  const service = this.state.service.service
                  const username =item.username
                  const res = await reqDelComment(adminKey, provider, service,username);//把用户名密码传过去，用了ES6的async，await
                  console.log(res);
                  //this.props.history.push('/manager/service');
                }}
                >
                  Delate
                </Button>
              </div>
            </li>
          )}
        />
      </Card>

    )

  }
}
