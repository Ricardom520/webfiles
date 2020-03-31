import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {common, icon} from '../../../../../images';
import Comment2 from './comment';
import './comment.less';
import { connect } from 'react-redux';
import {
    initCommon
} from '../../../models/software';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasComment: false,
            timeMenus: false,
            writeMenus: false,
            commons: []
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
                                }):''
                            }
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

let mapStateToProps = (state) => {
    return {
        softwares: state.Software
    }
}

export default connect(mapStateToProps,{
    initCommon,
})(Comment);