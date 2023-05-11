import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices } from '../../api';
import { useHistory } from 'react-router-dom'
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
                title: 'service name',
                dataIndex: 'name',
                width: '15%',
                align: 'center'
            },
            {
                title: 'description',
                dataIndex: 'description',
                // width: '15%',
                align: 'center'
            },
            {
                title: 'catagory',
                dataIndex: 'catagory',
                width: '10%',
                align: 'center'
            },
            {
                title: 'price',
                dataIndex: 'price',
                width: '10%',
                align: 'center'
            },
            {
                title: 'status',
                dataIndex: 'availability',
                width: '10%',
                align: 'center'
            },
            {
                title: 'area',
                dataIndex: 'area',
                width: '10%',
                align: 'center'
            },
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
                                    console.log(service);
                                    console.log(service.id);
                                    console.log(this.props.history);
                                    //跳转详情页面
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
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    id:'asjdflkawjefl'
                    //每个数据一个id
                },
                {
                    key: '2',
                    name: 'Joe Black',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Jim Green',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
                {
                    key: '4',
                    name: 'Jim Red',
                    age: 32,
                    address: 'London No. 2 Lake Park',
                },
                {
                    key: '5',
                    name: 'Jim Red',
                    age: 32,
                    address: 'London No. 2 Lake Park',
                },
                {
                    key: '6',
                    name: 'Jim Red',
                    age: 32,
                    address: 'London No. 2 Lake Park',
                },
                {
                    key: '7',
                    name: 'Jim Red',
                    age: 32,
                    address: 'London No. 2 Lake Park',
                },
            ],
            //假数据
            total: 0 //总页数
        }
    }

    获取分页
    getService = async (pageNum) => {

        let result;
        if (!this.isSearch) {
            result = await reqServices(pageNum, PAGE_SIZE);
        } else {
            let select = this.selectValue
            let input = this.inputValue
            result = await reqSearchServices({
                pageNum,
                pageSize: PAGE_SIZE,
                select,
                input
            })
        }
        if (result.code === '100') {
            const { serviceList, total } = result.obj;
            this.setState({
                services: serviceList,
                total
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
        const {services, total } = this.state;
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
                            onchange: this.getService
                        }}
                    >

                    </Table>
                </Card>


            </>
        );
    }
};
