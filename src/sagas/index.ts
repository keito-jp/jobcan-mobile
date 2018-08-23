import { AsyncStorage } from "react-native";
import { Action } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "../actions";

const ACCOUNT_KEY = "account";

function readStatusAPI(account: actions.IAccount) {
  return fetch("https://syoya-kate.appspot.com/status", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(account)
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => err);
}

function* readStatus() {
  try {
    const s = yield AsyncStorage.getItem(ACCOUNT_KEY);
    const response = yield call(readStatusAPI, JSON.parse(s));
    if (response.status === "undefined") {
      yield put(actions.readStatusFailure(new Error("status is undefined")));
    } else {
      yield put(actions.readStatusSuccess({ response }));
    }
  } catch (e) {
    yield put(actions.readStatusFailure(e));
  }
}

function* readAccount() {
  try {
    const s = yield AsyncStorage.getItem(ACCOUNT_KEY);
    yield put(
      actions.readAccountSuccess({
        account: JSON.parse(s)
      })
    );
  } catch (e) {
    yield put(actions.readAccountFailure(e));
  }
}

function* saveAccount(action: Action<actions.ISaveAccountPayload>) {
  try {
    yield AsyncStorage.setItem(
      "account",
      JSON.stringify(action.payload.account)
    );
    const s = yield AsyncStorage.getItem(ACCOUNT_KEY);
    yield put(
      actions.saveAccountSuccess({
        account: JSON.parse(s)
      })
    );
    yield put(
      actions.complete({
        message: "保存が完了しました。"
      })
    );
  } catch (e) {
    yield put(actions.saveAccountFailure(e));
  }
}

export default function* saga() {
  yield takeEvery(actions.READ_STATUS, readStatus);
  yield takeEvery(actions.READ_ACCOUNT, readAccount);
  yield takeEvery(actions.SAVE_ACCOUNT, saveAccount);
}
