import React, {Component} from 'react';
import {common,icon} from '../../images';
import './participants.less';

class Participants extends Component {
    render() {
        return (
            <div className="participant" style={{display: 'none'}}>
                <img src={common.self.default} className="userPhoto"></img>
                <div>
                    <p className="name">Ricardom</p>
                    <p className="location"><img src={icon.location.default}></img>中国上海</p>
                </div>
            </div>
        )
    }
}

export default Participants;