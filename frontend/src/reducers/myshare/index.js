import actionTypes from '../../actions/actionType';

let initState = {
    mysharesData: [],
    curParentid: 'myfile',
    fileLists: [
        {
            systemid: 'myshare',
            filename: '我的分享',
            favour: false
        }
    ],
    hasShare: false,
    content: '',
    backFile: [],
    frontFile: [],
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.INITDATA_MYSHARE:
            state.mysharesData = action.payload.res;
            state.curParentid = action.payload.parentid;
            if (action.payload.filename) {
                state.fileLists.push({
                    filename: action.payload.filename,
                    systemid: action.payload.parentid,
                    favour: action.payload.favour
                })
            }
            return {...state};
        case actionTypes.TODATA_MYFILE:
            state.mysharesData = action.payload.res;
            state.curParentid = action.payload.parentid;
            if (action.payload.parentid) {
                for (let i = 0; i < state.fileLists.length - 1; i++) {
                    if (state.fileLists[i].systemid == action.payload.parentid) {
                        state.fileLists.splice(i+1,1);
                    }
                }
            }
            return {...state};
        case actionTypes.DOWNLOAD_MYFILE:
            state.content = action.payload;
            return {...state};
        case actionTypes.FINDDATA_MYFILE:
            state.mysharesData = action.payload;
            return {...state};
        case actionTypes.BACKDATA_MYFILE:
            state.backFile = state.fileLists.pop();
            state.mysharesData = action.payload;
            return {...state};
        case actionTypes.FRONTDATA_MYFILE:
            state.frontFile = state.backFile;
            state.fileLists.push(state.backFile);
            state.backFile = [];
            state.mysharesData = action.payload;
            return {...state};
        case actionTypes.CANCELDATA_MYSHARE:
            for(let i = 0; i < state.mysharesData.length; i++) {
                if (state.mysharesData[i].systemid == action.payload.systemid) {
                    state.mysharesData.splice(i,1);
                    break;
                }
            }
            return {...state};
        default:
            return state;
    }
}
