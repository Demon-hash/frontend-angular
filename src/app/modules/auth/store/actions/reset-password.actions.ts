import { createAction, props } from "@ngrx/store";
import { feature, ResetPasswordInterface } from "~/src/app/modules/auth/store";
import { CodeInterface, ErrorInterface } from "~/src/app/types";

export namespace ResetPasswordActions {
  export const request = createAction(`${feature}/reset/request`, props<ResetPasswordInterface>());
  export const success = createAction(`${feature}/reset/success`, props<CodeInterface>());
  export const error = createAction(`${feature}/reset/error`, props<ErrorInterface>());
}
