import { Card, Button, Input, Modal, message } from 'antd'
import React, { Component } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqSubscribeService , reqAddReview } from '../../api';
import moment from 'moment';
const { TextArea } = Input;
const { confirm } = Modal;

export default class History_detail extends Component {
    dataPreparation = () => {
        let user = memoryUtils.user
        //把用户数据拿出来存起来
        let service = memoryUtils.service
        //把url末尾的当前服务id拿出来存起来
        // console.log('邮箱是'+user.email)
        // console.log('目标服务id是'+id)
        let currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.userEmail = user.email
        this.serviceEmail = service.email
        this.serviceName = service.service
        this.serviceProvider = service.provider
        this.currentTime = currentTime
        this.userName = user.username
        console.log('发到后端的服务名字' + this.serviceName)
        console.log('发到后端的服务商名字' + this.serviceProvider)
        console.log('发到后端的当前时间'+this.currentTime)
        console.log()
        console.log('发到后端的当前用户名字'+this.userName)
    
    }
    //把存到本地的用户数据里的邮箱拿出来
    componentDidMount() {
        this.dataPreparation();
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.inputValue = e.target.value
    };
    //按钮点击事件
    onClick = () => {
        confirm({
            title: 'are you sure you want to subscribe?',
            onOk: () => {
                this.onSubmit();
                const id = this.props.match.params.id;
                this.props.history.push('/history/comment/' + id);
                //前后端连上把注释去掉
                message.success('submitted successfully');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //提交评论
    onSubmit = async () => {
        const content = this.inputValue;
        const provider = this.serviceProvider;
        const service = this.serviceName;
        const ctime = this.currentTime;
        const username = this.userName;
        console.log(content + provider + service + username + ctime);
        const res = await reqAddReview(provider + service + content + username + ctime);
        console.log(provider + service + content + username + ctime);
        if (res.Code == 100) { message.success('submitted successfully'); }
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
                History_service
            </span>

        )



        return (
            <Card
                title={title}
            >
                <>

                    <Card
                        title='Leave some comments for the service'
                    >
                        <TextArea
                            placeholder="Your comments keep us moving forward "
                            allowClear
                            style={{
                                height: 200,
                            }}
                            onChange={this.onChange}
                        />
                        <br />
                        <br />
                        <Button
                            type='primary'
                            onClick={this.onClick}
                        >
                            submit
                        </Button>
                    </Card>
                </>
            </Card>
        )
    }
}
