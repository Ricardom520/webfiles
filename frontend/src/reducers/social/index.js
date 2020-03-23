import actionTypes from '../../actions/actionType';

let initState = {
    pdfData: [],
    liveData: [],
    photoData: [],
    softData: [],
}

export default (state = initState, action) => {
    switch(action.type) {
        case actionTypes.INITDATA_PDF:
            console.log(action.payload.res)
            console.log(state.pdfData)
            for (let i = 0; i < action.payload.res.length; i++) {
                console.log("哈哈哈哈哈")
                console.log(state.pdfData)
                state.pdfData.push(action.payload.res[i])
            }
            let setpdf = new Set(state.pdfData);
            state.pdfData = Array.from(setpdf);
            return {...state};
        case actionTypes.INITDATA_LIVE:
            for (let i = 0; i < action.payload.res.length; i++) {
                state.liveData.push(action.payload.res[i]);
            }
            let setlive = new Set(state.liveData);
            state.pdfData = Array.from(setlive);
            return {...state};
        case actionTypes.INITDATA_PHOTO:
            for (let i = 0; i < action.payload.res.length; i++) {
                state.photoData.push(action.payload.res[i]);
            }
            let setphoto = new Set(state.photoData);
            state.photoData = Array.from(setphoto);
            return {...state};
        case actionTypes.INITDATA_SOFT:
            for (let i = 0; i < action.payload.res.length; i++) {
                state.softData.push(action.payload.res[i]);
            }
            let setsoft = new Set(state.softData);
            state.softData = Array.from(setsoft);
            return {...state};
        default:
            return state;
    }
}