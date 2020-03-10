import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import DustbinTable from '../../../../components/DustbinTable';
import { icon, common } from '../../../../images/index';
import {
    initDustbin,
    deleteDusbin,
    reductionDustbin,
    findDustFile,
} from '../../models/files';

import '../files.less';

class Dustbin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dustbinData: [],
        }
    }
    componentDidMount() {
        this.initDustbin();
    }
    initDustbin = () => { // 初始化垃圾箱
        let userid = sessionStorage.getItem('userid');
        this.props.initDustbin({userid: userid});
    }
    deleteDustbin = (systemid) => { // 彻底删除
        let userid = sessionStorage.getItem('userid');
        this.props.deleteDusbin({userid: userid,systemid: systemid})
    }
    reductionDustbin = (systemid) => { // 还原数据
        let userid = sessionStorage.getItem('userid');
        this.props.reductionDustbin({userid: userid, systemid: systemid});
    }
    findFile(e) { // 寻找文件
        let value = e.target.value;
        console.log(value)
        let userid = sessionStorage.getItem('userid');
        this.props.findDustFile({filename: value,userid: userid});
    }
    componentWillReceiveProps(nextprops) {
        this.setState({
            dustbinData: this.props.dustbin.dustbinData
        })
        console.log(nextprops)
    }
    render() {
        let {dustbinData} = this.state;
        let columns  = [
            {
                title: '名称',
                dataIndex: 'filename',
                key: 'filename',
                width: '15%',
                hasImg: true
            },
            {
                title: '类型',
                dataIndex: 'filetype_cn',
                key: 'filetype_cn',
                width: '5%',
            },
            {
                title: '大小',
                dataIndex: 'filesize',
                key: 'filesize',
                width: '6%',
                right: true,
            },
            {
                title: '用户',
                dataIndex: 'username',
                key: 'username',
                width: '10%',
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'createtime',
                width: '12%',
            },
            {
                title: '删除时间',
                dataIndex: 'deletetime',
                key: 'deletetime',
                width: '12%',
            },
            {
                title: '文件位置',
                dataIndex: 'location',
                key: 'location',
                width: '12%',
            },
        ]
        return (
            <Fragment>
                <div className='header'>
                    <div className='route' style={{marginLeft: '10px'}}>
                        <div className='log borderR'>
                            <img src={common.house.default}></img>
                        </div>
                        <div className='line'>
                            <img src={icon.dustbin.default} style={{width: '14px'}}></img>
                            <ul>
                                <li className='hasFile'>
                                    垃圾箱
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='find'>
                        <input type="search" onChange={(e)=>this.findFile(e)}></input>
                        <button>
                            <img src={common.find.default} style={{width: '80%'}}></img>
                        </button>
                    </div>
                </div>
                <div className='container'>
                     <div className='lists' style={{display:'flex', alignItems:'center', fontSize: '12px', paddingLeft: '10px'}}>
                        <span style={{color: 'red'}}>*</span>超过30天自动清除
                    </div>
                    <div className='tables'>
                        <DustbinTable
                            columns={columns}
                            dataSource={dustbinData}
                            dustbin={true}
                            initDustbin={this.initDustbin}
                            deleteDustbin={this.deleteDustbin}
                            reductionDustbin={this.reductionDustbin}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dustbin: state.Dustbin
    }
}

export default connect(mapStateToProps,{
    initDustbin,
    deleteDusbin,
    reductionDustbin,
    findDustFile,
})(Dustbin);