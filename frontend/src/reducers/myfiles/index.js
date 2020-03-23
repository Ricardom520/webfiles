import actionTypes from '../../actions/actionType';

let initState = {
    myfilesData: [],
    curParentid: 'myfile',
    fileLists: [
        {
            systemid: 'myfile',
            filename: '我的文档',
            favour: false
        }
    ],
    hasShare: false,
    content: '',
    backFile: [],
    frontFile: [],
    hasShareSoft: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.INITDATA_MYFILE:
            state.myfilesData = action.payload.res;
            state.curParentid = action.payload.parentid;
            if (action.payload.filename) {
                state.fileLists.push({
                    filename: action.payload.filename,
                    systemid: action.payload.parentid,
                    favour: action.payload.favour
                })
            }
            return {...state};
        case actionTypes.PASTEDATA_MYFILE:
            let res = action.payload.res;
            let myfilesData = state.myfilesData;
            let hasShare = action.payload.hasShare;
            let index = 0;
            if (hasShare) { // 判断是否是剪切还是复制
                console.log("剪切")
                if (Object.keys(myfilesData).length > 1) {
                    for (let i = 0; i < myfilesData.length - 1; i++) {
                        if (myfilesData[i]['systemid'] == res.systemid) { // 判断是否是本地保存
                            index = i;
                            console.log("这里好")
                            if (myfilesData[i]['filetype'] <= res['filetype'] && myfilesData[i+1]['filetype'] > res['filetype']) { // 6个种类全有
                                myfilesData.splice(i+1,0,res);
                                console.log(1)
                                break;
                            }else if (res['filetype'] == 6) { // 为最后一个种类时
                                console.log(2)
                                myfilesData.push(res);
                                break;
                            } else { // 其他情况
                                console.log(3)
                                myfilesData.push(res);
                                break;
                            }
                            myfilesData.splice(index,1);
                        } else {
                            if (myfilesData[i]['filetype'] <= res['filetype'] && myfilesData[i+1]['filetype'] > res['filetype']) { // 6个种类全有
                                myfilesData.splice(i+1,0,res);
                                console.log(1)
                                break;
                            }else if (res['filetype'] == 6) { // 为最后一个种类时
                                console.log(2)
                                myfilesData.push(res);
                                break;
                            } else { // 其他情况
                                console.log(3)
                                myfilesData.push(res);
                                break;
                            }
                        }   
                    }
                } else if (Object.keys(myfilesData).length == 1) {
                    if (myfilesData[0]['filetype'] <= res.filetype) {
                        myfilesData.push(res);
                    } else {
                        myfilesData.pop(res);
                    }
                } else {
                    myfilesData.push(res);
                }
            } else {
                if (Object.keys(myfilesData).length) { // 判断当前文件夹是否有数据
                    for (let i = 0; i < myfilesData.length - 1; i++) {
                        if (myfilesData[i]['filetype'] <= res['filetype'] && myfilesData[i+1]['filetype'] > res['filetype']) { // 6个种类全有
                            myfilesData.splice(i+1,0,res);
                            break;
                        }else if (res['filetype'] == 6) { // 为最后一个种类时
                            myfilesData.push(res);
                            break;
                        } else { // 其他情况
                            myfilesData.push(res);
                            break;
                        }
                    }
                } else if (Object.keys(myfilesData).length == 1) {
                    if (myfilesData[0]['filetype'] <= res.filetype) {
                        myfilesData.push(res);
                    } else {
                        myfilesData.pop(res);
                    }
                } else {
                    myfilesData.push(res);
                }
            }
            
            return {...state};
        case actionTypes.RENAMEDATA_MYFILE:
            console.log(action)
            for (let i = 0; i < state.myfilesData.length; i++) {
                if (state.myfilesData[i]['systemid'] == action.payload['systemid']) {
                    state.myfilesData[i]['filename'] = action.payload['filename'];
                    break;
                }
            }
            return {...state};
        case actionTypes.TODATA_MYFILE:
            state.myfilesData = action.payload.res;
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
            for(let i = 0; i < state.myfilesData.length; i++) {
                if (state.myfilesData[i].systemid == action.payload.systemid) {
                    console.log("进来了")
                    state.myfilesData.splice(i,1);
                    break;
                }
            }
            return {...state};
        case actionTypes.SHEARDATA_MYFILE:
            state.hasShare = true;
            return {...state};
        case actionTypes.CREATEDATA_MYFILE:
            if (Object.keys(state.myfilesData).length) {
                for (let i = 0; i < state.myfilesData.length; i++) {
                    if (state.myfilesData[i].filetype > 0) {
                        state.myfilesData.splice(i,0,action.payload);
                        console.log("还是这里")
                        break;
                    } else if (state.myfilesData[i].filetype !=0) {
                        console.log("这列吗")
                        state.myfilesData.unshift(action.payload);
                        break;
                    }
                }
            } else {
                state.myfilesData.push(action.payload);
            }
            return {...state};
        case actionTypes.UPLODADATA_MYFILE:
            console.log(action.payload)
            console.log(action.payload['filetype'])
            console.log(state.myfilesData[0])
            if (Object.assign(state.myfilesData).length) {
                for (let i = 0; i < state.myfilesData.length - 1; i++) {
                    if (state.myfilesData[i]['filetype'] <= action.payload['filetype'] && state.myfilesData[i+1]['filetype'] > action.payload['filetype']) { // 6个种类全有
                        state.myfilesData.splice(i+1,0,action.payload);
                        console.log(1)
                        break;
                    }else if (action.payload['filetype'] == 6) { // 为最后一个种类时
                        console.log(2)
                        state.myfilesData.push(action.payload);
                        break;
                    } else { // 其他情况
                        console.log(3)
                        state.myfilesData.push(action.payload);
                        break;
                    }
                }
            } else {
                state.myfilesData.push(action.payload);
            }
            return {...state};
        case actionTypes.DOWNLOAD_MYFILE:
            state.content = action.payload;
            return {...state};
        case actionTypes.FINDDATA_MYFILE:
            state.myfilesData = action.payload;
            return {...state};
        case actionTypes.BACKDATA_MYFILE:
            state.backFile = state.fileLists.pop();
            state.myfilesData = action.payload;
            return {...state};
        case actionTypes.FRONTDATA_MYFILE:
            state.frontFile = state.backFile;
            state.fileLists.push(state.backFile);
            state.backFile = [];
            state.myfilesData = action.payload;
            return {...state};
        case actionTypes.ADDFAVOURDATA_MYFILE:
            return {...state};
        case actionTypes.GETHASPRO_MYFILES:
            state.hasShareSoft = action.payload;
            return {...state};
        default:
            return state;
    }
}