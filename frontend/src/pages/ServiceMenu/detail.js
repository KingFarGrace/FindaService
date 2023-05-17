import React, { Component } from 'react'
import { reqCommentbyId, reqServicebyId, reqComment } from '../../api'
import { Card, List, Tooltip, Button, Badge, Descriptions } from 'antd'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
// import { Comment } from '@ant-design/compatible';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';
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
        price: '15£'
      },
      //经典假数据
      comment: [
      ]


    }
  }

  getService() {
    console.log('拿到啦' + memoryUtils.service);

    this.setState(
      {
        service: memoryUtils.service
      }
    )

  }

  getCommand = async () => {
    let provider = memoryUtils.service.provider
    let service = memoryUtils.service.service
    console.log("雪", provider, service)
    const result_json = await reqComment(provider, service)
    console.log(result_json)
    const result = JSON.parse(result_json.data)
    console.log(result.code, result.msg)
    if (result.code === 200) {
      console.log("雪" + JSON.stringify(result.return_obj))
      this.setState({ comment: result.return_obj })
    }
  }
  componentDidMount() {


    this.getService();
    this.getCommand();
  }


  getTooltip = (time) => {

    let currentTime = moment();
    let previousTime = moment(time);
    console.log('当前时间' + currentTime)
    console.log(typeof (currentTime))
    console.log('之前时间' + previousTime)
    console.log(typeof (previousTime))
    let time_diff = currentTime.diff(previousTime, 'days')
    console.log('时间差' + time_diff)
    return time_diff
  }
  render() {

    const extra = (
      <Button type='primary' onClick={() => {

        this.props.history.push('/menu/subscribe/' + this.props.match.params.id);
      }}
      >

        Subscription Services
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
        <Descriptions
          title="User Information"
          layout="vertical"
          bordered
        >
          <Descriptions.Item label="Service Name" >{service.service}</Descriptions.Item>
          <Descriptions.Item label="Service Provider" >{service.provider}</Descriptions.Item>
          <Descriptions.Item label="Catagory" span={2}>{service.catagory}</Descriptions.Item>
          <Descriptions.Item label="Area" >{service.area}</Descriptions.Item>
          <Descriptions.Item label="Price" >{service.price}</Descriptions.Item>
          <Descriptions.Item label="Service Description" >
            {service.description}
          </Descriptions.Item>
          <Descriptions.Item label="Service Comment" span={3}>
            <List
              bordered
              className="comment-list"
              header={`${comment.length} comments`}
              size='large'
              dataSource={comment}
              renderItem={(item) => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={item.username}
                    avatar={"https://robohash.org/" + item.username}
                    content={
                      <p>{item.content}</p>
                    }

                    datetime={
                      <Tooltip title={this.getTooltip(item.ctime) + "days ago"}>
                        <span>{item.ctime}</span>
                      </Tooltip>}
                  />
                </li>
              )}
            />
          </Descriptions.Item>
        </Descriptions>
        <br />
      </Card>

    )

  }
}
