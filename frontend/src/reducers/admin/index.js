import actionTypes from '../../actions/actionType';

let initState = {
    liveno: [],
    liveyes: [],
    photo: [],
    software: [],
    pdf: [],
    files: [],
    users: [],
}

export default (state = initState, action) => {
  switch (action.type) {
      case actionTypes.INITDATA_LIVENO:
        state.liveno = action.payload;
        return {...state};
      case actionTypes.INITDATA_LIVEYES:
        state.liveyes = action.payload;
        return {...state};
      case actionTypes.INITDATA_APHOTO:
        state.photo = action.payload;
        return {...state};
      case actionTypes.INITDATA_ASOFTWARE:
        state.software = action.payload;
        return {...state};
      case actionTypes.INITDATA_APDF:
        state.pdf = action.payload;
        return {...state};
      case actionTypes.INITDATA_AFILES:
        state.files = action.payload;
        return {...state};
      case actionTypes.INITDATA_AUSERS:
        state.users = action.payload;
        return {...state};
      case actionTypes.DELETEDATA_LIVEYES:
        state.liveyes.map((item,index)=>{
          if (item.shareid === action.payload.shareid) {
            state.liveyes.splice(index,1);
            return;
          }
        })
        return {...state};
      case actionTypes.DELETEDATA_LIVENO:
        state.liveno.map((item,index)=>{
          if (item.shareid === action.payload.shareid) {
            state.liveno.splice(index,1);
            return;
          }
        })
        return {...state};
      default:
        return state;
  }
} 