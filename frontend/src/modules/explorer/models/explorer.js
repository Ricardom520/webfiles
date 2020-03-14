import actionTypes from '../../../actions/actionType';
import {
    initSelfPhotoRequest,
} from '../services';

export const initSelfPhoto = (params) => {
    return dispatch => {
        initSelfPhotoRequest(params)
            .then(res=> {
                console.log(res)
                dispatch({type: actionTypes.initDATA_SELFPHOTO,payload:res[0]})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}