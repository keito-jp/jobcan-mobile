import { createAction } from "redux-actions";

export const READ_STATUS = "READ_STATUS";
export const READ_STATUS_SUCCESS = "READ_STATUS_SUCCESS";
export const READ_STATUS_FAILURE = "READ_STATUS_FAILURE";

export interface IAccount {
  cliend_id: string;
  email: string;
  password: string;
}

export interface IReadStatusPayload {
  account: IAccount;
}

export interface IResponse {
  status: "having_breakfast" | "resting" | "working";
}

export interface IReadStatusSuccessPayload {
  response: IResponse;
}

export const readStatus = createAction<IReadStatusPayload>(READ_STATUS);
export const readStatusSuccess = createAction<IReadStatusSuccessPayload>(
  READ_STATUS_SUCCESS
);
export const readStatusFailure = createAction(READ_STATUS_FAILURE);
