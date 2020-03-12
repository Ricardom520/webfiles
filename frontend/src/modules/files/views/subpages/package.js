import React, {Component,Fragment} from 'react';
import Table from '../../../../components/Tables';
import { connect } from 'react-redux';
import { icon, common } from '../../../../images/index';
import {
    initFile,
    findFileFile,
} from '../../models/files';
import '../files.less';

class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileData: [],
            location: '',
            file: true,
        }
    }
    componentDidMount() {
        let {curParentid} = this.props.files;
        this.initFile(curParentid);
    }
    initFile = (parentid,filename,) => {
        let userid = sessionStorage.getItem('userid');
        this.props.initFile({userid: userid, filetype: 5});
    }
    findFile(e) { // 寻找文件
        let value = e.target.value;
        console.log(value)
        let userid = sessionStorage.getItem('userid');
        this.props.findFileFile({filename: value, userid: userid, filetype: 5});
    }
    handleNewName = (filename,systemid) => { // 重命名
        let userid = sessionStorage.getItem('userid');
        this.props.handleNewName({filename:filename,userid:userid,systemid:systemid});
    }
    addToFavourite = (systemid,filetype) => { // 收藏文件
        let userid = sessionStorage.getItem('userid');
        this.props.addToFavourite({userid:userid,systemid:systemid,filetype:filetype})
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
    componentWillReceiveProps(nextprops) {
        this.setState({
            fileData: this.props.files.fileData
        })
        console.log(nextprops)
    }
    render() {
        let {fileData,file} = this.state;
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
                    <div className='route' style={{marginLeft: '10px'}}>
                        <div className='log borderR'>
                            <img src={common.house.default}></img>
                        </div>
                        <div className='line'>
                            <img src={icon.file4.default} style={{width: '14px'}}></img>
                            <ul>
                                <li className='hasFile'>
                                    文档类型
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
                    <div className='tables'>
                        <Table 
                            columns={columns} 
                            dataSource={fileData} 
                            initData={this.initFile} 
                            handleNewName={this.handleNewName}
                            downloadFile={this.downloadFile}
                            addToFavourite={this.addToFavourite}
                            file={file}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.File
    }
}

export default connect(mapStateToProps,{
    initFile,
    findFileFile,
})(Package);