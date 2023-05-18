
import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table, message, Modal } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqUpdateRequest, reqMyRequest, reqRejectRequest, reqUserInfo } from '../../api';
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
                dataIndex: 'receiver',
                width: '20%',
                align: 'center'
            },
            {
                title: 'service name',
                dataIndex: 'service',
                width: '20%',
                align: 'center',
                render: (service) => service.name
            },

            {
                title: 'request number',
                dataIndex: '_id',
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
                                disabled={this.disabled(request)}
                                icon={<EditOutlined />}
                                type="primary"
                                onClick={() => {
                                    // console.log(service);
                                    // console.log(service.id);
                                    // console.log(this.props.history);
                                    //跳转详情页面
                                    memoryUtils.request = request;
                                    // console.log('看这里'+ memoryUtils.service);
                                    this.props.history.push('/record/detail/' + request._id);
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
                                            window.location.reload()
                                            //this.props.history.replace('/record');
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
        this.serviceId = request._id
        // const content = this.inputValue;
        const content = '';
        const userEmail = this.userEmail;
        const providerEmail = this.serviceEmail;
        const serviceName = this.serviceName;
        const id = this.serviceId;
        console.log('id'+ id)
        const status = 'completed'
        console.log(id, status)
        const res = await reqUpdateRequest(id,null,status);

    }

    disabled(request) {
        if (request.status === 'further details requested') {
            return false
        } else {
            return true
        }
    }


    constructor() {
        super()
        this.state = {
            requests: [
            ],
            //假数据
            total: 0 //总页数
        }
    }

    getService = async () => {
        const email = this.userEmail;
        let result_json
        result_json = await reqMyRequest(email);
        console.log("shut up" + result_json.data);
        const result = JSON.parse(result_json.data);
        console.log("shut down" + result.code);
        if (result.code === 200) {
            console.log("shut down" + result.return_obj);
            this.setState({
                requests: result.return_obj,
            })
            console.log("看看"+this.state.requests)
        }
    }
    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.dataPreparation();
        this.getService();

    }
    shouldComponmentUpdate(){
        this.dataPreparation();
        this.getService();
    }
    render() {
        const { requests } = this.state;
        console.log(JSON.stringify(requests))
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
                            onchange: this.getService
                        }}
                    >

                    </Table>
                </Card>


            </>
        );
    }
}
