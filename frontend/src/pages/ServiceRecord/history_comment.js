import React, { Component } from 'react'
import { reqCommentbyId, reqServicebyId } from '../../api'
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
                {
                    username: 'asjflsafjl',
                    content:
                        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
                    ,
                    ctime: '5-10-2023 11:22:33',
                },
                {
                    username: 'ieauflva',
                    content:
                        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
                    ,
                    ctime: '5-10-2023 11:22:33',
                },
                {
                    username: 'asfwefd',
                    content:
                        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
                    ,
                    ctime: '5-10-2023 11:22:33',
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
                        <Tooltip title="">
                            <span>5-10-2023 11:22:33</span>
                        </Tooltip>
                    ),


                },
            ]

        }
    }

    getService = async () => {
        // console.log('拿到啦'+memoryUtils.service.service);
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
        this.getService();
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
        const { service, comment } = this.state;
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
                                avatar={"https://robohash.org/" + item.username}
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


