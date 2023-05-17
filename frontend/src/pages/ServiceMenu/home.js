import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table,message } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices } from '../../api';
import { useHistory } from 'react-router-dom'
import Subscribe from './subscribe';
import memoryUtils from '../../utils/memoryUtils';

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
                                    console.log(service._id);
                                    
                                    //跳转详情页面
                                    memoryUtils.service = service;
                                    console.log('看这里'+ memoryUtils.service._id);
                                    console.log(memoryUtils.service)
                                    this.props.history.push('/menu/detail/' + service._id);
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
        if (value == 'All') { value = null }
        this.selectValue = value
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
                    email: 'abc@qq.com',
                    provider: 'John Brown',
                    price: '15£'
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
                    email: 'abc@qq.com',
                    provider: 'John Brown',
                    price: '15£'
                },
                {
                    key: '3',
                    service: 'AAA',
                    catagory: 'FFF',
                    description: 'SDFSFSFSFf',
                    area: 'CCC',
                    availability: 'false',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider: 'John Brown',
                    price: '15£'
                },
                {
                    key: '4',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider: 'John Brown',
                    price: '15£'
                },
                {
                    key: '5',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider: 'John Brown',
                    price: '15£'
                },
                {
                    key: '6',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    email: 'abc@qq.com',
                    provider: 'John Brown',
                    price: '15£'
                },
                {
                    key: '7',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                    id: 'asdfasdklfjskl',
                    provider: 'John Brown',
                    price: '15£'
                },
            ],
            //假数据
            total: 0 //总页数
        }
    }


    getService = async (pageNum) => {

        let result;
        if (!this.isSearch) {
            let result_json = await reqServices(null, null, pageNum);
            console.log("雪豹" + result_json.data);
            result = JSON.parse(result_json.data);
            console.log("闭嘴" + result);
            console.log("闭嘴" + result.return_obj);

        } else {
            console.log("kk" + this.isSearch)
            let select = this.selectValue
            let input = this.inputValue
            console.log("进来了", select, input);
            let result_json = await reqServices(
                select,
                input,
                pageNum,
            )
            result = JSON.parse(result_json.data);
            console.log("闭嘴" + result_json.data);
            // console.log("闭嘴" + result.return_obj.data);

        }
        if (result.code === 200) {
            const { data, pageCount } = result.return_obj;
            console.log("芝士" + pageCount)
            this.setState({
                services: data,
                total: pageCount
            })
        }else {
            message.error(result.msg)
            this.props.history.replace('/menu')
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
        console.log("总页数" + total)
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
                        // onSearch={this.getSelectandInput}
                        onSearch={() => {
                            this.isSearch = true;
                            //搜索标识符，true就搜索过了
                            this.getService(1)
                        }}
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
                            total: total*PAGE_SIZE,
                            onChange: this.getService
                        }}
                    >

                    </Table>
                </Card>


            </>
        );
    }
};
