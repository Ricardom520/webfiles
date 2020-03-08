import React, {Component} from 'react';
import { message } from 'antd';
import ExplorderHeader from '../../../../../../components/ExplorderHeader';
import {common,icon} from '../../../../../../images';
import { connect } from 'react-redux';
import {
    initSelf,
    modifySelf,
} from '../models/self';
import './self.less';

class Self extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            email: '',
            sex: '',
            bc: '',
            says: '',
            nc: '',
            photoFlag: true,
            emailFlag: true,
            sexFlag: true,
            bcFlag: true,
            saysFlag: true,
            ncFlag: true,
            params: {},
        }
    }
    componentDidMount() {
        let userid = sessionStorage.getItem('userid');
        this.props.initSelf({userid: userid});
    }
    // 上传图片
    UploadPhoto(e,val) {
        let file = e.target.files[0];
        let that = this;
        let params = this.state.params;
        //创建读取文件的对象  
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //为文件读取成功设置事件  
        if (val == 'photo') {
            reader.onload=function(e) {  
                Object.assign(params,{photo:e.target.result});
                that.setState({
                    photo: e.target.result
                })
            };
        }  
        if (val == 'bc') {
            reader.onload=function(e) {  
                Object.assign(params,{bc:e.target.result});
                that.setState({
                    bc: e.target.result
                })
            };
        }
    }
    componentWillReceiveProps(nextprops) {
        let self = this.props.self;
        this.setState({
            photo: self.photo,
            email: self.email,
            sex: self.sex,
            sex_cn: self.sex_cn,
            bc: self.bc,
            says: self.says,
            nc: self.nc,
        })
    }
    // 修改input值
    ChangeValue(e, val) {
        let value = e.target.value;
        switch (val) {
            case 'nc':
                this.setState({
                    nc: value
                })
                break;
            case 'sex':
                this.setState({
                    sex: value
                })
                break;
            case 'email':
                this.setState({
                    email: value
                })
                break;
            case 'says':
                this.setState({
                    says: value
                })
                break;
            default:
                break;
        }
    }
    // 改变编辑状态
    changeStatus(val) {
        let {emailFlag,sexFlag,saysFlag,ncFlag,params,email,sex,says,nc} = this.state;
        switch (val) {
            case 'email':
                if (emailFlag) {
                    this.setState({
                        emailFlag: false
                    })
                } else {
                    Object.assign(params,{email:email});
                    this.setState({
                        emailFlag: true,
                        params: params
                    })
                }
                break;
            case 'nc':
                if (ncFlag) {
                    this.setState({
                        ncFlag: false
                    })
                } else {
                    console.log(nc)
                    Object.assign(params,{nc:nc});
                    this.setState({
                        ncFlag: true,
                        params: params
                    })
                    console.log(params)
                }
                break;
            case 'sex':
                if (sexFlag) {
                    this.setState({
                        sexFlag: false
                    })
                } else {
                    console.log(sex)
                    Object.assign(params,{sex:sex});
                    this.setState({
                        sexFlag: true,
                        params: params
                    })
                }
                break;
            case 'says':
                if (saysFlag) {
                    this.setState({
                        saysFlag: false
                    })
                } else {
                    Object.assign(params,{says:says});
                    this.setState({
                        saysFlag: true,
                        params: params
                    })
                }
                break;
            default:
                break;
        }
    }
    // 重置
    reset() {
        this.setState({
            email: '',
            sex: '',
            says: '',
            nc: '',
            photoFlag: false,
            emailFlag: false,
            sexFlag: false,
            bcFlag: false,
            saysFlag: false,
            ncFlag: false,
        })
    }
    // 提交
    handSubmit() {
        let {email,params,emailFlag,sexFlag,saysFlag,ncFlag} = this.state;
        let userid = sessionStorage.getItem('userid');
        if (!email) {
            message.error('邮箱不能为空');
            return;
        }
        if (!emailFlag || !sexFlag || !saysFlag || !ncFlag) {
            message.error('有资料尚未保存');
            return;
        }
        if (params) {
            Object.assign(params,{userid:userid});
            console.log(params)
            this.props.modifySelf({ userid:userid,
                                    nc:params.nc?params.nc:'',
                                    photo:params.photo?params.photo:'',
                                    email:params.email?params.email:'',
                                    sex:params.sex?params.sex:'',
                                    bc:params.bc?params.bc:'',
                                    says:params.says?params.says:'',
                                })
        } else {
            return;
        }
    }
    render() {
        let {photo,email,sex,bc,says,nc,emailFlag,sexFlag,saysFlag,ncFlag} = this.state;
        return (
            <div className="selfContainer">
                <ExplorderHeader title="个人中心"/>
                <div className="selfMenu">
                    <sectoin>
                        <p className="title">
                            <h5>
                                个人资料
                            </h5>
                        </p>
                        <div className="content">
                            <p className="selfPhoto">
                                <div className="theme">
                                    <img></img>个人头像
                                </div>
                                <div className="disc">
                                    <label for="selfPhoto">
                                        <img src={photo?photo:common.self.default}></img>
                                    </label>
                                    <input type="file" id="selfPhoto" onChange={(e)=>this.UploadPhoto(e, 'photo')}/>
                                </div>
                            </p>
                            <p>
                                <div className="theme">
                                    <img></img>个人昵称
                                </div>
                                <div className="disc">
                                    <input type="text" placeholder="请输入您的昵称" value={nc?nc:''} onChange={(e)=>this.ChangeValue(e, 'nc')} disabled={ncFlag} ref={nc=>this.nc=nc}/>
                                    <label className="editor" onClick={()=>this.changeStatus('nc')}>{ncFlag?'编辑':'保存'}</label>
                                </div>
                            </p>
                            <p>
                                <div className="theme">
                                    <img></img>Email
                                </div>
                                <div className="disc">
                                    <input type="text" placeholder="请输入您的Email" value={email?email:''} onChange={(e)=>this.ChangeValue(e, 'email')} disabled={emailFlag} ref={email=>this.email=email}/>
                                    <label className="editor" onClick={()=>this.changeStatus('email')}>{emailFlag?'编辑':'保存'}</label>
                                </div>
                            </p>
                            <p>
                                <div className="theme">
                                    <img></img>性别
                                </div>
                                <div className="disc">
                                    <div>
                                        <input type="radio" name="sex" checked={sex == 0?true:false} value={0} onChange={(e)=>this.ChangeValue(e, 'sex')} disabled={sexFlag}/>男
                                        <input type="radio" name="sex" checked={sex == 1?true:false} value={1} onChange={(e)=>this.ChangeValue(e, 'sex')} disabled={sexFlag}/>女
                                    </div>
                                    <label className="editor" onClick={()=>this.changeStatus('sex')}>{sexFlag?'编辑':'保存'}</label>
                                </div>
                            </p>
                            <p>
                                <div className="theme">
                                    <img></img>口头禅
                                </div>
                                <div className="disc">
                                    <input type="text" placeholder="请输入您的口头禅" value={says?says:''} onChange={(e)=>this.ChangeValue(e, 'says')} disabled={saysFlag}></input>
                                    <label className="editor" onClick={()=>this.changeStatus('says')}>{saysFlag?'编辑':'保存'}</label>
                                </div>
                            </p>
                            <p className="selfback">
                                <div className="theme">
                                    <img></img>背景图
                                </div>
                                <div className="disc">
                                    <label for="selfback">
                                        <img src={bc?bc:common.self.default}></img>
                                    </label>
                                    <input type="file" id="selfback" onChange={(e)=>this.UploadPhoto(e, 'bc')}/>
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
    console.log(state);
    return {self: state.Self};
}

export default connect(mapStateToProps,{initSelf,modifySelf})(Self);