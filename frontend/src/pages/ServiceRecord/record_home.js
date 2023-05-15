
import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table, message, Modal } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqUpdateRequest, reqMyRequest,reqRejectRequest } from '../../api';
import { useHistory } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import memoryUtils from '../../utils/memoryUtils';

const { confirm } = Modal;
const PAGE_SIZE = 5;
const { Search } = Input;

export default class Servicerecord extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'service provider',
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
                title: 'operation',
                align: 'center',
                width: '20%',
                render: (request) => {

                    return (
                        <span>

                            <Button
                                //跳转按钮
                                disabled ={this.disabled(request)}
                                icon={<EditOutlined />}
                                type="primary"
                                onClick={() => {
                                    // console.log(service);
                                    // console.log(service.id);
                                    // console.log(this.props.history);
                                    //跳转详情页面
                                    memoryUtils.request = request;
                                    // console.log('看这里'+ memoryUtils.service);
                                    this.props.history.push('/record/detail/' + request.id);
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
                                    memoryUtils.request = request;
                                    console.log('')
                                    confirm({
                                        
                                        title: 'are you sure you want to cancel?',
                                        onOk: () => {
                                            
                                            this.onCancel();
                                           // this.props.history.replace('/record');
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
    dataPreparation = () => {
        let user = memoryUtils.user
        //把用户数据拿出来存起来
        let request = memoryUtils.request
        //把url末尾的当前服务id拿出来存起来
        // console.log('邮箱是'+user.email)
        // console.log('目标服务id是'+id)
        this.userEmail = user.email
        this.serviceEmail = request.email
        this.serviceName = request.service
        this.serviceId = request.id
        console.log('发到后端的客户邮箱' + this.userEmail)
        console.log('发到后端的服务商邮箱' + this.serviceEmail)
        console.log('发到后端的服务名字' + this.serviceName)
        console.log('发到后端的request ID' + this.serviceId)
    }
    onCancel = async () => {
        let user = memoryUtils.user
        //把用户数据拿出来存起来
        let request = memoryUtils.request
        this.serviceId = request.id
        // const content = this.inputValue;
        const content = '';
        const userEmail = this.userEmail;
        const providerEmail = this.serviceEmail;
        const serviceName = this.serviceName;
        const id =this.serviceId;
        const status = 'rejected'
        console.log(id, status)
        const res = await reqRejectRequest(id, status);
        
    }

    disabled (request) {
        if (request.status === 'further details requested') {
            return false
        }else {
            return true
        }
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
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'true',
                    id: '1',
                    email: 'abc@qq.com',
                    status: 'further details requested',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                    //每个数据一个id
                },
                {
                    key: '2',
                    catagory: 'cleaning',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'true',
                    id: '2',
                    email: 'abc@qq.com',
                    status: 'pending for agree',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
                {
                    key: '3',
                    service: 'AAA',
                    catagory: 'FFF',
                    description: 'SDFSFSFSFf',
                    area: 'CCC',
                    availability: 'false',
                    id: '3',
                    email: 'abc@qq.com',
                    status: 'need new info',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
                {
                    key: '4',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: '4',
                    email: 'abc@qq.com',
                    status: 'further details requested',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
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
                    status: 'active',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
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
                    status: 'active',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
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
                    status: 'active',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
            ],
            //假数据
            total: 0 //总页数
        }
    }

    getService = async (pageNum) => {

        let result;
        result = await reqMyRequest(pageNum, PAGE_SIZE);
        if (result.code === '100') {
            const { requestList, total } = result.obj;
            this.setState({
                request: requestList,
                total: total
            })
        }
    }
    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getService(1);
        this.dataPreparation();
    }

    render() {
        const { requests, total } = this.state;
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
