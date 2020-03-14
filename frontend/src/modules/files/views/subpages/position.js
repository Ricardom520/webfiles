import React, {Component,Fragment} from 'react';
import { icon, common } from '../../../../images/index';
import '../files.less';

class Position extends Component {
    render() {
        return (
            <Fragment>
                <div className='header'>
                    <div className='backFront'>
                        <button className='left'></button>
                        <button className='right'></button>
                    </div>
                    <div className='route'>
                        <div className='log borderR'>
                            <img src={common.house.default}></img>
                        </div>
                        <div className='line'>
                            <img src={icon.favorites2.default} style={{width: '14px'}}></img>
                            <ul>
                                <li className='hasFile'>
                                    收藏夹
                                </li>
                                <li className='hasFile'>
                                    李欢
                                </li>
                            </ul>
                        </div>
                        <div className='return right'>
                            <img src={common.arrow.default}></img>
                        </div>
                        <div className='like right borderR'>
                            <img src={common.favorites.default}></img>
                        </div>
                    </div>
                    <div className='find'>
                        <input type="search"></input>
                        <button>
                            <img src={common.find.default} style={{width: '80%'}}></img>
                        </button>
                    </div>
                </div>
                <div className='container'>
                    <div className='lists'>
                        <div className='createFiles'>
                            <img src={common.file.default}></img>
                            新建文件夹
                            <button></button>
                        </div>
                        <div className='operation'>
                            <img src={common.arrow2.default}></img>
                            上传
                            <button></button>
                        </div>
                    </div>
                    <div className='uls'>
                        <ul>
                            <li>
                                <img src={common.file.default}></img>
                                <span>收藏夹</span>
                            </li>
                            <li>
                                <img src={common.file.default}></img>
                                <span>我的文档</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Position;