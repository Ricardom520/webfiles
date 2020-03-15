import actionTypes from '../../../actions/actionType';
import {
    initDataPdfRequest,
} from '../services';

export const initDataPdf = (params) => {
    return dispatch => {
        initDataPdfRequest(params)
            .then(res=>{
                console.log(res)
            })
            .catch(error=>{
                console.log(error)
            })
    }
}