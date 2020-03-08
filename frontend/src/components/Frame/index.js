import React, {Component} from 'react';
import './frame.less';
import {common, icon} from '../../images';

class Frame extends Component {
    render() {
        let listsData = this.props.listsData;
        return (
            <div className='frameContainer' style={{display: 'none'}}>
                <ul>
                    {
                        listsData.map((item)=>{
                            return (<li>
                                <img src={item.img}></img>
                                {item.title}({item.span})
                                {item.label?(<label>{item.label}</label>):''}
                            </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Frame;