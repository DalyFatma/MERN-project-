import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  EDIT_USER_FAIL,
  EDIT_USER_LOADING,
  EDIT_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_LOADING,
  GET_USER_BY_ID_SUCCESS,
  SET_USERS,
} from "../action-type/action-type-admin";
import {
  BAN_USER_FAILURE,
  BAN_USER_LOADING,
  BAN_USER_SUCCESS,
  UNBAN_USER_FAILURE,
  UNBAN_USER_LOADING,
  UNBAN_USER_SUCCESS,
} from "../action-type/action-type-banned";

const initialState = {
  users: [],
  loadingUsers: false,
  errorUsers: null,
  loadingUser: false,
  errorUser: null,
  user: {},
};

export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_LOADING:
      return { ...state, loadingUsers: true };
    case GET_USERS_SUCCESS:
      return { ...state, loadingUsers: false, users: payload };
    case GET_USERS_FAIL:
      return { ...state, loadingUsers: false, errorUsers: payload };
    case EDIT_USER_LOADING:
      return { ...state, loadingUser: true };
    case EDIT_USER_SUCCESS:
      return { ...state, loadingUser: false, user: payload };
    case EDIT_USER_FAIL:
      return { ...state, loadingUser: false, errorUser: payload };
    case GET_USER_BY_ID_LOADING:
      return { ...state, loadingUser: true };
    case GET_USER_BY_ID_SUCCESS:
      return { ...state, loadingUser: false, user: payload };
    case GET_USER_BY_ID_FAIL:
      return { ...state, loadingUser: false, errorUser: payload };

    case ADD_USER_SUCCESS:
      return { ...state, users: [...state.users, payload.user] };

    case ADD_USER_FAIL:
      return { ...state, errors: payload };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };
    case DELETE_USER_FAIL:
      return { ...state, errors: payload };

    case BAN_USER_LOADING:
    case UNBAN_USER_LOADING:
      return { ...state, loadingUser: true };

    case BAN_USER_SUCCESS:
    case UNBAN_USER_SUCCESS:
      return { ...state, loadingUser: false, user: payload };

    case BAN_USER_FAILURE:
    case UNBAN_USER_FAILURE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload._id ? payload : user
        ),
      };
      case SET_USERS:
      return {
        ...state,
        users: payload
      }

    default:
      return state;
  }
};
