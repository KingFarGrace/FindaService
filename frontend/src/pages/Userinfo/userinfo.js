import React, { Component } from 'react'
import { Card, Button, Select, Input, Table } from 'antd';
// import { reqProducts, reqSearchProducts } from '../../api';

const Option = Select.Option;
const PAGE_SIZE = 4; //默认显示的一页的条数
export default class Userinfo extends Component {
  constructor() {
    super()
    this.state = {
      searchType: 'productName',
      searchName: '',//输入的关键字
      total: 0,//商品总数量
      products: [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
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
    ],//表示商品数据

    }
  }
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        width: 100,
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: "desc"
      },
      {
        title: '价格',
        dataIndex: "price",
        render: price => '¥' + price
      },
      {
        title: '状态',
        render: () => {
          return (
            <span>
              <Button>上架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: (product) => {
          return (
            <span>
              <Button type='link' onClick={() => {
                // 跳转详情页面
                this.props.history.push('/product/detail/' + product._id);
              }}>详情</Button>
              <Button type='link' onClick={() => {
                // 跳转修改页面
                this.props.history.push({
                  pathname: '/product/addUpdate',
                  search:'?productId='+product._id
                });
              }}>修改</Button>
            </span>
          )
        }
      }
    ]
  }
  getProducts = async (pageNum) => {
    const { searchName, searchType } = this.state;
    let result;
    // if (!this.isSearch) {
    //   result = await reqProducts(pageNum, PAGE_SIZE);
    // } else {
    //   // 要搜索
    //   result = await reqSearchProducts({
    //     pageNum,
    //     pageSize: PAGE_SIZE,
    //     searchType,
    //     searchName
    //   })
    // }

    // if (result.status === 0) {
    //   const { list, total } = result.data;
    //   this.setState({
    //     total,
    //     products: list
    //   })
    // }
  }
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    // 获取第一页的商品数据
    this.getProducts(1);
  }
  render() {
    const { searchType, searchName, products, total } = this.state;
    const extra = (
      <Button type='primary' onClick={() => {
        this.props.history.push('/product/addUpdate');
      }}>

        添加商品
      </Button>
    )
    const title = (
      <span>
        <Select value={searchType} style={{ width: 200 }} onChange={value => this.setState({ searchType: value })}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 200, margin: '0 10px' }}
          value={searchName}
          onChange={e => this.setState({ searchName: e.target.value })}
        />
        <Button type='primary' onClick={() => {
          // 搜索的操作
          this.isSearch = true;//表示搜索了
          // 获取搜索的商品
          this.getProducts(1)

        }}>
          搜索
        </Button>

      </span>
    )
    return (
      <Card
        title={title}
        extra={extra}
      >
        <Table
          bordered
          columns={this.columns}
          dataSource={products}
          rowKey='_id'

          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        >

        </Table>

      </Card>
    )
  }
}
