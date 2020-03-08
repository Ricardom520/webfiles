import actionTypes from '../../actions/actionType';
let initState = {
    myfileData: [],
};

export default (state = initState, action) => {
    console.log(state)
    console.log(action)
    let myfileData;
    function addFile(arr,res) {
        if (arr) {
            arr.map(item=>{
                if (item.systemid == res.parentid) {
                    if (item.children) {
                        item.children.push(res);
                    } else {
                        item.children = [];
                        item.children.push(res);
                    }
                } else {
                    addFile(arr.children,res);
                }
            })
            return arr;
        } else {
            return;
        }
    }
    function rename(arr,res) {
        console.log(arr)
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].systemid == res.systemid) {
                    arr[i].filename = res.filename;
                } else {
                    rename(arr[i].children, res)
                }
            }
            return arr;
        } else {
            return;
        }
    }
    function create(arr, res) {
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].systemid == res.parentid) {
                    if (arr[i].children) {
                        arr[i].children.push(res);
                    } else {
                        arr[i].children = [];
                        arr[i].children.push(res);
                    }
                } else {
                    create(arr[i].children, res);
                }
            }
            return arr;
        } else {
            return;
        }
    }
    switch(action.type) {
        case actionTypes.INITMENUS_MYFILE:
            state.myfileData = action.payload;
            return {...state};
        case actionTypes.PASTEDATA_MYFILE:
            let res = action.payload;
            myfileData = state.myfileData;
            if (res['filetype'] == 0) { // 判断是否为文件夹才操作
                if (res['parentid'] == 'myfile') {
                    state.myfileData.push(res);
                } else {
                    state.myfileData =  addFile(myfileData,res);
                }
            }
            return {...state};
        case actionTypes.RENAMEDATA_MYFILE:
            state.myfileData = rename(state.myfileData,action.payload);
            return {...state};
        case actionTypes.CREATEDATA_MYFILE:
            if (action.payload.parentid == 'myfile') {
                state.myfileData.push(action.payload);
            } else {
                state.myfileData = create(state.myfileData,action.payload);
            }
            return {...state};
        default:
            return state;
    }
}