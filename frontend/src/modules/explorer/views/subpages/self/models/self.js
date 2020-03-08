import actionType from '../../../../../../actions/actionType';
import {
    InitSelfRequest,
    modifySelfRequest,
} from '../services';
import { message } from 'antd';

export const initSelf = (params) => {
    return dispatch => {
        InitSelfRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionType.INITDATA_SELF,payload: res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const modifySelf = (params) => {
    return dispatch => {
        modifySelfRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code === 0) {
                    console.log("及拿来了")
                    message.success(res.msg);
                }
                dispatch({type: actionType.MODIFYDATA_SELF})
            })
    }
}