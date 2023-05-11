import React, { Component } from 'react'
import { reqServicebyId } from '../../api'
import { Card, List, Tooltip, Comment, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { Comment } from '@ant-design/compatible';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    }
    }
  }
  getService = async () => {
    console.log(this.props.match.params.id)
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

  render() {
    const title = (
      <span>
        <Button
          icon={<ArrowLeftOutlined />}
          type='link'
          onClick={() => {
            this.props.history.goBack();
          }}>
        </Button>
        商品详情
      </span>
    )
    const {service} = this.state;
    return (
      <Card title={title}>
        <List>
          <List.Item>
            <p>
              <h3>service name</h3>
              <span>{service.name}</span>
            </p>
          </List.Item>
          <List.Item>
            
          </List.Item>
          <List.Item>
            
          </List.Item>
          <List.Item>
            
          </List.Item>
          <List.Item>
            
          </List.Item>
        </List>
      </Card>
    )

  }
}
