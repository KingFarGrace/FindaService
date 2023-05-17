import React, { Component } from 'react'
import { Card, Button, Select, Input, Table, Badge, Descriptions } from 'antd';
import memoryUtils from '../../utils/memoryUtils';

import { reqUpdateRequest, reqMyRequest, reqRejectRequest, reqUserInfo } from '../../api';
export default class Userinfo_detail extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                email: '123@email.com',
                username: '123',
                role: 'user',
                address: 'london',
                postcode: 'so163zf',
                description: 'hello world',
                ctime: '5-10-2022 11:22:33',
            }
        }
    }
    componentDidMount() {
        this.getUser()
    }
    getUser = async () => {
        let user = memoryUtils.user
        console.log("用户名"+user.username)
        const res = await reqUserInfo(user.username)
        const userInfo = JSON.parse(res.data)
        
        console.log("用户信息"+res.data)
        this.setState({user: userInfo.return_obj})
    }
    render() {
        const extra = (
            <Button type='primary' onClick={() => {

                this.props.history.push('/user/edit');
            }}
            >
                Edit information
            </Button>
        )

        const { user } = this.state;

        return (
            <Card>
                <Descriptions
                    title="User Information"
                    layout="vertical"
                    bordered
                    extra={extra}
                >
                    <Descriptions.Item label="E-mail">
                        {user.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Username">
                        {user.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="Role">
                        {user.role}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {user.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Postcode" >
                        {user.postcode}
                    </Descriptions.Item>
                    <Descriptions.Item label="Account created date">
                        {user.ctime}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>
                        {user.description}
                    </Descriptions.Item>

                </Descriptions>
            </Card>
        )
    }
}
