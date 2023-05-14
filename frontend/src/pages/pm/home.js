import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices } from '../../api';
import { useHistory } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils';
import providerUtils from '../../utils/providerUtils';

const PAGE_SIZE = 5;
const { Search } = Input;


export default class servicemenu extends Component {
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
            },

            {
                title: 'operation',
                align: 'center',
                width: '10%',
                render: (service) => {
                    let operationText = service.availability === 'true' ? 'Details' : 'Check';
                    return (
                        <span>
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
                                    memoryUtils.service = service;
                                    // console.log(service.availability);
                                    // const operationPath = service.availability === 'true' ? '/manager/service/detail/' : '/manager/service/check/';
                                    // // console.log(this.props.history);
                                    // //跳转详情页面
                                    
                                    // memoryUtils.service = service;
                                    // console.log('看这里'+ memoryUtils.service);
                                    this.props.history.push('/manager/providermanage/detail/' + service.id);
                                }}
                            >Details
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
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'false',
                    id: 'asdfasdklfjskl213'
                    //每个数据一个id
                },
                {
                    key: '2',
                    catagory: 'cleaning',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    area: 'london',
                    availability: 'false',
                    id: 'asdasdfaslkfsadf215'
                },
                {
                    key: '3',
                    service: 'AAA',
                    catagory: 'FFF',
                    description: 'SDFSFSFSFf',
                    area: 'CCC',
                    availability: 'false',
                },
                {
                    key: '4',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',

                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                },
                {
                    key: '5',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'false',
                },
                {
                    key: '6',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cleaning',
                    area: 'london',
                    availability: 'true',
                },
                {
                    key: '7',
                    service: 'John Brown',
                    description: 'abcdasdfjaldkf',
                    catagory: 'cafaning',
                    area: 'london',
                    availability: 'true',
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
        const extra = (
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
            type='primary' onClick={() => {
      
                this.props.history.push('/manager/providermanage/');
              }}
              >
        
                Delate
              </Button>
            <Button 
             style={{
                backgroundColor:'white',
                color : 'black',
                margin : 5,
                border: '1px solid red',
                borderColor: 'black',
              }}
            type='primary' onClick={() => {
      
              this.props.history.push('/manager/providermanage/');
            }}
            >
      
              Back
            </Button>
            </div>
          )
        const title = (<div>
            Provider Id: {providerUtils.provider.id}
        </div>
        )
        //     <span className='abc'>
        //         <Space direction="horizontal"
        //         >
        //             <Select

        //                 onChange={this.handleSelect}
        //                 showSearch
        //                 style={{
        //                     width: 200,
        //                 }}
        //                 placeholder="Search by category"
        //                 optionFilterProp="children"
        //                 filterOption={(input, option) => (option?.label ?? '').includes(input)}
        //                 filterSort={(optionA, optionB) =>
        //                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        //                 }
        //                 options={[
        //                     {
        //                         value: 'All',
        //                         label: 'All',
        //                     },
        //                     {
        //                         value: 'Cleaning',
        //                         label: 'Cleaning',
        //                     },
        //                     {
        //                         value: 'Babysitting',
        //                         label: 'Babysitting',
        //                     },
        //                     {
        //                         value: 'Pest Control',
        //                         label: 'Pest Control',
        //                     },
        //                     {
        //                         value: 'Plumbing maintenance',
        //                         label: 'Plumbing maintenance',
        //                     },
        //                     {
        //                         value: 'Electrical maintenance',
        //                         label: 'Electrical maintenance',
        //                     },
        //                     {
        //                         value: 'Beauty',
        //                         label: 'Beauty',
        //                     },
        //                 ]}
        //             />

        //             <Search
        //                 onInput={this.handleInput}

        //                 className='city_search'
        //                 placeholder="search by city"
        //                 allowClear
        //                 enterButton="Search"
        //                 size="medium"
        //                 onSearch={this.getSelectandInput}
        //             // onSearch={() => {
        //             //     this.isSearch = true;
        //             //     //搜索标识符，true就搜索过了
        //             //     this.getService(1)
        //             // }}
        //             />
        //         </Space>
        //     </span>
        // )
        return (
            <>

                <Card
                    style={{
                        width: '100%',
                    }}
                    title={title}
                    extra={extra}
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
