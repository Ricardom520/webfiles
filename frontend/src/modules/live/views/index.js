import React, {Component} from 'react';
import {common, icon} from '../../../images';
import {Link} from 'react-router-dom';
import SocialHeader from '../../../components/SocialHeader';
import Like from '../../../components/Like';
import './live.less';

class Live extends Component {
    render() {
        return (
            <div className="LiveContainer">
                <SocialHeader/>
                <div className="liveBody">
                    <div className="content">
                        <div className="left">
                            <div className="cont1">
                                <h2>被骂“滚出娱乐圈”的她，如今却成为白富美，走上人生巅峰</h2>
                                <div className="like">
                                    <Like/>
                                </div>
                            </div>
                            <div className="cont2">
                                <img src={common.headImg1.default}></img>
                                <div>
                                    <Link>
                                        <h5>Ricardom</h5>
                                    </Link>
                                    <p>
                                        <span>
                                            发表于2019.03.11 19:30:55
                                        </span>
                                        <span>
                                            字数 895
                                        </span>
                                        <span>
                                            阅读 4,637
                                        </span>
                                        <span>
                                            点赞 4,561
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="cont3">
                                <p>
                                说起“滚出娱乐圈”的这个词，最早是出现在黑粉无数的袁姗姗的身上。没错，她就是我们今天的主角。
                                </p>
                                <img src={common.live1.default}></img>
                            </div>
                        </div>
                        <div className="right">
                            <div className="selfContainer">
                                <div className="header">
                                    <img src={common.headImg1.default}></img>
                                    <Link>
                                        <h5>Ricardom</h5>
                                    </Link>
                                </div>
                                <div className="bodyer">
                                    <ul>
                                        <li>
                                            <Link>
                                                币市进入修复期，入场需看价值逻辑性。
                                            </Link>
                                            <p>阅读 27</p>
                                        </li>
                                        <li>
                                            <Link>
                                                管控心理影响，实现财富梦想
                                            </Link>
                                            <p>阅读 27</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="introductContainer">
                                <div className="header">
                                    <h4>推荐阅读</h4>
                                </div>
                                <div className="bodyer">
                                    <ul>
                                        <li>
                                            <Link>
                                                币市进入修复期，入场需看价值逻辑性。
                                            </Link>
                                            <p>阅读 27</p>
                                        </li>
                                        <li>
                                            <Link>
                                                管控心理影响，实现财富梦想
                                            </Link>
                                            <p>阅读 27</p>
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

export default Live;