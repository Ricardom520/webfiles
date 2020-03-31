import actionTypes from '../../actions/actionType';

let initState = {
    commons: [],
    softwareData: [],
    visted: '',
    liked: '',
    selfPhoto: '',
    shareid: '',
    userid: '',
    sharetime: '',
    updatetime: '',
    filename: '',
    filetype: '',
    nc: '',
    filetitlename: '',
}

export default (state = initState, action) => {
    switch(action.type) {
        case actionTypes.INITDATA_SOFTWARE:
            state.shareid = action.payload.shareid;
            state.softwareData = action.payload.content;
            state.visted = action.payload.visted;
            state.liked = action.payload.liked;
            state.selfPhoto = action.payload.photo;
            state.userid = action.payload.userid;
            state.sharetime = action.payload.sharetime;
            state.updatetime = action.payload.updatetime;
            state.filename = action.payload.filename;
            state.filetype = action.payload.filetype;
            state.nc = action.payload.nc;
            state.filetitlename = action.payload.filetitlename;
            return {...state}
        case actionTypes.INIITDATA_COMMON:
            state.commons = action.payload;
            return {...state};
        default:
            return state;
    }
}