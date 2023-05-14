import React, { Component } from 'react'
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Card,
    Modal, message
} from 'antd';
import './userinfo_edit.css'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqEditUser } from '../../api';

const { confirm } = Modal;
export default class Userinfo_edit extends Component {
    onFinish = (values) => {

        confirm({
            title: 'Do you sure you want to change your imformation?',
            onOk: () => {
                console.log('Received values of form: ', values.email, values.username, values.address, values.postcode, values.description)
                const res = reqEditUser(values.email, values.username, values.address, values.postcode, values.description);
                this.props.history.push('/user');
                //前后端连上把注释去掉
                message.success('submitted successfully');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
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
                User information
            </span>

        )
        const extra = (
            <Button

                type='primary' onClick={() => {

                    this.props.history.push('/user/password');
                }}
            >
                Change Password
            </Button>
        )


        return (
            <Card
                title={title}
                bordered>
                <Card
                    title='Edit your information'
                    extra={extra}
                >
                    <div className='editor'>
                        <Form
                            labelAlign='right'
                            name="editer"
                            onFinish={this.onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="username"
                                label="Username"
                                tooltip="What do you want others to call you?"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="postcode"
                                label="Postcode"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input donation amount!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input website!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Edit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </Card>
        )
    }
}
