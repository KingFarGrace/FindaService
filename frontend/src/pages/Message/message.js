import React, { Component } from 'react'
import { Avatar, List, Card, Button, Collapse } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import { reqMyMessage } from '../../api/index';

const { Panel } = Collapse;
const data = [


];
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
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
        let result_json
        console.log(email)
        result_json = await reqMyMessage(email);
        console.log("shut up" + result_json.data);
        const result = JSON.parse(result_json.data);
        console.log("shut down" + result.code);
        if (result.code === 200) {
            console.log("shut down" + result.return_obj);
            this.setState({
                messages: result.return_obj,
            })
            console.log("看看"+this.state.messages);
        }
    }

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
                                    this.props.history.push('/record/detail/' + item._id);
                                }}
                            >
                                Update
                            </Button>}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={"https://robohash.org/" + item._id + "?set=set4"} />}
                                title={item.sender}
                                description=
                                {
                                    <Collapse
                                        bordered={false}
                                        ghost={true}
                                    >

                                        <p style={{ paddingLeft: 0, }}
                                        >
                                            {item.service.name}
                                        </p>
                                        <p style={{ paddingLeft: 0, }}
                                        >
                                            Order number : {item._id}
                                        </p>
                                        <p style={{ paddingLeft: 0, }}
                                        >
                                            Hi, your service status has been updated.
                                        </p>

                                        <Panel
                                            header= {"Current Status :" +item.status}
                                            key="2"
                                        >
                                            <p style={{ paddingLeft: 24, }} >
                                               Dear  {item.receiver} :
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
