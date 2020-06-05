import React, {Component} from 'react';
import {DatePicker, Input, Button, Table, Modal, Select} from 'antd';
const {Option} = Select;
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  initUsers
} from '../../models/admin';
import './users.less';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    }
  }
  componentDidMount() {
    console.log("初始化")
    this.props.initUsers()
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    this.setState({
      datas: this.props.admin.users
    })
  }
    SureDelete() {
        Modal.confirm({
            title: '确定要删除吗?',
            okText: '确定',
            cancelText: '取消'
        })
    }
    render() {  
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
        const {datas} = this.state;
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
                <Table dataSource={datas} columns={columns} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      admin: state.Admin
  }
}

export default connect(mapStateToProps,{
                        initUsers
                      })(withRouter(Users));