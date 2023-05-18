import React, { Component } from 'react'
import { reqCommentbyId, reqServicebyId ,reqComment} from '../../api'
import { Card, List, Tooltip, Button, Badge, Descriptions } from 'antd'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
// import { Comment } from '@ant-design/compatible';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';
import { Switch, Route } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

export default class History_comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            //经典假数据
            comment: [
            ]

        }
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

    getTooltip =(time)=>{
        
        let currentTime = moment();
        let previousTime = moment(time);
        console.log('当前时间' + currentTime)
        console.log(typeof(currentTime))
        console.log('之前时间' + previousTime)
        console.log(typeof(previousTime))
        let time_diff = currentTime.diff(previousTime,'days')
        console.log('时间差' + time_diff)
        return time_diff
    }

    componentDidMount() {
        this.getCommand();
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
                History service
            </span>
        )
        const { comment } = this.state;
        return (

            <Card
                title={title}
            >
                <List
                    // bordered
                    className="comment-list"
                    header={`${comment.length} comments`}
                    size='large'
                    dataSource={comment}
                    renderItem={(item) => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.username}
                                avatar={"https://robohash.org/" + item._id}
                                content={
                                    <p>{item.content}</p>
                                }

                                datetime={
                                    <Tooltip title={this.getTooltip(item.ctime) + "days ago" }>
                                        <span>{item.ctime}</span>
                                    </Tooltip>}
                            />
                        </li>
                    )}
                />
                <br />
            </Card>

        )
    }
}


