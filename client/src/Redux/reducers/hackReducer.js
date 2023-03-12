import {
  ADD_HACK_FAILURE,
  ADD_HACK_SUCCESS,
  DELETE_ONE_HACK_SUCCESS,
  GET_HACKS_FAILURE,
  GET_HACKS_SUCCESS,
  GET_ONE_HACK_FAILURE,
  GET_ONE_HACK_SUCCESS,
  LOADING_HACKS,
  UPDATE_HACK_FAILURE,
  UPDATE_HACK_SUCCESS,
} from "../../Redux/action-type/action-type-hackbeauty";

const IntialState = {
  hacks: [],
  errors: null,
  loading: false,
  oneHack: {},
};
export const hackReducer = (state = IntialState, { type, payload }) => {
  switch (type) {
    case LOADING_HACKS:
      return { ...state, loading: true };
    case GET_HACKS_SUCCESS:
      return { ...state, loading: false, hacks: payload };

    case GET_HACKS_FAILURE:
      return { ...state, loading: false, errors: payload };

    case ADD_HACK_SUCCESS:
      return { ...state, hacks: [...state.hacks, payload.hack] };

    case ADD_HACK_FAILURE:
      return { ...state, errors: payload };
      
    case GET_ONE_HACK_SUCCESS:
      return { ...state, loading: false , oneHack: payload };

    case GET_ONE_HACK_FAILURE:
      return { ...state, loading: false , errors: payload };
      
    case UPDATE_HACK_SUCCESS:
      return {
        ...state,
        hacks: state.hacks.map((el) => (el._id == payload._id ? payload : el))
      };

    case UPDATE_HACK_FAILURE:
      return {...state, errors: payload };
      

    case DELETE_ONE_HACK_SUCCESS:
      return {
        ...state,
        hacks: state.hacks.filter((hack) => hack._id !== payload),
      };

    default:
      return state;
  }
};
