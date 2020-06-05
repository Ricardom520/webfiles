import React, {Component} from 'react';
import {DatePicker, Input, Button, Table, Modal} from 'antd';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import './shsq.less';
import {
  initIt
} from '../../models/admin';

class Itsq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    }
  }
  componentDidMount() {
    console.log("初始化")
    this.props.initIt()
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    this.setState({
      datas: this.props.admin.software
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
          width: '5%'
        },
        {
          title: '发布时间',
          dataIndex: 'sharetime',
          key: 'sharetime',
          width: '5%'
        },
        {
          title: '标题',
          dataIndex: 'filename',
          key: 'filename',
          width: '8%'
        },
        {
          title: '内容描述',
          dataIndex: 'disc',
          key: 'disc',
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
      const {datas} = this.state;
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
  initIt
                      })(withRouter(Itsq));