import { combineReducers } from "redux";
import { Action } from "redux-actions";
import * as actions from "../actions";

interface ICompleteStore {
  message: string;
}
export function complete(
  state: ICompleteStore = {
    message: null
  },
  action: Action<any>
) {
  switch (action.type) {
    case actions.COMPLETE:
      return {
        message: action.payload.message
      };
    case actions.CLEAR_COMPLETION:
      return {
        message: null
      };
    default:
      return state;
  }
}

interface IReadStatusStore {
  loading: boolean;
  success: actions.IReadStatusSuccessPayload;
  failure: any;
}
export function readStatus(
  state: IReadStatusStore = {
    loading: false,
    success: null,
    failure: null
  },
  action: Action<any>
) {
  switch (action.type) {
    case actions.READ_STATUS:
      return {
        loading: true
      };
    case actions.READ_STATUS_SUCCESS:
      return {
        loading: false,
        success: action.payload
      };
    case actions.READ_STATUS_FAILURE:
      return {
        loading: false,
        failure: action.payload
      };
    default:
      return state;
  }
}

interface IReadAccountStore {
  loading: boolean;
  success: actions.IReadAccountSuccessPayload;
  failure: any;
}
export function readAccount(
  state: IReadAccountStore = {
    loading: false,
    success: null,
    failure: null
  },
  action: Action<any>
) {
  switch (action.type) {
    case actions.READ_ACCOUNT:
      return {
        loading: true
      };
    case actions.READ_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: action.payload
      };
    case actions.READ_ACCOUNT_FAILURE:
      return {
        loading: false,
        failure: action.payload
      };
    default:
      return state;
  }
}

interface ISaveAccountStore {
  loading: boolean;
  success: actions.ISaveAccountSuccessPayload;
  failure: any;
}
export function saveAccount(
  state: ISaveAccountStore = {
    loading: false,
    success: null,
    failure: null
  },
  action: Action<any>
) {
  switch (action.type) {
    case actions.SAVE_ACCOUNT:
      return {
        loading: true
      };
    case actions.SAVE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: action.payload
      };
    case actions.SAVE_ACCOUNT_FAILURE:
      return {
        loading: false,
        failure: action.payload
      };
    default:
      return state;
  }
}

interface IPunchInStore {
  loading: boolean;
  success: actions.IPunchInSuccessPayload;
  failure: any;
}
export function punchIn(
  state: IPunchInStore = {
    loading: false,
    success: null,
    failure: null
  },
  action: Action<any>
) {
  switch (action.type) {
    case actions.PUNCH_IN:
      return {
        loading: true
      };
    case actions.PUNCH_IN_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        success: action.payload
      };
    case actions.PUNCH_IN_FAILURE:
      return {
        loading: false,
        failure: action.payload
      };
    default:
      return state;
  }
}

interface IGlobalStatusStore {
  status: string;
}

export function globalStatus(
  state: IGlobalStatusStore = {
    status: null
  },
  action: Action<any>
) {
  switch (action.type) {
    case actions.READ_STATUS_SUCCESS:
    case actions.PUNCH_IN_SUCCESS:
      if (action.payload.response.status == null) {
        return state;
      }
      return {
        status: action.payload.response.status
      };
    default:
      return state;
  }
}

export interface IStore {
  complete: ICompleteStore;
  readStatus: IReadStatusStore;
  readAccount: IReadAccountStore;
  saveAccount: ISaveAccountStore;
  punchIn: IPunchInStore;
  globalStatus: IGlobalStatusStore;
}

export default combineReducers({
  complete,
  readStatus,
  readAccount,
  saveAccount,
  punchIn,
  globalStatus
});
