import {
  GET_CURRENT_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../action-type/action-type-User";

const InitialSate = {
  errors: null,
  currentUser: {}
};

export const userReducer = (state = InitialSate, { type, payload }) => {
  switch (type) {
    case REGISTER_FAIL:
      return { ...state, errors: payload };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, currentUser: payload.user };
    case GET_CURRENT_SUCCESS:
      return { ...state, currentUser: payload.user };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, currentUser: payload.user };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, errors: payload };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        errors: null,
        currentUser: {},
      };

    default:
      return state;
  }
};
