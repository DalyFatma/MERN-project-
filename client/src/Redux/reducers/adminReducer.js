import {
  EDIT_USER_FAIL,
  EDIT_USER_LOADING,
  EDIT_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_SUCCESS,
} from "../action-type/action-type-admin";

const InitialSate = {
  users: {},
  loading: false,
  userUpdated: {},
};

export const adminReducer = (state = InitialSate, { type, payload }) => {
  switch (type) {
    case GET_USERS_LOADING:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, users: payload };
    case GET_USERS_FAIL:
      return { ...state, loading: false, errors: payload };
    case EDIT_USER_SUCCESS:
      return { ...state, userUpdated: payload.user };
    case EDIT_USER_FAIL:
      return { ...state, errors: payload };

    case GET_USER_BY_ID_SUCCESS:
      return { ...state, userUpdated: payload.user };

    case GET_USER_BY_ID_FAIL:
      return { ...state, errors: payload };

    default:
      return state;
  }
};
