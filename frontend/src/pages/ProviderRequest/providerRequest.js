import React, { Component } from 'react'
import { Button, Card, Input, Modal, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices,reqProviders, reqMyRequest, sendRequest, updateRequest,reqMyMessage } from '../../api';
import { useHistory } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils';
const PAGE_SIZE = 5;
const { Search } = Input;


export default class providermanager extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'Service  Name',
                dataIndex: ['service', 'name'],
                width: '10%',
                align: 'center'
            },
            {
                title: 'Customer  Name',
                dataIndex: 'sender',
                width: '10%',
                align: 'center'
            },
            {
                title: 'Service  Price',
                dataIndex: ['service', 'cost'],
                width: '10%',
                align: 'center'
            },
            {
                title: 'Content',
                dataIndex: 'content',
                width: '50%',
                align: 'center'
            },
            {
                title: 'operation',
                align: 'center',
                width: '10%',
                render: (provider) => {
                    return (
                        <div
                        style={{
                            display : 'flex'
                        }}>
                            <Button
                                style={{
                                    backgroundColor:'white',
                                    color : 'black',
                                    margin : 5,
                                    border: '1px solid red',
                                    borderColor: 'black',
                                  }}
                                type="primary"
                                name='judge'
                                onClick={async() => {
                                    const na = provider.service.name;
                                    const co = provider.service.cost;
                                    console.log(provider._id);
                                    let result = await sendRequest(storageUtils.getUser().email,provider.sender,{na,co},"Your service request is accepted","accepted");
                                    let user = await updateRequest(provider._id,"Your service request is accepted","accepted")
                                    await this.getService();
                                }}
                            >Accept
                            </Button>
                            <Button
                                style={{
                                    backgroundColor:'white',
                                    color : 'black',
                                    margin : 5,
                                    border: '1px solid red',
                                    borderColor: 'black',
                                  }}
                                type="primary"
                                name='judge'
   
                                onClick={() => this.showModal(provider)}
                                
                            >Request Update
                            </Button>
                            <Button
                                style={{
                                    backgroundColor:'white',
                                    color : 'black',
                                    margin : 5,
                                    border: '1px solid red',
                                    borderColor: 'black',
                                  }}
                                type="primary"
                                name='judge'
                                onClick={ async() => {
                                    const na = provider.service.name;
                                    const co = provider.service.cost;
                                    console.log(provider._id);
                                    let result = await sendRequest(storageUtils.getUser().email,provider.sender,{na,co},"Your service request is rejected","rejected");
                                    let user = await updateRequest(provider._id,"Your service request is rejected","rejected")
                                    await this.getService();
                                }}
                            >Refuse
                            </Button>
                        </div>
                    )
                }
            }
        ]
    
    }
    

    constructor() {
        super()
        this.state = {
            provider: [
                {
                }
            ],
            updateRequestDetails: '', // New state variable for storing input from user
            isModalVisible: false,
            currentProvider : ""
            //假数据
      //      total: 0 //总页数
        }
    }

    获取分页
    getService = async () => {

        let result = await reqMyMessage(storageUtils.getUser().email);
      //  const response = JSON.stringify(result.data);
        const user = JSON.parse(result.data)
        this.setState({provider:user.return_obj})
        console.log("雪豹" + user.return_obj[0].sender);
       
        // if (result.code === '100') {
        //     const { providerList, total } = result.obj;
        //     this.setState({
        //         provider: providerList,
        //         total:total
        //     })
        // }
    }
    componentWillMount() {
        this.initColumns();
      }

    componentDidMount() {
        this.getService();
    }

    showModal = (provider) => {
        this.setState({ 
          isModalVisible: true,
          currentProvider: provider // Save the current provider to the state
        });
      };

      handleOk = async () => {
        const provider = this.state.currentProvider; // Get the provider from the state
        const na = provider.service.name;
        const co = provider.service.cost;
        console.log(provider._id);
        let result = await sendRequest(storageUtils.getUser().email,provider.sender,{na,co}, this.state.updateRequestDetails, "further details requested");
        let user = await updateRequest(provider._id, this.state.updateRequestDetails, "further details requested")
        await this.getService();
        this.setState({ 
          isModalVisible: false,
          currentProvider: null // Clear the current provider
        });
      };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };

    handleChange = (e) => {
        this.setState({ updateRequestDetails: e.target.value });
    };


    render() {
        let {provider, total } = this.state;
        // const onSearch = (value) => {
        //     console.log(value)
        //     console.log(this.state.selectType)
        // };
        // const {selectType} = this.state;
        provider = provider.filter(item => item.status === 'pending');
        return (
            <>

                <Card
                    style={{
                        width: '100%',
                    }}
                    //title={title}
                >
                    <Table
                        columns={this.columns}
                        dataSource={provider}
                        pagination={{
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            total: total,
                            onchange: this.getService
                        }}
                    >

                    </Table>
                </Card>
                <Modal 
    title="Request Update" 
    visible={this.state.isModalVisible} 
    onOk={() => this.handleOk(provider)} 
    onCancel={this.handleCancel}
>
    <Input 
        placeholder="Enter your request details" 
        value={this.state.updateRequestDetails} 
        onChange={this.handleChange}
    />
</Modal>

            </>
        );
    }
};
