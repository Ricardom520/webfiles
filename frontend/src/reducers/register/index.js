const initState = {
    index: 1
};

export default (state = initState, action) => {
    console.log(state)
    switch(action.type) {
        default:
            return state;
    }
}