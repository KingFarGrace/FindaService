import React, { Component } from 'react'
import { Avatar, List, Card, Button, Collapse } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import { reqCommentbyId } from '../../api/index';

const { Panel } = Collapse;
const data = [


];
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    provider: 'Service provider 1',
                    service: 'service name 1'
                    , status: 'further details requested'
                    , content: 'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
                    , key: '1'
                    , id: 'A11111122222'
                    , email: 'abc@qq.com',


                },
                {
                    provider: 'Service provider 2',
                    service: 'service name 2'
                    , status: 'service requested update'
                    , content: 'A rat is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
                    , key: '1'
                    , id: '131231414'
                    , email: 'abc@qq.com',


                },
                {
                    provider: 'Service provider 3',
                    service: 'service name 3'
                    , status: 'service accomplish'
                    , content: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
                    , key: '1'
                    , id: '35345245'
                    , email: 'abc@qq.com',


                },
                {
                    provider: 'Service provider 4',
                    service: 'service name'
                    , status: 'service requested update'
                    , content: 'A cat is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
                    , key: '1'
                    , id: 'sdfasfaf'
                    , email: 'abc@qq.com',

                },
                {
                    provider: 'Service provider 5',
                    service: 'service name'
                    , status: 'service subscribe submitted'
                    , content: 'A turtle is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
                    , key: '1'
                    , id: '123123547'
                    , email: 'abc@qq.com',

                },
                {
                    provider: 'Service provider 6',
                    service: 'service name'
                    , status: 'service accomplish'
                    , content: 'A phynix is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
                    , key: '1'
                    , id: 'asdfasdxc12312'
                    , email: 'abc@qq.com',

                },
            ]
        }

    }


    dataPreparation = () => {
        let user = memoryUtils.user
        this.userEmail = user.email
        console.log('发到后端的客户邮箱' + this.userEmail)
    }
    componentDidMount() {
        this.dataPreparation();
        this.loadMessage();
    }

    loadMessage = async () => {
        const email = this.userEmail;
        // const res = await this.setupState();
        const res = await reqCommentbyId(email);
        console.log(res);
        if (res.status === 100) {
            this.setState({ comment: res.message })
        }
    }

    //test
    // setupState() {
    //     this.setState({
    //         messages: [{
    //             serviceProviderName: 'Service provider 1',
    //             serviceName: 'service name 1'
    //             , serviceStatus: 'service subscribe submitted'
    //             , serviceContent: 'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
    //             , key: '1'
    //             , serviceOrderNumber: 'A11111122222'
    //         }]
    //     });
    // }



    disabled(request) {
        if (request.status === 'further details requested') {
            return false
        } else {
            return true
        }
    }

    render() {

        const { messages } = this.state;
        return (
            <Card>

                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    pagination={{
                        defaultPageSize: 5,
                        showQuickJumper: true,

                    }}
                    renderItem={(item, index) => (
                        <List.Item
                            extra={<Button
                                disabled={this.disabled(item)}
                                type='primary'
                                onClick={() => {
                                    memoryUtils.request = item;
                                    this.props.history.push('/record/detail/' + item.id);
                                }}
                            >
                                Update
                            </Button>}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={"https://robohash.org/" + item.id + "?set=set4"} />}
                                title={item.provider}
                                description=
                                {
                                    <Collapse
                                        bordered={false}
                                        ghost={true}
                                    >

                                        <p style={{ paddingLeft: 0, }}
                                        >
                                            {item.service}
                                        </p>
                                        <p style={{ paddingLeft: 0, }}
                                        >
                                            Order number : {item.id}
                                        </p>
                                        <p style={{ paddingLeft: 0, }}
                                        >
                                            Hi, your service status has been updated.
                                        </p>

                                        <Panel
                                            header={item.status}
                                            key="2"
                                        >
                                            <p style={{ paddingLeft: 24, }} >
                                               Request Number  {item.id} :
                                            </p>
                                            <p style={{ paddingLeft: 24, }} >
                                                {item.content}
                                            </p>
                                        </Panel>
                                    </Collapse>
                                }
                            />
                        </List.Item>)}
                />
            </Card>
        )
    }
}
