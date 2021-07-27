

const initialState = {
    users:[],
    todos:[],
    user:{},
    todo:{},
    loading: false
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}



export default usersReducer;