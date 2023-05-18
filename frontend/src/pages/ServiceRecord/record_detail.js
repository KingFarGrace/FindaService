import { Card, Button, Input, Modal, message } from 'antd'
import React, { Component } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqSubscribeService, reqUpdateRequest, reqUserInfo } from '../../api';

const { TextArea } = Input;
const { confirm } = Modal;

export default class record_detail extends Component {

    onChange = (e) => {
        console.log(e.target.value);
        this.inputValue = e.target.value
    };

    onClick = () => {
        confirm({
            title: 'Do you want to update your request?',
            onOk: () => {
                this.onSubmit();
                this.props.history.replace('/record');
                //前后端连上把注释去掉

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onSubmit = async () => {
        const content = this.inputValue;
        let request = memoryUtils.request
        const _id = request._id
        const status = "pending"
        const result_json = await reqUpdateRequest(_id, content, status);
        console.log("result_json: " + JSON.stringify(result_json))


        const res = JSON.parse(result_json.data);
        if (res.code == 300) { message.success('submitted successfully'); }
        else{message.error(res.msg)}
        
    }


    render() {
        const title = (

            <span>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type='link'
                    onClick={() => {
                        this.props.history.goBack();
                    }}>
                </Button>
                My service request
            </span>

        )



        return (
            <Card
                title={title}
            >
                <>

                    <Card
                        title='add some description of your requirement'
                    >
                        <TextArea
                            placeholder="add some description of your requirement "
                            allowClear
                            style={{
                                height: 200,
                            }}
                            onChange={this.onChange}
                        />
                        <br />
                        <br />
                        <Button
                            type='primary'
                            onClick={this.onClick}
                        >
                            submit
                        </Button>
                    </Card>
                </>
            </Card>
        )
    }
}
