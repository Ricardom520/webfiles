import React, {Component} from 'react';
import {DatePicker, Input, Button, Table, Modal, Select} from 'antd';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  initFiles
} from '../../models/admin';
import './wjq.less';
const {Option} = Select;

class Wjq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    }
  }
  componentDidMount() {
    console.log("初始化")
    this.props.initFiles()
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    this.setState({
      datas: this.props.admin.files
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
              width: '15%'
            },
            {
              title: '更新时间',
              dataIndex: 'modifytime',
              key: 'modifytime',
              width: '15%'
            },
            {
              title: '文件名',
              dataIndex: 'filename',
              key: 'filename',
              width: '15%'
            },
            {
                title: '文件种类',
                dataIndex: 'filetype_cn',
                key: 'filetype_cn',
                width: '15%',
            },
            {
                title: '文件大小',
                dataIndex: 'filesize',
                key: 'filesize',
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
        const {datas} = this.state;
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
                        initFiles
                      })(withRouter(Wjq));