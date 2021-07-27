import * as types from "../actions/actionTypes";

const initialState = {
  todos: [],
  todo: {},
  loading: false,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };

    case types.DELETE_TODO:
      return {
        ...state,
        loading: false,
      };

    case types.ADD_TODO:
      return {
        ...state,
        loading: false,
      };

    case types.UPDATE_TODO:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_TODO:
      return {
        ...state,
        todo: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default todoReducer;
