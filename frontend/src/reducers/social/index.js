import actionTypes from '../../actions/actionType';

let initState = {
    pdfData: []
}

export default (state = initState, action) => {
    switch(action.type) {
        case actionTypes.initDATA_PDF:
            state.pdfData = action.payload;
            return {...state};
        default:
            return state;
    }
}