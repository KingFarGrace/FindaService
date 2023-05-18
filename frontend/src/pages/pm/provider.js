import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices,reqProviders,reqLowProvider } from '../../api';
import { useHistory } from 'react-router-dom'
import providerUtils from '../../utils/providerUtils';
const PAGE_SIZE = 5;
const { Search } = Input;



export default class providemenu extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'Service Provider Name',
                dataIndex: 'provider',
                width: '60%',
                align: 'center'
            },
            {
                title: 'Positive Review Rate',
                dataIndex: 'avgrate',
                width: '30%',
                align: 'center'
            },
            {
                title: 'operation',
                align: 'center',
                width: '10%',
                render: (provider) => {
                    let operationText = provider.availability === 'true' ? 'Delate' : 'Accpet';
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
                                onClick={() => {
                                    // console.log(service);
                                //    memoryUtils.service = service;
                                 //   console.log(service.availability);
                                   // const operationPath = service.availability === 'true' ? '/manager/service/detail/' : '/manager/service/check/';
                                    // console.log(this.props.history);
                                    //跳转详情页面
                                    
                              //      memoryUtils.service = service;
                                    // console.log('看这里'+ memoryUtils.service);
                                    providerUtils.provider = provider;
                                    this.props.history.push('/manager/providermanage/service/' + provider.provider);
                                }}
                            >Details
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
            
            ],
            //假数据
            total: 0 //总页数
        }
    }

    获取分页
    getService = async () => {

        let result = await reqLowProvider()
        const response = JSON.stringify(result.data);
        const user = JSON.parse(result.data)
        this.setState({provider:user.return_obj})
        console.log("雪豹" + user.return_obj[0].provider);
        
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

    render() {
        const {provider, total } = this.state;
        // const onSearch = (value) => {
        //     console.log(value)
        //     console.log(this.state.selectType)
        // };
        // const {selectType} = this.state;
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


            </>
        );
    }
};