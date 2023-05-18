import React, { Component } from 'react'
import { CommentOutlined } from '@ant-design/icons';

import { Button, Card, Input, Select, Space, Table ,message} from 'antd'
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
                                    this.props.history.push('/history/detail/' + request._id);
                                }}
                            >comment
                            </Button>
                        </span>
                    )
                }
            }
        ]

    }


    constructor() {
        super()
        this.state = {
            requests: [
            ],
            
        }
    }

    getService = async () => {
        console.trace()
        let result_json 
        let user = memoryUtils.user
        const in_email = user.email
        console.log("email"+in_email)
        result_json = await reqHistoryRequest(in_email);
        console.log(JSON.stringify(result_json));
        const result = JSON.parse(result_json.data)
        console.log(result)
        if (result.code === 200) {
            console.log(result.return_obj)
            this.setState({
                requests: result.return_obj,
                
            })
        }
    }
    
    componentDidMount() {
        this.getService();
    }
    componentWillMount() {
        this.initColumns();
    }


    render() {
        const { requests} = this.state;
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
                        }}
                    >
                    </Table>
                </Card>
            </>
        );
    }
}
