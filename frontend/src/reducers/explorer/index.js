import actionTypes from '../../actions/actionType';

let initState = {
    photo: ''
}

export default (state = initState, action) => {
    switch(action.type) {
        case actionTypes.initDATA_SELFPHOTO:
            state.photo = action.payload.photo;
            return {...state};
        default:
            return state;
    }
}