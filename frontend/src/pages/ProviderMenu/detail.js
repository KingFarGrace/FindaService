import React, { Component, memo } from 'react'
import { reqCommentbyId, reqServicebyId, reqDelComment } from '../../api'
import storageUtils from '../../utils/storageUtils'
import { Card, List, Tooltip, Button, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { Comment } from '@ant-design/compatible';
import { Comment } from '@ant-design/compatible';

import { Switch, Route } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

export default class newService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service:
            {
                key: memoryUtils.service.key,
                service: memoryUtils.service.service,
                category: memoryUtils.service.category,
                area: memoryUtils.service.area,
                description: memoryUtils.service.description,
                availability: memoryUtils.service.availabilityde3,

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

    handleInputChange = (key, e) => {
        const { service } = this.state;
        const updatedService = { ...service, [key]: e.target.value };
        this.setState({ service: updatedService });
    };

    handleSave = () => {
        // Save the updated service data
        // You can make an API call here to save the data to the server
        // For demonstration purposes, let's log the updated service data
        const { service } = this.state;

        // Define the valid category options
        const validCategories = [
            "All",
            "Cleaning",
            "Babysitting",
            "Pest Control",
            "Plumbing maintenance",
            "Electrical maintenance",
            "Beauty"
        ];
        if (!validCategories.includes(service.category)) {
            // Display an error message and return without saving
            alert("Please enter a valid category.");
            return;
        }
        this.props.history.push('/provider/servicelist/');
        console.log(this.state.service);
    };


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
            <Button
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    margin: 5,
                    border: '1px solid red',
                    borderColor: 'black',
                }}
                type='primary' onClick={this.handleSave}
            >

                Edit
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
                <List className="test" bordered itemLayout="horizontal" size="small">
                    <List.Item>
                        <List.Item.Meta title="Service Name" />
                        <Input placeholder="Please input your service name" value={service.service} onChange={(e) => this.handleInputChange('service', e)} />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta title="Category" />
                        <Input placeholder="Please input the category of your service ('All',
            'Cleaning',
            'Babysitting',
            'Pest Control',
            'Plumbing maintenance',
            'Electrical maintenance', or
            'Beauty')" value={service.category} onChange={(e) => this.handleInputChange('category', e)} />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta title="Area" />
                        <Input placeholder="Please input the position of your service" value={service.area} onChange={(e) => this.handleInputChange('area', e)} />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta title="Description" />
                        <Input.TextArea
                            placeholder="Please descript your service in detail"
                            value={service.description}
                            onChange={(e) => this.handleInputChange('description', e)}
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta title="Price" />
                        <Input placeholder="Please input the price of your service" value={service.price} onChange={(e) => this.handleInputChange('price', e)} />
                    </List.Item>
                </List>
                {/* <Button type="primary" onClick={this.handleSave}>
          Save
        </Button> */}
            </Card>

        )

    }
}
