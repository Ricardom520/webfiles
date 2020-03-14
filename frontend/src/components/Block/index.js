import React, { Component, Fragment } from 'react';
import TableMenus from '../TableMenus';
import TableTrMenus from '../TableTrMenus';
import Rename from '../Rename';
import Photo from '../Tables/photo';
import Attribute from '../Attribute';
import { icon, common } from '../../images';
import './block.less';

class Blocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tbodyMenus: false,
            trMenus: false,
            systemid: '',
            parentid: '',
            filetype: '',
            filename: '',
            filesize: '',
            createtime: '',
            copySystemid: '',
            copyParentid: '',
            renameFlag: false,
            attributeFlag: false,
            filetype_cn: '',
            photoFlag: false,
            photo: '',
        }
    }
    onClickBlock(e) {
        console.log(e)
    let type = e._targetInst.type;
    console.log(type)
        if (type == 'div' || type == 'ul') {
            this.setState({
                tbodyMenus: false,
                trMenus: false
            })
            let tBody = this.tBody;
        
            let trs = tBody.getElementsByTagName('tr');
            console.log(trs);
            for (let i = 0; i < trs.length; i++) {
                trs[i].classList.remove('active');
            }
        }
    }
    onContextBlockMenu(e) {
        let target = e.target;
        let type = e._targetInst.type;
        let x = e.nativeEvent.screenX;
        let y = e.nativeEvent.screenY;
        let tbodymenus = document.getElementById('tbodymenus');
        if (type == 'div') {
            this.setState({
                tbodyMenus: true,
                trMenus: false
            })
            if (x + 185 <= document.body.clientWidth) {
                tbodymenus.style.left = x + 5 + 'px';
                tbodymenus.style.top = y - 100 + 'px';
            } else {
                tbodymenus.style.left = document.body.clientWidth - 200 + 'px';
                tbodymenus.style.top = y - 100 + 'px';
            }
        }
        e.preventDefault();
    }
    onContextLiMenu(e,systemid,parentid,filetype,filename,filesize,createtime,filetype_cn) { // tr右击
        let type = e._targetInst.type;
        let x = e.nativeEvent.screenX;
        let y = e.nativeEvent.screenY;
        let trmenus = document.getElementById('trmenus');
        console.log(type)
        if (type == 'li' || type == 'img' || type == 'span') {
            this.setState({
                tbodyMenus:false,
                trMenus: true,
                systemid: systemid,
                parentid: parentid,
                filetype: filetype,
                filename: filename,
                filesize: filesize,
                createtime: createtime,
                filetype_cn: filetype_cn
            })
            if (x + 185 <= document.body.clientWidth) {
                trmenus.style.left = x + 5 + 'px';
                trmenus.style.top = y - 100 + 'px';
            } else {
                trmenus.style.left = document.body.clientWidth - 200 + 'px';
                trmenus.style.top = y - 100 + 'px';
            }
            let tBody = this.tBody;
            let trs = tBody.getElementsByTagName('tr');
            for (let i = 0; i < trs.length; i++) {
                trs[i].classList.remove('active');
            }
            e.target.classList.add('active');
        }
    e.preventDefault();
    }
    // 刷新
    refresh() {
        console.log("刷出")
        this.props.initData(this.props.curParentid);
        this.setState({
            tbodyMenus: false
        })
    }
    onClickLi(e) {
        this.setState({
            trMenus: false
        })
        let tBody = this.tBody;
        
        let trs = tBody.getElementsByTagName('tr');
        console.log(trs);
        for (let i = 0; i < trs.length; i++) {
            trs[i].classList.remove('active');
        }
        e.target.classList.add('active');
    }
    // 复制文件
    copyFile = () => {
        console.log("复制了")
        console.log(this.state)
        this.setState({
            trMenus: false,
            copySystemid: this.state.systemid,
            copyParentid: this.state.parentid
        })
        console.log(this.state)
    }
    // 粘贴文件
    pasteFile = () => {
        const {copySystemid, copyParentid} = this.state;
            
        this.props.pasteFile(copyParentid,copySystemid,curParentid);
        this.setState({
            trMenus: false
        })
        console.log(this.state)
    }
    // 打开重命名
    renameFile = () => {
        this.setState({
            renameFlag: true,
            trMenus: false
        })
    }
    // 取消重命名
    cancelRename = () => {
        this.setState({
            renameFlag: false
        })
    }
    // 提交新的名字
    handleNewName = (filename) => {
        this.setState({
            renameFlag: false
        })
        this.props.handleNewName(filename,this.state.systemid);
    }
    // 打开文件
    onDoubleClick(filetype,systemid,filename,favour) {
        let userid = sessionStorage.getItem('userid');
        let params = Object.assign({userid:userid,systemid:systemid});
        if (filetype == 0) {
            this.props.initData(systemid,filename,favour);
        }
        if (filetype == 9) {
            downloadFileRequest(params)
                .then(res=>{
                    window.open('/#/pdf?data='+res.content, '_blank');
                })
        }
        if (filetype == 1 || filetype == 5 || filetype == 6 || filetype == 7 || filetype == 8) {
            message.warning("该格式暂不支持在线浏览");
            return;
        }
        if (filetype == 2) {
            downloadFileRequest(params)
                .then(res=>{
                    this.setState({
                        photoFlag: true,
                        photo: res.content
                    })
                })
        }
    }
    openFile = (filetype,systemid,filename,favour) => {
        let userid = sessionStorage.getItem('userid');
        let params = Object.assign({userid:userid,systemid:systemid});
        if (filetype == 0) {
            this.props.initData(systemid,filename,favour);
        }
        if (filetype == 9) {
            downloadFileRequest(params)
                .then(res=>{
                    let dataURL = res.content;
                    let iframe = document.createElement('iframe');
                    iframe.name = "test";
                    iframe.src = dataURL;
                    window.open('/#/pdf?data='+res.content, '_blank');
                })
        }
        if (filetype == 1 || filetype == 5 || filetype == 6 || filetype == 7 || filetype == 8 || filetype == 3 || filetype == 4) {
            message.warning("该格式暂不支持在线浏览");
            return;
        }
    }
    // 删除文件
    deleteFile = () => {
        console.log("删除了")
        let systemid = this.state.systemid;
        this.setState({
            trMenus: false
        })
        this.props.deleteFile(systemid);
    }
    // 剪切文件
    shearFile = () => {
        console.log("简介； ")
        this.setState({
            trMenus: false,
            copySystemid: this.state.systemid,
            copyParentid: this.state.parentid
        })
        this.props.shearFile();
    }
    // 查看属性
    showAttribute = () => {
        this.setState({
            attributeFlag: true,
            trMenus: false,
        })
    }
    // 关闭属性框
    cancelAttribute = () => {
        this.setState({
            attributeFlag: false
        })
    }
    // 新建文件夹
    createFile = () => {
        this.setState({
            trMenus: false,
        })
        this.props.createFile();
    }
    // 上传文件
    uploadFile = (params) => {
        console.log("双床啦")
        this.props.uploadFile(params);
    }
    // 下载文件
    downloadFile = () => {
        let systemid = this.state.systemid;
        let filename = this.state.filename;
        let filetype_cn = this.state.filetype_cn;
        this.props.downloadFile(systemid,filename,filetype_cn);
    }
    // 添加到收藏夹
    addToFavourite = () => {
        let systemid = this.state.systemid;
        let filetype = this.state.filetype;
        this.setState({
            trMenus: false,
        })
        this.props.addToFavourite(systemid,filetype);
    }
    // 取消收藏
    cancelToMyfile = () => {
        let systemid = this.state.systemid;
        let filetype = this.state.filetype;
        this.setState({
            trMenus: false,
        })
        this.props.cancelToMyfile(systemid,filetype);
    }
    // 关闭图片框
    closePhoto = () => {
        this.setState({
            photoFlag: false,
            photo: ''
        })
    }
    render() {
        let {columns,dataSource,location,favour,file,changeSort} = this.props;
        let {tbodyMenus,trMenus,copySystemid,renameFlag,filename,attributeFlag,filetype,filesize,createtime,systemid} = this.state;
        return (
            <Fragment>
                <div className="blocks" onContextMenu={(e)=>this.onContextBlockMenu(e)} onClick={(e=>this.onClickBlock(e))} ref={tBody=>this.tBody=tBody}>
                    <ul>
                        {
                            Object.keys(dataSource).length?
                            dataSource.map(item=>{
                                return(
                                    <li onContextMenu={(e)=>this.onContextLiMenu(e,item.systemid,item.parentid,item.filetype,item.filename,item.filesize,item.createtime,item.filetype_cn)} 
                                        onDoubleClick={()=>this.onDoubleClick(item.filetype,item.systemid,item.filename,item.favour)} 
                                        onClick={(e)=>this.onClickLi(e)}>
                                        <img src={
                                                    item.filetype === 0 ? common.file.default :
                                                    item.filetype === 1 ? icon.word.default :
                                                    item.filetype === 2 ? icon.photo.default :
                                                    item.filetype === 3 ? icon.music.default :
                                                    item.filetype === 4 ? icon.video.default :
                                                    item.filetype === 5 ? icon.package.default :
                                                    item.filetype === 6 ? icon.file3.default :
                                                    item.filetype === 7 ? icon.excel.default :
                                                    item.filetype === 8 ? icon.ppt.default :
                                                    item.filetype === 9 ? icon.pdf.default : ''
                                                }></img>
                                        <span>{item.filename}</span>
                                    </li>
                                )
                            }):''
                        }
                    </ul>
                </div>
                <TableMenus 
                    tbodyMenus={tbodyMenus} 
                    refresh={()=>this.refresh()} 
                    pasteFile={this.pasteFile} 
                    copySystemid={copySystemid}
                    showAttribute={this.showAttribute}
                    createFile={this.createFile}
                    uploadFile={this.uploadFile}
                    file={file}
                    changeSort={changeSort}
                />
                <TableTrMenus 
                    filetype={filetype}
                    systemid={systemid}
                    filename={filename}
                    trMenus={trMenus} 
                    copyFile={this.copyFile} 
                    renameFile={this.renameFile} 
                    deleteFile={this.deleteFile}
                    shearFile={this.shearFile}
                    showAttribute={this.showAttribute}
                    downloadFile={this.downloadFile}
                    addToFavourite={this.addToFavourite}
                    favour={favour}
                    cancelToMyfile={this.cancelToMyfile}
                    file={file}
                    openFile={this.openFile}
                />
                <Rename 
                    renameFlag={renameFlag}
                    cancelRename={this.cancelRename}
                    filename={filename}
                    handleNewName={this.handleNewName}
                />
                <Attribute 
                    attributeFlag={attributeFlag} 
                    cancelAttribute={this.cancelAttribute} 
                    filename={filename}
                    filetype={filetype}
                    filesize={filesize}
                    createtime={createtime}
                    location={location}
                />
                <Photo photoFlag={this.state.photoFlag} photo={this.state.photo} closePhoto={this.closePhoto}/>
            </Fragment>
        )
    }
}

export default Blocks;