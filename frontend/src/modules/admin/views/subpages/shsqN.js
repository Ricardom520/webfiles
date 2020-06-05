import React, {Component} from 'react';
import {DatePicker, Input, Button, Table, Modal} from 'antd';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import './shsq.less';
import {
  initLiveNo,
  deleteNoLive,
  passLive,
} from '../../models/admin';

class ShspN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    }
  }
  componentDidMount() {
    console.log("初始化")
    this.props.initLiveNo()
  }
  SureDelete(shareid) {
      Modal.confirm({
          title: '确定不通过吗?',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            console.log(shareid)
            this.props.deleteNoLive({shareid: shareid})
          }
      })
  }
  pass(shareid) {
    Modal.confirm({
      title: '确定要通过吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.passLive({shareid: shareid})
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    this.setState({
      datas: this.props.admin.liveno
    })
  }
  show(shareid) {
    console.log(shareid)
    this.props.history.push(`/live/?id=${shareid}`)
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
            console.log(text)
            return (
              <div>
                <a onClick={()=>this.show(text.shareid)}>查看</a> | <a onClick={()=>this.pass(text.shareid)}>通过</a> | <a onClick={()=>this.SureDelete(text.shareid)}>不通过</a>
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
                        initLiveNo,
                        deleteNoLive,
                        passLive,
                      })(withRouter(ShspN));