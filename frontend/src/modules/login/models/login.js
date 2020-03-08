import actionTypes from '../../../actions/actionType';
import { message } from 'antd';
import {
    LoginRuquest
} from '../services';

export const LoginSub = (params) => {
    console.log(params)
    return dispatch => {
        LoginRuquest(params)
            .then(res=>{
                console.log(res)
                if (res.code) {
                    message.error(res.msg);
                } else {
                    sessionStorage.setItem('userid', res.res[0]['userid']);
                    sessionStorage.setItem('username', res.res[0]['username']);
                    dispatch({type: actionTypes.SUBMIT_LOGIN, payload: res.res})
                    message.success(res.msg)
                    window.location = '/#/explorer/files';
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }
}