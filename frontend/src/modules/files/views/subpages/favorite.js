import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import Table from '../../../../components/Tables';
import { icon, common } from '../../../../images/index';
import {
    initFavourite,
    pasteFile,
    handleNewName,
    toFileFavour,
    deleteFile,
    shearFile,
    createFile,
    uploadFile,
    findFileFavour,
    backFileFavour,
    frontFile,
    cancelToMyfile,
} from '../../models/files';
import '../files.less';

class Favour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteData: [],
            location: '',
            favour: true,
        }
    }
    componentDidMount() {
        let {curParentid} = this.props.favorites;
        this.initFavourite(curParentid);
    }
    initFavourite = (parentid,filename,) => {
        let userid = sessionStorage.getItem('userid');
        this.props.initFavourite({userid: userid, parentid: parentid, filename:filename});
    }
    pasteFile = (copyParentid,copySystemid,curParentid) => { // 粘贴文件
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        this.props.pasteFile({copyParentid:copyParentid,copySystemid:copySystemid, curParentid:curParentid, userid: userid, username:username,hasShare:this.props.favorites.hasShare});
    }
    handleNewName = (filename,systemid) => { // 重命名
        let userid = sessionStorage.getItem('userid');
        this.props.handleNewName({filename:filename,userid:userid,systemid:systemid});
    }
    toFileFavour(systemid) { // 文件栏跳转
        let userid = sessionStorage.getItem('userid');
        this.props.toFileFavour({parentid:systemid,userid:userid})
    }
    deleteFile = (systemid) => { // 删除文件
        let userid = sessionStorage.getItem('userid');
        let fileLists = this.props.favorites.fileLists;
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
        let parentid = this.props.favorites.curParentid;
        this.props.createFile({parentid:parentid,userid:userid,username:username});
    }
    uploadFile = (params,e) => { // 上传文件
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        let parentid = this.props.favorites.curParentid;
        if (!params) {
            //this.props.uploadFile()
            console.log(params)
        }
        console.log("上传啦啦啦拉拉啊")
        params = Object.assign(params,{userid:userid},{username:username},{parentid:parentid})
        this.props.uploadFile(params);
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
        let parentid = this.props.favorites.curParentid;
        let userid = sessionStorage.getItem('userid');
        this.props.findFileFavour({filename: value,parentid: parentid, userid: userid});
    }
    backFile() { // 后退
        if (Object.assign(this.props.favorites.fileLists).length) {
            console.log(this.props.favorites)
            //this.props.backFile();
            let fileLists = this.props.favorites.fileLists;
            let userid = sessionStorage.getItem('userid');
            for (let i = fileLists.length - 2; i >=0; i--) {
                console.log(i)
                console.log(fileLists[i])
                this.props.backFileFavour({parentid: fileLists[i].systemid, userid: userid});
                break;
            }
        } else {
            return;
        }
    }
    frontFile() { // 前进
        console.log(this.props.favorites)
        if (this.props.favorites.backFile.systemid) {
            let userid = sessionStorage.getItem('userid');
            this.props.frontFile({userid:userid, parentid: this.props.favorites.backFile.systemid})
        }
    }
    cancelToMyfile = (systemid,filetype) => {
        let userid = sessionStorage.getItem('userid');
        this.props.cancelToMyfile({systemid:systemid,userid:userid,filetype:filetype});
    }
    componentWillReceiveProps(nextprops) {
        let location = '';
        let fileLists = this.props.favorites.fileLists;
        for (let i = 0; i < fileLists.length; i++) {
            location += '/' + fileLists[i].filename;
        }
        this.setState({
            location: location,
            favoriteData: this.props.favorites.favoriteData
        })
        console.log(nextprops)
    }
    render() {
        let {favoriteData,location,content,favour} = this.state;
        let {curParentid,fileLists} = this.props.favorites;
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
        ]
        return (
            <Fragment>
                <div className='header'>
                    <div className='backFront'>
                        <button className={Object.keys(this.props.favorites.fileLists).length>1?'left active': 'left'} onClick={()=>this.backFile()}></button>
                        <button className={Object.keys(this.props.favorites.backFile).length>1?'right active': 'right'} onClick={()=>this.frontFile()}></button>
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
                                            <li className='hasFile' onClick={()=>this.toFileFavour(item.systemid)}>
                                                {item.filename}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='return right' onClick={()=>this.backFile()}>
                            <img src={common.arrow.default}></img>
                        </div>
                        <div className='like right borderR'>
                            <img src={icon.favorited.default}></img>
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
                        <Table 
                            columns={columns} 
                            dataSource={favoriteData} 
                            initData={this.initFavourite} 
                            pasteFile={this.pasteFile}
                            curParentid={curParentid}
                            handleNewName={this.handleNewName}
                            deleteFile={this.deleteFile}
                            shearFile={this.shearFile}
                            location={location}
                            createFile={this.createFile}
                            uploadFile={this.uploadFile}
                            downloadFile={this.downloadFile}
                            content={content}
                            favour={favour}
                            cancelToMyfile={this.cancelToMyfile}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        favorites: state.Favourite
    }
}

export default connect(mapStateToProps,{
    initFavourite,
    pasteFile,
    handleNewName,
    toFileFavour,
    deleteFile,
    shearFile,
    createFile,
    uploadFile,
    findFileFavour,
    backFileFavour,
    frontFile,
    cancelToMyfile,
})(Favour);