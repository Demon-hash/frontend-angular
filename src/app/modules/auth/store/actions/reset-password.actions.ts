import { createAction, props } from "@ngrx/store";
import { feature } from "~/src/app/modules/auth/store";
import { IResetPassword, IResetCode, ErrorInterface } from "~/src/app/types";

export namespace ResetPasswordActions {
  export const request = createAction(`${feature}/reset/request`, props<IResetPassword>());
  export const success = createAction(`${feature}/reset/success`, props<IResetCode>());
  export const error = createAction(`${feature}/reset/error`, props<ErrorInterface>());
}
