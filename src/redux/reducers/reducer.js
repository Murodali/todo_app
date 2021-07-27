import * as types from "../actions/actionTypes";

const initialState = {
  users: [],
  user: {},
  loading: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case types.ADD_USER:
      return {
        ...state,
        loading: false,
      };

    case types.UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
