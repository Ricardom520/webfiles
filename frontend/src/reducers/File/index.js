import actionTypes from '../../actions/actionType';

let initStatae = {
    fileData: [],
    curParentid: 'myfile',
}

export default (state = initStatae, action) => {
    switch (action.type) {
        case actionTypes.INITDATA_FILE:
            state.fileData = action.payload;
            return {...state};
        case actionTypes.FINDDATA_FILE:
            state.fileData = action.payload;
            return {...state};
        default:
            return state;
    }
}