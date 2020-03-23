import React, { Component } from 'react';
import '../SharePdf/sharepdf.less';
import {
    message,
    Button
} from 'antd';
import { common } from '../../images';

class ShareWz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            bc: '',
            desc: '',
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            filename: nextProps.filename
        })
    }
    closeSharePdf() {
        this.props.closeSharePdf();
        this.setState({
            filename: ''
        })
    }
    changeFilename(e) {
        let value = e.target.value;
        this.setState({
            filename: value
        })
    }
    onChangeDesc(e) {
        this.setState({
            desc: e.target.value
        })
    }
    shareFile() {
        let filename = this.state.filename;
        let desc = this.state.desc;
        let bc = this.state.bc;
        this.props.submitWz(filename,desc,bc);
        this.setState({
            sharePdfFlag: false,
            desc: '',
            bc: ''
        })
    }
    chooseBc(e) {
        let file = e.target.files[0];
        console.log(file)
        let type = file.name.split('.')[1];
        console.log(type)
        if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif' || type == 'webp') {
            let reader = new window.FileReader();
            reader.readAsDataURL(file);
            let that = this;
            reader.onload = function() {
                that.setState({
                    bc: reader.result
                })
            }
        } else {
            message.warning('上传的图片格式不符');
            return;
        }
    }
    render() {
        let {filename,bc,desc} = this.state;
        let {shareWzlag,closeShareWz} = this.props;
        return (
            <div className="shareContainer" style={shareWzlag?{display:'block'}:{display:'none'}}>
                <div className="box">
                    <div className="title">
                        <span>文档分享</span>
                        <span className="close" onClick={closeShareWz}>+</span>
                    </div>
                    <div className="middle">
                        <p>
                            <label>
                                文件名:
                            </label>
                            <input value={filename} onChange={(e)=>this.changeFilename(e)}></input>
                        </p>
                        <p>
                            <label>
                                文件说明:
                            </label>
                            <textarea value={desc} onChange={(e)=>this.onChangeDesc(e)}></textarea>
                        </p>
                        <p>
                            <label>
                                背景图:
                            </label>
                            <label for="bc" className="uploadBc">
                                <span>+</span>
                                <span>Upload</span>
                            </label>
                            <label for="bc" className="bc" style={bc?{transform: 'scale(1)'}:{transform: 'scale(0)'}}>
                                <img src={bc}></img>
                            </label>
                            <input type="file" onChange={(e)=>this.chooseBc(e)} id="bc" style={{display:'none'}}></input>
                        </p>
                    </div>
                    <div className="footer">
                        <Button type="primary" onClick={()=>this.shareFile()}>确定</Button>
                        <Button onClick={()=>this.closeSharePdf()}>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default  ShareWz;