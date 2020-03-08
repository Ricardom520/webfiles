import React, {Component,Fragment} from 'react';
import { Route, Switch, HashRouter as Router, Link,withRouter } from 'react-router-dom';
import Self from '../../self/views';
import Account from '../../account/views';
import './menus.less';
import { icon, common } from '../../../../../../images';

class MenuSlef extends Component {
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let lis = this.selfLis.getElementsByTagName('li');
        switch (pathname) {
            case '/explorer/self/account':
                lis[1].classList.add('active');
                break;
            case '/explorer/self':
                lis[0].classList.add('active');
                break;
            default:
                return;
        }
    }
    changeRoute(e) {
        console.log(e.target)
        console.log(e.target.parentNode)
        let target = e.target.parentNode;
        let selfLis = this.selfLis;
        let lis = selfLis.getElementsByTagName('li');
        console.log(lis)
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }
        target.classList.add('active');
    }
    render() {
        return (
            <Fragment>
                <div className='menuselfContainer'>
                    <p className="logoName">
                        LOVE云
                    </p>
                    <p className="userSelf">
                        <img src={common.self.default}></img>
                    </p>
                    <p className="userName">
                        Ricardom
                    </p>
                    <ul className="positionLists" ref={selfLis=>this.selfLis=selfLis}>
                        <li>
                            <Link to="/explorer/self" onClick={(e)=>this.changeRoute(e)}>
                                <img src={icon.self.default}></img>个人中心
                            </Link>
                        </li>
                        <li>
                            <Link to="/explorer/self/account" onClick={(e)=>this.changeRoute(e)}>
                                <img src={icon.setting.default}></img>账号设置
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <Router>
                        <Switch>
                            <Route path="/explorer/self/account" component={Account}/>
                            <Route path="/explorer/self" component={Self}/>
                        </Switch>
                    </Router>
                </div>
            </Fragment>
        )
    }
}

export default MenuSlef;