import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import E from 'wangeditor';
import {common, icon} from '../../../../../images';
import Comment2 from './comment';
import './comment.less';
import { connect } from 'react-redux';
import {
    initCommon,
    submitCommon
} from '../../../models/software';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasComment: false,
            timeMenus: false,
            writeMenus: false,
            commons: [],
            editorContent: ''
        }
    }
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let search = this.props.location.search;
        console.log("zheli a ")
        console.log(this.props)
        console.log(search)
        let shareid = search.split('?id=')[1];
        this.props.initCommon({shareid: shareid});
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu,elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            console.log(editor.txt.html())
            this.setState({
                // editorContent: editor.txt.text()
                editorContent: editor.txt.text()
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
    }
    componentWillReceiveProps(nextProps) {
        let pathname = nextProps.location.pathname;
        console.log(nextProps.location)
        let search = nextProps.location.search.split('?cid=')[1];
        console.log(search);
        if (search) {
            this.setState({
                hasComment: true,
            })
        } else {
            this.setState({
                hasComment: false,
                commons: this.props.softwares.commons
            })
        }
    }
    showTimeMenus() {
        let {timeMenus,writeMenus} = this.state;
        if (writeMenus) {
            this.setState({
                writeMenus: !writeMenus
            }) 
        } else {
            this.setState({
                timeMenus: !timeMenus
            })
        }
    }
    showWriteMenus() {
        let {writeMenus,timeMenus} = this.state;
        console.log(timeMenus)
        if (timeMenus) {
            this.setState({
                timeMenus: !timeMenus
            })
        } else {
            this.setState({
                writeMenus: !writeMenus
            })
        }
    }
    submit() {
      console.log("发送了")
      console.log(this.state.editorContent)
      let value = this.state.editorContent;
      console.log(sessionStorage)
      let username = sessionStorage.getItem('username')
      let userid = sessionStorage.getItem('userid');
      console.log(this.props.location)
      let shareid = this.props.location.search.split('?id=')[1];
      console.log(shareid)
      let commons = this.state.commons;
      commons.push({
        commonname: value,
        commonuser: username
      })
      this.setState({
        commons: commons
      })
      this.props.submitCommon({
        commonname: value,
        commonuser: username,
        userid: userid,
        shareid: shareid
      })
    }
    render() {
        const {hasComment,timeMenus,writeMenus,commons} = this.state;
        console.log(hasComment)
        return (
            <div className="commentContainer">
                <section className="modal modal2">
                    <div className="content">
                        {hasComment?<Comment2/>:<table>
                        <thead>
                            <p>
                                <button onClick={()=>this.showWriteMenus()}>作者</button>
                                <button onClick={()=>this.showTimeMenus()}>发布时间</button>
                            </p>
                        </thead>
                        <tbody>
                            {
                                Object.keys(commons).length?commons.map(item=>{
                                    console.log(item)
                                    return (
                                        <tr>
                                            <td width="80%">
                                                <p className="p1">
                                                    <img src={icon.exclamatory.default}></img>
                                                    <Link to={`/software/comment/?id=SRi15848865911003?cid=1`}>
                                                        <h5>{item.commonname}</h5>
                                                    </Link>
                                                </p>
                                                <p className="p2">#on {item.commontime} 通过<Link>{item.commonuser}</Link></p>
                                            </td>
                                            <td width="20%" align="right">
                                                <Link to={`/software/comment/${1}`}>
                                                    <img src={icon.news.default} style={{width: '20px', height: '20px'}}></img>
                                                    {item.commonchilds}
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }):<div className="NoCom">
                                    <img src={common.nocommon.default}></img>
                                    <p>暂无评论</p>
                                </div>
                            }
                        </tbody>
                        <div className="comContainer">
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
                          <div className="btn">
                            <button className="submit" onClick={()=>this.submit()}>发送</button>
                          </div>
                        </div>
                        <div className="timeMenus" style={timeMenus?{display: 'block'}:{display:'none'}}>
                            <p>排序方式</p>
                            <ul>
                                <li><img src={icon.true.default} style={{marginRight: '5px'}}></img>最新</li>
                                <li>最旧</li>
                                <li>最多评论</li>
                                <li>最少评论</li>
                                <li>最近更新</li>
                                <li>最少最近更新</li>
                            </ul>
                        </div>
                        <div className="writeMenus" style={writeMenus?{display: 'block'}:{display:'none'}}>
                            <p>按分配的人筛选</p>
                            <ul>
                                <li><img src={icon.true.default} style={{marginRight: '5px'}}></img>所有人</li>
                                <li>Ricardom</li>
                                <li>Michelle</li>
                                <li>Rita</li>
                            </ul>
                        </div>
                    </table>
                        }
                    </div>
                </section>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        softwares: state.Software
    }
}

export default connect(mapStateToProps,{
    initCommon,
    submitCommon,
})(Comment);