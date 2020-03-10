import React, { Component } from 'react';
import { icon, common } from '../../images';
import './attribute.less';

class Attribute extends Component {
    render() {
        let {attributeFlag,cancelAttribute,filename,filetype,filesize,createtime,location} = this.props;
        return (
            <div className="attributeContainer" ref={attribute=>this.attribute=attribute} style={attributeFlag?{display:'block'}:{display:'none'}}>
                <div className="title">
                    <div>
                        <img src={
                                filetype === 0 ? common.file.default :
                                filetype === 1 ? icon.file4.default :
                                filetype === 2 ? icon.photo.default :
                                filetype === 3 ? icon.music.default :
                                filetype === 4 ? icon.video.default :
                                filetype === 5 ? icon.package.default :
                                filetype === 6 ? icon.file3.default : ''
                            }></img>
                        <span>{filename}</span>
                    </div>
                    <span className="close" onClick={cancelAttribute}>X</span>
                </div>
                <div className="middle">
                    <div className="Content">
                        <ul className="line">
                            <li>
                                <img src={
                                    filetype === 0 ? common.file.default :
                                    filetype === 1 ? icon.word.default :
                                    filetype === 2 ? icon.photo.default :
                                    filetype === 3 ? icon.music.default :
                                    filetype === 4 ? icon.video.default :
                                    filetype === 5 ? icon.package.default :
                                    filetype === 6 ? icon.file3.default : 
                                    filetype === 7 ? icon.excel.default :
                                    filetype === 8 ? icon.ppt.default :
                                    filetype === 9 ? icon.pdf.default : ''
                                }></img>
                                <p>{filename}</p>
                            </li>
                        </ul>
                        <ul className="line">
                            <li>
                                <span>文件类型:</span>
                                <p>{
                                        filetype === 0 ? '文件夹' :
                                        filetype === 1 ? 'word文档' :
                                        filetype === 2 ? '图片' :
                                        filetype === 3 ? '音乐' :
                                        filetype === 4 ? '视频' :
                                        filetype === 5 ? '压缩包' :
                                        filetype === 6 ? '其他' :
                                        filetype === 7 ? 'Excel工作表':
                                        filetype === 8 ? 'PPT文档' :
                                        filetype === 9 ? 'PDF文档' : ''
                                    }</p>
                            </li>
                        </ul>
                        <ul className="line">
                            <li>
                                <span>位置:</span>
                                <p>{location}</p>
                            </li>
                            <li>
                                <span>大小:</span>
                                <p>{filesize}</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>创建时间:</span>
                                <p>{createtime}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="btnContent">
                    <button className="submit" onClick={cancelAttribute}>确定</button>
                    <button className="reset" onClick={cancelAttribute}>取消</button>
                </div>
            </div>
        )
    }
}

export default Attribute;