import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices,reqProviders } from '../../api';
import { useHistory } from 'react-router-dom'
const PAGE_SIZE = 5;
const { Search } = Input;


export default class providermanager extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'Service  Name',
                dataIndex: 'name',
                width: '15%',
                align: 'center'
            },
            // {
            //     title: 'Description',
            //     dataIndex: 'description',
            //     // width: '15%',
            //     align: 'center'
            // },
            // {
            //     title: 'Address',
            //     dataIndex: 'address',
            //     width: '10%',
            //     align: 'center'
            // },
            // {
            //     title: 'Postcode',
            //     dataIndex: 'postcode',
            //     width: '10%',
            //     align: 'center'
            // },
            // {
            //     title: 'Status',
            //     dataIndex: 'availability',
            //     width: '10%',
            //     align: 'center'
            // },
            {
                title: 'Content',
                dataIndex: 'content',
                width: '65%',
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
                             //       this.props.history.push(operationPath + service.id);
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
                                onClick={() => {
                                    // console.log(service);
                                //    memoryUtils.service = service;
                                 //   console.log(service.availability);
                                   // const operationPath = service.availability === 'true' ? '/manager/service/detail/' : '/manager/service/check/';
                                    // console.log(this.props.history);
                                    //跳转详情页面
                                    
                              //      memoryUtils.service = service;
                                    // console.log('看这里'+ memoryUtils.service);
                             //       this.props.history.push(operationPath + service.id);
                                }}
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
                                onClick={() => {
                                    // console.log(service);
                                //    memoryUtils.service = service;
                                 //   console.log(service.availability);
                                   // const operationPath = service.availability === 'true' ? '/manager/service/detail/' : '/manager/service/check/';
                                    // console.log(this.props.history);
                                    //跳转详情页面
                                    
                              //      memoryUtils.service = service;
                                    // console.log('看这里'+ memoryUtils.service);
                             //       this.props.history.push(operationPath + service.id);
                                }}
                            >Refuse
                            </Button>
                        </div>
                    )
                }
            }
        ]
    
    }
    
    // handleSelect = (value) => {
    //     //select组件直接能传出来
    //     if (typeof value === 'undefined') {
    //         console.log("value" + value)
    //         this.selectValue = ''
    //         //这个if没任何用，我也不知道为什么undefined进不来
    //     } else { this.selectValue = value }
    // }
    // handleInput = (event) => {
    //     this.inputValue = event.target.value
    //     //这个value要探进去找，直接传的value是个对象
    //     // 万金油用法event.target.value
    //     // 不能用ref.current.value，原因我也不知道
    // }
    // getSelectandInput = () => {

    //     let select = this.selectValue
    //     let input = this.inputValue
    //     console.log("select", select, typeof select, "input", input, typeof input);

    // }

    constructor() {
        super()
        this.state = {
            provider: [
                {
                    key: '1',
                    name: 'John Brown',
                    content:'good company',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '2',
                    name: 'John Brown',
                    content:'good company',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '3',
                    name: 'John Brown',
                    content:'good company',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '4',
                    name: 'John Brown',
                    content:'good company',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '5',
                    name: 'John Brown',
                    content:'good company',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '6',
                    name: 'John Brown',
                    content:'good company',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '7',
                    name: 'John Brown',
                    content:'good company',
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
