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
import { reqEditUser_password, reqUpdatePassword } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
const { confirm } = Modal;
export default class Userinfo_password extends Component {
    onFinish = (values) => {
        confirm({
            title: 'Do you sure you want to change your imformation?',
            onOk: () => {
                console.log('Received values of form: ',
                    
                    values.oldPwd,
                    values.newPwd,
                    values.repeatNewPwd)
                this.setInfo(
                    values.oldPwd,
                    values.newPwd,
                    values.repeatNewPwd)
                    console.log('Received values of form: ',values.oldPwd,
                    values.newPwd,
                    values.repeatNewPwd)
                const res = reqUpdatePassword(
                    
                    values.oldPwd,
                    values.newPwd,
                    values.repeatNewPwd);
                // this.props.history.push('/user');
                //前后端连上把注释去掉
                message.success('submitted successfully');
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    };
    setInfo = async (
        oldPwd,
        newPwd,
        repeatNewPwd) => {
            const user = memoryUtils.user
            const email = user.email;
            const username= user.username;
            console.log('aa',user.username,user.email)
            const res = await reqEditUser_password(email,oldPwd,newPwd,repeatNewPwd)
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
        return (
            <Card
                title={title}
                bordered>
                <Card
                    title='Change your password'
                >
                    <div className='editor'>
                        <Form
                            labelAlign='right'
                            name="editer"
                            onFinish={this.onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="oldPwd"
                                label="Old Password"
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
                                name="newPwd"
                                label="New Password"
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
                                name="repeatNewPwd"
                                label="repeat New Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input donation amount!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Comfirm
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </Card>
        )
    }
}
