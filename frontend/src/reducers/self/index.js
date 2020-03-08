import actionTypes from '../../actions/actionType';
const initState = {
    photo: '',
    username: '',
    nc: '',
    email: '',
    sex: '',
    bc: ''
};

export default (state = initState, action) => {
    console.log(state)
    console.log(action)
    switch(action.type) {
        case actionTypes.INITDATA_SELF:
            console.log(action);
            let res = action.payload;
            console.log(res)
            state.photo = res.photo;
            state.username = res.username;
            state.nc = res.nc;
            state.email = res.email;
            state.sex = res.sex;
            state.bc = res.bc;
            return {...state};
        default:
            return state;
    }
}