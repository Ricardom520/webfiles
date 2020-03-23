import React, {Component} from 'react';
import { connect } from 'react-redux';
import {common, icon} from '../../../images';
import {Link} from 'react-router-dom';
import SocialHeader from '../../../components/SocialHeader';
import Like from '../../../components/Like';
import './live.less';
import {
    initLiveData,
} from '../models/live';

class Live extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveData: []
        }
    }
    componentDidMount() {
        let shareid = this.props.location.search.split('?id=')[1];
        console.log(shareid)
        this.props.initLiveData({shareid: shareid})
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props.Live)
        let cont = this.cont;
        cont.innerHTML = this.props.Live.liveData.content;
        this.setState({
            liveData: this.props.Live.liveData
        })
    }
    render() {
        console.log(this.state)
        const {liveData} = this.state;
        console.log(liveData)
        return (
            <div className="LiveContainer">
                <SocialHeader/>
                <div className="liveBody">
                    <div className="content">
                        <div className="left">
                            <div className="cont1">
                                <h2>{liveData.filename}</h2>
                                <div className="like">
                                    <Like/>
                                </div>
                            </div>
                            <div className="cont2">
                                <img src={liveData.photo}></img>
                                <div>
                                    <Link>
                                        <h5>{liveData.username}</h5>
                                    </Link>
                                    <p>
                                        <span>
                                            发表于{liveData.createtime}
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
                            <div className="cont3" ref={cont=>this.cont=cont}>
                            </div>
                        </div>
                        <div className="right">
                            <div className="selfContainer">
                                <div className="header">
                                    <img src={liveData.photo}></img>
                                    <Link>
                                        <h5>{liveData.username}</h5>
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

const mapStateToProps = (state) => {
    return {
        Live: state.Live
    }
}

export default connect(mapStateToProps,{
    initLiveData,
})(Live);