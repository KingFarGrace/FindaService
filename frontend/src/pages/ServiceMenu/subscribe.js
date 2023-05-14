import { Card, Button, Input, Modal ,message} from 'antd'
import React, { Component } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqSubscribeService } from '../../api';

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
        this.serviceEmail = service.email
        this.serviceName = service.service
        console.log('发到后端的客户邮箱'+this.userEmail)
        console.log('发到后端的服务商邮箱'+this.serviceEmail)
        console.log('发到后端的服务名字'+this.serviceName)
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
                //前后端连上把注释去掉
                message.success('submitted successfully');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onSubmit = async() => {
        const content = this.inputValue;
        const userEmail = this.userEmail;
        const providerEmail =this.serviceEmail;
        const provider = this.serviceName;
        const res = await reqSubscribeService(content,userEmail,providerEmail,provider);
        if (res.Code==100){message.success('submitted successfully');}
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
