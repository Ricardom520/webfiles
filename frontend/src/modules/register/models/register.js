import actionTypes from '../../../actions/actionType';
import { message } from 'antd';
import {
    RegisterRuquest
} from '../services';

export const RegisterSub = (params) => {
    console.log(params)
    return dispatch => {
        RegisterRuquest(params)
            .then(res=>{
                console.log(res)
                if (res.code) {
                    message.error(res.msg);
                } else {
                    message.success(res.msg)
                }
            })
            .catch(error=>{
                console.log(error)
            })
        dispatch({type: actionTypes.SUBMIT_REGISTER})
    }
}