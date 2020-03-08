import React, {Component} from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import ExplorderHeader from '../../../../../../components/ExplorderHeader';
import './account.less';
import {
    modifyPass,
} from '../models/account';
import { icon, common } from '../../../../../../images';

class Account extends Component {
    handSubmit() { // 提交密码
        let userid = sessionStorage.getItem('userid');
        let oldPass = this.oldPass.value;
        let newPass = this.newPass.value;
        let newPass1 = this.newPass1.value;
        if (!oldPass) {
            message.warning('原始密码不能为空');
            return;
        } else if (!newPass) {
            message.warning('新密码不能为空');
            return;
        } else if (!newPass1 || newPass1 != newPass) {
            message.warning('两次新密码输入不一致');
            return;
        } else if (newPass == oldPass) {
            message.warning('新密码不能与旧密码相等');
            return;
        }
        this.props.modifyPass({oldPass:oldPass,newPass:newPass,userid:userid});
    }

    reset() { // 重置
        this.oldPass.value = '';
        this.newPass.value = '';
        this.newPass1.value = '';
    }
    render() {
        return (
            <div className="accountContainer">
                <ExplorderHeader title="账号设置"/>
                <div className="accountMenu">
                    <sectoin>
                        <p className="title">
                            <h5>
                                修改密码
                            </h5>
                        </p>
                        <div className="content">
                            <p className="oldPwd">
                                <div className="theme">
                                    <img></img>原始密码
                                </div>
                                <div className="disc">
                                    <input type="password" placeholder="请输入您的原始密码" ref={oldPass=>this.oldPass=oldPass}></input>
                                </div>
                            </p>
                            <p className="newPwd">
                                <div className="theme">
                                    <img></img>新密码
                                </div>
                                <div className="disc">
                                    <input type="password" placeholder="请输入您的新密码" ref={newPass=>this.newPass=newPass}></input>
                                </div>
                            </p>
                            <p className="newPwd">
                                <div className="theme">
                                    <img></img>重新输入
                                </div>
                                <div className="disc">
                                    <input type="password" placeholder="请输入再次您的新密码" ref={newPass1=>this.newPass1=newPass1}></input>
                                </div>
                            </p>
                            <div className="btnContent">
                                 <button className="submit" onClick={()=>this.handSubmit()}>提交</button>
                                 <button className="reset" onClick={()=>this.reset()}>重置</button>
                            </div>
                        </div>
                    </sectoin>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps,{modifyPass})(Account);