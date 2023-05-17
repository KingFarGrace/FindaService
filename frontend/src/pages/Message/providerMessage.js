import React, { Component } from 'react'
import { Avatar, List, Card, Button, Collapse } from 'antd';
import { reqServices, reqSearchServices,reqProviders, reqMyRequest, sendRequest, updateRequest,reqMyMessage } from '../../api';
import { useHistory } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils';

const { Panel } = Collapse;




export default class Message extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                }
            ],
            //假数据
      //      total: 0 //总页数
        }
    }
    getService = async () => {

        let result = await reqMyMessage(storageUtils.getUser().email);
      //  const response = JSON.stringify(result.data);
        const user = JSON.parse(result.data)
        this.setState({data:user.return_obj})
        console.log("雪豹" + user.return_obj[0].service.name);
       
        // if (result.code === '100') {
        //     const { providerList, total } = result.obj;
        //     this.setState({
        //         provider: providerList,
        //         total:total
        //     })
        // }
    }

    componentDidMount() {
        this.getService();
    }

    render() {
        let {data} = this.state;
        data = data.filter(item => item.status === 'pending');
        const extra = (
            <Button type='primary' onClick={() => {

                this.props.history.push('/provider/servicerequest');
            }}
            >
                work
            </Button>
        )
        return (
            <Card>

                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    pagination={{
                        defaultPageSize: 5,
                        showQuickJumper: true,

                    }}
                    renderItem={(item, index) => (
                        <List.Item
                            extra={extra}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={"https://robohash.org/" + item.sender + "?set=set4"} />}
                                title={item.sender}
                                description=
                                {
                                <Collapse
                                    bordered={false}
                                    ghost={true}
                                >

                                        <p style={{paddingLeft: 0,}}
                                         >
                                            {item.sender.name}
                                        </p>
                                        <p style={{paddingLeft: 0,}}
                                         >
                                            Hi, Here is a service request
                                        </p>
                                        <p style={{paddingLeft: 0,}}
                                         >
                                            Content : {item.content}
                                        </p>
                                        

                                    <Panel 
                                    header={item.status} 
                                    key="2"
                                    >
                                        <p style={{paddingLeft: 24,}} >
                                            {item.service.name} : 
                                        </p>
                                        <p style={{paddingLeft: 24,}} >
                                            {item.service.cost}
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
