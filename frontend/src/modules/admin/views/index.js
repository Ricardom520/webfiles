import React, {Component} from 'react';
import {common, icon} from '../../../images';
import { Route, Switch, HashRouter as Router, Link,withRouter,Redirect } from 'react-router-dom';
import Lljk from './subpages/lljk';
import ShsqN from './subpages/shsqN';
import ShsqY from './subpages/shsqY';
import Tpsq from './subpages/tpsq';
import Itsq from './subpages/itsq';
import Wzsq from './subpages/wzsq';
import Wjq from './subpages/wjq';
import Users from './subpages/users';
import Rules from './subpages/rules';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: true
    }
  }
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let menus = this.menus;
        let menusChild = menus.getElementsByClassName('examine');
        let as = menus.getElementsByClassName('menus');
        console.log(pathname)
        console.log(as)
        switch(pathname) {
            case '/admin/lljk':
                as[0].classList.add('active');
                break;
            case '/admin/live/noexamine':
                as[1].classList.add('active');
                menusChild[0].style.height = '80px';
                break;
            case '/admin/live/hasexamine':
                as[1].classList.add('active');
                menusChild[0].style.height = '80px';
                break;
            case '/admin/photo':
                as[2].classList.add('active');
                break;
            case '/admin/software':
                as[3].classList.add('active');
                break;
            case '/admin/pdf':
                as[4].classList.add('active');
                break;
            case '/admin/files':
                as[5].classList.add('active');
                break;
            case '/admin/users':
                as[6].classList.add('active');
                break;
            case '/admin/rules':
                as[7].classList.add('active');
                break;
            default:
                as[0].classList.add('active');
        }
    }
    changeMenus(e, has) {
        console.log(e.target.parentNode)
        console.log(has)
        let menus = this.menus;
        let target = e.target;
        let as = menus.getElementsByClassName('menus');
        let menusChild = menus.getElementsByClassName('examine');
        for (let i = 0; i < as.length; i++) {
            as[i].classList.remove('active')
        }
        target.classList.add('active');
        if (has) {
            menusChild[0].style.height = '80px';
            console.log(menusChild)
        } else {
            menusChild[0].style.height = '0px';
            console.log("43")
        }
    }
    changeExamine(e) {
        console.log("点击了")
        let examine = this.examine;
        let as = examine.getElementsByTagName('a');
        let target = e.target;
        for(let i = 0; i < as.length; i++) {
            as[i].classList.remove('active');
        }
        target.classList.add('active');
    }
    showMenus() {
      this.setState({
        menus: !this.state.menus
      })
      console.log(this.state)
    }
    render() {
      const {menus} = this.state;
      console.log(menus)
        return (
            <div className="adminContainer">
                <div className={menus?"leftContainer active":'leftContainer'}>
                    <div className="headerContainer">
                        <img src={common.logoIcon.default}></img>
                        <img src={common.logoText.default}></img>
                    </div>
                    <div className="bodyContainer">
                        <ul ref={menus=>this.menus=menus}>
                            <li>
                                <Link to="/admin/lljk" onClick={(e)=>this.changeMenus(e)} className="menus">流量监控</Link>
                            </li>
                            <li>
                                <Link to="/admin/live/noexamine" onClick={(e)=>this.changeMenus(e,true)} className="menus">生活社区</Link>
                                <div className="examine" style={{height: 0}} ref={examine=>this.examine=examine}>
                                    <Link to="/admin/live/noexamine" className="active" onClick={(e)=>this.changeExamine(e)}>
                                        未审核
                                    </Link>
                                    <Link to="/admin/live/hasexamine" onClick={(e)=>this.changeExamine(e)}>
                                        审核通过
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <Link to="/admin/photo" onClick={(e)=>this.changeMenus(e)} className="menus">图片社区</Link>
                            </li>
                            <li>    
                                <Link to="/admin/software" onClick={(e)=>this.changeMenus(e)} className="menus">IT社区</Link>
                            </li>
                            <li>    
                                <Link to="/admin/pdf" onClick={(e)=>this.changeMenus(e)} className="menus">文章社区</Link>
                            </li>
                            <li>    
                                <Link to="/admin/files" onClick={(e)=>this.changeMenus(e)} className="menus">文件区</Link>
                            </li>
                            <li>    
                                <Link to="/admin/users" onClick={(e)=>this.changeMenus(e)} className="menus">用户管理</Link>
                            </li>
                            <li>    
                                <Link to="/admin/rules" onClick={(e)=>this.changeMenus(e)} className="menus">员工守则</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="headerContainer">
                        <img src={common.button.default} className="menusImg" onClick={()=>this.showMenus()}></img>
                        <div>
                            <img src={common.news.default}></img>
                            <img src={common.adminPhoto.default} className="adminPhoto"></img>
                        </div>
                    </div>
                    <div className="bodyContainer">
                        <Router>
                            <Switch>
                                <Route path="/admin/lljk" component={Lljk}/>
                                <Route path="/admin/live/noexamine" component={ShsqN}/>
                                <Route path="/admin/live/hasexamine" component={ShsqY}/>
                                <Route path="/admin/photo" component={Tpsq}/>
                                <Route path="/admin/software" component={Itsq}/>
                                <Route path="/admin/pdf" component={Wzsq}/>
                                <Route path="/admin/files" component={Wjq}/>
                                <Route path="/admin/rules" component={Rules}/>
                                <Route path="/admin/users" component={Users}/>
                                <Route path="/admin" component={Lljk}/>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;