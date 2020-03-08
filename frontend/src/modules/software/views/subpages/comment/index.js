import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {common, icon} from '../../../../../images';
import Comment2 from './comment';
import './comment.less';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasComment: '',
            timeMenus: false,
            writeMenus: false
        }
    }
    componentDidMount() {
        let pathname = this.props.location.pathname;
        if (pathname.split('/software/comment')[1]) {
            this.setState({
                hasComment: true
            })
        } else {
            this.setState({
                hasComment: false
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        let pathname = nextProps.location.pathname;
        if (pathname.split('/software/comment')[1]) {
            this.setState({
                hasComment: true
            })
        } else {
            this.setState({
                hasComment: false
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
    render() {
        const {hasComment,timeMenus,writeMenus} = this.state;
        return (
            <div className="commentContainer">
                <section className="modal modal2">
                    <div className="content">
                        {hasComment?<Comment2/>:
                        <table>
                            <thead>
                                <p>
                                    <button onClick={()=>this.showWriteMenus()}>作者</button>
                                    <button onClick={()=>this.showTimeMenus()}>发布时间</button>
                                </p>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width="80%">
                                        <p className="p1">
                                            <img src={icon.exclamatory.default}></img>
                                            <Link to={`/software/comment/${1}`}>
                                                <h5>不做公共代码抽取么？</h5>
                                            </Link>
                                        </p>
                                        <p className="p2">#on 3 Jun 2019 通过<Link>zhans1993</Link></p>
                                    </td>
                                    <td width="20%" align="right" style={{paddingRight: '20px'}}>
                                        <Link to={`/software/comment/${1}`}>
                                            <img src={icon.news.default} style={{width: '20px', height: '20px'}}></img>
                                            1
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
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

export default Comment;