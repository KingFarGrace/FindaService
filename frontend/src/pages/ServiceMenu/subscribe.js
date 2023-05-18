import { Card, Button, Input, Modal, message } from 'antd'
import React, { Component } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqAddService, reqUserInfo } from '../../api';

const { TextArea } = Input;
const { confirm } = Modal;

export default class Subscribe extends Component {
    dataPreparation = () => {
        let user = memoryUtils.user
        //把用户数据拿出来存起来
        let service = memoryUtils.service
        //把url末尾的当前服务id拿出来存起来
        // console.log('邮箱是'+user.email)
        // console.log('目标服务id是'+id)
        this.userEmail = user.email
        this.serviceProvider = service.provider
        this.serviceName = service.service
        this.price = Number(service.price)
        console.log('发到后端的客户邮箱' + this.userEmail)
        console.log('发到后端的服务商名字' + this.serviceProvider)
        console.log('发到后端的服务名字' + this.serviceName)
        this.getProviderEmail(this.serviceProvider)

    }
    getProviderEmail = async (provider) => {
        console.log(provider)
        const result_json = await reqUserInfo(provider)
        const res = JSON.parse(result_json.data)
        console.log(res)
        this.providerEmail = res.return_obj.email
        console.log("发到后端的服务商邮箱" + this.providerEmail)

    }

    //把存到本地的用户数据里的邮箱拿出来
    componentDidMount() {
        this.dataPreparation();
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.inputValue = e.target.value
    };

    onClick = () => {
        confirm({
            title: 'are you sure you want to subscribe?',
            onOk: () => {
                this.onSubmit();
                this.props.history.replace('/menu');

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onSubmit = async () => {
        const content = this.inputValue;
        const userEmail = this.userEmail;
        const providerEmail = this.providerEmail;
        const serviceName = this.serviceName;
        const price = this.price;
        console.log("消息", userEmail, providerEmail, serviceName, content)
        const result_json = await reqAddService(userEmail, providerEmail, serviceName, null, content,);
        console.log("result_json", result_json)
        const res = JSON.parse(result_json.data)
        if (res.code == 400) { message.success('submitted successfully'); }
        else { message.error(res.msg) }
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
                Subscribe service
            </span>

        )



        return (
            <Card
                title={title}
            >
                <>

                    <Card
                        title='add some description of your requirement'
                    >
                        <TextArea
                            placeholder="add some description of your requirement "
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
