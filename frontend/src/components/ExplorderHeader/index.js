import React, {Component} from 'react';
import './explorderHeader.less';

class ExplorderHeader extends Component {
    render() {
        const {title} = this.props;
        return (
            <div className="ExplorderHeaderContainer">
                <h5>{title}</h5>
            </div>
        )
    }
}

export default ExplorderHeader;