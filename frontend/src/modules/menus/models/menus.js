import actionTypes from '../../../actions/actionType';
import {
    initMyfieRequest
} from '../services';

export const initMyfie = (params) => {
    return dispatch => {
        initMyfieRequest(params)
            .then(res=>{
                console.log(params)
                console.log(res)
                dispatch({type:actionTypes.INITMENUS_MYFILE, payload: res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}