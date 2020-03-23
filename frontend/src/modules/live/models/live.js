import actionTypes from '../../../actions/actionType';
import {
    initLiveDataRequest
} from '../serivices';

export const initLiveData = (params) => {
    return dispatch => {
        initLiveDataRequest(params)
            .then(res=>{
                console.log(res);
                dispatch({type: actionTypes.OPENDATA_LIVE,payload: res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}