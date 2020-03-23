import actionTypes from '../../actions/actionType';

let initState = {
    liveData: []
}

export default (state=initState, action) => {
    switch(action.type) {
        case actionTypes.OPENDATA_LIVE:
            state.liveData = action.payload;
            return {...state};
        default: 
            return state;
    }
}