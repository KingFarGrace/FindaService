import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices,reqProviders } from '../../api';
import { useHistory } from 'react-router-dom'
import providerUtils from '../../utils/providerUtils';
const PAGE_SIZE = 5;
const { Search } = Input;



export default class providemenu extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'Service Provider Name',
                dataIndex: 'name',
                width: '15%',
                align: 'center'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                // width: '15%',
                align: 'center'
            },
            {
                title: 'Address',
                dataIndex: 'address',
                width: '10%',
                align: 'center'
            },
            {
                title: 'Postcode',
                dataIndex: 'postcode',
                width: '10%',
                align: 'center'
            },
            {
                title: 'Status',
                dataIndex: 'availability',
                width: '10%',
                align: 'center'
            },
            {
                title: 'Negative Review Rate',
                dataIndex: 'review',
                width: '10%',
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
                                    this.props.history.push('/manager/providermanage/service/' + provider.id);
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
                {
                    key: '1',
                    name: 'John Brown',
                    description:'good company',
                    address: 'New York No. 1 Lake Park',
                    postcode:'123213',
                    availability: 'true',
                    review: '20%',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '2',
                    name: 'John Brown',
                    description:'good company',
                    address: 'New York No. 1 Lake Park',
                    postcode:'123213',
                    availability: 'false',
                    review: '2%',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '3',
                    name: 'John Brown',
                    description:'good company',
                    address: 'New York No. 1 Lake Park',
                    postcode:'123213',
                    availability: 'true',
                    review: '0%',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '4',
                    name: 'John Brown',
                    description:'good company',
                    address: 'New York No. 1 Lake Park',
                    postcode:'123213',
                    availability: 'true',
                    review: '20%',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '5',
                    name: 'John Brown',
                    description:'good company',
                    address: 'New York No. 1 Lake Park',
                    postcode:'123213',
                    availability: 'true',
                    review: '20%',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '6',
                    name: 'John Brown',
                    description:'good company',
                    address: 'New York No. 1 Lake Park',
                    postcode:'123213',
                    availability: 'true',
                    review: '20%',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '7',
                    name: 'John Brown',
                    description:'good company',
                    address: 'New York No. 1 Lake Park',
                    availability: 'true',
                    postcode:'123213',
                    review: '20%',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
            ],
            //假数据
            total: 0 //总页数
        }
    }

    获取分页
    getService = async (pageNum) => {

        let result = await reqProviders(pageNum, PAGE_SIZE);
        if (result.code === '100') {
            const { providerList, total } = result.obj;
            this.setState({
                provider: providerList,
                total:total
            })
        }
    }
    componentWillMount() {
        this.initColumns();
      }

    componentDidMount() {
        this.getService(1);
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