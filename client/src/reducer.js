// action types
import {
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
  UPDATE_INPUT_VALUE
} from "./constants/actionTypes";

// reducer with initial state
const initialState = {
  fetching: false,
  loggedIn: false,
  error: null,
  username: "",
  password: ""
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
      break;
    case API_CALL_SUCCESS:
      return {
        ...state,
        username: "",
        password: "",
        fetching: false,
        loggedIn: true
      };
      break;
    case API_CALL_FAILURE:
      return {
        ...state,
        password: "",
        fetching: false,
        user: null,
        error: action.error
      };
      break;
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };
      break;
    default:
      return state;
  }
}
