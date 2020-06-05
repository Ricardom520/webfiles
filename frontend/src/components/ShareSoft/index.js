import React, { Component } from 'react';
import './sharesoft.less';
import {
    message,
    Button
} from 'antd';
import { common } from '../../images';

class ShareSoft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            desc: '',
            bc: '',
            newP: false,
            proJ: false,
        }
    }
    closeShareWjj() {
        this.props.closeShareWjj();
        this.setState({
            filename: '',
            newP: false,
            proJ: false
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
    createNewPro() {
        let filename = this.state.filename;
        let bc = this.state.bc;
        let desc = this.state.desc;
        this.props.createNewPro(filename,desc,bc);
        this.setState({
            desc: '',
            bc: [],
            filename: '',
            newP: false,
            proJ: false
        })
    }
    choosebc(e) {
        let file = e.target.files[0];
        console.log(file)
        let type = file.name.split('.')[1];
        console.log(type)
        if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif' || type == 'webp') {
            console.log("怎么回事")
            let reader = new window.FileReader();
            reader.readAsDataURL(file);
            let that = this;
            console.log("见啦")
            reader.onload = function() {
                that.setState({
                    bc: reader.result
                })
            }
        } else {
            console.log("不是")
            message.warning('上传的图片格式不符');
            return;
        }
        console.log("daodi")
        e.target.value = '';
    }
    chooseNew() {
        console.log("新建了")
        this.setState({
            newP: true,
            proJ: false
        })
    }
    chooseH() {
        this.props.getHasPro();
        this.setState({
            proJ: true,
            newP: false
        })
    }
    render() {
        let {desc,pics,filename,bc,newP,proJ} = this.state;
        let {shareSoftFlag,pic,hasShareSoft} = this.props;
        return (
            <div className="shareContainer" style={shareSoftFlag?{display:'block'}:{display:'none'}}>
                <div className="box">
                    <div className="title">
                        <span>软件分享</span>
                        <span className="close" onClick={()=>this.closeShareWjj()}>+</span>
                    </div>
                    <div className="middle">
                        <button className="create_new" onClick={()=>this.chooseNew()}>新建项目</button>
                        <button className="choose_has" onClick={()=>this.chooseH()}>选择已有项目</button>
                    </div>
                    <div className="middle1" style={newP?{height:'auto',display:'block'}:{height:'0px',display:'none'}}>
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
                            <label for="softbc" className="uploadBc">
                                <span>+</span>
                                <span>Upload</span>
                            </label>
                                <label for="softbc" className="bc" style={Object.keys(bc).length?{transform: 'scale(1)'}:{transform: 'scale(0)'}}>
                                    <img src={bc}></img>
                                </label>
                            <input type="file" onChange={(e)=>this.choosebc(e)} id="softbc" style={{display:'none'}}></input>
                        </p>
                    </div>
                    <div className="middle2" style={proJ?{height:'auto',display:'block'}:{height:'0px',display:'none'}}>
                        <div className="Content">
                            {
                                hasShareSoft?Object.keys(hasShareSoft).length?<ul>
                                <li>12</li>
                                <li>哈哈哈哈</li>
                            </ul>:<div className="no">
                                暂没有项目哦~
                            </div>:<div className="no">
                                暂没有项目哦~
                            </div>
                            }       
                        </div>
                    </div>
                    <div className="footer" style={newP?{height:'auto',display:'block'}:{height:'0px',display:'none'}}>
                        <Button type="primary" onClick={()=>this.createNewPro()}>确定</Button>
                        <Button onClick={()=>this.closeShareWjj()}>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default  ShareSoft;