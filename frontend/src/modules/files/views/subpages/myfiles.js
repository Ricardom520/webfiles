import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Load from '../../../../components/Load';
import Table from '../../../../components/Tables';
import Block from '../../../../components/Block';
import { icon, common } from '../../../../images/index';
import {
    initMyfiles,
    pasteFile,
    handleNewName,
    toFile,
    deleteFile,
    shearFile,
    createFile,
    uploadFile,
    findFile,
    backFile,
    frontFile,
    addToFavourite,
    shareFile,
    sharePic,
    getHasPro,
    createNewPro,
} from '../../models/files';
import '../files.less';
import {
    downloadFileRequest,
    getsharePicRequest,
} from '../../services';

class Myfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfilesData: [],
            location: '',
            favorited: false,
            fbType: 0,
            hasShareSoft: []
        }
    }
    componentDidMount() {
        let {curParentid} = this.props.myfiles;
        this.initMyfiles(curParentid);
    }
    initMyfiles = (parentid,filename,favour) => {
        let userid = sessionStorage.getItem('userid');
        console.log(favour)
        this.props.initMyfiles({userid: userid, parentid: parentid,filename:filename,favour:favour});
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
    uploadFile = (params,e) => { // 上传文件
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
    addToFavourite = (systemid,filetype) => { // 收藏文件
        let userid = sessionStorage.getItem('userid');
        this.props.addToFavourite({userid:userid,systemid:systemid,filetype:filetype})
    }
    shareFile = (systemid,filename,disc,filetype,bc) => { // 分享pdf文件
        console.log(disc)
        let userid = sessionStorage.getItem('userid');
        this.props.shareFile({userid:userid,systemid:systemid,filename:filename,disc:disc,filetype:filetype,bc:bc})
    }
    sharePic = (filename,disc,content,systemid) => {
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        this.props.sharePic({username:username,userid:userid,filename:filename,disc:disc,content:content,systemid:systemid})
    }
    componentWillReceiveProps(nextprops) {
        let location = '';
        let fileLists = this.props.myfiles.fileLists;
        for (let i = 0; i < fileLists.length; i++) {
            location += '/' + fileLists[i].filename;
        }
        this.setState({
            location: location,
            myfilesData: this.props.myfiles.myfilesData,
            favorited: this.props.myfiles.fileLists.slice(-1)[0].favour,
            hasShareSoft: nextprops.myfiles.hasShareSoft,
        })
    }
    getHasPro = () => {
        let userid = sessionStorage.getItem('userid');
        this.props.getHasPro({userid:userid});
    }
    createNewPro = (filetitlename,desc,bc,systemid) => {
        let userid = sessionStorage.getItem('userid');
        console.log(bc)
        this.props.createNewPro({userid: userid, filetitlename: filetitlename, desc: desc, bc: bc, systemid: systemid})
    }
    render() {
        let {myfilesData,location,content,favorited,fbType,hasShareSoft} = this.state;
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
                        <button className={Object.keys(this.props.myfiles.fileLists).length>1?'left active': 'left'} onClick={()=>this.backFile()}></button>
                        <button className={Object.keys(this.props.myfiles.backFile).length>1?'right active': 'right'} onClick={()=>this.frontFile()}></button>
                    </div>
                    <div className='route'>
                        <div className='log borderR'>
                            <img src={common.house.default}></img>
                        </div>
                        <div className='line'>
                            <img src={icon.house.default} style={{width: '14px'}}></img>
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
                        <div className='return right' onClick={()=>this.backFile()}>
                            <img src={common.arrow.default}></img>
                        </div>
                        <div className='like right borderR'>
                            <img src={favorited?icon.favorited.default:icon.favorit.default}></img>
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
                        <div className='createFiles' onClick={this.createFile}>
                            <img src={common.file.default}></img>
                            新建文件夹
                            <button></button>
                        </div>
                        <div className='operation'>
                            <label for="file">
                                <img src={common.arrow2.default}></img>
                                上传
                            </label>
                            <button></button>
                            <input type="file" onChange={(e)=>this.uploadFile(false,e)} style={{display:'none'}} id="file"/>
                        </div>
                    </div>
                    {
                        fbType ?
                            <Block
                                dataSource={myfilesData} 
                                initData={this.initMyfiles} 
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
                                addToFavourite={this.addToFavourite}
                                changeSort={this.changeSort}
                                getsharePicRequest={getsharePicRequest}
                                sharePic={this.sharePic}
                            />
                             : <div className='tables'>
                        <Table 
                            columns={columns} 
                            dataSource={myfilesData} 
                            initData={this.initMyfiles} 
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
                            addToFavourite={this.addToFavourite}
                            changeSort={this.changeSort}
                            shareFile={this.shareFile}
                            getsharePicRequest={getsharePicRequest}
                            sharePic={this.sharePic}
                            getHasPro={this.getHasPro}
                            hasShareSoft={hasShareSoft}
                            createNewPro={this.createNewPro}
                        />
                    </div>
                    }
                </div>
                <a ref={download=>this.download=download} style={{display:'none'}} download>下载隐藏按钮</a>
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
                                        uploadFile,
                                        findFile,
                                        backFile,
                                        frontFile,
                                        addToFavourite,
                                        shareFile,
                                        sharePic,
                                        getHasPro,
                                        createNewPro,
                                    })(withRouter(Myfiles));