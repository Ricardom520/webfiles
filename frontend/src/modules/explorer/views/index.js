import React, {Component} from 'react';
import { Route, Switch, HashRouter as Router, Link,withRouter,Redirect } from 'react-router-dom';
import { icon, common } from '../../../images/index';
import { connect } from 'react-redux';
import Menus from '../../menus/views';
import MenuSelf from './subpages/menuself/views';
import Files from '../../files/views';
import Editor from '../../editor/views';
import './explorer.less';

class Explorer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            username: ''
        }
    }
    componentDidMount() {
        // 判断是否有登录
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        if (!userid) {
            // 返回登录
            this.props.history.push('/login');
        }
        this.setState({
            username: username
        })
        let pathname = this.props.location.pathname;
        pathname = pathname.split('/')[2];
        let right1Lists = this.right1Lists;
        let lis = right1Lists.getElementsByTagName('li');
        switch(pathname) {
            case 'files':
                lis[0].className = 'active';
                break;
            case 'editor':
                lis[1].className = 'active';
                break;
        }
    }
    onClick(ele) {
        console.log(ele)
    }
    ContextRight1Click(e) {
        let right1Lists = this.right1Lists;
        let lis = right1Lists.getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active')
        }
        e.target.parentNode.className = 'active';
        console.log(right1Lists)
        console.log(e.target.parentNode)
        console.log(e)
    }
    showMenus() {
        console.log("点‘")
        let visible = this.state.visible
        console.log(visible)
        this.setState({
            visible: !visible
        })
    }
    render() {
        const {visible,username} = this.state;
        console.log(visible)
        return (
            <div className='Explorer'>
                <div className='leftContainer'>
                    <div className='right1'>
                        <p>
                            <img src={common.logo.default} className='logo'></img>
                        </p>
                        <ul ref={right1Lists=>this.right1Lists=right1Lists}>
                            <li onClick={(e)=>this.ContextRight1Click(e)}>
                                <Link to="/explorer/files">
                                    <img src={icon.file1.default}></img>
                                    文件管理
                                </Link>
                            </li>
                            <li onClick={(e)=>this.ContextRight1Click(e)}>
                                <Link to="/explorer/editor">
                                    <img src={icon.compiler.default}></img>
                                    编译器
                                </Link>
                            </li>
                        </ul>
                        <div className='down'>
                            <p>
                                <img src={common.flag.default}></img>
                            </p>
                            <p>
                                <img src={common.self.default} className='selfPhoto' onClick={()=>this.showMenus()}></img>
                            </p>
                        </div>
                        <ul className="selfMenus" style={visible?{display: 'none'}:{display: 'block'}}>
                                <li>
                                    <p className="p1">
                                        <img src={common.self.default} className="selfPhoto1"></img>
                                        <div>
                                            <h5>{username}</h5>
                                            <p>balala</p>
                                        </div>
                                    </p>
                                </li>
                                <li>
                                    <p className="p2">
                                        <Link to="/explorer/self">
                                            <img></img>
                                            个人中心
                                        </Link>
                                    </p>
                                    <p className="p3">
                                        <Link to="/explorer/files">
                                            <img></img>
                                            文件管理
                                        </Link>
                                    </p>
                                </li>
                                <li>
                                    <p className="p4">
                                        <Link to="/social">
                                            <img></img>
                                            Share社区
                                        </Link>
                                    </p>
                                    <p className="p5">
                                        <Link to="/find">
                                            <img></img>
                                            搜一搜
                                        </Link>
                                    </p>
                                    <p className="p6">
                                        <Link to="/map">
                                            <img></img>
                                            地图出行
                                        </Link>
                                    </p>
                                </li>
                                <li>
                                    <p className="p7">
                                        <Link>
                                            <img></img>
                                            关于
                                        </Link>
                                    </p>
                                    <p className="p8">
                                        <Link to="/login">
                                            <img></img>
                                            退出
                                        </Link>
                                    </p>
                                </li>
                            </ul>
                    </div>
                </div>
                <div className='rightContainer'>
                    <Router>
                        <Switch>
                            <Route path="/explorer/files" component={Menus}/>
                            <Route path="/explorer/editor" component={Menus}/>
                            <Route path="/explorer/self" component={MenuSelf}/>
                            <Redirect from="/explorer/files/*" to="/123"></Redirect>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(Explorer));