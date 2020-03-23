import React , { Component, Fragment } from 'react';
import TableMenus from '../TableMenus';
import TableTrMenus from '../TableTrMenus';
import Rename from '../Rename';
import Photo from './photo';
import Attribute from '../Attribute';
import SharePdf from '../SharePdf';
import SharePic from '../SharePic';
import ShareSofe from '../ShareSoft';
import { icon, common } from '../../images';
import './table.less';
import {
    downloadFileRequest
} from '../../modules/files/services';
import { message } from 'antd';

class Table extends Component {
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
            filetype_hz: '',
            photoFlag: false,
            photo: '',
            sharePdfFlag: false,
            sharePicFlag: false,
            pic: '',
            shareSoftFlag: false,
        }
    }
    onClickTbody(e) {
    let type = e._targetInst.type;
        if (type == 'tbody') {
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
    onContextTbodyMenu(e) {
        let target = e.target;
        let type = e._targetInst.type;
        let x = e.nativeEvent.screenX;
        let y = e.nativeEvent.screenY;
        let tbodymenus = document.getElementById('tbodymenus');
        if (type == 'tbody') {
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
    onContextTrMenu(e,systemid,parentid,filetype,filename,filesize,createtime,filetype_hz) { // tr右击
        let type = e._targetInst.type;
        let x = e.nativeEvent.screenX;
        let y = e.nativeEvent.screenY;
        let trmenus = document.getElementById('trmenus');
        if (type == 'tr' || type == 'td') {
            this.setState({
                tbodyMenus:false,
                trMenus: true,
                systemid: systemid,
                parentid: parentid,
                filetype: filetype,
                filename: filename,
                filesize: filesize,
                createtime: createtime,
                filetype_hz: filetype_hz
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
    onClickTr(e) {
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
        let filetype_hz = this.state.filetype_hz;
        this.props.downloadFile(systemid,filename,filetype_hz);
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
    // 打开PDF分享
    openSharePdf = () => {
        console.log("打开pdf分享")
        this.setState({
            sharePdfFlag: true,
            trMenus: false
        })
    }
    // 关闭PDF分享
    closeSharePdf = () => {
        this.setState({
            sharePdfFlag: false,
        })
    }
    // 打开图片分享
    openSharePic = () => {
        console.log("开图片")
        let systemid = this.state.systemid;
        let userid = sessionStorage.getItem('userid');
        this.props.getsharePicRequest({systemid:systemid,userid:userid}) 
            .then(res=>{
                this.setState({
                    pic: res.content
                })
            })
            console.log(this.props)
        this.setState({
            sharePicFlag: true,
            trMenus: false
        })
    }
    // 关闭图片分享
    closeSharePic = () => {
        this.setState({
            sharePicFlag: false,
        })
    }
    // 文件分享
    shareFile = (filename,disc,bc) => {
        let {systemid,filetype} = this.state;
        console.log(disc);
        this.setState({
            sharePdfFlag: false
        })
        this.props.shareFile(systemid,filename,disc,filetype,bc)
    }
    // 取消文件分享
    cancelShare = () => {
        let systemid = this.state.systemid;
        this.setState({
            trMenus: false
        })
        this.props.cancelShare(systemid);
    }
    // 分享图片
    sharePic = (filename,disc,content) => {
        let systemid = this.state.systemid;
        this.props.sharePic(filename,disc,content,systemid);
    }
    // 打开文件夹分享
    openShareSoft = () => {
        this.setState({
            shareSoftFlag: true,
            trMenus: false
        })
    }
    // 关闭文件夹分享
    closeShareWjj = () => {
        this.setState({
            shareSoftFlag: false
        })
    }
    getHasPro() {
        this.props.getHasPro();
    }
    createNewPro = (filename,desc,bc) => {
        let systemid = this.state.systemid;
        this.props.createNewPro(filename,desc,bc,systemid);
        this.setState({
            shareSoftFlag: false
        })
    }
    render() {
        let {columns,dataSource,location,favour,file,changeSort,share,hasShareSoft} = this.props;
        let {tbodyMenus,trMenus,copySystemid,renameFlag,filename,attributeFlag,filetype,filesize,createtime,systemid,sharePdfFlag,sharePicFlag,pic,shareSoftFlag} = this.state;
        console.log(this.state)
        return (
            <Fragment>
                <table cellSpacing="0" cellPadding="0" className="tableContainer">
                    <thead>
                        <tr>
                            {Object.keys(columns).length?columns.map(item=>{
                                return(
                                    <th width={item.width} className='borderR' style={item.right?{paddingRight: '1%',textAlign: 'right'}:{}}>{item.title}</th>
                                )
                            }):''}
                        </tr>
                    </thead>
                    <tbody onContextMenu={(e)=>this.onContextTbodyMenu(e)} onClick={(e=>this.onClickTbody(e))} ref={tBody=>this.tBody=tBody}>
                        {
                            Object.keys(dataSource).length?dataSource.map(item=>{
                                return(
                                    <tr 
                                        onContextMenu={(e)=>this.onContextTrMenu(e,item.systemid,item.parentid,item.filetype,item.filename,item.filesize,item.createtime,item.filetype_hz)} 
                                        onDoubleClick={()=>this.onDoubleClick(item.filetype,item.systemid,item.filename,item.favour)} 
                                        onClick={(e)=>this.onClickTr(e)}
                                    >
                                        {
                                            columns.map(data=>{
                                                return (
                                                    <td width={data.width} style={data.right?{paddingRight: '1%',textAlign: 'right'}:{}}>{data.hasImg?<img src={
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
                                                                                                                                                                }></img>:''}{item[data.dataIndex]}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            }): <div className="nofileContainer">
                                    <img src={common.nofile.default}></img>
                            </div>
                        }
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
                            share={share}
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
                            openSharePdf={this.openSharePdf}
                            share={share}
                            cancelShare={this.cancelShare}
                            openSharePic={this.openSharePic}
                            openShareSoft={this.openShareSoft}
                        />
                    </tbody>
                </table>
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
                <SharePdf filename={filename} sharePdfFlag={sharePdfFlag} closeSharePdf={this.closeSharePdf} shareFile={this.shareFile}/>
                <SharePic sharePicFlag={sharePicFlag} closeSharePic={this.closeSharePic} pic={pic} sharePic={this.sharePic}/>
                <ShareSofe shareSoftFlag={shareSoftFlag} closeShareWjj={this.closeShareWjj} getHasPro={()=>this.getHasPro()} hasShareSoft={hasShareSoft} createNewPro={this.createNewPro}/>
            </Fragment>
        )
    }
}

export default Table;