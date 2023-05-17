import React, { Component } from 'react'
import { Button, Card, Input, Select, Space, Table } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices,reqProviders, sendRequest,reqMyRequest, reqUnProvider, acceptPro, reqRegister, reqRequest, updateRequest, removePro } from '../../api';
import { useHistory } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils';
const PAGE_SIZE = 5;
const { Search } = Input;


export default class servicemenu extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: 'Service Provider Name',
                dataIndex: 'username',
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
                                onClick={async() => {
                                    console.log("s撒打算"+storageUtils.getUser().password);
                                    console.log("的撒覅就"+provider.email);
                                    let result = await reqRequest(provider.email)
      //  const response = JSON.stringify(result.data);
                                    const user = JSON.parse(result.data)
                                    const id = user.return_obj[0]._id
                                    const re = await updateRequest(id,"your account is passed","finished")
                                    //const request = await sendRequest(storageUtils.getUser().email,provider.name,null,"Update your account","");
                                    const req = await acceptPro(storageUtils.getUser().password,provider.email);
                                    this.getService()
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
                                onClick={async() => {
                                    console.log(storageUtils.getUser().email);
                                    console.log(provider.name);
                                    let result = await reqRequest(provider.email)
      //  const response = JSON.stringify(result.data);
                                    const user = JSON.parse(result.data)
                                    const id = user.return_obj[0]._id
                                    const re = await updateRequest(id,"update the user's information","finished")
                                    this.setState({provider:user.return_obj})
                                    console.log("雪豹" + user.return_obj[0].username);
                    
                                    const request = await sendRequest(storageUtils.getUser().email,provider.name,null,"Update your account","Updated");
                                    this.getService()
                                }}
                            >Needs for Update
                            </Button>
                            {/* <Button
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
                                    console.log("awed我"+storageUtils.getUser().password);
                                    console.log("打"+provider.email);
                                    let result = await reqRequest(provider.email)
      //  const response = JSON.stringify(result.data);
                                    const user = JSON.parse(result.data)
                                    const id = user.return_obj[0]._id
                                    const re = await updateRequest(id,"your account was rejected","finished")
                                    this.setState({provider:user.return_obj})
                                    console.log("雪豹" + user.return_obj[0].username);
                                    const req = await removePro(storageUtils.getUser().password,provider.email)
                                    const request = await sendRequest(storageUtils.getUser().email,provider.name,null,"Your account was rejected","Rejected");
                                    this.getService()
                                }}
                            >Refuse
                            </Button> */}
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
            ],
            //假数据
            total: 0 //总页数
        }
    }

    获取分页
    getService = async () => {

        let result = await reqUnProvider();
      //  const response = JSON.stringify(result.data);
        const user = JSON.parse(result.data)
        this.setState({provider:user.return_obj})
        console.log("雪豹" + user.return_obj[0].username);
       
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
        let {provider, total } = this.state;
        // const onSearch = (value) => {
        //     console.log(value)
        //     console.log(this.state.selectType)
        // };
        // const {selectType} = this.state;
        //provider = provider.filter(item => item.status === 'new account');
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
