import actionTypes from '../../actions/actionType';

let initState = {
    favoriteData: [],
    curParentid: 'favourite',
    fileLists: [
        {
            systemid: 'favourite',
            filename: '收藏夹'
        }
    ],
    hasShare: false,
    content: '',
    backFile: [],
    frontFile: [],
}

export default (state = initState, action) => {
    switch(action.type) {
        case actionTypes.INITDATA_FAVOURITE:
            state.favoriteData = action.payload.res;
            state.curParentid = action.payload.parentid;
            if (action.payload.filename) {
                state.fileLists.push({
                    filename: action.payload.filename,
                    systemid: action.payload.parentid,
                })
            }
            return {...state};
        case actionTypes.PASTEDATA_MYFILE:
            let res = action.payload.res;
            let favoriteData = state.favoriteData;
            let hasShare = action.payload.hasShare;
            let index = 0;
            if (hasShare) { // 判断是否是剪切还是复制
                console.log("剪切")
                if (Object.keys(favoriteData).length > 1) {
                    for (let i = 0; i < favoriteData.length - 1; i++) {
                        if (favoriteData[i]['systemid'] == res.systemid) { // 判断是否是本地保存
                            index = i;
                            console.log("这里好")
                            if (favoriteData[i]['filetype'] <= res['filetype'] && favoriteData[i+1]['filetype'] > res['filetype']) { // 6个种类全有
                                favoriteData.splice(i+1,0,res);
                                console.log(1)
                                break;
                            }else if (res['filetype'] == 6) { // 为最后一个种类时
                                console.log(2)
                                favoriteData.push(res);
                                break;
                            } else { // 其他情况
                                console.log(3)
                                favoriteData.push(res);
                                break;
                            }
                            favoriteData.splice(index,1);
                        } else {
                            if (favoriteData[i]['filetype'] <= res['filetype'] && favoriteData[i+1]['filetype'] > res['filetype']) { // 6个种类全有
                                favoriteData.splice(i+1,0,res);
                                console.log(1)
                                break;
                            }else if (res['filetype'] == 6) { // 为最后一个种类时
                                console.log(2)
                                favoriteData.push(res);
                                break;
                            } else { // 其他情况
                                console.log(3)
                                favoriteData.push(res);
                                break;
                            }
                        }   
                    }
                } else if (Object.keys(favoriteData).length == 1) {
                    if (favoriteData[0]['filetype'] <= res.filetype) {
                        favoriteData.push(res);
                    } else {
                        favoriteData.pop(res);
                    }
                } else {
                    favoriteData.push(res);
                }
            } else {
                if (Object.keys(favoriteData).length) { // 判断当前文件夹是否有数据
                    for (let i = 0; i < favoriteData.length - 1; i++) {
                        if (favoriteData[i]['filetype'] <= res['filetype'] && favoriteData[i+1]['filetype'] > res['filetype']) { // 6个种类全有
                            favoriteData.splice(i+1,0,res);
                            break;
                        }else if (res['filetype'] == 6) { // 为最后一个种类时
                            favoriteData.push(res);
                            break;
                        } else { // 其他情况
                            favoriteData.push(res);
                            break;
                        }
                    }
                } else if (Object.keys(favoriteData).length == 1) {
                    if (favoriteData[0]['filetype'] <= res.filetype) {
                        favoriteData.push(res);
                    } else {
                        favoriteData.pop(res);
                    }
                } else {
                    favoriteData.push(res);
                }
            }
            
            return {...state};
        case actionTypes.RENAMEDATA_MYFILE:
            console.log(action)
            for (let i = 0; i < state.favoriteData.length; i++) {
                if (state.favoriteData[i]['systemid'] == action.payload['systemid']) {
                    state.favoriteData[i]['filename'] = action.payload['filename'];
                    break;
                }
            }
            return {...state};
        case actionTypes.TODATA_MYFILE:
            state.favoriteData = action.payload.res;
            state.curParentid = action.payload.parentid;
            if (action.payload.parentid) {
                for (let i = 0; i < state.fileLists.length - 1; i++) {
                    if (state.fileLists[i].systemid == action.payload.parentid) {
                        state.fileLists.splice(i+1,1);
                    }
                }
            }
            return {...state};
        case actionTypes.DELETEDATA_MYFILE:
            console.log(action.payload)
            for(let i = 0; i < state.favoriteData.length; i++) {
                if (state.favoriteData[i].systemid == action.payload.systemid) {
                    console.log("进来了")
                    state.favoriteData.splice(i,1);
                    break;
                }
            }
            return {...state};
        case actionTypes.SHEARDATA_MYFILE:
            state.hasShare = true;
            return {...state};
        case actionTypes.CREATEDATA_MYFILE:
            if (Object.keys(state.favoriteData).length) {
                for (let i = 0; i < state.favoriteData.length; i++) {
                    if (state.favoriteData[i].filetype > 0) {
                        state.favoriteData.splice(i,0,action.payload);
                        console.log("还是这里")
                        break;
                    } else if (state.favoriteData[i].filetype !=0) {
                        console.log("这列吗")
                        state.favoriteData.unshift(action.payload);
                        break;
                    }
                }
            } else {
                state.favoriteData.push(action.payload);
            }
            return {...state};
        case actionTypes.UPLODADATA_MYFILE:
            console.log(action.payload)
            console.log(action.payload['filetype'])
            console.log(state.favoriteData[0])
            if (Object.assign(state.favoriteData).length) {
                for (let i = 0; i < state.favoriteData.length - 1; i++) {
                    if (state.favoriteData[i]['filetype'] <= action.payload['filetype'] && state.favoriteData[i+1]['filetype'] > action.payload['filetype']) { // 6个种类全有
                        state.favoriteData.splice(i+1,0,action.payload);
                        console.log(1)
                        break;
                    }else if (action.payload['filetype'] == 6) { // 为最后一个种类时
                        console.log(2)
                        state.favoriteData.push(action.payload);
                        break;
                    } else { // 其他情况
                        console.log(3)
                        state.favoriteData.push(action.payload);
                        break;
                    }
                }
            } else {
                state.favoriteData.push(action.payload);
            }
            return {...state};
        case actionTypes.DOWNLOAD_MYFILE:
            state.content = action.payload;
            return {...state};
        case actionTypes.FINDDATA_FAVOUR:
            state.favoriteData = action.payload;
            return {...state};
        case actionTypes.BACKDATA_MYFILE:
            state.backFile = state.fileLists.pop();
            state.favoriteData = action.payload;
            return {...state};
        case actionTypes.FRONTDATA_MYFILE:
            state.frontFile = state.backFile;
            state.fileLists.push(state.backFile);
            state.backFile = [];
            state.favoriteData = action.payload;
            return {...state};
        case actionTypes.CENCELFAVOURDATA_FAVOUR:
            console.log("取消关税还是")
            for(let i = 0; i < state.favoriteData.length; i++) {
                if (state.favoriteData[i].systemid == action.payload.systemid) {
                    console.log("进来了")
                    state.favoriteData.splice(i,1);
                    break;
                }
            }
            return {...state};
        default:
            return state;
    }
}