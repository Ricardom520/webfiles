import React, { Component } from 'react';
import './sharepic.less';
import {
    message,
    Button
} from 'antd';
import { common } from '../../images';

class SharePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            pics: [],
            desc: '',
        }
    }
    closeSharePic() {
        this.props.closeSharePic();
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
    sharePic() {
        let filename = this.state.filename;
        let desc = this.state.desc;
        let pics = this.state.pics;
        pics.unshift({pic:this.props.pic});
        this.props.sharePic(filename,desc,pics);
        this.setState({
            sharePdfFlag: false,
            desc: '',
            pics: []
        })
    }
    choosePics(e) {
        let file = e.target.files[0];
        console.log(file)
        let type = file.name.split('.')[1];
        console.log(type)
        if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif' || type == 'webp') {
            console.log("怎么回事")
            let reader = new window.FileReader();
            reader.readAsDataURL(file);
            let that = this;
            let pics = this.state.pics;
            console.log("见啦")
            reader.onload = function() {
                pics.push({pic:reader.result});
                that.setState({
                    pics: pics
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
    render() {
        let {desc,pics,filename} = this.state;
        let {sharePicFlag,pic} = this.props;
        return (
            <div className="shareContainer" style={sharePicFlag?{display:'block'}:{display:'none'}}>
                <div className="box">
                    <div className="title">
                        <span>图片分享</span>
                        <span className="close" onClick={()=>this.closeSharePic()}>+</span>
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
                            <label for="pics" className="uploadBc">
                                <span>+</span>
                                <span>Upload</span>
                            </label>
                            <div className="picsContaier">
                                <label className="bc">
                                    <img src={pic}></img>
                                </label>
                                {
                                    Object.keys(pics).length?pics.map(item=>{
                                        return(
                                            <label className="bc" style={item?{transform: 'scale(1)'}:{transform: 'scale(0)'}}>
                                                <img src={item.pic}></img>
                                            </label>
                                        )
                                    }) :''
                                }
                            </div>
                            <input type="file" onChange={(e)=>this.choosePics(e)} id="pics" style={{display:'none'}}></input>
                        </p>
                    </div>
                    <div className="footer">
                        <Button type="primary" onClick={()=>this.sharePic()}>确定</Button>
                        <Button onClick={()=>this.closeSharePic()}>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default  SharePic;