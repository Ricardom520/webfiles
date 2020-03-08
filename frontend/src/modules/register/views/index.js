import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { message } from 'antd';

import { Button } from '../../../components/widget';
import LogoMotion from '../../../components/LogoMotion';
import { connect } from 'react-redux';
import {RegisterSub} from '../models/register';

import './register.less';

class Register extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit() {
        let username = this.username.value;
        let password = this.password.value;
        let password1 = this.password1.value;
        let email = this.email.value;
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!username) {
            message.error('用户名不能为空');
            return;
        }
        if (!password) {
            message.error('密码不能为空');
            return;
        }
        if (!password1 || password1 != password) {
            message.error('两次密码输入不正确');
            return;
        }
        if (!email) {
            message.error('邮箱不能为空');
            return;
        }
        if (!reg.test(email)) {
            message.error('邮箱格式不正确');
            return;
        }
        console.log(username)
        console.log(this)
        console.log(username.value)
        this.props.RegisterSub({username: username, password: password, email: email})
    }
    render() {
        console.log(this.props)
        return (
            <div className="page-register">
                <div className="page-register-bg">
                    <LogoMotion/>
                </div>
                <form className="page-register-form">
                    <div className="flex-center page-register-form-row">
                        <p className="title">用户名：</p>
                        <input type="text" name="username" placeholder="请输入账号" ref={username=>this.username=username}></input>
                    </div>
                    <div className="flex-center page-register-form-row">
                        <p className="title">密码：</p>
                        <input type="password" name="password" placeholder="请输入密码" ref={password=>this.password=password}/>
                    </div>
                    <div className="flex-center page-register-form-row">
                        <p className="title">密码：</p>
                        <input type="password" name="password1" placeholder="请再次输入密码" ref={password1=>this.password1=password1}/>
                    </div>
                    <div className="flex-center page-register-form-row">
                        <p className="title">邮箱：</p>
                        <input type="text" name="eamil" placeholder="请输入邮箱" ref={email=>this.email=email}/>
                    </div>
                    <div className="page-register-form-row text-align-center">
                        <Button type="submit" className="btn-register" onClick={()=>this.handleSubmit()}>
                            立即注册
                        </Button>
                    </div>
                    <div className="page-register-form-row text-align-center">
                        <Link to="/login" className="go-register">返回登录</Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {};
}

export default connect(mapStateToProps,{RegisterSub})(Register);