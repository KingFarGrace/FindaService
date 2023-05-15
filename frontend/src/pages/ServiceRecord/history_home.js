import React, { Component } from 'react'
import { CommentOutlined } from '@ant-design/icons';

import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices ,reqHistoryRequest} from '../../api';
import { useHistory } from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils';


const PAGE_SIZE = 5;
const { Search } = Input;
export default class ServiceHistory extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'provider name',
                dataIndex: 'provider',
                width: '20%',
                align: 'center'
            },
            {
                title: 'service name',
                dataIndex: 'service',
                width: '20%',
                align: 'center'
            },
            {
                title: 'request number',
                dataIndex: 'id',
                width: '20%',
                align: 'center'
            },
            {
                
                title: 'Status',
                dataIndex: 'status',
                width: '20%',
                align: 'center',
            },

            {
                title: 'Comment',
                align: 'center',
                width: '20%',
                render: (request) => {

                    return (
                        <span>
                            <Button
                                type='link'
                                icon={<CommentOutlined />}
                                onClick={() => {
                                    memoryUtils.request = request;
                                    this.props.history.push('/history/detail/' + request.id);
                                }}
                            >comment
                            </Button>
                        </span>
                    )
                }
            }
        ]

    }

    handleSelect = (value) => {
        //select组件直接能传出来
        if (typeof value === 'undefined') {
            console.log("value" + value)
            this.selectValue = ''
            //这个if没任何用，我也不知道为什么undefined进不来
        } else { this.selectValue = value }
    }
    handleInput = (event) => {
        this.inputValue = event.target.value
        //这个value要探进去找，直接传的value是个对象
        // 万金油用法event.target.value
        // 不能用ref.current.value，原因我也不知道
    }
    getSelectandInput = () => {

        let select = this.selectValue
        let input = this.inputValue
        console.log("select", select, typeof select, "input", input, typeof input);

    }

    constructor() {
        super()
        this.state = {
            requests: [
                {
                    key: '1',
                    catagory: 'cleaning',
                    service: 'John Brown cleaning',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider: 'John Brown',
                    price: '15£',
                    provider:'John Brown',
                    status:'cancel'
                    //每个数据一个id
                },
                {
                    key: '2',
                    catagory: 'cleaning',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'true',
                    id: 'asdasdfaslkfsadf215',
                    email: 'abc@qq.com',
                    provider:'John Brown',
                    status:'cancel'
                },
                {
                    key: '3',
                    service: 'AAA',
                    catagory: 'FFF',
                    description: 'SDFSFSFSFf',
                    area: 'CCC',
                    availability: 'false',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider:'John Brown',
                    status:'cancel'
                },
                {
                    key: '4',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider:'John Brown',
                    status:'cancel'
                },
                {
                    key: '5',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider:'John Brown',
                    status:'cancel'
                },
                {
                    key: '6',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider:'John Brown',
                    status:'cancel'
                },
                {
                    key: '7',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider:'John Brown',
                    status:'cancel'
                },
            ],
            //假数据
            total: 0 //总页数
        }
    }

    获取分页获取表格数据
    getService = async (pageNum) => {
        let result;
        result = await reqHistoryRequest();
        if (result.code === '100') {
            const { requestList, total } = result.obj;
            this.setState({
                requests: requestList,
                total: total
            })
        }
    }
    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getService(1);
    }

    render() {
        const { requests, total } = this.state;
        // const onSearch = (value) => {
        //     console.log(value)
        //     console.log(this.state.selectType)
        // };
        // const {selectType} = this.state;

        return (
            <>

                <Card
                    style={{
                        width: '100%',
                    }}

                >
                    <Table
                        columns={this.columns}
                        dataSource={requests}
                        pagination={{
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            total: total,
                            onchange: this.getService
                        }}
                    >

                    </Table>
                </Card>


            </>
        );
    }
}
