import actionTypes from '../../../actions/actionType';
import {
    initDataPdfRequest,
    initDataLiveRequest,
    initDataPhotoRequest,
    initDataSoftwareRequest,
    initSocialnrjxRequest,
    initSocialdptjRequest,
} from '../services';

export const initSocialnrjx = (params) => {
    return dispatch => {
        initSocialnrjxRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.INITDATANRJX_SOCIAL, payload: res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initSocialdptj = (params) => {
  return dispatch => {
    initSocialdptjRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATADPTJ_SOCIAL, payload: res})
      })
      .catch(error=> {
        console.log(error)
      })
  }
}

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

export const clearSoftData = (params) => {
    return ({type: actionTypes.CLEARDATA_SOFT})
}