import React, { Component } from 'react'
import { Avatar, List, Card, Button, Collapse } from 'antd';


const { Panel } = Collapse;
const data = [
    {
        ProviderName: 'Service provider 1',
        Email:'sdasme 1'
        ,Description:'service subscribe submitted'
        ,Address:'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,Postcode:'131'
    },
    {
        ProviderName: 'Service provider 1',
        Email:'sdasme 1'
        ,Description:'service subscribe submitted'
        ,Address:'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,Postcode:'131'
    },
    {
        ProviderName: 'Service provider 1',
        Email:'sdasme 1'
        ,Description:'service subscribe submitted'
        ,Address:'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,Postcode:'131'
    },
    {
        ProviderName: 'Service provider 1',
        Email:'sdasme 1'
        ,Description:'service subscribe submitted'
        ,Address:'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,Postcode:'131'
    },
    {
        ProviderName: 'Service provider 1',
        Email:'sdasme 1'
        ,Description:'service subscribe submitted'
        ,Address:'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,Postcode:'131'
    },
    {
        ProviderName: 'Service provider 1',
        Email:'sdasme 1'
        ,Description:'service subscribe submitted'
        ,Address:'A pig is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
        ,Postcode:'131'
    },
];
export default class Message extends Component {

    render() {
        const extra = (
            <Button type='primary' onClick={() => {
                this.props.history.push('/manager/provider');
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
