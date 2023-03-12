import { SEARCH_HACKS, SEARCH_HACKS_FAIL, SEARCH_HACKS_SUCCESS } from "../action-type/action-type-search";

const initialState = {
    hacks: [],
    loading: false,
    error: null
  };
  
  export const searchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SEARCH_HACKS:
        return {
          ...state,
          loading: true,
        };
        case SEARCH_HACKS_SUCCESS:
            return {
              ...state,
              loading: false,
              hacks: [payload]
            };
      case SEARCH_HACKS_FAIL:
        return {
          ...state,
          loading: false,
          error: payload
        };
      default:
        return state;
    }
  };
  