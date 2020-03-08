import actionTypes from '../../../../../../actions/actionType';
import {
    modifyPassRequest,
} from '../services';
import { message } from 'antd';

export const modifyPass = (params) => {
    return dispatch => {
        console.log(params)
        modifyPassRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code ===  0) {
                    message.success(res.msg);
                } else {
                    message.error(res.msg);
                }
            })
            .catch(error=>{
                console.log(error)
            })
        dispatch({type: actionTypes.MODIFYDATA_PASS})
    }
}