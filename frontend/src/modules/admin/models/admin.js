import actionTypes from '../../../actions/actionType';
import {
  initLiveNoRequest,
  initLiveYesRequest,
  initPhotoRequest,
  initItRequest,
  initPdfRequest,
  initFilesRequest,
  initUsersRequest,
  deleteLiveRequest,
  passLiveRequest,
} from '../services';
import {
  message
} from 'antd';


export const initLiveNo = (params) => {
  return dispatch => {
    initLiveNoRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATA_LIVENO, payload: res})
      })
      .catch(error=>{
        console.log(error)
      })
  }
}

export const initLiveYes = (params) => {
  return dispatch => {
    initLiveYesRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATA_LIVEYES, payload: res})
      })
      .catch(error=>{
        console.log(error)
      })
  }
}

export const initPhoto = (params) => {
  return dispatch => {
    initPhotoRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATA_APHOTO, payload: res})
      })
      .catch(error=>{
        console.log(error)
      })
  }
}

export const initIt = (params) => {
  return dispatch => {
    initItRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATA_ASOFTWARE, payload: res})
      })
      .catch(error=>{
        console.log(error)
      })
  }
}

export const initPdf = (params) => {
  return dispatch => {
    initPdfRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATA_APDF, payload: res})
      })
      .catch(error=>{
        console.log(error)
      })
  }
}

export const initFiles = (params) => {
  return dispatch => {
    initFilesRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATA_AFILES, payload: res})
      })
      .catch(error=>{
        console.log(error)
      })
  }
}

export const initUsers = (params) => {
  return dispatch => {
    initUsersRequest(params)
      .then(res=>{
        console.log(res)
        dispatch({type: actionTypes.INITDATA_AUSERS, payload: res})
      })
      .catch(error=>{
        console.log(error)
      })
  }
}

export const deleteYesLive = (params) => {
  return dispatch => {
    deleteLiveRequest(params)
      .then(res=>{
        console.log(res)
        if (res.code === 0) {
          message.success(res.msg);
        }
        dispatch({type: actionTypes.DELETEDATA_LIVEYES, payload: params})
      })
  }
}

export const deleteNoLive = (params) => {
  return dispatch => {
    deleteLiveRequest(params)
      .then(res=>{
        console.log(res)
        if (res.code === 0) {
          message.success(res.msg);
        }
        dispatch({type: actionTypes.DELETEDATA_LIVENO, payload: params})
      })
  }
}

export const passLive = (params) => {
  return dispatch => {
    passLiveRequest(params)
      .then(res=>{
        console.log(res)
        if (res.code === 0) {
          message.success(res.msg);
          dispatch({type: actionTypes.DELETEDATA_LIVENO, payload: params})
        }
      })
  }
}