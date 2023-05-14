import React, { Component } from 'react'
import { CommentOutlined  } from '@ant-design/icons';

import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices } from '../../api';
import { useHistory } from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils';


const PAGE_SIZE = 5;
const { Search } = Input;
export default class ServiceHistory extends Component {
  initColumns = () => {
    this.columns = [
        {
            title: 'service name',
            dataIndex: 'service',
            width: '15%',
            align: 'center'
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
            title: 'Availability',
            dataIndex: 'availability',
            width: '10%',
            align: 'center',

            // onFilter: (value, record) => record.availability.indexOf(value) === 0,
            // filters: [
            //     {
            //       text: 'True',
            //       value: 'true',
            //     },
            //     {
            //       text: 'False',
            //       value: 'false',
            //     },
            //   ],
            // 筛选 
              
        },

        {
            title: 'operation',
            align: 'center',
            width: '10%',
            render: (service) => {

                return (
                    <span>
                        <Button
                            type='link'
                            icon={<CommentOutlined />}
                            onClick={() => {
                                memoryUtils.service = service;
                                this.props.history.push('/history/detail/' + service.id);
                            }}
                        >comment
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
                email:'abc@qq.com'
            },
            {
                key: '3',
                service: 'AAA',
                catagory: 'FFF',
                description: 'SDFSFSFSFf',
                area: 'CCC',
                availability: 'false',
                id: 'asdfasdklfjskl',
                email:'abc@qq.com'
            },
            {
                key: '4',
                service: 'John Brown',
                description: 'abcdasdfjaldkf',
                catagory: 'cleaning',
                area: 'london',
                availability: 'true',
                id: 'asdfasdklfjskl',
                email:'abc@qq.com'
            },
            {
                key: '5',
                service: 'John Brown',
                description: 'abcdasdfjaldkf',
                catagory: 'cleaning',
                area: 'london',
                availability: 'true',
                id: 'asdfasdklfjskl',
                email:'abc@qq.com'
            },
            {
                key: '6',
                service: 'John Brown',
                description: 'abcdasdfjaldkf',
                catagory: 'cleaning',
                area: 'london',
                availability: 'true',
                id: 'asdfasdklfjskl',
                email:'abc@qq.com'
            },
            {
                key: '7',
                service: 'John Brown',
                description: 'abcdasdfjaldkf',
                catagory: 'cleaning',
                area: 'london',
                availability: 'true',
                id: 'asdfasdklfjskl',
                email:'abc@qq.com'
            },
        ],
        //假数据
        total: 0 //总页数
    }
}

获取分页获取表格数据
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

    return (
        <>

            <Card
                style={{
                    width: '100%',
                }}

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
}
