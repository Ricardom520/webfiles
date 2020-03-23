import actionTypes from '../../../actions/actionType';
import {
    initDataPdfRequest,
    initDataLiveRequest,
    initDataPhotoRequest,
    initDataSoftwareRequest,
} from '../services';

export const initDataPdf = (params) => {
    return dispatch => {
        initDataPdfRequest(params)
            .then(res=>{
                console.log(res)
                if (res) {
                    dispatch({type: actionTypes.INITDATA_PDF, payload: res})   
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initDataLive = (params) => {
    return dispatch => {
        initDataLiveRequest(params)
            .then(res=>{
                console.log(res);
                if (res) {
                    dispatch({type: actionTypes.INITDATA_LIVE, payload: res})
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initDataPhoto = (params) => {
    return dispatch => {
        initDataPhotoRequest(params)
            .then(res=>{
                console.log(res);
                if (res) {
                    dispatch({type: actionTypes.INITDATA_PHOTO, payload: res})
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initDataSoftware = (params) => {
    return dispatch => {
        initDataSoftwareRequest(params)
            .then(res=>{
                console.log(res);
                if (res) {
                    dispatch({type: actionTypes.INITDATA_SOFT, payload: res})
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }
}