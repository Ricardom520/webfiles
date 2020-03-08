import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {common, icon} from '../../images';
import './socialHeader.less';

class SocialHeader extends Component {
    render() {
        return (
            <header className='SocialheaderContainer'>
                <section className='modal'>
                    <div className='logo'>
                        <Link to="/social">
                            <h2>Share社区</h2>
                        </Link>
                    </div>
                    <div className='find1'>
                        <input placeholder="Search here..." type="search"></input>
                        <button></button>
                    </div>
                    <div className='show'>
                        <ul>
                            <li>
                                <Link to="/explorer/files">Go Home</Link>
                            </li>
                            <li>
                                <img src={common.self.default} className='self'></img>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
        )
    }
}

export default SocialHeader;