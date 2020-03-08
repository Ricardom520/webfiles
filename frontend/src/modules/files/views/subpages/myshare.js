import React, {Component,Fragment} from 'react';
import { icon, common } from '../../../../images/index';
import '../files.less';

class Myshare extends Component {
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
                    <div className='tables'>
                        <table cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th width='15%' className='borderR'>名称</th>
                                    <th width='5%' className='borderR'>类型</th>
                                    <th width='6%' className='borderR' style={{paddingRight: '1%', textAlign: 'right'}}>大小</th>
                                    <th width='8%' className='borderR'>修改时间</th>
                                    <th width='6%' className='borderR'>修改者</th>
                                    <th width='12%' className='borderR'>创建时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width='15%'><img src={common.file.default}></img> 测试1</td>
                                    <td width='5%'>文件夹</td>
                                    <td width='6%' style={{paddingRight: '1%', textAlign: 'right'}}>97.6K</td>
                                    <td width='8%'>昨天 15:21</td>
                                    <td width='6%'>Ricardom</td>
                                    <td width='12%'>2019/12/26 20:48</td>
                                </tr>
                                <tr>
                                    <td width='15%'><img src={common.file.default}></img> 测试1</td>
                                    <td width='5%'>文件夹</td>
                                    <td width='6%' style={{paddingRight: '1%', textAlign: 'right'}}>97.6K</td>
                                    <td width='8%'>昨天 15:21</td>
                                    <td width='6%'>Ricardom</td>
                                    <td width='12%'>2019/12/26 20:48</td>
                                </tr>
                                <tr>
                                    <td width='15%'><img src={common.file.default}></img> 测试1</td>
                                    <td width='5%'>文件夹</td>
                                    <td width='6%' style={{paddingRight: '1%', textAlign: 'right'}}>97.6K</td>
                                    <td width='8%'>昨天 15:21</td>
                                    <td width='6%'>Ricardom</td>
                                    <td width='12%'>2019/12/26 20:48</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Myshare;