import { Card ,Button} from 'antd'
import React, { Component } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';

export default class Subscribe extends Component {
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
          Subscribe service
        </span>
      )
    return (
      <Card
      title={title}
      >

      </Card>
    )
  }
}
