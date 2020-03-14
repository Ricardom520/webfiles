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
    findFileFavourRequest,
    initDustbinRequest,
    deleteDustbinRequest,
    reductionDustbinRequest,
    findDustFileRequest,
    initFavouriteRequest,
    addToFavouriteRequest,
    cancelToMyfileRequest,
    initFileRequest,
    findFileFileRequest,
    shareFileRequest,
    initMysharesRequest,
    cancelShareRequest,
} from '../services';

export const initMyfiles = (params) => {
    console.log(params)
    return dispatch => {
        initMyfilesRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.INITDATA_MYFILE,payload: {res:res,parentid:params.parentid,filename:params.filename,favour:params.favour}})
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

export const toFileFavour = (params) => {
    console.log(params)
    return dispatch => {
        initFavouriteRequest(params)
            .then(res=>{
                dispatch({type: actionTypes.TODATA_MYFILE,payload:{res:res,parentid:params.parentid,filename:params.filename}})
            })
    }
}


export const deleteFile = (params) => {
    console.log(params)
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

export const findFileFavour = (params) => {
    return dispatch => {
        findFileFavourRequest(params)
            .then(res=> {
                console.log(res)
                dispatch({type: actionTypes.FINDDATA_FAVOUR,payload:res})
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

export const backFileFavour = (params) => {
    return dispatch => {
        console.log(params)
        initFavouriteRequest(params)
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

export const addToFavourite = (params) => {
    return dispatch => {
        addToFavouriteRequest(params)
            .then(res=>{
                console.log(params)
                console.log(res)
                if (res.code === 0) {
                    message.success(res.msg);
                }
                dispatch({type: actionTypes.ADDFAVOURDATA_MYFILE,payload: params})
            })
    }
}

export const cancelToMyfile = (params) => {
    return dispatch => {
        cancelToMyfileRequest(params)
            .then(res=>{
                console.log(res);
                console.log(params)
                dispatch({type: actionTypes.CENCELFAVOURDATA_FAVOUR, payload: params});
            })
            .catch(error=>{
                console.log(error)
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

export const initFavourite = (params) => {
    return dispatch => {
        initFavouriteRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.INITDATA_FAVOURITE, payload:{res:res,parentid:params.parentid,filename:params.filename,favour:params.favour}})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initFile = (params) => {
    return dispatch => {
        initFileRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.INITDATA_FILE, payload: res})
            })
    }
}

export const findFileFile = (params) => {
    return dispatch => {
        findFileFileRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type: actionTypes.FINDDATA_FILE, payload: res})
            })
            .catch(error=>{
                console.log(error);
            })
    }
}

export const shareFile = (params) => {
    return dispatch => {
        shareFileRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code === 0) {
                    message.success(res.msg);
                }
                dispatch({type: actionTypes.SHAREDATA_FILE})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const initMyshares = (params) => {
    return dispatch => {
        initMysharesRequest(params)
            .then(res=>{
                console.log(res)
                dispatch({type:actionTypes.INITDATA_MYSHARE,payload:{res:res,parentid:params.parentid,filename:params.filename,favour:params.favour}})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}

export const cancelShare = (params) => {
    return dispatch => {
        cancelShareRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code === 0) {
                    message.success(res.msg);
                }
                dispatch({type: actionTypes.CANCELDATA_MYSHARE,payload:params})
            })
    }
}