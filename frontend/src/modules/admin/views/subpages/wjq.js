import React, {Component} from 'react';
import {DatePicker, Input, Button, Table, Modal, Select} from 'antd';
import './wjq.less';
const {Option} = Select;

class Wjq extends Component {
    SureDelete() {
        Modal.confirm({
            title: '确定要删除吗?',
            okText: '确定',
            cancelText: '取消'
        })
    }
    render() {
        const dataSource = [
            {
                key: '1',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '2',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '3',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '4',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '5',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '6',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '7',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
            },
            {
                key: '8',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '9',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '10',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
            {
                key: '11',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                type: 'doc',
                size: '123MB'
            },
          ];          
          const columns = [
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
              width: '15%'
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              key: 'updateTime',
              width: '15%'
            },
            {
              title: '文件名',
              dataIndex: 'title',
              key: 'title',
              width: '15%'
            },
            {
                title: '文件种类',
                dataIndex: 'type',
                key: 'type',
                width: '15%',
            },
            {
                title: '文件大小',
                dataIndex: 'size',
                key: 'size',
                width: '15%',
            },
            {
                title: '操作',
                width: '15%',
                render: (text) =>{
                    return (
                        <div>
                            <a>查看</a> | <a onClick={()=>this.SureDelete()}>删除</a>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="modal4">
                <div className="formContainer">
                    <div className="cont">
                        <div>
                            <label>用户名:</label><Input/>
                        </div>
                        <div className="timeChose">
                            <label>更新时间:</label><DatePicker/>
                        </div>
                        <div>
                            <label>文件名:</label><Input/>
                        </div>
                        <div>
                            <label>文件种类:</label>
                            <Select>
                                <Option value="01">word文档</Option>
                                <Option value="02">图片</Option>
                                <Option value="03">PDF</Option>
                                <Option value="04">txt文本</Option>
                                <Option value="05">PPT</Option>
                                <Option value="06">Excel</Option>
                                <Option value="07">html文件</Option>
                                <Option value="08">exe文件</Option>
                                <Option value="09">压缩文件</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="sub">
                        <Button type="primary">查询</Button>
                        <Button>重置</Button>
                    </div>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

export default Wjq;