import actionTypes from '../../actions/actionType';
let initState = {
    
};

export default (state = initState, action) => {
    console.log(state)
    console.log(action)
    switch(action.type) {
        case actionTypes.SUBMIT_LOGIN:
            console.log(action.payload)
            let res = action.payload[0];
            state.photo = res.photo;
            state.username = res.username;
            state.nc = res.nc;
            state.email = res.email;
            state.sex = res.sex;
            state.bc = res.bc;
            console.log(state)
            return {...state};
        default:
            return state;
    }
}