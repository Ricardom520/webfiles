import actionTypes from '../../../actions/actionType';
import {
    initSoftwareRequest,
    initCommonRequest,
} from '../services';

export const initSoft = (params) => {
    return dispatch => {
        initSoftwareRequest(params)
            .then(res=>{
                dispatch({type:actionTypes.INITDATA_SOFTWARE, payload: res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initCommon = (params) => {
    console.log(params)
    return dispatch => {
        initCommonRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.INIITDATA_COMMON, payload: res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}