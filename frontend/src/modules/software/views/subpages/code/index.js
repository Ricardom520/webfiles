import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {common,icon} from '../../../../../images';
import './code.less';
class Code extends Component {
    render() {
        return (
            <div className="codeContainer">
                <section className="modal modal2">
                    <div className="content">
                        Manage topics
                        <ul>
                            <li>
                                <Link to="/software">提交次数</Link>
                            </li>
                            <li>下载</li>
                        </ul>
                    </div>
                </section>
                <section className="modal modal3">
                    <div className="content">
                        <p className="listTitle">
                            <div>
                                <img src={common.self.default} className="selfPhoto"></img>
                                <h5>Ricardom</h5>
                                Site updated: 2019-10-20 22:19:41
                            </div>
                            <div>
                                <img></img>
                                Latest commit bc91845 on 20 Oct 2019
                            </div>
                        </p>
                        <ul>
                            <li>
                                <div className="title">
                                    <img src={common.file1.default}></img>
                                    <Link>2018/12/12</Link>
                                </div>
                                <div>
                                    Site updated: 2019-10-20 22:19:41
                                </div>
                                <div>
                                    3 months ago
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

export default Code;