import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { USERS_LOGIN } from "./constants/api";
import { API_CALL_REQUEST } from "./constants/actionTypes";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  // const { username, password } = yield take(API_CALL_REQUEST)
  yield takeLatest(API_CALL_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
const loginAsync = (username, password) => {
  console.log("hererer", username, password);
  return axios
    .post("http://localhost:3000/api/Users/login", {
      username: username,
      password: password
    })
    .catch(error => {
      throw "Login Failed!";
    });
};

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga({ username, password }) {
  try {
    const response = yield call(loginAsync, username, password);
    yield put({ type: "API_CALL_SUCCESS", response });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
