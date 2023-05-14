import React, { Component } from 'react'
import { Avatar, List, Card, Button, Collapse } from 'antd';


const { Panel } = Collapse;
const data = [
    {
        serviceProviderName: 'Service provider 1',
        serviceName:'service name 1'
        ,serviceStatus:'service subscribe submitted'
        ,serviceContent:'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,key:'1'
        ,serviceOrderNumber:'A11111122222'
    },
    {
        serviceProviderName: 'Service provider 2',
        serviceName:'service name 2'
        ,serviceStatus:'service requested update'
        ,serviceContent:'A rat is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,key:'1'
        ,serviceOrderNumber:'A11111122222'
    },
    {
        serviceProviderName: 'Service provider 3',
        serviceName:'service name 3'
        ,serviceStatus:'service accomplish'
        ,serviceContent:'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,key:'1'
        ,serviceOrderNumber:'A11111122222'
    },
    {
        serviceProviderName: 'Service provider 4',
        serviceName:'service name'
        ,serviceStatus:'service requested update'
        ,serviceContent:'A cat is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,key:'1'
        ,serviceOrderNumber:'A11111122222'
    },
    {
        serviceProviderName: 'Service provider 5',
        serviceName:'service name'
        ,serviceStatus:'service subscribe submitted'
        ,serviceContent:'A turtle is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,key:'1'
        ,serviceOrderNumber:'A11111122222'
    },
    {
        serviceProviderName: 'Service provider 6',
        serviceName:'service name'
        ,serviceStatus:'service accomplish'
        ,serviceContent:'A phynix is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,key:'1'
        ,serviceOrderNumber:'A11111122222'
    },

];
export default class Message extends Component {

    render() {
        const extra = (
            <Button type='primary' onClick={() => {

                this.props.history.push('/menu/subscribe/' + this.props.match.params.id);
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
                                avatar={<Avatar src={"https://robohash.org/" + item.serviceProviderName + "?set=set4"} />}
                                title={item.serviceProviderName}
                                description=
                                {
                                <Collapse
                                    bordered={false}
                                    ghost={true}
                                >

                                        <p style={{paddingLeft: 0,}}
                                         >
                                            {item.serviceName}
                                        </p>
                                        <p style={{paddingLeft: 0,}}
                                         >
                                            Order number : {item.serviceOrderNumber}
                                        </p>
                                        <p style={{paddingLeft: 0,}}
                                         >
                                            Hi, your service status has been updated.
                                        </p>

                                    <Panel 
                                    header={item.serviceStatus} 
                                    key="2"
                                    >
                                        <p style={{paddingLeft: 24,}} >
                                            {item.serviceProviderName} : 
                                        </p>
                                        <p style={{paddingLeft: 24,}} >
                                            {item.serviceContent}
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
