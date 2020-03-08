import React, {Component} from 'react';
import {common, icon} from '../../images';
import {Link} from 'react-router-dom';
import './RecomBP.less';

class RecomBP extends Component {
    render() {
        const {userImg, headImg, name, num, img, good} = this.props;
        return (
            <li className="RecomBPContainer">
                <Link to="/self/?name=ricardom">
                    <img src={userImg}></img>
                    <img src={headImg} className="headImg"></img>
                    <div className="disc">
                        <p>
                            <h4>{name}</h4>
                        </p>
                        <p>
                            <img src={img}></img> {num}
                        </p>
                        <p>
                            擅长领域: {good}
                        </p>
                    </div>
                </Link>
            </li>
        )
    }
}

export default RecomBP;