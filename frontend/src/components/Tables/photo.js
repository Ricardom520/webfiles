import React, { Component } from 'react';
import { icon, common } from '../../images';
import './table.less';

class Photo extends Component {
    render() {
        let {photoFlag,photo,closePhoto} = this.props;
        return (
            <div className="PhotoContainer" style={photoFlag?{display:'block'}:{display:'none'}}>
                <div className="close" onClick={closePhoto}>+</div>
                <img src={photo}></img>
            </div>
        )
    }
}

export default Photo;