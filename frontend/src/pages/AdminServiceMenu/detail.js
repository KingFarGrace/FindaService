import React, { Component } from 'react'
import { reqCommentbyId, reqServicebyId, reqDelComment } from '../../api'
import storageUtils from '../../utils/storageUtils'
import { Card, List, Tooltip, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { Comment } from '@ant-design/compatible';
import { Comment } from '@ant-design/compatible';

import { Switch, Route } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import providerUtils from '../../utils/providerUtils';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service:
      {
        key: memoryUtils.service.key,
        provider: memoryUtils.service.provider,
        service: memoryUtils.service.service,
        category: memoryUtils.service.catagory,
        area: memoryUtils.service.area,
        description: memoryUtils.service.description,
        price: memoryUtils.service.price,
        availability: memoryUtils.service.availability
      },
      //经典假数据
      comment: [
        
      ]

    }
  }

  // getService = async () => {
  //   console.log('拿到啦' + memoryUtils.service.service);
  //   console.log(this.props.match.params.id)
  //   //获取当前url结尾（service专属id）
  //   const id = this.props.match.params.id;
  //   const res = await reqServicebyId(id);
  //   console.log(res);
  //   if (res.status === 100) {
  //     this.setState({ service: res.obj })
  //   }
  // }

  getCommand = async () => {
    // console.log(this.props.match.params.id)
    // //获取当前url结尾（service专属id）
   // const id = this.props.match.params.id;
    const res = await reqCommentbyId(this.state.service.provider,this.state.service.service);
    console.log(this.state.service.provider);
      const user = JSON.parse(res.data)
      const response = JSON.stringify(res.data);
      this.setState({comment: user.return_obj.map(item => ({
        ...item,
        actions: item.actions || [],  // 如果actions不存在，使用空数组
        author: item.username || 'Unknown',  // 如果username不存在，使用 'Unknown'
        avatar: "https://robohash.org/" + (item.username || 'Unknown'),
        content: item.content || '',  // 如果content不存在，使用空字符串
        datetime: item.ctime || new Date(),  // 如果ctime不存在，使用当前时间
      }))});
      console.log("雪豹" + user.return_obj);
      console.log("雪豹" + response);
      
     // this.setState({ comment: res.review })
    

  }
  componentDidMount() {


   // this.getService();
    this.getCommand();
  }

  render() {

    const extra = (
      <Button type='primary' onClick={() => {

        this.props.history.push('/manager/service/');
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
            {this.state.service.service}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="Category"

            />
            {this.state.service.category}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="Area"
            />
            {this.state.service.area}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="Description"

            />
            {this.state.service.description}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="availability"

            />
            {this.state.service.availability}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="price"
            />
            {this.state.service.price}
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
                <div style={{width:'90%'}}>
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
                </div>
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
                  console.log("Sdi 是"+adminKey,provider,service,username);
                  const res = await reqDelComment(adminKey, provider, service,username);//把用户名密码传过去，用了ES6的async，await
                  this.getCommand()
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
