import * as types from '../actions/actionTypes';

const initialState = {
    users:[],
    todos:[],
    user:{},
    todo:{},
    loading: false
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){

        case types.GET_USERS:
            return{
                ...state,
                users: action.payload,
                loading:false
            }

        default:
            return state;
    }
}


const todoReducer = (state = initialState, action) => {
    switch(action.type){

        case types.GET_USERS:
            return{
                ...state,
                todos: action.payload,
                loading:false
            }

        default:
            return state;
    }
}




export default todoReducer;