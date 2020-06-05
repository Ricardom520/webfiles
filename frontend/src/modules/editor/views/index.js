import React, {Component} from 'react';
import ShareWz from '../../../components/ShareWz';
import E from 'wangeditor';
import {
    Button
} from 'antd';
import './editor.less';
import { connect } from 'react-redux';
import {
    submitEditor
} from '../models/editor';
//import { inject, observer } from 'mobx-react'
//import { withRouter } from 'react-router-dom'

//@withRouter @inject('appStore') @observer
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent:'',
            shareWzlag: false
         };
    }

    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu,elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
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
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()

    };

    showShareWz() {
        this.setState({
            shareWzlag: true
        })
    }

    submitWz = (filename,desc,bc) => {
        let editorContent = this.state.editorContent;
        console.log(editorContent)
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        this.props.submitEditor({content: editorContent,userid:userid,username:username,filename:filename,desc:desc,bc:bc})
        this.setState({
            shareWzlag: false
        })
    }

    resetWz() {
        console.log("重置了")
        this.setState({
            editorContent: '',
        })
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu,elemBody)
        editor.textSelector.innerText = '';
        editor.textSelector.outerText = '';
        console.log(editor.textSelector)
        console.log(this.state)
    }

    closeShareWz = () => {
        this.setState({
            shareWzlag: false
        })
    }

    render() {
        let {shareWzlag} = this.state;
        return (
            <div className="shop">
                <div className="text-area" >
                    <div ref="editorElemMenu"
                      style={{backgroundColor:'#f1f1f1',}}
                      className="editorElem-menu">
                    </div>
                    <div
                      style={{
                          height:'100%',
                          borderTop:"none"
                      }}
                      ref="editorElemBody" className="editorElem-body">
                    </div>
                    <div className="submitContainer">
                      <Button type="primary" onClick={()=>this.showShareWz()}>提交</Button>
                      <Button onClick={()=>this.resetWz()}>重置</Button>
                    </div>
                </div>
                <ShareWz 
                    shareWzlag={shareWzlag}
                    closeShareWz={this.closeShareWz}
                    submitWz={this.submitWz}
                />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        editor: state.Editor
    }
}

export default connect(mapStateToProps,{
    submitEditor,
})(Editor);