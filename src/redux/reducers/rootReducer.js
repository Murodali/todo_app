import { combineReducers } from "redux";
import usersReducer from "./reducer";
import todoReducer from "./todoReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    todos: todoReducer
})


export default rootReducer;