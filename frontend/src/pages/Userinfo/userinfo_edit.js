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
import { reqEditUser_info } from '../../api';
import memoryUtils from '../../utils/memoryUtils';

const { confirm } = Modal;
export default class Userinfo_edit extends Component {
    onFinish = (values) => {

        confirm({
            title: 'Do you sure you want to change your imformation?',
            onOk: () => {
                console.log('Received values of form: ',  values.address, values.postcode, values.description)
                this.setInfo(values.address, values.postcode, values.description)
                // this.props.history.push('/user');
                //前后端连上把注释去掉
                message.success('submitted successfully');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    setInfo = async (
        address,
        postcode,
        description) => {

            let user = memoryUtils.user
            const email =user.email
            const username = user.username
            console.log(email, username)
        const res = await reqEditUser_info(email,
            username,
            address,
            postcode,
            description)
            console.log(res)

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
