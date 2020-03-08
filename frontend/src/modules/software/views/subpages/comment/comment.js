import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import E from 'wangeditor';
import {common, icon} from '../../../../../images';
import Participants from '../../../../../components/Participants';
import './comment.less';

class Comment2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent:''
         };
    }
    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu,elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            console.log(editor.txt.html())
            this.setState({
                // editorContent: editor.txt.text()
                editorContent: editor.txt.html()
            })
        }
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
    };
    showParticipant(e) {
        let parent = e.target.parentNode;
        let participant = parent.getElementsByClassName('participant');
        if (participant[0].style.display == 'none') {
            participant[0].style.display = 'flex';
        }
    }
    hideParticipant(e) {
        let parent = e.target.parentNode;
        let participant = parent.getElementsByClassName('participant');
        if (participant[0].style.display == 'flex') {
            participant[0].style.display = 'none';
        }
    }
    render() {
        return (
            <div className="hasComContainer">
                <div className="modal3">
                    <p className="p1">
                        <h2>不做公共代码抽取么？</h2><span>#40</span>
                    </p>
                    <p className="p2">
                        <Link>zhans1993</Link>发表此评论于2019.03.11
                    </p>
                </div>
                <div className="modal4">
                    <div className="left">
                        <div>
                            <div className="cont">
                                <Link to="/self/?name=ricardom">
                                    <img src={common.self.default} className="userPhoto" onMouseEnter={(e)=>this.showParticipant(e)} onMouseLeave={(e)=>this.hideParticipant(e)}></img>
                                </Link>
                                <div className="comment">
                                    <div className="header">
                                        <div>
                                            <Link to="/self/?name=ricardom">zhans1993</Link> 评论于 2019.03.11
                                        </div>
                                        <div className="label">
                                            <button>...</button>
                                        </div>
                                    </div>
                                    <div className="body">
                                        我在现在的项目里没发现有配置这个
                                    </div>
                                </div>
                                <Participants/>
                            </div>
                            <div className="cont">
                                <Link to="/self/?name=ricardom">
                                    <img src={common.self.default} className="userPhoto" onMouseEnter={(e)=>this.showParticipant(e)} onMouseLeave={(e)=>this.hideParticipant(e)}></img>
                                </Link>
                                <div className="comment">
                                    <div className="header">
                                        <div>
                                            <Link to="/self/?name=ricardom">zhans1993</Link> 评论于 2019.03.11
                                        </div>
                                        <div className="label">
                                            <span>Owner</span>
                                            <button>...</button>
                                        </div>
                                    </div>
                                    <div className="body">
                                        我在现在的项目里没发现有配置这个
                                        <img src={common.userImg1.default}></img><br/>
                                        hhh哈哈哈哈哈哈哈哈哈
                                    </div>
                                </div>
                                <Participants/>
                            </div>
                        </div>
                        <div className="submitComment">
                            <div className="cont">
                                <img src={common.self.default} className="userPhoto" onMouseEnter={(e)=>this.showParticipant(e)} onMouseLeave={(e)=>this.hideParticipant(e)}></img>
                                <div className="comment">
                                    <div className="header">
                                        <div ref="editorElemMenu"
                                            style={{backgroundColor:'#f1f1f1',border:"1px solid #ccc"}}
                                            className="editorElem-menu">
                                        </div>
                                        </div>
                                    <div className="body">
                                    <div
                                        style={{
                                            border:"1px solid #ccc",
                                        }}
                                        ref="editorElemBody" className="editorElem-body">
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                <p className="title">标签</p>
                                <p>无...</p>
                            </li>
                            <li className="participants">
                                <p className="title"><span>2</span>参与者</p>
                                <p>
                                    <Link to="/self/?name=ricardom">
                                        <img src={common.userImg1.default}></img>
                                    </Link>
                                    <Link to="/self/?name=ricardom">
                                        <img src={common.userImg2.default}></img>
                                    </Link>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment2;