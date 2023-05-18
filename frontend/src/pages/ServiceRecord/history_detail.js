import { Card, Button, Input, Modal, message, Radio } from 'antd'
import React, { Component } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqSubscribeService, reqAddReview, reqUserInfo_email } from '../../api';
import moment from 'moment';
// import { request } from './../../../../../test/my-project/src/app';
const { TextArea } = Input;
const { confirm } = Modal;

export default class History_detail extends Component {
    dataPreparation = () => {
        let user = memoryUtils.user
        //把用户数据拿出来存起来
        let request = memoryUtils.request
        //把url末尾的当前服务id拿出来存起来
        // console.log('邮箱是'+user.email)
        // console.log('目标服务id是'+id)
        let currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.userEmail = user.email
        this.serviceName = request.service.name
        this.serviceProvider = request.receiver
        this.currentTime = currentTime
        this.userName = user.username
        console.log('看看' + JSON.stringify(request))
        console.log('发到后端的服务名字' + this.serviceName)
        console.log('发到后端的服务商名字' + this.serviceProvider)
        console.log('发到后端的当前时间' + this.currentTime)
        console.log('发到后端的当前用户名字' + this.userEmail)
    }
    getProvider = async () => {
        const result_json = await reqUserInfo_email(this.serviceProvider)
        console.log('我的' + JSON.stringify(result_json))
        const result = JSON.parse(result_json.data)
        this.providerName = result.return_obj.username
        console.log(this.providerName)

    }
    //把存到本地的用户数据里的邮箱拿出来
    componentDidMount() {
        this.getProvider();
        this.dataPreparation();
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.inputValue = e.target.value
    };

    onChange_select = (e) => {
        console.log(e.target.value);
        this.selectValue = e.target.value
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
                
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //提交评论
    onSubmit = async () => {
        const content = this.inputValue;
        const provider = this.providerName;
        const service = this.serviceName;
        const ctime = this.currentTime;
        const username = this.userName;
        const level = this.selectValue !== undefined ? this.selectValue : 'medium';

        console.log(provider + service + username + content + ctime + level);
        const result_json = await reqAddReview(provider , service , username , content , ctime , level);
        console.log(result_json)
        const res = JSON.parse(result_json.data);
        if (res.Code == 400) { message.success('submitted successfully'); }
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
        const options = [
            {
                label: 'exerllent',
                value: 'good',
            },
            {
                label: 'average',
                value: 'medium',
            },
            {
                label: 'bad',
                value: 'bad',
            },
        ];

        const extra = (
            <span>

                <Radio.Group
                    options={options}
                    onChange={this.onChange_select}
                    optionType="button"
                    buttonStyle='solid'
                    defaultValue='medium'
                />
            </span>
        )
        return (
            <Card
                title={title}
            >
                <>

                    <Card
                        title='How is the service ?'
                        extra={extra}
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
