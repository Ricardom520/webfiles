import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {common, icon} from '../../images';
import './singlep.less';

class SingleP extends Component {
    render() {
        const {title,num,img,shareid,type,openModal} = this.props;
        return (
            <li className="singlePContainer" onClick={()=>openModal(`${type}`,`${shareid}`)}>
                <Link>
                    <img src={img}></img>
                    <div className="disc">
                        <p className="title">
                            <h4>{title}</h4>
                        </p>
                        <p>
                            <span>{num}人在逛</span><span className="good">优品</span>
                        </p>
                    </div>
                </Link>
            </li>
        )
    }
}

export default SingleP;