import { createAction } from "redux-actions";

export const COMPLETE = "COMPLETE";
export const CLEAR_COMPLETION = "CLEAR_COMPLETION";

export const READ_STATUS = "READ_STATUS";
export const READ_STATUS_SUCCESS = "READ_STATUS_SUCCESS";
export const READ_STATUS_FAILURE = "READ_STATUS_FAILURE";

export const READ_ACCOUNT = "READ_ACCOUNT";
export const READ_ACCOUNT_SUCCESS = "READ_ACCOUNT_SUCCESS";
export const READ_ACCOUNT_FAILURE = "READ_ACCOUNT_FAILURE";

export const SAVE_ACCOUNT = "SAVE_ACCOUNT";
export const SAVE_ACCOUNT_SUCCESS = "SAVE_ACCOUNT_SUCCESS";
export const SAVE_ACCOUNT_FAILURE = "SAVE_ACCOUNT_FAILURE";

export const PUNCH_IN = "PUNCH_IN";
export const PUNCH_IN_SUCCESS = "PUNCH_IN_SUCCESS";
export const PUNCH_IN_FAILURE = "PUNCH_IN_FAILURE";

export interface IAccount {
  client_id: string;
  email: string;
  password: string;
}

export interface IResponse {
  status: "having_breakfast" | "resting" | "working";
}

export interface ICompletePayload {
  message: string;
}
export const complete = createAction<ICompletePayload>(COMPLETE);
export const clearCompletion = createAction(CLEAR_COMPLETION);

export interface IReadStatusSuccessPayload {
  response: IResponse;
}
export const readStatus = createAction(READ_STATUS);
export const readStatusSuccess = createAction<IReadStatusSuccessPayload>(
  READ_STATUS_SUCCESS
);
export const readStatusFailure = createAction(READ_STATUS_FAILURE);

export interface IReadAccountSuccessPayload {
  account: IAccount;
}
export const readAccount = createAction(READ_ACCOUNT);
export const readAccountSuccess = createAction<IReadAccountSuccessPayload>(
  READ_ACCOUNT_SUCCESS
);
export const readAccountFailure = createAction(READ_ACCOUNT_FAILURE);

export interface ISaveAccountPayload {
  account: IAccount;
}
export interface ISaveAccountSuccessPayload {
  account: IAccount;
}
export const saveAccount = createAction<ISaveAccountPayload>(SAVE_ACCOUNT);
export const saveAccountSuccess = createAction<ISaveAccountSuccessPayload>(
  SAVE_ACCOUNT_SUCCESS
);
export const saveAccountFailure = createAction(SAVE_ACCOUNT_FAILURE);

export interface IPunchInSuccessPayload {
  response: IResponse;
}
export const punchIn = createAction(PUNCH_IN);
export const punchInSuccess = createAction<IPunchInSuccessPayload>(
  PUNCH_IN_SUCCESS
);
export const punchInFailure = createAction(PUNCH_IN_FAILURE);
