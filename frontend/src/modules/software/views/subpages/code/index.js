import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {common,icon} from '../../../../../images';
import './code.less';
import { connect } from 'react-redux';
import {
    downloadFileRequest
} from '../../../services';

class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: '',
            commons: [],
            softwareData: [],
            visted: '',
            liked: '',
            selfPhoto: '',
            shareid: '',
            userid: '',
            sharetime: '',
            updatetime: '',
            filename: '',
            filetype: '',
            nc: '',
            filetitlename: '',
        }
    }
    componentDidMount() {
        this.setState({
            softwareData: this.props.softwares.softwareData,
            selfPhoto: this.props.softwares.selfPhoto,
            shareid: this.props.softwares.shareid,
            userid: this.props.softwares.userid,
            sharetime: this.props.softwares.sharetime,
            updatetime: this.props.softwares.updatetime,
            filename: this.props.softwares.filename,
            filetype: this.props.softwares.filetype,
            nc: this.props.softwares.nc,
            filetitlename: this.props.softwares.filetitlename,
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props)
        this.setState({
            softwareData: this.props.softwares.softwareData,
            selfPhoto: this.props.softwares.selfPhoto,
            shareid: this.props.softwares.shareid,
            userid: this.props.softwares.userid,
            sharetime: this.props.softwares.sharetime,
            updatetime: this.props.softwares.updatetime,
            filename: this.props.softwares.filename,
            filetype: this.props.softwares.filetype,
            nc: this.props.softwares.nc,
            filetitlename: this.props.filetitlename,
        })
    }
    downloadFile = () => { // 下载文件
        let that = this;
        let shareid = this.state.shareid;
        let params = Object.assign({shareid:shareid});
        let download = this.download;
        //download.download = filename +"."+filetype_cn;
        downloadFileRequest(params)
            .then(res=>{
                console.log(res)
                let blob = new Blob([this.b64toBlob(res.content)])
                download.href = URL.createObjectURL(blob);
                download.download = res.filename + "." + res.file_hz;
                download.click();
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
    render() {
        const {softwareData,visted,liked,selfPhoto,updatetime,sharetime,filename,filetype,nc,filetitlename} = this.state;
        return (
            <div className="codeContainer">
                <section className="modal modal2">
                    <div className="content">
                        Manage topics
                        <ul>
                            <li>
                                <Link to="/software">提交次数</Link>
                            </li>
                            <li onClick={()=>this.downloadFile()}>下载</li>
                        </ul>
                    </div>
                </section>
                <section className="modal modal3">
                    <div className="content">
                        <p className="listTitle">
                            <div>
                                <img src={selfPhoto} className="selfPhoto"></img>
                                <h5>{nc}</h5>
                                Site updated: {sharetime}
                            </div>
                            <div>
                                <img></img>
                                Latest commit bc91845 {updatetime}
                            </div>
                        </p>
                        <ul>
                            <li>
                                <div className="title">
                                    <img src={filetype === 0 ? common.file.default :
                                                                filetype === 1 ? icon.word.default :
                                                                filetype === 2 ? icon.photo.default :
                                                                filetype === 3 ? icon.music.default :
                                                                filetype === 4 ? icon.video.default :
                                                                filetype === 5 ? icon.package.default :
                                                                filetype === 6 ? icon.file3.default :
                                                                filetype === 7 ? icon.excel.default :
                                                                filetype === 8 ? icon.ppt.default :
                                                                filetype === 9 ? icon.pdf.default : ''}></img>
                                    <Link>{filename}</Link>
                                </div>
                                <div>
                                    Site updated: {updatetime}
                                </div>
                                <div>
                                    3 months ago
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                <a ref={download=>this.download=download} style={{display:'none'}} download>下载隐藏按钮</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        softwares: state.Software
    } 
}

export default connect(mapStateToProps)(Code);