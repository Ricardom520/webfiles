import actionTypes from '../../actions/actionType';

let initState = {
    dustbinData: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.INITDATA_DUSTBIN:
            state.dustbinData = action.payload;
            return {...state};
        case actionTypes.DELETEDATA_DUSTBIN:
            for(let i = 0; i < state.dustbinData.length; i++) {
                if (state.dustbinData[i].systemid == action.payload.systemid) {
                    console.log("进来了")
                    state.dustbinData.splice(i,1);
                    break;
                }
            }
            return {...state};
        case actionTypes.REDUCTIONDATA_DUSTBIN:
            for(let i = 0; i < state.dustbinData.length; i++) {
                if (state.dustbinData[i].systemid == action.payload.systemid) {
                    console.log("进来了")
                    state.dustbinData.splice(i,1);
                    break;
                }
            }
            return {...state};
        case actionTypes.FINDDATA_DUSTBIN:
            state.dustbinData = action.payload;
            return {...state};
        default:
            return state;
    }
} 