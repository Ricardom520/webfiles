import actionTypes from '../../../actions/actionType';
import {
    submitEditorRequest
} from '../services';
import {
    message
} from 'antd';

export const submitEditor = (params) => {
    return dispatch => {
        submitEditorRequest(params)
            .then(res=>{
                console.log(res)
                if (res.code === 0) {
                    message.success(res.msg);
                }
                dispatch({type: actionTypes.SUBMITDATA_EDITOR})
            })
            .catch(error=>{
                console.log(error)
            })
    }
}