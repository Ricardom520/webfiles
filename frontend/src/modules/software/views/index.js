import React, {Component} from 'react';
import { Route, Switch, HashRouter as Router, Link,withRouter,Redirect } from 'react-router-dom';
import {common,icon} from '../../../images';
import SocialHeader from '../../../components/SocialHeader';
import Code from './subpages/code';
import Comment from './subpages/comment';
import './software.less';

class SoftWare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: ''
        }
    }
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let search = this.props.location.search;
        this.setState({
            params: search
        })
        console.log(this.props.location)
        console.log(pathname)
        let lis = this.line2.childNodes;
        console.log(lis)
        console.log(pathname+search)
        console.log(`/software/${search}`)
        switch (pathname+search) {
            case `/software/${search}`:
                lis[0].classList.add('active');
                break;
            case `/software/comment/${search}`:
                lis[1].classList.add('active');
                break;
            default:
                lis[0].classList.add('active');
                break;
        }
    }
    changeRoute(e) {
        let ul = this.line2;
        let lis = ul.getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }
        e.target.parentNode.classList.add('active')
        console.log(e.target.parentNode)
    }
    render() {
        const {params} = this.state;
        console.log(params)
        return (
            <div className="SoftWareContainer">
                <SocialHeader/>
                <div className="SoftBody">
                    <section className="modal modal1">
                        <div className="content">
                            <p className="line1">
                                <div className="writer">
                                    <Link className="name" to="/self/?name=ricardom">Ricardom</Link> / <Link className="title">Ricardom.github.io</Link>
                                </div>
                                <div className="status">
                                    <ul>
                                        <li>
                                            <div className="icon">
                                                <img src={icon.watch.default}></img>
                                                Watch 
                                            </div>
                                            <div className="num">
                                                1
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <img src={icon.favorited.default}></img>
                                                Star 
                                            </div>
                                            <div className="num">
                                                0
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </p>
                            <p className="line2">
                                <ul ref={line2=>this.line2=line2}>
                                    <li className="li1">
                                        <Link to={`/software/${params}`} onClick={(e)=>this.changeRoute(e)}>
                                            <img></img>Code
                                        </Link>
                                    </li>
                                    <li className="li2">
                                        <Link to={`/software/comment/${params}`} onClick={(e)=>this.changeRoute(e)}>
                                            <img></img>评论
                                        </Link>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </section>
                    <Router>
                        <Switch>
                            <Route path={`/software/comment`} component={Comment}/>
                            <Route path={`/software`} component={Code}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        )
    }
}

export default SoftWare;