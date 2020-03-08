import React, {Component} from 'react';
import {DatePicker, Input, Button, Table, Modal} from 'antd';
import './shsq.less';

class ShspN extends Component {
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
            },
            {
              key: '2',
              username: '胡彦祖',
              updateTime: '2019-2-11',
              title: '西湖区湖底公园1号',
              desc: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '3',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
            },
            {
                key: '4',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                desc: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '5',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
            },
            {
                key: '6',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                desc: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
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
                desc: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '9',
                username: '胡彦斌',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
            },
            {
                key: '10',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                desc: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
            {
                key: '11',
                username: '胡彦祖',
                updateTime: '2019-2-11',
                title: '西湖区湖底公园1号',
                desc: '说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。'
            },
          ];          
          const columns = [
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
              width: '5%'
            },
            {
              title: '发布时间',
              dataIndex: 'updateTime',
              key: 'updateTime',
              width: '5%'
            },
            {
              title: '标题',
              dataIndex: 'title',
              key: 'title',
              width: '8%'
            },
            {
                title: '内容描述',
                dataIndex: 'desc',
                key: 'desc',
                width: '25%',
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
                width: '5%',
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
            <div className="modal3">
                <div className="formContainer">
                    <div className="cont">
                        <div>
                            <label>姓名:</label><Input/>
                        </div>
                        <div className="timeChose">
                            <label>发布时间:</label><DatePicker/>
                        </div>
                        <div>
                            <label>标题:</label><Input/>
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

export default ShspN;