import React, {Component} from 'react';
import SocialHeader from '../../../components/SocialHeader';
import { common } from '../../../images';
import {Link} from "react-router-dom";
import './self.less';

class Self extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            follow: false
        }
    }
    changeMenus(type,e) {
        let status = this.status;
        let target = e.target;
        console.log(e)
        let lis = status.getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }
        target.classList.add('active');
        if (type == 'follow' || type === 'follow') {
            this.setState({
                status: 0
            })
        } else {
            this.setState({
                status: 1
            })
        }
    }
    follow() {
        let follow = this.state.follow;
        this.setState({
            follow: !follow
        })
    }
    render() {
        const {status,follow} = this.state;
        return (
            <div className="SlefContainer">
                <SocialHeader/>
                <div className="SlefContent">
                    <div className="modal">
                        <div className="cont1">
                            <img src={common.self.default} className="selfPhoto"></img>
                            <p>
                                <h3 className="selfName">Ricardom</h3>
                                <img src={common.male.default} className="selfSex"></img>
                            </p>
                            <p>
                                私の運命は私が握っています。 <button for="follow" onClick={()=>this.follow()}>{follow?"已关注":"关注"}</button>
                            </p>
                        </div>
                        <div className="cont2">
                            <div className="left">
                                <div className="header">
                                    <ul ref={status=>this.status=status}>
                                        <li className="active" onClick={(e)=>this.changeMenus('follow',e)}>关注</li>
                                        <li onClick={(e)=>this.changeMenus('fans',e)}>粉丝</li>
                                    </ul>
                                </div>
                                <div className="bodyer">
                                    {status ? <ul>
                                        <li>
                                            <Link>
                                                <img src={common.headImg1.default}></img>
                                                Michelle
                                            </Link>
                                        </li>
                                    </ul> : <ul>
                                        <li>
                                            <Link>
                                                <img src={common.headImg1.default}></img>
                                                MX.CF
                                            </Link>
                                        </li>
                                    </ul>
                                    }
                                </div>
                            </div>
                            <div className="right">
                                <div className="header">
                                    <h3>发布内容</h3>
                                </div>
                                <div className="content">
                                    <ul>
                                        <li>
                                            <Link>
                                                <img src={common.mainImg1.default}></img>
                                                <div className="disc">
                                                    <p className="title">
                                                        <h4>你的书写工具需要一个庇护所</h4>
                                                    </p>
                                                    <div>
                                                        <p>
                                                            <span>2020.1.8</span>
                                                            <span>2255人收藏</span>
                                                        </p>
                                                        <p >
                                                            <span>by Ricardom</span><span>1250点赞</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <img src={common.mainImg2.default}></img>
                                                <div className="disc">
                                                    <p className="title">
                                                        <h4>你的书写工具需要一个庇护所</h4>
                                                    </p>
                                                    <div>
                                                        <p>
                                                            <span>2020.1.8</span>
                                                            <span>2255人收藏</span>
                                                        </p>
                                                        <p >
                                                            <span>by Ricardom</span><span>1250点赞</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <img src={common.mainImg3.default}></img>
                                                <div className="disc">
                                                    <p className="title">
                                                        <h4>你的书写工具需要一个庇护所</h4>
                                                    </p>
                                                    <div>
                                                        <p>
                                                            <span>2020.1.8</span>
                                                            <span>2255人收藏</span>
                                                        </p>
                                                        <p >
                                                            <span>by Ricardom</span><span>1250点赞</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <img src={common.mainImg4.default}></img>
                                                <div className="disc">
                                                    <p className="title">
                                                        <h4>你的书写工具需要一个庇护所</h4>
                                                    </p>
                                                    <div>
                                                        <p>
                                                            <span>2020.1.8</span>
                                                            <span>2255人收藏</span>
                                                        </p>
                                                        <p >
                                                            <span>by Ricardom</span><span>1250点赞</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <img src={common.mainImg5.default}></img>
                                                <div className="disc">
                                                    <p className="title">
                                                        <h4>你的书写工具需要一个庇护所</h4>
                                                    </p>
                                                    <div>
                                                        <p>
                                                            <span>2020.1.8</span>
                                                            <span>2255人收藏</span>
                                                        </p>
                                                        <p >
                                                            <span>by Ricardom</span><span>1250点赞</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Self;