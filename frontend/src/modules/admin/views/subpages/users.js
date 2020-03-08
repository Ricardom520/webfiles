import React, {Component} from 'react';
import {DatePicker, Input, Button, Table, Modal, Select} from 'antd';
const {Option} = Select;
import './users.less';

class Users extends Component {
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
              username: '胡彦斌1',
              createTime: '2019-2-11',
              desc: '西湖区湖底公园1号',
              sex: '男',
              phone: 10086,
              email: '15456217@qq.com',
            },
            {
              key: '2',
              username: '胡彦祖',
              createTime: '2019-2-11',
              desc: '西湖区湖底公园1号',
              sex: '男',
              phone: 10086,
              email: '15456217@qq.com',
              address: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '3',
                username: '胡彦斌',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '男',
                phone: 10086,
                email: '15456217@qq.com',
            },
            {
                key: '4',
                username: '胡彦祖',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '女',
                phone: 10086,
                email: '15456217@qq.com',
                address: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '5',
                username: '胡彦斌',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '男',
                phone: 10086,
                email: '15456217@qq.com',
            },
            {
                key: '6',
                username: '胡彦祖',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '女',
                phone: 10086,
                email: '15456217@qq.com',
                address: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '7',
                username: '胡彦斌',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '男',
                phone: 10086,
                email: '15456217@qq.com',
            },
            {
                key: '8',
                username: '胡彦祖',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '男',
                phone: 10086,
                email: '15456217@qq.com',
                address: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '9',
                username: '胡彦斌',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '女',
                phone: 10086,
                email: '15456217@qq.com',
            },
            {
                key: '10',
                username: '胡彦祖',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '男',
                phone: 10086,
                email: '15456217@qq.com',
                address: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '11',
                username: '胡彦祖',
                createTime: '2019-2-11',
                desc: '西湖区湖底公园1号',
                sex: '男',
                phone: 10086,
                email: '15456217@qq.com',
                address: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
          ];          
          const columns = [
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
              width: '8%'
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime',
              width: '12.5%'
            },
            {
              title: '性别',
              dataIndex: 'sex',
              key: 'sex',
              width: '8%'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                width: '12.5%',
            },
            {
                title: '联系电话',
                dataIndex: 'phone',
                key: 'phone',
                width: '12.5%',
            },
            {
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
                width: '17%',
                onCell: () => {
                    return {
                        style: {
                            maxWidth: 150,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow:'ellipsis',
                            cursor:'pointer'
                        }
                    }
                },
            },
            {
                title: '家庭地址',
                dataIndex: 'address',
                key: 'address',
                width: '17%',
                onCell: () => {
                    return {
                        style: {
                            maxWidth: 150,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow:'ellipsis',
                            cursor:'pointer'
                        }
                    }
                },
            },
            {
                title: '操作',
                width: '12.5%',
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
            <div className="modal6">
                <div className="formContainer">
                    <div className="cont">
                        <div>
                            <label>姓名:</label><Input/>
                        </div>
                        <div className="timeChose">
                            <label>创建时间:</label><DatePicker/>
                        </div>
                        <div>
                            <label>性别:</label>
                            <Select>
                                <Option value="01">男</Option>
                                <Option value="02">女</Option>
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

export default Users;