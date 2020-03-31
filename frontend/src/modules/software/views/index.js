import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, HashRouter as Router, Link,withRouter,Redirect } from 'react-router-dom';
import {common,icon} from '../../../images';
import SocialHeader from '../../../components/SocialHeader';
import Code from './subpages/code';
import Comment from './subpages/comment';
import './software.less';
import {
    initSoft,
    initCommon,
} from '../models/software';

class SoftWare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: '',
            commons: [],
            softwareData: [],
            visted: '',
            liked: '',
            selfPhoto: '',
            shareid: '',
            userid: '',
            sharetime: '',
            updatetime: '',
            filename: '',
            filetype: '',
            nc: '',
            filetitlename: '',
        }
    }
    componentDidMount() {
        let pathname = this.props.location.pathname;
        let search = this.props.location.search;
        console.log(search)
        console.log(search.split('?cid')    )
        this.setState({
            params: search
        })
        let shareid;
        if (search.split('?cid')[1]) {
            console.log("有了")
            console.log(search)
            shareid =  search.split('?cid=')[0].split('?id=')[1];
            console.log(shareid)
            this.setState({
                shareid: shareid
            })
            this.props.initSoft({shareid: shareid})
        } else {
            shareid = search.split('?')[1].split('id=')[1];
            console.log(shareid)
            this.setState({
                shareid: shareid
            })
            this.props.initSoft({shareid: shareid})
        }
        
        
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
    componentWillReceiveProps(nextProps) {
        this.setState({
            common: nextProps.softwares.common,
            softwareData: nextProps.softwares.softwareData,
            visted: nextProps.softwares.visted,
            liked: nextProps.softwares.liked,
            selfPhoto: nextProps.softwares.selfPhoto,
            shareid: nextProps.softwares.shareid,
            userid: nextProps.softwares.userid,
            sharetime: nextProps.softwares.sharetime,
            updatetime: nextProps.softwares.updatetime,
            filename: nextProps.softwares.filename,
            filetype: nextProps.softwares.filetype,
            nc: nextProps.softwares.nc,
            filetitlename: nextProps.softwares.filetitlename,
        })
    }
    render() {
        const {params,visted,liked,shareid,nc,filetitlename} = this.state;
        console.log(params)
        console.log(this.props)
        return (
            <div className="SoftWareContainer">
                <SocialHeader/>
                <div className="SoftBody">
                    <section className="modal modal1">
                        <div className="content">
                            <p className="line1">
                                <div className="writer">
                                <Link className="name" to="/self/?name=ricardom">{nc}</Link> / <Link className="title">{filetitlename}</Link>
                                </div>
                                <div className="status">
                                    <ul>
                                        <li>
                                            <div className="icon">
                                                <img src={icon.watch.default}></img>
                                                Watch 
                                            </div>
                                            <div className="num">
                                                {visted}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <img src={icon.favorited.default}></img>
                                                Star 
                                            </div>
                                            <div className="num">
                                                {liked}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </p>
                            <p className="line2">
                                <ul ref={line2=>this.line2=line2}>
                                    <li className="li1">
                                        <Link to={`/software/?id=${shareid}`} onClick={(e)=>this.changeRoute(e)}>
                                            <img></img>Code
                                        </Link>
                                    </li>
                                    <li className="li2">
                                        <Link to={`/software/comment/?id=${shareid}`} onClick={(e)=>this.changeRoute(e)}>
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

let mapStateToProps = (state) => {
    return {
        softwares: state.Software
    }
}

export default connect(mapStateToProps,{
    initSoft,
    initCommon,
})(SoftWare);