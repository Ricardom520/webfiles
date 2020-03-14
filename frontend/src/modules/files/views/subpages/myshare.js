import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Table from '../../../../components/Tables';
import Block from '../../../../components/Block';
import { icon, common } from '../../../../images/index';
import {
    initMyshares,
    toFile,
    findFile,
    backFile,
    frontFile,
    cancelShare,
} from '../../models/files';
import '../files.less';

class Myshare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mySharesData: [],
            share: true,
            fbType: 0,
        }
    }
    componentDidMount() {
        let {curParentid} = this.props.myshares;
        this.initMyshares(curParentid);
    }
    initMyshares = (parentid,filename,favour) => {
        let userid = sessionStorage.getItem('userid');
        console.log(favour)
        this.props.initMyshares({userid: userid, parentid: parentid,filename:filename,});
    }
    toFile(systemid) { // 文件栏跳转
        let userid = sessionStorage.getItem('userid');
        this.props.toFile({parentid:systemid,userid:userid})
    }
    downloadFile = (systemid,filename,filetype_cn) => { // 下载文件
        let userid = sessionStorage.getItem('userid');
        let that = this;
        let params = Object.assign({userid:userid,systemid:systemid});
        let download = this.download;
        download.download = filename +"."+filetype_cn;
        downloadFileRequest(params)
            .then(res=>{
                console.log(res)
                let blob = new Blob([this.b64toBlob(res.content)])
                download.href = URL.createObjectURL(blob);
                
                download.click();
                console.log(download)
            })
    }
    changeSort = (type) => {
        this.setState({
            fbType: type
        })
    }
    b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        
        let byteCharacters = atob(b64Data.substring(b64Data.indexOf(',')+1));
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset,offset+sliceSize);
            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
    findFile(e) { // 寻找文件
        let value = e.target.value;
        console.log(value)
        let parentid = this.props.myfiles.curParentid;
        let userid = sessionStorage.getItem('userid');
        this.props.findFile({filename: value,parentid: parentid, userid: userid});
    }
    backFile() { // 后退
        if (Object.assign(this.props.myfiles.fileLists).length) {
            console.log(this.props.myfiles)
            //this.props.backFile();
            let fileLists = this.props.myfiles.fileLists;
            let userid = sessionStorage.getItem('userid');
            for (let i = fileLists.length - 2; i >=0; i--) {
                console.log(i)
                console.log(fileLists[i])
                this.props.backFile({parentid: fileLists[i].systemid, userid: userid});
                break;
            }
        } else {
            return;
        }
    }
    frontFile() { // 前进
        console.log(this.props.myfiles)
        if (this.props.myfiles.backFile.systemid) {
            let userid = sessionStorage.getItem('userid');
            this.props.frontFile({userid:userid, parentid: this.props.myfiles.backFile.systemid})
        }
    }
    cancelShare = (systemid) => { // 取消分享
        let userid = sessionStorage.getItem('userid');
        this.props.cancelShare({userid:userid,systemid:systemid});
    }
    componentWillReceiveProps(nextprops) {
        console.log(this.props)
        this.setState({
            mySharesData: this.props.myshares.mysharesData,
        })
    }
    render() {
        let {mySharesData,location,content,favorited,fbType,share} = this.state;
        let {curParentid,fileLists} = this.props.myshares;
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
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'createtime',
                width: '12%',
            },
            {
                title: '分享时间',
                dataIndex: 'sharetime',
                key: 'createtime',
                width: '12%',
            },
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
                                <li className='hasFile'>
                                    收藏夹
                                </li>
                                <li className='hasFile'>
                                    李欢
                                </li>
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
                        <div className='createFiles'>
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
                    {
                        fbType ?
                            <Block
                                dataSource={mySharesData} 
                                initData={this.initMyshares} 
                                curParentid={curParentid}
                                handleNewName={this.handleNewName}
                                downloadFile={this.downloadFile}
                                changeSort={this.changeSort}
                                cancelShare={this.cancelShare}
                            />
                             : <div className='tables'>
                            <Table 
                                columns={columns} 
                                dataSource={mySharesData} 
                                initData={this.initMyshares} 
                                curParentid={curParentid}
                                handleNewName={this.handleNewName}
                                downloadFile={this.downloadFile}
                                changeSort={this.changeSort}
                                share={share}
                                cancelShare={this.cancelShare}
                            />
                        </div>
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        myshares: state.Myshare
    }
}

export default connect(mapStateToProps,{
    initMyshares,
    toFile,
    findFile,
    backFile,
    frontFile,
    cancelShare,
})(Myshare);