import {Action} from "redux-actions";
import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import * as actions from "../actions";

function readStatusAPI(account: actions.IAccount) {
  return fetch("https://syoya-kate.appspot.com/status", {
    method: "POST",
    headers: {
    Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  })
  .then(response => {
    return response.text()
  })
  .then(json => {
    console.log(json);
  })
  .catch(err => err);
}

function* readStatus(action: Action<actions.IReadStatusPayload>) {
  try {
    const response = yield call(readStatusAPI, action.payload.account);
    yield put(actions.readStatusSuccess({response}));
  } catch (e) {
    yield put(actions.readStatusFailure(e));
  }
}

export default function* saga() {
  yield takeEvery(actions.READ_STATUS, readStatus);
}
