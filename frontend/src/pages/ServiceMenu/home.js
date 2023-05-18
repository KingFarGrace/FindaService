import React, { Component } from 'react'
import { Modal, Button, Card, Input, Select, Space, Table, message } from 'antd'
import { useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import Link from 'antd/es/typography/Link';
import { reqServices, reqSearchServices } from '../../api';
import { useHistory } from 'react-router-dom'
import Subscribe from './subscribe';
import memoryUtils from '../../utils/memoryUtils';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const PAGE_SIZE = 5;
const { Search } = Input;
const API_KEY = "AIzaSyBNO-nRdnbJAAleMMME8xM3V_ZgZs_BSws";
const defaultCenter = {
    lat: 37.4219999,
    lng: -122.0840575,
};
const defaultZoom = 10;
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
                align: 'center',
                render: (area, service) => (
                    <button
                    style={{
                        backgroundColor:'white',
                        color : 'black',
                        margin : 5,
                        border: '1px solid red',
                        borderColor: 'black',
                      }}
                        onClick={async () => {
                            if (!area) {
                                console.log('Area is not specified');
                                return;
                            }

                            try {
                                const response = await fetch(
                                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                                        area
                                    )}&key=${API_KEY}`
                                );

                                if (!response.ok) {
                                    alert("wrong address")
                                    throw new Error('Network response was not ok');
                                }

                                const data = await response.json();
                                if (data.status !== 'OK') {
                                    alert("wrong address")
                                    throw new Error('Failed to geocode the area');
                                }
                                else{
                                const d = JSON.stringify(data)
                                console.log(d)
                                const location = data.results[0].geometry.location;

                                this.setState({
                                    map: { center: location, zoom: defaultZoom },
                                    marker: { position: location },
                                    apiLoaded: true,
                                    mapVisible: true
                                });
                            }
                            } catch (error) {
                                console.error('Failed to load map:', error);
                            }
                        }}
                    >
                        {area}
                    </button>
                ),
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
                                    console.log('看这里' + memoryUtils.service._id);
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
            ],
            map: { center: defaultCenter, zoom: defaultZoom },
            marker: null,
            apiLoaded: false,
            //假数据
            total: 0,
            modalVisible: false,
            mapVisible: false //总页数
        }
    }
    toggleMapModal = () => {
        this.setState(prevState => ({ mapVisible: !prevState.mapVisible }));
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
        } else {
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
        const { services, total, map, marker } = this.state;
        const mapModal = (
            <Modal
                title="Map View"
                visible={this.state.mapVisible}
                onOk={this.toggleMapModal}
                onCancel={this.toggleMapModal}
            >
                <LoadScript googleMapsApiKey={API_KEY} onLoad={() => this.setState({ apiLoaded: true })}>
                    {this.state.apiLoaded && (
                        <GoogleMap
                            mapContainerStyle={{ width: "400px", height: "300px" }}
                            center={this.state.map.center}
                            zoom={this.state.map.zoom}
                        >
                            {this.state.marker && (
                                <Marker position={this.state.marker.position} />
                            )}
                        </GoogleMap>
                    )}
                </LoadScript>
            </Modal>
        );
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

                {mapModal}
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
                            total: total * PAGE_SIZE,
                            onChange: this.getService
                        }}
                    // onRow={(service) => ({
                    //     onClick: async () => {
                    //       // 使用 Google Maps Geocoding API 将地名转换为经纬度坐标
                    //       const response = await fetch(
                    //         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    //           service.area
                    //         )}&key=${API_KEY}`
                    //       );
                    //       const data = await response.json();
                    //       const d = JSON.stringify(data)
                    //       console.log(d)
                    //       const location = data.results[0].geometry.location;

                    //       // 更新地图和标记的状态
                    //       this.setState({
                    //         map: { center: location, zoom: defaultZoom },
                    //         marker: { position: location },
                    //       });
                    //     },
                    //   })}
                    />
                </Card>


            </>
        );
    }
};
