import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Table from '../../../../components/Tables';
import { icon, common } from '../../../../images/index';
import {
    initMyfiles,
    pasteFile,
    handleNewName,
    toFile,
    deleteFile,
    shearFile,
    createFile,
    uploadFile
} from '../../models/files';
import '../files.less';

class Myfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfilesData: [],
            location: ''
        }
    }
    componentDidMount() {
        let {curParentid} = this.props.myfiles;
        this.initMyfiles(curParentid);
    }
    componentWillReceiveProps(nextprops) {
        let location = '';
        let fileLists = this.props.myfiles.fileLists;
        for (let i = 0; i < fileLists.length; i++) {
            location += '/' + fileLists[i].filename;
        }
        this.setState({
            location: location,
            myfilesData: this.props.myfiles.myfilesData
        })
    }
    initMyfiles = (parentid,filename) => {
        let userid = sessionStorage.getItem('userid');
        this.props.initMyfiles({userid: userid, parentid: parentid,filename:filename});
    }
    pasteFile = (copyParentid,copySystemid,curParentid) => { // 粘贴文件
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        this.props.pasteFile({copyParentid:copyParentid,copySystemid:copySystemid, curParentid:curParentid, userid: userid, username:username,hasShare:this.props.myfiles.hasShare});
    }
    handleNewName = (filename,systemid) => { // 重命名
        let userid = sessionStorage.getItem('userid');
        this.props.handleNewName({filename:filename,userid:userid,systemid:systemid});
    }
    toFile(systemid) { // 文件栏跳转
        let userid = sessionStorage.getItem('userid');
        this.props.toFile({parentid:systemid,userid:userid})
    }
    deleteFile = (systemid) => { // 删除文件
        let userid = sessionStorage.getItem('userid');
        let fileLists = this.props.myfiles.fileLists;
        let location = '';
        for (let i = 0; i < fileLists.length; i++) {
            location += '/'+fileLists[i]['filename'];
        }
        this.props.deleteFile({userid:userid,systemid:systemid,location:location});
    }
    shearFile = () => { // 剪切文件
        this.props.shearFile()
    }
    createFile = () => { // 新建文件夹
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        let parentid = this.props.myfiles.curParentid;
        this.props.createFile({parentid:parentid,userid:userid,username:username});
    }
    uploadFile = (params) => { // 上传文件
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        let parentid = this.props.myfiles.curParentid;
        if (!params) {
            //this.props.uploadFile()
            console.log(params)
        }
        console.log("上传啦啦啦拉拉啊")
        params = Object.assign(params,{userid:userid},{username:username},{parentid:parentid})
        this.props.uploadFile(params);
    }
    render() {
        let {myfilesData,location} = this.state;
        let {curParentid,fileLists} = this.props.myfiles;
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
                dataIndex: 'filetype',
                key: 'filetype',
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
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'createtime',
                width: '12%',
            },
        ]
        let dataSource = [
            {
                filename: '文件夹',
                filetype: 0,
                filesize: '12KB',
                createtime: '2019-8-17 12:54:12'
            },
            {
                filename: '文件夹1',
                filetype: 1,
                filesize: '122KB',
                createtime: '2019-8-17 12:54:12'
            }
        ]
        return (
            <Fragment>
                <div className='header'>
                    <div className='backFront'>
                        <button className='left'></button>
                        <button className='right'></button>
                    </div>
                    <div className='route'>
                        <div className='log borderR'>
                            <img src={common.house.default}></img>
                        </div>
                        <div className='line'>
                            <img src={icon.favorites2.default} style={{width: '14px'}}></img>
                            <ul>
                                {
                                    fileLists.map(item=>{
                                        return (
                                            <li className='hasFile' onClick={()=>this.toFile(item.systemid)}>
                                                {item.filename}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='return right'>
                            <img src={common.arrow.default}></img>
                        </div>
                        <div className='like right borderR'>
                            <img src={common.favorites.default}></img>
                        </div>
                    </div>
                    <div className='find'>
                        <input type="search"></input>
                        <button>
                            <img src={common.find.default} style={{width: '80%'}}></img>
                        </button>
                    </div>
                </div>
                <div className='container'>
                    <div className='lists'>
                        <div className='createFiles' onClick={this.createFile}>
                            <img src={common.file.default}></img>
                            新建文件夹
                            <button></button>
                        </div>
                        <div className='operation'>
                            <img src={common.arrow2.default}></img>
                            上传
                            <button></button>
                        </div>
                    </div>
                    <div className='tables'>
                        <Table 
                            columns={columns} 
                            dataSource={myfilesData} 
                            initMyfiles={this.initMyfiles} 
                            pasteFile={this.pasteFile}
                            curParentid={curParentid}
                            handleNewName={this.handleNewName}
                            deleteFile={this.deleteFile}
                            shearFile={this.shearFile}
                            location={location}
                            createFile={this.createFile}
                            uploadFile={this.uploadFile}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        myfiles: state.Myfiles
    }
}

export default connect(mapStateToProps,{
                                        initMyfiles,
                                        pasteFile,
                                        handleNewName,
                                        toFile,
                                        deleteFile,
                                        shearFile,
                                        createFile,
                                        uploadFile
                                    })(withRouter(Myfiles));