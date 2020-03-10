import actionTypes from '../../../actions/actionType';
import { message } from 'antd';
import {
    initMyfilesRequest,
    pasteFileRequest,
    handleNewNameRequest,
    deleteFileRequest,
    createFileRequest,
    uploadFileRequest,
    findFileRequest,
    initDustbinRequest,
    deleteDustbinRequest,
    reductionDustbinRequest,
    findDustFileRequest,
} from '../services';

export const initMyfiles = (params) => {
    console.log(params)
    return dispatch => {
        initMyfilesRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.INITDATA_MYFILE,payload: {res:res,parentid:params.parentid,filename:params.filename}})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const pasteFile = (params) => {
    return dispatch => {
        console.log(params)
        pasteFileRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.PASTEDATA_MYFILE,payload: {res:res,hasShare:params.hasShare}})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const handleNewName = (params) => {
    return dispatch => {
        console.log(params)
        handleNewNameRequest(params)
            .then(res=>{
                console.log(res);
                console.log(params)
                dispatch({type: actionTypes.RENAMEDATA_MYFILE,payload: params})
            })
    }
}

export const toFile = (params) => {
    console.log(params)
    return dispatch => {
        initMyfilesRequest(params)
            .then(res=>{
                dispatch({type: actionTypes.TODATA_MYFILE,payload:{res:res,parentid:params.parentid,filename:params.filename}})
            })
    }
}

export const deleteFile = (params) => {
    return dispatch => {
        console.log(params)
        deleteFileRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code == 0) {
                    message.success(res.msg);
                }
            })
            .catch(error=>{
                console.log(error)
            })
        dispatch({type: actionTypes.DELETEDATA_MYFILE,payload: params})
    }
}

export const shearFile = (params) => {
    return ({type:actionTypes.SHEARDATA_MYFILE})
}

export const createFile = (params) => {
    return dispatch => {
        console.log(params)
        createFileRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type:actionTypes.CREATEDATA_MYFILE,payload: res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const uploadFile = (params) => {
    console.log(params)
    return dispatch => {
        uploadFileRequest(params)
            .then(res=>{
                console.log(res);
                dispatch({type: actionTypes.UPLODADATA_MYFILE,payload:res})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const findFile = (params) => {
    return dispatch => {
        findFileRequest(params)
            .then(res=> {
                console.log(res)
                dispatch({type: actionTypes.FINDDATA_MYFILE,payload:res})
            })
    }
}

export const backFile = (params) => {
    return dispatch => {
        console.log(params)
        initMyfilesRequest(params)
            .then(res=>{
                dispatch({type: actionTypes.BACKDATA_MYFILE,payload:res})
            })
    }
} 

export const frontFile = (params) => {
    return dispatch => {
        console.log(params)
        initMyfilesRequest(params)
            .then(res=>{
                dispatch({type: actionTypes.FRONTDATA_MYFILE,payload:res})
            })
    } 
}

export const initDustbin = (params) => {
    return dispatch => {
        initDustbinRequest(params)
            .then(res=>{
                console.log(res);
                dispatch({type: actionTypes.INITDATA_DUSTBIN,payload:res})
            })
    }
}

export const deleteDusbin = (params) => {
    console.log(params)
    return dispatch => {
        deleteDustbinRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code === 0) {
                    message.success(res.msg);
                }
                dispatch({type:actionTypes.DELETEDATA_DUSTBIN,payload: params})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const reductionDustbin = (params) => {
    return dispatch => {
        reductionDustbinRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code === 0) {
                    message.success(res.msg);
                }
            })
        dispatch({type: actionTypes.REDUCTIONDATA_DUSTBIN,payload: params})
    }
}

export const findDustFile = (params) => {
    return dispatch => {
        findDustFileRequest(params)
            .then(res=>{
                console.log(res);
                dispatch({type: actionTypes.FINDDATA_DUSTBIN,payload:res})
            })
            .catch(error=>{
                console.log(error);
            })
    }
}