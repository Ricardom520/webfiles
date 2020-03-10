import React , { Component, Fragment } from 'react';
import DustbinTbodyMenus from '../DustbinTbodyMenus';
import DustbinTrMenus from '../DustbinTrMenus';
import Rename from '../Rename';
import Attribute from '../Attribute';
import { icon, common } from '../../images';
import '../Tables/table.less';

class DustbinTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dustbinTbodyMenus: false,
            dustbinTrMenus: false,
            systemid: '',
            parentid: '',
            filetype: '',
            filename: '',
            filesize: '',
            attributeFlag: false,
            filetype_cn: '',
            location: ''
        }
    }
    onClickTbody(e) {
        let type = e._targetInst.type;
        if (type == 'tbody') {
            this.setState({
                dustbinTbodyMenus: false,
                dustbinTrMenus: false
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
        let type = e._targetInst.type;
        let x = e.nativeEvent.screenX;
        let y = e.nativeEvent.screenY;
        let tbodymenus = document.getElementById('dustbinTbodyMenus');
        if (type == 'tbody') {
            this.setState({
                dustbinTbodyMenus: true,
                dustbinTrMenus: false
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
    onContextTrMenu(e,systemid,parentid,filetype,filename,filesize,createtime,filetype_cn,location) { // tr右击
        let type = e._targetInst.type;
        let x = e.nativeEvent.screenX;
        let y = e.nativeEvent.screenY;
        let dustbinTrMenus = document.getElementById('dustbinTrMenus');
        if (type == 'tr' || type == 'td') {
            this.setState({
                dustbinTbodyMenus:false,
                dustbinTrMenus: true,
                systemid: systemid,
                parentid: parentid,
                filetype: filetype,
                filename: filename,
                filesize: filesize,
                createtime: createtime,
                filetype_cn: filetype_cn,
                location: location
            })
            if (x + 185 <= document.body.clientWidth) {
                dustbinTrMenus.style.left = x + 5 + 'px';
                dustbinTrMenus.style.top = y - 100 + 'px';
            } else {
                dustbinTrMenus.style.left = document.body.clientWidth - 200 + 'px';
                dustbinTrMenus.style.top = y - 100 + 'px';
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
        this.setState({
            dustbinTrMenus: false,
            dustbinTbodyMenus: false,
        })
        this.props.initDustbin();
    }
    onClickTr(e) {
        this.setState({
            dustbinTrMenus: false
        })
        let tBody = this.tBody;
        
        let trs = tBody.getElementsByTagName('tr');
        console.log(trs);
        for (let i = 0; i < trs.length; i++) {
            trs[i].classList.remove('active');
        }
        e.target.classList.add('active');
    }
    // 删除文件
    deleteFile = () => {
        console.log("删除了")
        let systemid = this.state.systemid;
        this.setState({
            dustbinTrMenus: false
        })
        this.props.deleteFile(systemid);
    }
    // 查看属性
    showAttribute = () => {
        this.setState({
            attributeFlag: true,
            dustbinTrMenus: false,
        })
    }
    // 关闭属性框
    cancelAttribute = () => {
        this.setState({
            attributeFlag: false
        })
    }
    deleteDustbin = () => { // 彻底删除
        let systemid = this.state.systemid;
        this.setState({
            dustbinTrMenus: false
        })
        this.props.deleteDustbin(systemid);
    }
    reductionDustbin = () => { // 还原
        let systemid = this.state.systemid;
        this.setState({
            dustbinTrMenus: false
        })
        this.props.reductionDustbin(systemid);
    }
    render() {
        let {columns,dataSource} = this.props;
        let {dustbinTbodyMenus,dustbinTrMenus,filename,attributeFlag,filetype,filesize,createtime,location} = this.state;
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
                                        onContextMenu={(e)=>this.onContextTrMenu(e,item.systemid,item.parentid,item.filetype,item.filename,item.filesize,item.createtime,item.filetype_cn,item.location)} 
                                        onDoubleClick={()=>this.onDoubleClick(item.filetype,item.systemid,item.filename)} 
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
                        <DustbinTbodyMenus 
                            dustbinTbodyMenus={dustbinTbodyMenus} 
                            refresh={()=>this.refresh()} 
                        />
                        <DustbinTrMenus
                            refresh={()=>this.refresh()} 
                            dustbinTrMenus={dustbinTrMenus}
                            deleteDustbin={this.deleteDustbin}
                            showAttribute={this.showAttribute}
                            reductionDustbin={this.reductionDustbin}
                        />
                    </tbody>
                </table>
                <Attribute 
                    attributeFlag={attributeFlag} 
                    cancelAttribute={this.cancelAttribute} 
                    filename={filename}
                    filetype={filetype}
                    filesize={filesize}
                    createtime={createtime}
                    location={location}
                />
            </Fragment>
        )
    }
}

export default DustbinTable;