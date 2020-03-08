import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {message} from 'antd';
import { connect } from 'react-redux';
import { Button } from '../../../components/widget';
import LogoMotion from '../../../components/LogoMotion';
import {LoginSub} from '../models/login';
import './login.less';

class Login extends Component {
    Focus(e) {
        e.target.classList.add('active');
    }
    onBlur(e) {
        e.target.classList.remove('active');
    }
    onKeyDown(e, val) {
        if (e.keyCode == 13) {
            let loginBox = this.loginBox;
            let inputs = loginBox.getElementsByTagName('input');
            let username = this.username.value;
            let password = this.password.value;
            console.log(inputs);

            if (val == 1) {
                inputs[0].classList.remove('active');
                inputs[val].classList.add('active');
            }
            if (val == 2) {
                if (!username) {
                    message.error('用户名不能为空');
                    return;
                }
                if (!password) {
                    message.error('密码不能为空');
                    return;
                } else {
                    console.log("ok")
                    this.props.LoginSub({username: username, password: password})
                }
            }
            console.log(val)
            console.log(e)
        }
    }
    handleSubmit() {
        let username = this.username.value;
        let password = this.password.value;

        if (!username) {
            message.error('用户名不能为空');
            return;
        }
        if (!password) {
            message.error('密码不能为空');
            return;
        } else {
            console.log("ok")
            this.props.LoginSub({username: username, password: password})
        }
    }
    render() {
        return (
            <div className="page-login" ref={loginBox=>this.loginBox=loginBox}>
                <div className="page-login-bg">
                    <LogoMotion/>
                </div>
                <form className="page-login-form">
                    <div className="flex-center page-login-form-row">
                        <p className="title">用户名：</p>
                        <input type="text" name="username" placeholder="请输入账号" onKeyDown={(e)=>this.onKeyDown(e,1)} ref={username=>this.username=username} onClick={(e)=>this.Focus(e)} onBlur={(e)=>this.onBlur(e)}></input>
                    </div>
                    <div className="flex-center page-login-form-row">
                        <p className="title">密码：</p>
                        <input type="password" name="password" placeholder="请输入密码" onKeyDown={(e)=>this.onKeyDown(e,2)} ref={password=>this.password=password} onClick={(e)=>this.Focus(e)} onBlur={(e)=>this.onBlur(e)}/>
                    </div>
                    <div className="page-login-form-row flex-between">
                        <p className="flex">
                            <input id="remember" type="checkbox" value="记住密码" defaultChecked />
                            <label htmlFor="remember">记住密码</label>
                        </p>
                        <Link to="/account/password_find">忘记密码</Link>
                    </div>
                    <div className="page-login-form-row text-align-center">
                        <Button type="submit" className="btn-login" onClick={()=>this.handleSubmit()}>
                            登录
                        </Button>
                    </div>
                    <div className="page-login-form-row text-align-center">
                        <Link to="/register" className="go-register">立即注册</Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps,{LoginSub})(Login);