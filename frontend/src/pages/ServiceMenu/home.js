import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices } from '../../api';
import { useHistory } from 'react-router-dom'
import Subscribe from './subscribe';
import memoryUtils from '../../utils/memoryUtils';
// const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//     },
//     {
//       key: '2',
//       name: 'Joe Black',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//     },
//     {
//       key: '3',
//       name: 'Jim Green',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//     },
//     {
//       key: '4',
//       name: 'Jim Red',
//       age: 32,
//       address: 'London No. 2 Lake Park',
//     },
//     {
//         key: '5',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//       },
//       {
//         key: '6',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//       },
//       {
//         key: '7',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//       },
//       {
//         key: '8',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//       },
//       {
//         key: '9',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//       },
//       {
//         key: '10',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//       },
//       {
//         key: '11',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//       },
//   ];

const PAGE_SIZE = 5;
const { Search } = Input;


export default class servicemenu extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'service provider',
                // dataIndex: 'provider',
                width: '10%',
                align: 'center',
                render: (service) => {

                    return (
                        <span>
                            <Button
                                type='link'
                                onClick={() => {
                                   memoryUtils.service = service;
                                    // console.log('看这里'+ memoryUtils.service);
                                    this.props.history.push('/menu/detail/' + service.id);
                                }}
                            >{service.provider}
                            </Button>
              
                        </span>
                    )
                }
            },
            {
                title: 'service name',
                dataIndex: 'service',
                width: '15%',
                align: 'center',
                
            },
            
            {
                title: 'catagory',
                dataIndex: 'catagory',
                width: '10%',
                align: 'center'
            },
            {
                title: 'description',
                dataIndex: 'description',
                // width: '15%',
                align: 'center'
            },
            {
                title: 'area',
                dataIndex: 'area',
                width: '10%',
                align: 'center'
            },
            {
                title: 'price',
                dataIndex: 'price',
                width: '10%',
                align: 'center'
            },
            // {
            //     title: 'Availability',
            //     dataIndex: 'availability',
            //     width: '10%',
            //     align: 'center',

            //     // onFilter: (value, record) => record.availability.indexOf(value) === 0,
            //     // filters: [
            //     //     {
            //     //       text: 'True',
            //     //       value: 'true',
            //     //     },
            //     //     {
            //     //       text: 'False',
            //     //       value: 'false',
            //     //     },
            //     //   ],
            //     // 筛选 
                  
            // },

            {
                title: 'operation',
                align: 'center',
                width: '10%',
                render: (service) => {

                    return (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => {
                                    // console.log(service);
                                    // console.log(service.id);
                                    // console.log(this.props.history);
                                    //跳转详情页面
                                    
                                    memoryUtils.service = service;
                                    // console.log('看这里'+ memoryUtils.service);
                                    this.props.history.push('/menu/detail/' + service.id);
                                }}
                            >details
                            </Button>
              
                        </span>
                    )
                }
            }
        ]

    }

    handleSelect = (value) => {
        //select组件直接能传出来
        if (typeof value === 'undefined') {
            console.log("value" + value)
            this.selectValue = ''
            //这个if没任何用，我也不知道为什么undefined进不来
        } else { this.selectValue = value }
    }
    handleInput = (event) => {
        this.inputValue = event.target.value
        //这个value要探进去找，直接传的value是个对象
        // 万金油用法event.target.value
        // 不能用ref.current.value，原因我也不知道
    }
    getSelectandInput = () => {

        let select = this.selectValue
        let input = this.inputValue
        console.log("select", select, typeof select, "input", input, typeof input);

    }

    constructor() {
        super()
        this.state = {
            services: [
                {
                    key: '1',
                    catagory: 'cleaning',
                    service: 'John Brown cleaning',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                    //每个数据一个id
                },
                {
                    key: '2',
                    catagory: 'cleaning',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'true',
                    id: 'asdasdfaslkfsadf215',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
                {
                    key: '3',
                    service: 'AAA',
                    catagory: 'FFF',
                    description: 'SDFSFSFSFf',
                    area: 'CCC',
                    availability: 'false',
                    id: 'asdfasdklfjskl',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
                {
                    key: '4',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
                {
                    key: '5',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
                {
                    key: '6',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email:'abc@qq.com',
                    provider:'John Brown',
                    price:'15£'
                },
                {
                    key: '7',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    provider:'John Brown',
                    price:'15£'
                },
            ],
            //假数据
            total: 0 //总页数
        }
    }

    
    getService = async (pageNum) => {

        let result;
        if (!this.isSearch) {
            result = await reqServices(pageNum, PAGE_SIZE);
        } else {
            let select = this.selectValue
            let input = this.inputValue
            result = await reqSearchServices({
                pageNum:pageNum,
                pageSize: PAGE_SIZE,
                select:select,
                input:input
            })
        }
        if (result.code === '100') {
            const { serviceList, total } = result.obj;
            this.setState({
                services: serviceList,
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
        const { services, total } = this.state;
        // const onSearch = (value) => {
        //     console.log(value)
        //     console.log(this.state.selectType)
        // };
        // const {selectType} = this.state;
        const title = (
            <span className='abc'>
                <Space direction="horizontal"
                >
                    <Select

                        onChange={this.handleSelect}
                        showSearch
                        style={{
                            width: 200,
                        }}
                        placeholder="Search by category"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: 'All',
                                label: 'All',
                            },
                            {
                                value: 'Cleaning',
                                label: 'Cleaning',
                            },
                            {
                                value: 'Babysitting',
                                label: 'Babysitting',
                            },
                            {
                                value: 'Pest Control',
                                label: 'Pest Control',
                            },
                            {
                                value: 'Plumbing maintenance',
                                label: 'Plumbing maintenance',
                            },
                            {
                                value: 'Electrical maintenance',
                                label: 'Electrical maintenance',
                            },
                            {
                                value: 'Beauty',
                                label: 'Beauty',
                            },
                        ]}
                    />

                    <Search
                        onInput={this.handleInput}

                        className='city_search'
                        placeholder="search by city"
                        allowClear
                        enterButton="Search"
                        size="medium"
                        onSearch={this.getSelectandInput}
                    // onSearch={() => {
                    //     this.isSearch = true;
                    //     //搜索标识符，true就搜索过了
                    //     this.getService(1)
                    // }}
                    />
                </Space>
            </span>
        )
        return (
            <>

                <Card
                    style={{
                        width: '100%',
                    }}
                    title={title}
                >
                    <Table
                        columns={this.columns}
                        dataSource={services}
                        pagination={{
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            total: total,
                            onChange: this.getService
                        }}
                    >

                    </Table>
                </Card>


            </>
        );
    }
};
