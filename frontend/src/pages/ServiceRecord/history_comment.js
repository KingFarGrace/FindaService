import React, { Component } from 'react'
import { reqCommentbyId, reqServicebyId, reqComment ,reqUserInfo_email} from '../../api'
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
            provider:'',
            //经典假数据
            comment: [
            ]

        }
    }


    
    getProvider = async () => {
        const serviceProvider = memoryUtils.request.receiver
        console.log("this.serviceProvider", memoryUtils.request)
        const result_json = await reqUserInfo_email(serviceProvider)
        console.log('我的' + JSON.stringify(result_json))
        const result = JSON.parse(result_json.data)
        console.log(this.provider)
    //    this.setState({
    //     provider: result.return_obj.username
    //    }) 
        this.provider = result.return_obj.username
        console.log(this.provider)
    }
    getCommand = async () => {
        // this.getProvider()
        const provider = this.provider
        const service = memoryUtils.request
        console.log("雪", provider, service.service.name)
        const result_json = await reqComment(provider, service.service.name)
        console.log(result_json)
        const result = JSON.parse(result_json.data)
        console.log(result.code, result.msg)
        if (result.code === 200) {
            console.log("雪" + JSON.stringify(result.return_obj))
            this.setState({ comment: result.return_obj })
        }
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

    // componentDidMount() {
    //     this.getCommand();
    //     this.getProvider();
    // }
    componentDidMount = async () => {
        // Ensure getProvider finishes before moving on
        await this.getProvider();
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
                                    <Tooltip title={this.getTooltip(item.ctime) + "days ago"}>
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


