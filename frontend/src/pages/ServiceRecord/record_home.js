
import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table , message, Modal} from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices } from '../../api';
import { useHistory } from 'react-router-dom'
import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';

import memoryUtils from '../../utils/memoryUtils';

const { confirm } = Modal;
const PAGE_SIZE = 5;
const { Search } = Input;

export default class Servicerecord extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'service name',
                dataIndex: 'service',
                width: '15%',
                align: 'center'
            },
            {
                title: 'catagory',
                dataIndex: 'catagory',
                width: '10%',
                align: 'center'
            },
            {
                title: 'description',
                dataIndex: 'description',
                // width: '15%',
                align: 'center'
            },
            {
                title: 'area',
                dataIndex: 'area',
                width: '10%',
                align: 'center'
            },
            {
                title: 'price',
                dataIndex: 'price',
                width: '10%',
                align: 'center'
            },
            {
                title: 'Availability',
                dataIndex: 'availability',
                width: '10%',
                align: 'center',
            },

            {
                title: 'operation',
                align: 'center',
                width: '10%',
                render: (service) => {

                    return (
                        <span>
                        
                            <Button
                            //跳转按钮
                                icon={<EditOutlined />}
                                type="primary"
                                onClick={() => {
                                    // console.log(service);
                                    // console.log(service.id);
                                    // console.log(this.props.history);
                                    //跳转详情页面
                                    memoryUtils.service = service;
                                    // console.log('看这里'+ memoryUtils.service);
                                    this.props.history.push('/record/detail/' + service.id);
                                }}
                            >Update
                            </Button>
                            <pre> </pre>
                         
                            <Button
                            //删除按钮
                                icon={<DeleteOutlined />}
                                danger
                                type="primary"
                                onClick={() => {
                                    confirm({
                                        title: 'are you sure you want to cancel?',
                                        onOk: () => {
                                            memoryUtils.service = service;
                                            this.onCancel();
                                            this.props.history.replace('/record');
                                            message.success('cancel successfully');
                                        },
                                        onCancel() {
                                            console.log('Cancel');
                                        },
                                    });
                                }}
                            >Cancel
                            </Button>
                        </span>
                    )
                }
            }
        ]

    }

    onCancel =()=>{

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
            services: [
                {
                    key: '1',
                    catagory: 'cleaning',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com'
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
                    email: 'abc@qq.com'
                },
                {
                    key: '3',
                    service: 'AAA',
                    catagory: 'FFF',
                    description: 'SDFSFSFSFf',
                    area: 'CCC',
                    availability: 'false',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com'
                },
                {
                    key: '4',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com'
                },
                {
                    key: '5',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com'
                },
                {
                    key: '6',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com'
                },
                {
                    key: '7',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com'
                },
            ],
            //假数据
            total: 0 //总页数
        }
    }

    getService = async (pageNum) => {

        let result;
        if (!this.isSearch) {
            result = await reqServices(pageNum, PAGE_SIZE);
        } else {
            let select = this.selectValue
            let input = this.inputValue
            result = await reqSearchServices({
                pageNum: pageNum,
                pageSize: PAGE_SIZE,
                select: select,
                input: input
            })
        }
        if (result.code === '100') {
            const { serviceList, total } = result.obj;
            this.setState({
                services: serviceList,
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
        const { services, total } = this.state;
        return (
            <>

                <Card
                    style={{
                        width: '100%',
                    }}

                >
                    <Table
                        columns={this.columns}
                        dataSource={services}
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
