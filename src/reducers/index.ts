import { combineReducers } from "redux";
import { Action } from "redux-actions";
import * as actions from "../actions";

interface IReadStatusStore {
  loading: boolean;
  success: any;
  failure: any;
}

export function readStatus(
  state: IReadStatusStore = {} as IReadStatusStore,
  action: Action<any>
) {
  switch (action.type) {
    case actions.READ_STATUS:
      return {
        loading: true
      };
    case actions.READ_STATUS_SUCCESS:
      console.log(JSON.stringify(action.payload));
      return {
        loading: false,
        success: action.payload
      };
    case actions.READ_STATUS_FAILURE:
      console.log(JSON.stringify(action.payload));
      return {
        loading: false,
        failure: action.payload
      };
    default:
      return state;
  }
}

export default combineReducers({
  readStatus: readStatus
});
